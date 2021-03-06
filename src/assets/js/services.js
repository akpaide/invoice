jumplink.invoice.service('historyService', function ($window) {
  var back = function () {
    $window.history.back();
  }

  return {
    back: back
  };
});

jumplink.invoice.factory('invoiceCreaterService', function (moment, $translate, $filter, $timeout, $rootScope) {
  var currentInvoice;

  var fetchData = function (callback) {
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

    var services = []

    // TODO rename to expenditures
    var expenditures = []

    var translate = {};

    $rootScope.$watch('langReady', function(newVal){
      if(newVal) {
        $translate(["Invoice", "Amount", "Total amount", "Tax", "Phone", "Fax", "Hours", "Rate", "Total", "Price", "VAT", "Packaging & Shipping", "Quantity", "Unit price without VAT", "Expenditures", "Services", "Total without VAT", "Rate without VAT", "Grand total"])
        .then(function (translations) {
          for(var key in translations) {
            var newKey = key.toLowerCase().replace(/[^a-zA-Z0-9]/g,''); // transform index key for valid index key in odf file
            translate[newKey] = translations[key];
          }
        }, function(reason) {
          console.log("translate.invoice error");
          console.log("reason: "+reason);
        });
      }
    });


    var date = moment();                // now
    var duedate = date.add('month', 1); // in one month

    var invoice = {
      approver: approver
      , recipient: null
      , currency: "Euro"
      , date: date
      , dateHuman: $filter('amDateFormat')(date, 'dddd, Do MMMM YYYY')
      , duedate: duedate
      , duedateHuman: $filter('amDateFormat')(duedate, 'dddd, Do MMMM YYYY')
      , services: services
      , expenditures: expenditures
      , number: 1
      , taxrate: 0
      , tax: 0
      , amount: 100
      , totalamount: 100
      , translate: translate
    }

    callback(null, invoice);
  }

  getData = function(callback) {
    if(currentInvoice)
      return callback(null, currentInvoice);
    else
      return newInvoice(callback);
  }

  var newInvoice = function(callback) {
    fetchData(function(error, data) {
      currentInvoice = data;
      callback(null, currentInvoice);
    });
  }

  var getEmptyServiceObject = function() {
    return {
      title: ""         // Titel
      , description: "" // Beschreibung
      , time: 1         // Zeit
      , rate: 40        // Tarif ohne Mehrwertsteuer
      , vat: 0          // Mehrwertsteuer
      , vatrate: 0      // Mehrwertsteuersatz
      , total: 40       // Summe
    };
  }

  var addService = function(service) {
    if(!service) service = getEmptyServiceObject();
    currentInvoice.services.push(service);
  }

  var removeService = function() {
    currentInvoice.services.pop();
  }

  var getEmptyExpenditureObject = function() {
    return {
      title: ""           // Titel
      , description: ""   // Beschreibung
      , netunitprice: 40  // Einzelpreis Netto
      , quantity: 1       // Menge
      , shipping: 0       // Verpackung und Versand
      , vatrate: 0        // Mehrwertsteuersatz
      , vat: 0            // Mehrwertsteuer
      , total: 40         // Summe
    };
  }

  var addExpenditure = function(expenditure) {
    if(!expenditure) expenditure = getEmptyExpenditureObject();
    currentInvoice.expenditures.push(expenditure);
  }

  var removeExpenditure = function() {
    currentInvoice.expenditures.pop();
  }

  var getEmptyRecipientObject = function() {
    return {
      name: ""
      , email: ""
      , address1: ""
      , address2: ""
      , address3: ""
    }
  }

  var setRecipient = function(recipient) {
    if(!recipient) recipient = getEmptyRecipientObject();
    currentInvoice.recipient = recipient;
  }

  return {
    addService: addService
    , getEmptyServiceObject: getEmptyServiceObject
    , removeService: removeService
    , getEmptyExpenditureObject: getEmptyExpenditureObject
    , removeExpenditure: removeExpenditure
    , getEmptyRecipientObject: getEmptyRecipientObject
    , setRecipient: setRecipient
    , addExpenditure: addExpenditure
    , fetchData: fetchData
    , newInvoice: newInvoice
    , getData: getData
  };
});
