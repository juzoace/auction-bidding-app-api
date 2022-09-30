import { ITable } from "aws-cdk-lib/aws-dynamodb";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

interface SwnMicroservicesProps {
    bidTable: ITable;
    auctionsTable: ITable;
}

export class SwnMicroservices extends Construct {

    public readonly bidMicroservice: NodejsFunction;
    public readonly auctionsMicroservice: NodejsFunction;

    constructor(scope: Construct, id: string, props: SwnMicroservicesProps) {
        super(scope, id);

        // bid microservice
        this.bidMicroservice = this.createBidFunction(props.bidTable);
        // auction microservice
        this.auctionsMicroservice = this.createAuctionsFunction(props.auctionsTable);

    }

    private createBidFunction(bidTable: ITable) : NodejsFunction {
        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling: {
                externalModules: [
                  'aws-sdk'
                ]
              },
              environment: {
                PRIMARY_KEY: 'id',
                DYNAMODB_TABLE_NAME: bidTable.tableName
              },
              runtime: Runtime.NODEJS_14_X
        }

        const bidFunction = new NodejsFunction(this, 'bidLambdaFunction', {
            entry: join(__dirname, `/../src/bid/index.js`),
            ...nodeJsFunctionProps
        });

        bidTable.grantReadWriteData(bidFunction);

        return bidFunction;
    }

    private createAuctionsFunction(auctionsTable: ITable) : NodejsFunction {
        const nodeJsFunctionProps: NodejsFunctionProps = {
            bundling: {
                externalModules: [
                  'aws-sdk'
                ]
              },
              environment: {
                PRIMARY_KEY: 'id',
                DYNAMODB_TABLE_NAME: auctionsTable.tableName
              },
              runtime: Runtime.NODEJS_14_X
        }

        const auctionsFunction = new NodejsFunction(this, 'auctionsLambdaFunction', {
            entry: join(__dirname, `/../src/auctions/index.js`),
            ...nodeJsFunctionProps
        })

        auctionsTable.grantReadWriteData(auctionsFunction);
        return auctionsFunction;
    } 
}