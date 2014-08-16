jumplink.invoice.controller('IndexController', function($scope) {

});

jumplink.invoice.controller('InvoiceNavController', function($scope, $ionicNavBarDelegate) {
  $scope.showBackButton = function () {
    console.log($ionicNavBarDelegate.showBackButton());
    return $ionicNavBarDelegate.showBackButton();
  }
});

jumplink.invoice.controller('InvoiceCustomerController', function($scope, $ionicNavBarDelegate) {
  // $scope.showBackButton = function () {
  //   console.log($ionicNavBarDelegate.showBackButton());
  //   return $ionicNavBarDelegate.showBackButton();
  // }
});

jumplink.invoice.controller('InvoicePreviewController', function($scope, $ionicNavBarDelegate) {
  // $scope.showBackButton = function () {
  //   console.log($ionicNavBarDelegate.showBackButton());
  //   return $ionicNavBarDelegate.showBackButton();
  // }
});

jumplink.invoice.controller('InvoiceTaskController', function($scope, $filter, moment, $ionicNavBarDelegate) {

  // $scope.showBackButton = function () {
  //   console.log($ionicNavBarDelegate.showBackButton());
  //   return $ionicNavBarDelegate.showBackButton();
  // }

  var bank = {
    owner: "Pascal Garber"
    , name: "Volksbank Hamburg"
    , iban: "DE63201900030071312102"
    , bic: "GENODEF1HH2"
  }

  var approver = {
    name: "JumpLink"
    , address1: "Bei der Kirche 12"
    , place: "27476 Cuxhaven"
    , email: "info@jumplink.eu"
    , web: "www.jumplink.eu"
    , phone: "0152 55 19 12 50"
    , fax: "placeholder"
    , ustid: "DE277453808"
    , bank: bank
  }

  var recipient = {
    name: "customer"
    , address1: "address1"
    , place: "place"
  }

  var task = []
  task.push({
    title: ""
    , description: ""
    , cost: 0
  });

  var translate = {
    invoice: "Rechnung"
    , amount: "Summe"
    , totalamount: "Gesamtsumme"
    , tax: "Umsatzsteuer"
    , phone: "Telefon"
    , fax: "Fax"
  }

  var now = moment();
  var deadline = moment().add('weeks', 2);

  $scope.invoice = {
    approver: approver
    , recipient: recipient
    , currency: "Euro"
    , date: $filter('amDateFormat')(now, 'dddd, Do MMMM YYYY')
    , deadline: $filter('amDateFormat')(deadline, 'dddd, Do MMMM YYYY')
    , task: task
    , number: 1
    , tax: 0
    , taxrate: 0
    , amount: 100
    , totalamount: 100
    , translate: translate
  }
  $scope.webodf = {
    save: null,
    refresh: null
  };

  $scope.save = function() {
    $scope.webodf.save();
  }

  $scope.refresh = function() {
    $scope.webodf.refresh();
  }

  $scope.addTask = function() {
    task.push({
      title: ""
      , description: ""
      , cost: 0
    });
  }

  $scope.removeTask = function() {
    task.pop();
  }

});
