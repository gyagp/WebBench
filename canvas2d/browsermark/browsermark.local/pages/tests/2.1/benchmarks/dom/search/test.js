/**
 * DOM Search
 *
 * Brute-force Document Object Model search. From static content script will search certain type of elements by id and
 * by name. After each search counter is increased by one.
 *
 * Test is  mainly imported from old Browsermark.
 *
 * To determine internal score, script will use operations/second (ops): counter / elapsed time in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).
 *
 * @version 2.1
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : true, // Always doable
    operations : 50000,
    time : 0,
    internalCounter : false,
    testName : 'DOM Search',
    testVersion : '2.1',
    compareScore : 14324.5,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

var results = [];

var test = {
    init : function()
    {
        // Save test but not asynchronous, before continue test must be saved to prevent mismatch error
        $.ajax(
        {
            url: '/ajax/set_test',
            async: false,
            type: 'POST',
            data:
            {
                test_name: guide.testName,
                test_version: guide.testVersion
            }
        });

        return guide;

    },
    run : function(isFinal, loopCount)
    {
        // results array
        results[loopCount] = [];

        // Get element by id.
        var logo = $('#logo');
        results[loopCount].push(logo);
        var technologies = $('#technologies');
        results[loopCount].push(technologies);
        var item222 = $('#item222');
        results[loopCount].push(item222);

        // Get elements by name.
        var a = $('a');
        results[loopCount].push(a);
        var h1 = $('h1');
        results[loopCount].push(h1);
        var div = $('div');
        results[loopCount].push(div);

        if (isFinal)
        {
            // Destroy playground
            $('div#hidden_playground_2').remove();

            var elapsed = benchmark.elapsedTime();

            // Calculate results array results
            var cnt = 0;
            $.each(results, function(i,v)
            {
               cnt += results[i].length;
            });

            var finalScore = cnt / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: cnt, ops: finalScore});
        }

    }
};