import { AttributeValue, DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { c } from '@/contract'
import * as dayjs from 'dayjs';



const client = new DynamoDBClient(
    { endpoint: 'http://dynamodb-local:8000' }
);
const awsDynamoDb = DynamoDBDocumentClient.from(client);

type InputBody = Zod.infer<typeof c.saveClientAuthorize.body>;

type DynamoDBPutItemCondition = Partial<{ [key in keyof typeof c.saveClientAuthorize.body._input]: AttributeValue }>

type InputBodyKey = keyof typeof c.saveClientAuthorize.body._input

@Injectable()
export class DynamoDbService {

    async saveClientAuthorize(input: InputBody, survivalSeconds: number) {
        const ttl = dayjs().add(survivalSeconds, 's').unix();

        const audienceInput = this.convertOptionalInputToPutCondition('audience', { S: input.audience }, input.audience)
        const promptInput = this.convertOptionalInputToPutCondition('prompt', { S: input.prompt }, input.prompt)

        const itemData: DynamoDBPutItemCondition = {
            ...audienceInput,
            ...promptInput,
            client_id: {
                S: input.client_id
            },
            state: {
                S: input.state
            },
            scope: { S: input.scope },
            redirect_uri: { S: input.redirect_uri },
            response_type: { S: input.response_type },
            code_challenge: { S: input.code_challenge },
            code_challenge_method: { S: input.code_challenge_method },
        }

        const command = new PutItemCommand({
            TableName: 'authorize_client',
            Item: { ...itemData, ttl: { N: `${ttl}` } }
        })

        const res = await awsDynamoDb.send(command);

        return res;
    }

    async saveLoginSession(input: InputBody, survivalSeconds: number) {
        const ttl = dayjs().add(survivalSeconds, 's').unix();

        const audienceInput = this.convertOptionalInputToPutCondition('audience', { S: input.audience }, input.audience)
        const promptInput = this.convertOptionalInputToPutCondition('prompt', { S: input.prompt }, input.prompt)

        const itemData: DynamoDBPutItemCondition = {
            ...audienceInput,
            ...promptInput,
            client_id: {
                S: input.client_id
            },
            state: {
                S: input.state
            },
            scope: { S: input.scope },
            redirect_uri: { S: input.redirect_uri },
            response_type: { S: input.response_type },
            code_challenge: { S: input.code_challenge },
            code_challenge_method: { S: input.code_challenge_method },
        }

        const command = new PutItemCommand({
            TableName: 'authorize_client',
            Item: { ...itemData, ttl: { N: `${ttl}` } }
        })

        const res = await awsDynamoDb.send(command);

        return res;
    }

    private convertOptionalInputToPutCondition<T extends InputBodyKey>(
        inputType: T,
        putConditonValue: AttributeValue,
        input: string | string[] | number | number[]
    ) {

        if (input.toString().length === 0) {
            return {};
        }

        const res: Partial<{ [key in InputBodyKey]: AttributeValue }> = {
            [inputType]: putConditonValue
        }

        return res;
    }
}
