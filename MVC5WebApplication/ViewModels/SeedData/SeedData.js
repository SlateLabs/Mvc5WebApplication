$(document).ready(function () {
    InitializeSeedDataViewModel();
});

function SeedDataViewModel() {

    this.MessageBox = ko.observable("");
    this.DisplayContent = ko.observable(true);

    this.SeedData = function () {
        SeedData();
    };

    

}

function InitializeSeedDataViewModel() {
    SeedDataViewModel = new SeedDataViewModel();
    ko.applyBindings(SeedDataViewModel);
}


function SeedData() {

    MVC5WebApplication.DisplayAjax();

    setTimeout(function () {

        var jqxhr = $.post("/api/seeddata/seed", "", function (response) {
            SeedDataCompleted(response);
        },
        "json")
         .fail(function (response) {
             RequestFailed(response);
         });
    }, 1000);


}


function SeedDataCompleted(response) {

    SeedDataViewModel.MessageBox("");
    SeedDataViewModel.MessageBox(MVC5WebApplication.RenderInformationalMessage(response.ReturnMessage));
    MVC5WebApplication.HideAjax();

}

function RequestFailed(response) {

    var jsonResponse = jsonParse(response.responseText);
    SeedDataViewModel.MessageBox("");
    SeedDataViewModel.MessageBox(MVC5WebApplication.RenderErrorMessage(jsonResponse.ReturnMessage));
    MVC5WebApplication.HideAjax();

}