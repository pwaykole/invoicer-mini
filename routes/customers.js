var express = require('express');
var Customers = require('../models/customer');

module.exports = function (app, express) {

    var customerApiRouter = express.Router();

    customerApiRouter.route('/')
        // get all the Customers
        .get(function (req, res) {
            Customers.find(function (err, customer) {
                if (err) res.send(err);
                // return the cars
                res.json(customer);
            }).limit(10).sort([
                ['first_name', 'ascending']
            ]);
        })


        //add customers to the database
        .post(function (req, res) {

            var customer = new Customers(); // create a new instance of the Customer model
                customer.first_name = req.body.first_name;
                customer.last_name = req.body.last_name;
                customer.company = req.body.company;
                customer.logo_url = req.body.logo_url;
                customer.email = req.body.email;
                customer.phone = req.body.phone;
                customer.address = {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zip: req.body.address.zip
                }

            customer.save(function (err) {
                if (err) res.send(err);

                // return a message
                res.json({
                    message: 'Customer created!'
                });
            });

        });


        //get customers by ID
        customerApiRouter.route('/:id')
         .get(function (req, res) {
            Customers.findById(req.params.id, function (err, customer) {
                if (err) res.send(err);
                // return the customer
                res.json(customer);
            });
        })
        // update the user with this id
        .put(function (req, res) {
            Customers.findById(req.params.id, function (err, customer) {

                if (err) res.send(err);

                // set the new user information if it exists in the request
                if (req.body.first_name) customer.first_name = req.body.first_name;
                if (req.body.last_name) customer.last_name = req.body.last_name;
                if (req.body.company) customer.company = req.body.company;
                if (req.body.logo_url) customer.logo_url = req.body.logo_url;
                if (req.body.email) customer.email = req.body.email;
                if (req.body.phone) customer.phone = req.body.phone;
                if (req.body.address) customer.address = {
                    street: customer.address.street,
                    city: customer.address.city,
                    state: customer.address.state,
                    zip: customer.address.zip
                };
                // save the updated details of customer
                customer.save(function (err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'Customer updated!' });
                });

            });
        })
        .delete(function(req, res) {
            Customers.remove({
                _id: req.params.id
            }, function (err, customer) {
                if (err) res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    return customerApiRouter;
};