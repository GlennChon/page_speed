import { SecretManagerServiceClient } from '@google-cloud/secret-manager'
const client = new SecretManagerServiceClient()

export default async(secretPath:string)=>{
    const [accessResponse] = await client.accessSecretVersion({
        name: secretPath,
    })
    return accessResponse.payload.data.toString()
}