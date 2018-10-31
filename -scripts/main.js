$(document).ready(function () {

    $("#openMenu").click(function () {
        $("#topMenu").hide();
        $("#sideMenu").toggleClass("fullscreenMenu");
    });
    
    $("#closeMenu").click(function () {
        $("#topMenu").show();
        $("#sideMenu").toggleClass("fullscreenMenu");
    });

});