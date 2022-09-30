import { CfnOutput } from "aws-cdk-lib";
import { CfnAuthorizer, CognitoUserPoolsAuthorizer, RestApi } from "aws-cdk-lib/aws-apigateway";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from 'constructs';
import { IdentityPoolWrapper } from "./identityPool";

export class Authorizer {

    private scope: Construct;
    private api: RestApi;

    private userPool: UserPool;
    private userPoolClient: UserPoolClient;
    private authorizer: CfnAuthorizer;
    private identityPoolWrapper: IdentityPoolWrapper;

    constructor( scope: Construct, api: RestApi ) {
        // this.authorizer
        this.scope = scope;
        this.api = api;
        this.initialize();
        this.identityPoolWrapper = new IdentityPoolWrapper(
            this.scope,
            this.userPoolClient,
            this.userPool
        )

    }

    private initialize() {
        this.createUserPool();
        this.createAuthorizer();
        this.addUserPoolClient();
    }

    private createUserPool() {
        this.userPool = new UserPool(this.scope, 'AuctionsUserPool', {
            userPoolName: 'AuctionsUserPool',
            selfSignUpEnabled: true,
            signInAliases: {
                username: true,
                email: true
            }
        });
        new CfnOutput(this.scope, 'UserPoolId', {
            value: this.userPool.userPoolId
        })
    }

    private addUserPoolClient() {
        this.userPoolClient = this.userPool.addClient('AuctionsUserPool-client', {
            userPoolClientName: 'AuctionsUserPool-client',
            authFlows: {
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            },
            generateSecret: false
        });
        new CfnOutput(this.scope, 'UserPoolClientId', {
            value: this.userPoolClient.userPoolClientId
        })

    }

    private createAuthorizer() {
        
        this.authorizer = new CfnAuthorizer(this.scope, 'AuctionsUsersAuthorizer', {
            name: 'HelloWorld',
            type: 'COGNITO_USER_POOLS',
            restApiId: this.api.restApiId,
            identitySource: 'method.request.header.Authorization',
            providerArns: [this.userPool.userPoolArn],
        });
        
    }
}
