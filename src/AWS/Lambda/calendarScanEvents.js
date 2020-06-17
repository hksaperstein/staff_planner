'use strict'
const AWS = require('aws-sdk');

// AWS.config.update({region:"us-east-2"})
exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion:"2012-10-08"})
    const documentClient = new AWS.DynamoDB.DocumentClient()
    let responseBody = "";
    let statusCode = 0;
    // const { lastname, firstname} = JSON.parse(event.body);

    const params = {
        TableName: "StaffCalendars"
    };

    try{
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch(err){
        responseBody = `Unable to get calendar events: ${err}`;
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