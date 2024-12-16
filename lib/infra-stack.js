"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfraStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const ec2 = require("aws-cdk-lib/aws-ec2");
const iam = require("aws-cdk-lib/aws-iam");
const apigateway = require("aws-cdk-lib/aws-apigateway");
class InfraStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
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
        instance.role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess'));
        // API Gateway
        const api = new apigateway.RestApi(this, 'BackendApi', {
            restApiName: 'Backend Service',
        });
        api.root.addMethod('GET');
    }
}
exports.InfraStack = InfraStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2Q0FBZ0Q7QUFDaEQseUNBQXlDO0FBQ3pDLDJDQUEyQztBQUMzQywyQ0FBMkM7QUFDM0MseURBQXlEO0FBRXpELE1BQWEsVUFBVyxTQUFRLG1CQUFLO0lBQ2pDLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUN0RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qix5QkFBeUI7UUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNqRCxvQkFBb0IsRUFBRSxZQUFZO1lBQ2xDLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFVBQVU7U0FDckQsQ0FBQyxDQUFDO1FBRUgsMkJBQTJCO1FBQzNCLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ2pDLE1BQU0sRUFBRSxDQUFDO1NBQ1osQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBRTtZQUN2RCxZQUFZLEVBQUUsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUM5QyxZQUFZLEVBQUUsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDeEMsR0FBRztTQUNOLENBQUMsQ0FBQztRQUVILG1CQUFtQjtRQUNuQixNQUFNLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUM1QyxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUM7U0FDM0QsQ0FBQyxDQUFDO1FBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FDMUIsR0FBRyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUNuRSxDQUFDO1FBRUYsY0FBYztRQUNkLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ25ELFdBQVcsRUFBRSxpQkFBaUI7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztDQUNKO0FBcENELGdDQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgKiBhcyBlYzIgZnJvbSAnYXdzLWNkay1saWIvYXdzLWVjMic7XG5pbXBvcnQgKiBhcyBpYW0gZnJvbSAnYXdzLWNkay1saWIvYXdzLWlhbSc7XG5pbXBvcnQgKiBhcyBhcGlnYXRld2F5IGZyb20gJ2F3cy1jZGstbGliL2F3cy1hcGlnYXRld2F5JztcblxuZXhwb3J0IGNsYXNzIEluZnJhU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IGNkay5BcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgICAgICAvLyBTMyBCdWNrZXQgZm9yIEZyb250ZW5kXG4gICAgICAgIGNvbnN0IGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ0Zyb250ZW5kQnVja2V0Jywge1xuICAgICAgICAgICAgd2Vic2l0ZUluZGV4RG9jdW1lbnQ6ICdpbmRleC5odG1sJyxcbiAgICAgICAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBibG9ja1B1YmxpY0FjY2VzczogczMuQmxvY2tQdWJsaWNBY2Nlc3MuQkxPQ0tfQUNMUyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRUMyIEluc3RhbmNlIGZvciBCYWNrZW5kXG4gICAgICAgIGNvbnN0IHZwYyA9IG5ldyBlYzIuVnBjKHRoaXMsICdWUEMnLCB7XG4gICAgICAgICAgICBtYXhBenM6IDIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IGVjMi5JbnN0YW5jZSh0aGlzLCAnQmFja2VuZEluc3RhbmNlJywge1xuICAgICAgICAgICAgaW5zdGFuY2VUeXBlOiBuZXcgZWMyLkluc3RhbmNlVHlwZSgndDIubWljcm8nKSxcbiAgICAgICAgICAgIG1hY2hpbmVJbWFnZTogbmV3IGVjMi5BbWF6b25MaW51eEltYWdlKCksXG4gICAgICAgICAgICB2cGMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIElBTSBSb2xlIGZvciBFQzJcbiAgICAgICAgY29uc3Qgcm9sZSA9IG5ldyBpYW0uUm9sZSh0aGlzLCAnSW5zdGFuY2VSb2xlJywge1xuICAgICAgICAgICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2VjMi5hbWF6b25hd3MuY29tJyksXG4gICAgICAgIH0pO1xuICAgICAgICBpbnN0YW5jZS5yb2xlLmFkZE1hbmFnZWRQb2xpY3koXG4gICAgICAgICAgICBpYW0uTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoJ0FtYXpvblMzRnVsbEFjY2VzcycpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQVBJIEdhdGV3YXlcbiAgICAgICAgY29uc3QgYXBpID0gbmV3IGFwaWdhdGV3YXkuUmVzdEFwaSh0aGlzLCAnQmFja2VuZEFwaScsIHtcbiAgICAgICAgICAgIHJlc3RBcGlOYW1lOiAnQmFja2VuZCBTZXJ2aWNlJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGFwaS5yb290LmFkZE1ldGhvZCgnR0VUJyk7XG4gICAgfVxufVxuIl19