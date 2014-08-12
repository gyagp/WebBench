/**
 * Group setter + dummy redirecter
 **/

var groupData = {
    group_name: 'CSS',
    group_version: '2.1'
};

var test = {
    init : function()
    {
        $.ajax({
            url: '/ajax/set_group',
            type: 'POST',
            data: groupData
        }).done(function()
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
        });
    },
    run : function(isFinal, loopCount)
    {

    }
};