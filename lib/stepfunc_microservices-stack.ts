import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { SwnApiGateway } from './apigateway'; 
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { SwnDatabase } from './database';
import { SwnMicroservices } from './microservice';

export class StepfuncMicroservicesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const database = new SwnDatabase(this, 'Database');

    const microservices = new SwnMicroservices(this, 'Microservices', {
      bidTable: database.bidTable,
      auctionsTable: database.auctionsTable
    })

    const apiGateway = new SwnApiGateway(this, 'ApiGateway', {
      bidMicroservice: microservices.bidMicroservice,
      auctionsMicroservice: microservices.auctionsMicroservice
    })
  }
}
