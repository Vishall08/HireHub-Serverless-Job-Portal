const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { randomUUID } = require("crypto");

const dynamodb = new DynamoDBClient();
const s3 = new S3Client();

exports.handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
  };

  try {
    const body = JSON.parse(event.body);
    const { name, email, phone, position, resumeBase64, resumeFileName } = body;

    const applicationId = randomUUID();
    const timestamp = new Date().toISOString();

    let resumeUrl = null;

    // Store resume in S3 if provided
    if (resumeBase64 && resumeFileName) {
      const resumeKey = `resumes/${applicationId}-${resumeFileName}`;
      const resumeBuffer = Buffer.from(resumeBase64, "base64");

      await s3.send(new PutObjectCommand({
        Bucket: process.env.RESUME_BUCKET,
        Key: resumeKey,
        Body: resumeBuffer,
        ContentType: "application/pdf"
      }));

      resumeUrl = `https://${process.env.RESUME_BUCKET}.s3.amazonaws.com/${resumeKey}`;
    }

    // Store application in DynamoDB
    await dynamodb.send(new PutItemCommand({
      TableName: process.env.TABLE_NAME,
      Item: {
        applicationId: { S: applicationId },
        name: { S: name },
        email: { S: email },
        phone: { S: phone },
        position: { S: position },
        resumeUrl: resumeUrl ? { S: resumeUrl } : { NULL: true },
        submittedAt: { S: timestamp },
        status: { S: "pending" }
      }
    }));

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: "Application submitted successfully",
        applicationId
      })
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: error.message })
    };
  }
};
