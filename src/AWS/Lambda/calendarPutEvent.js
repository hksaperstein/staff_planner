'use strict'
const AWS = require('aws-sdk');

// AWS.config.update({region:"us-east-2"})
exports.handler = async (event, context) => {
    // const ddb = new AWS.DynamoDB({ apiVersion:"2012-10-08"})
    const documentClient = new AWS.DynamoDB.DocumentClient()
    let responseBody = "";
    let statusCode = 0;
    const { id, day, month, year, reason, starttime, endtime, username} = JSON.parse(event.body);

    const params = {
        TableName: "StaffCalendars",
        Item: {
            id: id,
            day: day,
            month: month, 
            year: year,
            reason: reason,
            starttime: starttime,
            endtime: endtime,
            username: username
        }
    };

    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(err){
        responseBody = `Unable to create calendar event: ${err}`;
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