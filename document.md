##  1. Why Serverless?

 **The motivation behind choosing serverless architecture instead of traditional server-based hosting:**

**No Server Management:** You don’t need to provision, maintain or scale servers — AWS handles it. This lets you focus on business logic instead of infrastructure.

**Pay-Per-Use Pricing:** You only get charged when functions are executed, which reduces costs during idle times (great for projects with variable traffic).

**Automatic Scaling:** Functions scale automatically with traffic — no need to pre-configure capacity.

## 2. Why AWS Lambda?

**Specific reasons for using Lambda functions as the core compute:**

**Event-Driven Compute:** Lambda runs code only when events occur (e.g., new application POST calls).

**Fast Deployment:** Small functions are easy to deploy and update independently.

**Tight AWS Ecosystem Integration:** Works seamlessly with API Gateway, DynamoDB, and S3.


## 3. Why API Gateway?

 **The role of API Gateway as the HTTP interface:**

Acts as the front door for your backend API.

Routes incoming HTTP requests to the appropriate Lambda functions.

Provides features like CORS, different stages (dev/prod), rate limiting, and more.


## 4. Why DynamoDB?

**Why a serverless NoSQL database makes sense:**

Fully managed, highly scalable NoSQL storage for application data.

Low latency and high throughput for reading/writing application records.


## 5. Resumes in S3

 **The storage choice:**

S3 is durable and secure for storing user uploaded assets (PDF resumes).

It handles large objects with virtually unlimited storage.


## 6. Cost Efficiency

 **How serverless helps keep the project cost-effective:**

No fixed monthly server costs — you only pay for execution time and storage used.

Perfect for a project where traffic may be inconsistent.


## 7. Scalability and Maintenance

**How the system behaves under load:((

**Automatic Scaling:** AWS manages scaling — no manual intervention needed.

**Low Maintenance Overhead:** AWS takes care of OS patching, network configuration, and runtime environment.

