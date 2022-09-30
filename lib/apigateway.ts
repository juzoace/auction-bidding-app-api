import { IFunction } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs"

export class SwnApiGateway extends Construct {
    constructor(scope: Construct, id: string, props: SwnApiGatewayProps) {
        super( scope, id );

        // Auctions api gateway
        this.createAuctionsApi(props.auctionsMicroservice);

        // Bids api gateway
        this.createBidApi(props.bidMicroservice);
    }

    private createAuctionsApi(auctionsMicroservice: IFunction) {

    }

    private createBidApi(bidMicroservice: IFunction) {
        
    }
}