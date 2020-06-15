'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region:"us-east-2"})
exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion:"2012-10-08"})
    const documentClient = new AWS.DynamoDB.DocumentClient({region:"us-east-2"})
    let responseBody = "";
    let statusCode = 0;
    const { lastname, firstname} = JSON.parse(event.body);

    const params = {
        TableName: "User_Info",
        Item: {
            LastName: lastname,
            FirstName: firstname
        }
    }

    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data)
        statusCode = 201
    } catch(err){
        responseBody = `Unable to get user data`
        statusCode = 403
    }
    
    const response = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: responseBody
    }

    return response;
    
}