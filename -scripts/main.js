$(document).ready(function () {

    $("#openMenu").click(function () {
        $("#topMenu").hide();
        $("#sideMenu").toggleClass("fullscreenMenu");
        $("body").toggleClass("noScroll");
    });
    
    $("#closeMenu").click(function () {
        $("#topMenu").show();
        $("#sideMenu").toggleClass("fullscreenMenu");
        $("body").toggleClass("noScroll");
    });

});