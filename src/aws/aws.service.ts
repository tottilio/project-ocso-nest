import {PutObjectAclCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3"
import { Injectable } from "@nestjs/common";

@Injectable()
export class AwsService {
    private s3 = new S3Client({
        region: "us-east-1",
        credentials: {
            accessKeyId: process.env.acceskey_bucket || "",
            secretAccessKey: process.env.secretkey_bucket || "",
        }
    })

    async uploadFile(file :Express.Multer.File){
        const key = file.originalname;
        let url = `https://amzn-totti-ocsoo-nest-testting-2025.s3.us-east-1.amazonaws.com/${key}`
        const bucket = "amzn-totti-ocsoo-nest-testting-2025"
        const command = new  PutObjectCommand({
            Key: key,
            Body: file.buffer,
            Bucket: bucket
        }) 
        await this.s3.send(command)
        return url 
    }


}