var AWS = require("aws-sdk");
var S3 = new AWS.S3({
    region: process.env.REGION
});
var ddb = new AWS.DynamoDB({
    region: 'us-east-1' //process.env.REGION
});
var CloudWatch = new AWS.CloudWatch({
    region: 'us-east-1'
});

var SQS = new AWS.SQS({
    region: 'us-east-1'
});

// can be used to send sms or email
var SNS = new AWS.SNS({
    region: 'us-east-1'
});

exports.jackson =  async (event) => {
    console.log("Event Recevied ");
    var bucketName = event.Records[0].s3.bucket.name;
    var objectKey = event.Records[0].s3.object.key;
    await S3.getObject({
        Bucket: bucketName,
        Key: objectKey
    }, (err, response) => {
        if (err)
            console.log(err);
        else {
            var fileBody = response.Body.toString();
            var lines = fileBody.split("\n");
            var itemsProcessed = 0;
            lines.forEach((line) => {
                if ((line != null) && (line.length != 0)) {
                    var splitData = line.split(",");
                    if (splitData != null && splitData.length != 0)
                        addToDynamoDB(splitData);
                }
                itemsProcessed = itemsProcessed + 1;
                if (itemsProcessed == lines.length)
                    publishMetrics(lines.length);
            });
            console.log("Finished....");
        }
    });
    
    //As Async Function //
        return new Promise((resolve) => {
        console.log('Starting');
        setTimeout(() => {
            console.log('Finished waiting');
            resolve();
        }, 3000);
    });
};

function publishMetrics(totalrecords) {
    console.log(" ########################### PUBLISHING METRICS ##################################");
    CloudWatch.putMetricData({
        MetricData: [{
            MetricName: 'filesprocessinginfo',
            Dimensions: [{
                Name: 'Records In File',
                Value: 'Total Records in File'
            }],
            Value: totalrecords
        }],
        Namespace: 'nileshmetrics' // anyname space you wish to create
    }, (err, response) => {
        console.log(err);
    });
}
function addToDynamoDB(splitData) {
    var params = {
        TableName: 'AIRPORTS_DATA',
        Item: {
            'AIRPORT_ID': {
                S: splitData[0]
            },
            'AIRPORT_NAME': {
                S: splitData[3]
            }
        }
    };
    ddb.putItem(params, (err, response) => {
        if (err)
            console.log(err)
        else
            console.log("writted to dynamo ", splitData[3])
    });
}

