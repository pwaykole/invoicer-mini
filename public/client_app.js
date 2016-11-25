var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('/', {
                url: '/',
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController'
            })

        .state('customers', {
            url: '/customers',
            templateUrl: 'views/customers.html',
            controller: 'CustomersController'
        })

        .state('customers-details', {
            url: '/customers/details/:id',
            templateUrl: 'views/customer_details.html',
            controller: 'CustomersController'
        })

        .state('invoices', {
            url: '/invoices',
            templateUrl: 'views/invoices.html',
            controller: 'InvoicesController'
        })

        .state('invoices-details', {
            url: '/invoices/details/:id',
            templateUrl: 'views/invoice_details.html',
            controller: 'InvoicesController'
        })

         .state('add-customers', {
            url: '/customers/add',
            templateUrl: 'views/add_customer.html',
            controller: 'CustomersController'
        })

        .state('add-invoices', {
            url: '/invoices/add',
            templateUrl: 'views/add_invoice.html',
            controller: 'InvoicesController'
        })

        .state('edit-customers', {
            url: '/customers/edit/:id',
            templateUrl: 'views/edit_customer.html',
            controller: 'CustomersController'
        })

        .state('edit-invoices', {
            url: '/invoices/edit/:id',
            templateUrl: 'views/edit_invoice.html',
            controller: 'InvoicesController'
        });

});