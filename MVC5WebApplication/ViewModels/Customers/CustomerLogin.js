$(document).ready(function () {
    InitializeCustomerLoginViewModel();
});

function CustomerLoginViewModel() {

    this.LoginName = ko.observable("BGates");
    this.MessageBox = ko.observable("");


    this.Login = function () {
        LoginCustomer();
    };

}

function InitializeCustomerLoginViewModel() {
    CustomerLoginViewModel = new CustomerLoginViewModel();
    ko.applyBindings(CustomerLoginViewModel); 
}


function LoginCustomer() {

    MVC5WebApplication.DisplayAjax();

    setTimeout(function () {

        var customer = new function () { };

        customer.LoginID =  CustomerLoginViewModel.LoginName();

        var jqxhr = $.post("/api/customers/LoginCustomer", customer, function (response) {
           LoginCustomerCompleted(response);
        },
        "json")
         .fail(function (response) {
             RequestFailed(response);
         });
    }, 1000);


}

function LoginCustomerCompleted(response) {

    window.location = "/home/index";

}

function RequestFailed(response) {

    if (response.status == "404")
    {
        CustomerLoginViewModel.MessageBox("");
        CustomerLoginViewModel.MessageBox(response.responseText);

        MVC5WebApplication.HideAjax();
        return;
    }

    MVC5WebApplication.ClearValidationErrors();
    var jsonResponse = jsonParse(response.responseText);

    CustomerLoginViewModel.MessageBox("");
    CustomerLoginViewModel.MessageBox(MVC5WebApplication.RenderErrorMessage(jsonResponse.ReturnMessage));

    MVC5WebApplication.HideAjax();

}