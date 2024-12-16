import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';

export class InfraStack extends Stack {
    constructor(scope: cdk.App, id: string, props?: StackProps) {
        super(scope, id, props);

        // S3 Bucket for Frontend
        const bucket = new s3.Bucket(this, 'FrontendBucket', {
            websiteIndexDocument: 'index.html',
            publicReadAccess: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
        });

        // EC2 Instance for Backend
        const vpc = new ec2.Vpc(this, 'VPC', {
            maxAzs: 2,
        });

        const instance = new ec2.Instance(this, 'BackendInstance', {
            instanceType: new ec2.InstanceType('t2.micro'),
            machineImage: new ec2.AmazonLinuxImage(),
            vpc,
        });

        // IAM Role for EC2
        const role = new iam.Role(this, 'InstanceRole', {
            assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
        });
        instance.role.addManagedPolicy(
            iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
        );

        // API Gateway
        const api = new apigateway.RestApi(this, 'BackendApi', {
            restApiName: 'Backend Service',
        });
        api.root.addMethod('GET');
    }
}
