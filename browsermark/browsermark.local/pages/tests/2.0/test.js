/**
 * Dummy redirecter for main categories and for groups
 **/
var test = {
    init : function()
    {
        // Update #content
        $.ajax(nextTest, {async: false}).done(function(data)
        {
            $('#content').html($(data).find('#content').html());
            var dataNext = $(data).filter('#next_test').attr('data-next');

            // Get test.js
            $.getScript(nextTest + '/test.js', function()
            {
                // Update next test
                nextTest = dataNext;
                // Initialize benchmark
                benchmark.init();
            });
        });
    },
    run : function(isFinal, loopCount)
    {

    }
};