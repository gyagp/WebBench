var zoomed = false;
$(document).ready(function()
{

	appendGroupFix.init(); // jQuery helpper to add clear fix solution to floated div groups
	appendMetaDropIcon.init(); // This will add show meta data icon class to div
	$('.meta').hide(); // Hide meta div before show
	showMetaClick.init(); // Start show meta function
	$('.send_info').hide(); // Hide send info input text field
	formSendFunction.init();
	sendButtonFunction.init();


   // Zoom in / out
   /*
   $('#zoom_button').click(function()
   {
       if (zoomed)
       {
           // Zoom out
           $('.performance, .conformance').animate({zoom: '100%'});
           $('#zoom_button').html('Zoom in');
           zoomed = false;
       }
       else
       {
           // Zoom in
           var zoomAreaWidth = $('.benchmark_results').width();
           var screenWidth = $(document).width();
           var zoomTargetSize = 1000 / screenWidth;
           var zoomPercentage = 100 * screenWidth / zoomAreaWidth * zoomTargetSize;
           console.log(zoomAreaWidth, screenWidth, zoomPercentage);
           $('.performance, .conformance').animate({zoom: zoomPercentage + '%'});
           $('#zoom_button').html('Zoom out');
           zoomed = true;
       }
   });
   */
});


var appendGroupFix =
{
	init: function()
	{
		$('.group_result_wrap').addClass('group');
		$('.test_result_wrap').addClass('group');
	}
};


var appendMetaDropIcon =
{
	init: function()
	{
		var metaSpan = $('.test_result_meta span').addClass('DDIcon');
	}
};

var showMetaClick =
{
	init: function()
	{
		$('.test_result_meta span').on('click', function ()
		{
			var metaArea = $(this).data('meta-id-toggle');

			$('.meta[data-meta-id-value="'+ metaArea + '"]').toggle();
		});
	}
};


var formSendFunction =
{
	init: function()
	{
	    $(".given_name").click(function()
	    {
            $(this).animate({"width": "77%"}, 400);
            $(".send_info").show(500).removeClass("send_info").addClass("box-change");
	    });
	}
};


var sendButtonFunction =
{
	init: function()
	{
		$(":submit").click(function()
		{
            // Send info
            $.ajax(
            {
                url: '/ajax/given_name',
                type: 'POST',
                data:
                {
                    given_name : $('input[name=given_name]').val(),
                    results_id : $('input[name=id]').val()
                }
            }).done(function(data)
            {
                $(".given_name").hide(1000);
                $(".box-change").animate({"width": "100%"}, 2000);
                $('.box-change').replaceWith(data);
                //$('input:submit').attr("disabled", true);
            });
		});
	}
};



