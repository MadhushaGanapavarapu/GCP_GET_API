const { Datastore } = require('@google-cloud/datastore');
const express = require('express');

const app = express();
const kind = 'Customer_Data'
const datastore = new Datastore({
    projectId: 'sample-244719',
    keyFilename: 'sample.json'
});

app.get('/getCustomers', function (request, response) {
    let query = datastore.createQuery(kind);
    query.run(function (error, custData) {
        return response
            .status(200)
            .send(custData);
    });
});

app.get('/getCustomer/:customer_id', function (request, response) {
    const customerId = parseInt(request.params.customer_id);
    let query = datastore.createQuery(kind)
    query.run(function (error, data) {
        var item = data.find(item => item.customer_ID === customerId);
        if (!item) {
            return response
                .status(200)
                .send('No record found !!');
        }
        else {
            return response
                .status(200)
                .send(item);
        }
    });
});

app.get('/', function (request, response) {
    return response
        .status(200)
        .send('Change the API endpoints to "/getCustomers" for fetching customer list and "/getCustomer/id" for fetching customer specific details!');
});

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT || 8080, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});
module.exports = app;
