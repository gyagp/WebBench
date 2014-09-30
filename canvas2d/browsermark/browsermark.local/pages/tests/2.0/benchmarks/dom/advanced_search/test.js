/**
 * DOM Advanced Search
 *
 * Brute-force Document Object Model search. From static content script will select certain tags and start to search
 * specified content from those tags by using multiple methods.
 *
 * To determine internal score, script will use operations/second (ops): counter / elapsed time in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).
 *
 * @version 2.0
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : true, // test is always doable
    operations : 0,
    time : 4000,
    internalCounter : false,
    testName : 'DOM Advanced Search',
    testVersion : '2.0',
    compareScore : 125.8,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};
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
        var results = [];

        // Search for elements with certain child-element.
        results = [];
        pElements.each(function(i)
        {
            if ($(this).children('a'))
            {
                results.push(pElements[i]);
            }
        });

        // Search for elements containing word "as".
        results = [];
        pElements.each(function(i)
        {
            if ($(this).html().search(/as.*/) != -1)
            {
                results.push(pElements[i]);
            }
        });

        // Search for links that have "external" class.
        results = [];
        aElements.each(function(i)
        {
            if ($(this).hasClass('external'))
            {
                results.push(aElements[i]);
            }
        });

        // p > a.mw-redirect || li > a.mw-redirect
        results = [];
        aElements.each(function(i)
        {
            if ($(this).hasClass('mw-redirect'))
            {
                if ($(this).parent('p') || $(this).parent('li'))
                {
                    results.push(aElements[i]);
                }
            }
        });

        // get all li-elements childs
        results = [];
        liElements.each(function(i)
        {
            $(this).children().each(function()
            {
                results.push($(this));
            });
        });

        if (isFinal)
        {
            var elapsed = benchmark.elapsedTime();
            var finalScore = counter / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: counter, ops: finalScore});
        }
    }
};