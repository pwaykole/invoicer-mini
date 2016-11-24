var express = require('express');
var Invoice = require('../models/invoice');

module.exports = function (app, express) {

    var invoiceApiRouter = express.Router();

    invoiceApiRouter.route('/')
        // get all the Invoices
        .get(function (req, res) {
            Invoice.find(function (err, invoices) {
                if (err) res.send(err);
                // return the cars
                res.json(invoices);
            }).limit(10).sort([
                ['createdAt', 'descending']
            ]);
        })
        .post(function (req, res) {
            var invoice = new Invoice(); // create a new instance of the Invoice model
            invoice.customer = req.body.customer_id;
            invoice.service = req.body.service;
            invoice.price = req.body.price;
            invoice.due = req.body.due;
            invoice.status = req.body.status;
            invoice.save(function (err) {
                if (err) res.send(err);

                // return a message
                res.json({
                    message: 'Invoice added!'
                });
            });
        });
    //Api with /:id
    invoiceApiRouter.route('/:id')
        //get single invoice
        .get(function (req, res) {
            Invoice.findById(req.params.id, function (err, invoice) {
                if (err) {
                    res.send(err);
                }
                res.json(invoice);
            });
        })
        .put(function (req, res) {
            Invoice.findById(req.params.id, function (err, invoice) {
                if (err) res.send(err);
                // set the new invoice information if it exists in the request
                if (req.body.customer) invoice.customer = req.body.customer;
                if (req.body.service) invoice.service = req.body.service;
                if (req.body.price) invoice.price = req.body.price;
                if (req.body.due) invoice.due = req.body.due;
                if (req.body.status) invoice.status = req.body.status;

                invoice.save(function (err) {
                    if (err) res.send(err);

                    // return a message
                    res.json({ message: 'Invoice updated!' });
                });

            });
        })
         .delete(function(req, res) {
            Invoice.remove({
                _id: req.params.id
            }, function (err, invoice) {
                if (err) res.send(err);

                res.json({ message: 'Successfully deleted' });
            });
        });

    return invoiceApiRouter;
};