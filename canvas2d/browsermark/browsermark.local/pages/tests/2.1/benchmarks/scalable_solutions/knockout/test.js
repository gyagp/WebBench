/**
 * Scalable Solutions Knockout
 *
 * Scalable Solutions Knockout test will use Javascript framework called Knockout, to perform a basic task.
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
    operations : 1000,
    time : null,
    internalCounter : false,
    testName : 'Scalable Solutions Knockout',
    testVersion : '2.1',
    compareScore : 97.9, // Compare score
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

// Knockout init
var Benchmark = ko.observableArray();
var BenchmarkView = {data: Benchmark};

var pushKnockoutData = function (data){
    Benchmark.push(data);
};

var test = {
    init : function()
    {
        // Delete Ember content
        $('#emberApp').remove();

        // Apply knockout bindings
        ko.applyBindings(BenchmarkView, document.getElementById('knockoutApp'));

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
        // Push Knockout data
        pushKnockoutData(loopCount + ', ');

        // If final, calculate score
        if (isFinal)
        {
            var elapsed = benchmark.elapsedTime();

            // Final push to Knockout
            pushKnockoutData('FINISHED');

            var finalScore = counter / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: counter, ops: finalScore});
        }
    }
};