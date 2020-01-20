//@ts-ignore
import Amplify from 'aws-amplify';
//@ts-ignore
import awsexports from '../aws-exports';



Amplify.configure({...awsexports, Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:172fd0e5-cc09-447b-ada3-2b86e6b36a15',
    // REQUIRED - Amazon Cognito Region
    region: 'us-east-1',
    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'us-east-1',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_DN33nr6H2',
    userPoolWebClientId: '5jrld1ju46p3vj0ffpab1dn2p2',
    
}});

//@ts-ignore
export * from 'aws-amplify';
