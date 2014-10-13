/**
 * Dummy redirecter for main categories and for groups
 **/
var test = {
    init : function()
    {
        // Update #content
        $.ajax(nextTest,
        {
            async: false,
            type: 'POST',
            data: {content_only: '1'}
        }).done(function(data)
        {
            $('#content').html(data);
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