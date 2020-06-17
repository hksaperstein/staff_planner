'use strict'
const AWS = require('aws-sdk');

// AWS.config.update({region:"us-east-2"})
exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion:"2012-10-08"})
    const documentClient = new AWS.DynamoDB.DocumentClient()
    let responseBody = "";
    let statusCode = 0;
    const { id } = event.pathParameters;

    const params = {
        TableName: "StaffCalendars",
        Key: {
            id: parseInt(id)
        }
    };

    try{
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch(err){
        responseBody = `Unable to delete calendar event: ${err}`;
        statusCode = 403;
        console.log(responseBody);
    }
    
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin":"*"
        },
        body: responseBody
    };

    return response;
    
}