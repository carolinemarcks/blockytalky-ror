$('#sidebar > a').on('click', function (e) {
    console.log('gettin clicked');
    e.preventDefault();

    if(!$(this).hasClass("active")){
        var lastActive = $(this).closest("#sidebar").children(".active");
        lastActive.removeClass("active");
        lastActive.next('div').collapse('hide');
        $(this).addClass("active");
        $(this).next('div').collapse('show');

    }

});
