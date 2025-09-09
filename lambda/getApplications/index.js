const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const dynamodb = new DynamoDBClient();

exports.handler = async (event) => {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS"
    };

    try {
        const result = await dynamodb.send(
            new ScanCommand({
                TableName: process.env.TABLE_NAME || "JobApplications"
            })
        );

        // result.Items comes back in DynamoDB AttributeValue format
        // Convert to plain JSON using util-dynamodb
        const { unmarshall } = require("@aws-sdk/util-dynamodb");
        const applications = result.Items.map(item => unmarshall(item));

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify(applications)
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
