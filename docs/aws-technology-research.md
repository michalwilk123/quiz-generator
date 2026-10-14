# CLF-C02 Cloud Technology and Services research

Research date: 2026-10-11. Deliverable: 85 original English questions, including 68 single-response questions and 17 multiple-response questions. Multiple-response questions have five options and require exactly two or three selections. Every question includes a rationale and links to official AWS factual sources.

## Scope and style

The current [Domain 3 guide](https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html) assigns 34% of scored content to this domain. Coverage spans deployment and access, global infrastructure, compute, databases, networking, storage, AI/ML, analytics, application integration, developer tools, end-user computing, frontend development, and IoT.

Style was inspected using the publicly released [AWS sample-question PDF](https://d1.awsstatic.com/training-and-certification/docs-cloud-practitioner/AWS-Certified-Cloud-Practitioner_Sample-Questions.pdf) and [Tutorials Dojo's public CLF-C02 sample page](https://tutorialsdojo.com/aws-certified-cloud-practitioner-clf-c02-sample-exam-questions/). The AWS PDF explicitly identifies CLF-C01: it is historical evidence of question construction, not current CLF-C02 scope or current product facts. Tutorials Dojo is an independent practice publisher, not the authority for AWS service capabilities. No external question or answer was copied into this bank. No leaked-exam repositories were used.

Observed construction: a short business requirement or a direct foundational knowledge prompt, followed by a service-selection question. Single-response prompts ask for the best match; multiple-response stems explicitly give the selection count. Alternatives should be recognizable AWS offerings and, where possible, from the same service category. Questions emphasize the main discriminating requirement (NFS versus SMB, queue versus fan-out, text-to-speech versus speech-to-text, orchestration versus compute capacity). Foundational scenarios avoid implementation commands, detailed quotas, and specialist architecture design.

The bank was revised after cross-review: 30 service items received more closely related distractors and scenario-specific rationale; multi-Region distractors were revised; an advanced NAT scenario was replaced with foundational application-streaming recognition. Services with overlapping capabilities have a narrowing requirement, such as retained streaming records with independent replay, or support for both Spark and Hadoop.

## Current naming and availability

- The guide currently uses Amazon SageMaker AI. Questions distinguish custom model build/train/deploy from managed foundation model access through Amazon Bedrock.
- QuickSight's product URL redirects to [Amazon Quick Sight](https://aws.amazon.com/quick/quicksight/). The current display name is used.
- AppStream 2.0's documentation now identifies [Amazon WorkSpaces Applications](https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html). The question includes the former name because the exam guide still names AppStream 2.0.
- The AWS X-Ray product page redirects to CloudWatch Application Observability. [The X-Ray developer guide](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html) still documents distributed request tracing, so the question tests that supported service capability, not use of legacy instrumentation SDKs.
- AWS Snowball Edge is unavailable to new customers. The [availability notice](https://docs.aws.amazon.com/snowball/latest/developer-guide/snowball-edge-availability-change.html) and [Snowball FAQs](https://aws.amazon.com/snowball/faqs/) were checked. Snow questions were deliberately excluded rather than implying a new customer can order devices. Product pages also advertise a future shutdown date; no exam question depends on that evolving date.
- RDS Multi-AZ is described generically as providing availability and failover. The bank does not incorrectly claim all Multi-AZ deployment types have unreadable standby instances.
- Direct Connect is characterized by dedicated connectivity. The bank does not claim that it inherently encrypts every connection.
- S3 Intelligent-Tiering eligibility is narrowed to objects larger than 128 KB. No question implies that all objects automatically change tiers.

## Limits

These are original practice questions modeled on public examples, not official exam items. Public samples do not reveal the live exam's exact distribution, difficulty, or wording. Product naming and exam-guide names can diverge. Official service pages and guides were used for factual validation; the bank avoids unscored experimental items and unsupported assertions about exact live-exam contents.

## Visited official sources used by the questions

- https://aws.amazon.com/about-aws/global-infrastructure/regions_az/
- https://aws.amazon.com/amplify/
- https://aws.amazon.com/athena/
- https://aws.amazon.com/aws-transfer-family/
- https://aws.amazon.com/backup/
- https://aws.amazon.com/batch/
- https://aws.amazon.com/bedrock/
- https://aws.amazon.com/cli/
- https://aws.amazon.com/cloudformation/
- https://aws.amazon.com/cloudfront/
- https://aws.amazon.com/codebuild/
- https://aws.amazon.com/codepipeline/
- https://aws.amazon.com/comprehend/
- https://aws.amazon.com/connect/
- https://aws.amazon.com/console/
- https://aws.amazon.com/datasync/
- https://aws.amazon.com/developer/tools/
- https://aws.amazon.com/directconnect/
- https://aws.amazon.com/dms/
- https://aws.amazon.com/dynamodb/
- https://aws.amazon.com/ebs/
- https://aws.amazon.com/ec2/
- https://aws.amazon.com/ec2/autoscaling/
- https://aws.amazon.com/ecs/
- https://aws.amazon.com/efs/
- https://aws.amazon.com/eks/
- https://aws.amazon.com/elasticache/
- https://aws.amazon.com/elasticbeanstalk/
- https://aws.amazon.com/elasticloadbalancing/
- https://aws.amazon.com/emr/
- https://aws.amazon.com/eventbridge/
- https://aws.amazon.com/fargate/
- https://aws.amazon.com/firehose/
- https://aws.amazon.com/fsx/windows/
- https://aws.amazon.com/glue/
- https://aws.amazon.com/iot-core/
- https://aws.amazon.com/kinesis/data-streams/
- https://aws.amazon.com/lambda/
- https://aws.amazon.com/lex/
- https://aws.amazon.com/lightsail/
- https://aws.amazon.com/polly/
- https://aws.amazon.com/quick/quicksight/
- https://aws.amazon.com/rds/
- https://aws.amazon.com/rds/aurora/
- https://aws.amazon.com/redshift/
- https://aws.amazon.com/rekognition/
- https://aws.amazon.com/route53/
- https://aws.amazon.com/s3/
- https://aws.amazon.com/sagemaker/ai/
- https://aws.amazon.com/ses/
- https://aws.amazon.com/sns/
- https://aws.amazon.com/sqs/
- https://aws.amazon.com/step-functions/
- https://aws.amazon.com/storagegateway/
- https://aws.amazon.com/transcribe/
- https://aws.amazon.com/vpc/
- https://aws.amazon.com/vpn/
- https://aws.amazon.com/workspaces/
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-types.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html
- https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html
- https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html
- https://docs.aws.amazon.com/aws-certification/latest/cloud-practitioner-02/cloud-practitioner-02-domain3.html
- https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html
