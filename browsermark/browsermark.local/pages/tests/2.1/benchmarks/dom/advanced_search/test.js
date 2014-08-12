/**
 * DOM Advanced Search
 *
 * Brute-force Document Object Model search. From static content script will select certain tags and start to search
 * specified content from those tags by using multiple methods.
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
    isDoable : true, // test is always doable
    operations : 1500,
    time : 0,
    internalCounter : false,
    testName : 'DOM Advanced Search',
    testVersion : '2.1',
    compareScore : 25789.9,
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
        // Get list of div- and a-elements.
        var pElements = $('p');
        var aElements = $('a');
        var liElements = $('li');

        // Array for results.
        results[loopCount] = [];

        // Search for elements with certain child-element.
        pElements.each(function(i)
        {
            if ($(this).children('a'))
            {
                results[loopCount].push(pElements[i]);
            }
        });

        // Search for elements containing word "as".
        pElements.each(function(i)
        {
            if ($(this).html().search(/as.*/) != -1)
            {
                results[loopCount].push(pElements[i]);
            }
        });

        // Search for links that have "external" class.
        aElements.each(function(i)
        {
            if ($(this).hasClass('external'))
            {
                results[loopCount].push(aElements[i]);
            }
        });

        // p > a.mw-redirect || li > a.mw-redirect
        aElements.each(function(i)
        {
            if ($(this).hasClass('mw-redirect'))
            {
                if ($(this).parent('p') || $(this).parent('li'))
                {
                    results[loopCount].push(aElements[i]);
                }
            }
        });

        // get all li-elements childs
        liElements.each(function(i)
        {
            $(this).children().each(function()
            {
                results[loopCount].push($(this));
            });
        });

        if (isFinal)
        {
            // Destroy playground
            $('div#hidden_playground').remove();

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