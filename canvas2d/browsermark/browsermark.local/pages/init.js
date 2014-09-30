$(document).ready(function()
{

	// versionAppendHeader.init(); // Initialize vesion addon in header
	//versionSelect.init(); // Initilize version select function
	buttonizeVersion.init(); // Button class to version div A tag


	// Temporary DOM modification for new front end design
	$('#version').show(); // This version div will be moved later to select area

    // Calculate content minimum height
    $('#content').css('min-height', $(window).height() - 210 + 'px');

    $(window).resize(function()
    {
        // Calculate new content minimum height
        $('#content').css('min-height', $(window).height() - 210 + 'px');
    });

    // If no continent is selected, disable start buttons
    var startTestButtons = $('.start_test.enabled');
    if ($('#continent a').length > 0 && $('#continent a.activated').length == 0)
    {
        startTestButtons.removeClass('enabled');
        // hover highlight for continent heading
        $('.start_test').hover(function()
        {
            $('#select-continent').addClass('inverse-color');
        }, function()
        {
            $('#select-continent').removeClass('inverse-color');
        });
        // And same effect for mobile click
        $('.start_test').click(function()
        {
            $('#select-continent').toggleClass('inverse-color');
        });
    }


    // Continent selector
    $('#continent a').click(function(e)
    {
        // Prevent default action
        e.preventDefault();

        // Disable button divs
        startTestButtons.removeClass('enabled');

        _this = this;

        var continentValue = $(this).attr('data-id');
        $.ajax({
            url: '/ajax/change_continent',
            type: 'POST',
            data: {continent: continentValue},
            async: false
        }).done(function()
        {
            $('#continent a').removeClass('activated');
            $('.start_test').unbind('hover');
            $('.start_test').unbind('click');
            $(_this).addClass('activated');
            $(_this).blur();

            // Enable button divs
            startTestButtons.addClass('enabled');

            $('.start_test.enabled').click(function()
            {
                var valid = $(this).attr('data-valid');

                var webgl = Modernizr.webgl == true ? '' : '?webgl=0';
                $.ajax({
                    url: '/ajax/valid',
                    type: 'POST',
                    data: {validity: valid},
                    async: false
                }).done(function()
                {
                    window.location.href = nextTest + webgl;
                });
            });

            // Push selection as event in GA
            if (typeof _gaq != 'undefined')
            {
                _gaq.push(['_trackEvent', 'Continent', $(_this).html()]);
            }
        });
    });

    $('.start_test.enabled').click(function()
    {
        var valid = $(this).attr('data-valid');

        var webgl = Modernizr.webgl == true ? '' : '?webgl=0';
        $.ajax({
            url: '/ajax/valid',
            type: 'POST',
            data: {validity: valid},
            async: false
        }).done(function()
        {
            window.location.href = nextTest + webgl;
        });
    });

    // If timer span not found and sessionStorage in use, reset timer
    if ($('span#remaining_time').length == 0 && typeof(Storage) != 'undefined')
    {
        sessionStorage.span = 999;
    }

    if (debug || full)
    {
        $('#tests_dropdown select').change(function()
        {
            // Disable button divs
            var startTestButtons = $('.start_test.enabled');
            startTestButtons.toggleClass('enabled');
            $.ajax({
                url: '/ajax/test_selector',
                type: 'POST',
                data: {start: $('#tests_dropdown :selected').val()}
            }).done(function()
            {
                    // Update next test
                    nextTest = window.location.protocol + "//" + window.location.host + $('#tests_dropdown :selected').val();
                    // Enable button divs
                    startTestButtons.toggleClass('enabled');
            });
        });
    }

    $('.show_hide_meta').click(function()
    {
        // Find next meta paragraph
        var metaParagraph = $(this).next('p.meta_information');
        if ($(metaParagraph).css('display') == 'none')
        {
            // Show
            $(metaParagraph).show();
            // Change text
            $(this).html('Hide meta information');
        }
        else
        {
            // Hide
            $(metaParagraph).hide();
            // Change text
            $(this).html('Show meta information');
        }
    });

    // Share popups
    $('div.results_share a.url').click(function(event)
    {
        event.preventDefault();
        var url = $(this).attr('href');
        var width = $(this).attr('data-width');
        var height = $(this).attr('data-height');
        var media = $(this).attr('data-media');

        // Calculate left & top
        var left = Math.floor(($(window).width() - width) / 2);
        var top = Math.floor(($(window).height() - height) / 2);
        window.open(url, '_blank', 'width=' + width + ',height=' + height + ',toolbar=0,menubar=0,location=0,status=0,scrollbars=0,resizable=0,left=' + left + ',top=' + top);

        // Push selection as event in GA
        if (typeof _gaq != 'undefined')
        {
            _gaq.push(['_trackEvent', media, 'Share', url]);
        }

    });

    // Version change
    $('#version a').click(function(e)
    {
        e.preventDefault();
        var _this = this;
        var ver = $(this).text();
        $.ajax({
            url: '/ajax/set_version',
            type: 'POST',
            data: {version: ver}
        }).done(function()
        {
            $('#version a').removeClass('selected');
            $(_this).addClass('selected');
            if (full == true)
            {
                window.location = '/';
            }
        });
    });

});


var versionSelect =
{
	init: function ()
	{
		/*
		var classSelected = $('#version').find('.selected');

		console.log(classSelected);

		if(classSelecte = true)
		{
			$('#version').find('a:nth-child(2)').hide();
		}
		*/

		$('#version').find('a').toggleClass('selected');

	}

};



var buttonizeVersion =
{
	init: function()
	{
		var button = $('#version a').addClass('selectVersionButton');
	}

};




/*var versionAppendHeader =
{
	init: function()
	{
		//alert(version); debug
		$('#version').html("<span>" + version + "</span>");
	}
};*/













