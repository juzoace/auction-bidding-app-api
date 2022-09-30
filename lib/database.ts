// import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { AttributeType, BillingMode, ITable, Table } from 'aws-cdk-lib/aws-dynamodb';
import { RemovalPolicy } from "aws-cdk-lib";


export class SwnDatabase extends Construct {

    public readonly bidTable: ITable;
    public readonly auctionsTable: ITable;

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.bidTable = this.createBidTable();
        this.auctionsTable = this.createAuctionsTable();
    }

    private createBidTable() : ITable {
        
        const bidTable = new Table(this, 'bid', {
            partitionKey: {
              name: 'id',
              type: AttributeType.STRING
            },
            sortKey: {
                name: 'bidDate',
                type: AttributeType.STRING,
              },
            tableName: 'bid',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
          });
          return bidTable;
        
    }

    private createAuctionsTable() : ITable {

        const auctionsTable = new Table(this, 'bid', {
            partitionKey: {
              name: 'id',
              type: AttributeType.STRING
            },
            sortKey: {
                name: 'auctionDate',
                type: AttributeType.STRING,
              },
            tableName: 'bid',
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
          });
          return auctionsTable;

    }
}