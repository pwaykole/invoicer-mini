myApp.controller('CustomersController', ['$scope', '$http', '$location', '$stateParams', function ($scope, $http, $location, $stateParams) {

    $scope.getCustomers = function () {
        $http.get('/api/customers').success(function (response) {
            $scope.customers = response;
        });
    }

    $scope.getCustomer = function () {
        var id = $stateParams.id;
        $http.get('/api/customers/' + id).success(function (response) {
            $scope.customer = response;
        });
    }

    $scope.getCustomerInvoices = function () {
        var id = $stateParams.id;
        $http.get('/api/invoices/customer/' + id).success(function (response) {
            $scope.customer_invoices = response;
        });
    }

    $scope.addCustomer = function () {
        $http.post('/api/customers/', $scope.customer).success(function (response) {
            window.location.href = '/#customers';
        });
    }

    $scope.updateCustomer = function () {
        $http.put('/api/customers/' + $scope.customer._id, $scope.customer).success(function (response) {
            window.location.href = '/#customers';
        });
    }

    $scope.deleteCustomer = function (id) {
        $http.delete('/api/customers/' + id).success(function (response) {
            window.location.href = '/#customers';
        });
    }
}]);