/**
 * General responsiveness
 *
 * responsiveness test will be done simultaneously with Page Load test. Page Load test will save responsiveness times
 * and pass those to this script.
 *
 * To determine internal score, script will use operations/second (ops): 1 / responsiveness median in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).
 *
 * @version 2.0
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : true, // Always doable
    operations : 0,
    time : 0,
    internalCounter : false,
    testName : 'General Responsiveness',
    testVersion : '2.0',
    compareScore : 71.7, // Compare score
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
        // Get previous test responsiveness values
        $.ajax(
        {
            url: '/ajax/responsiveness',
            dataType: 'json'
        }).done(function(responsiveness)
        {
            // Get median
            var responsivenessMedian = mathExtended.median(responsiveness);

            // Set debug data
            var debugData = {
                responseTimes: responsiveness,
                responseMedian: responsivenessMedian
            };

            var elapsed = responsivenessMedian;
            var cnt = responsiveness.length;
            var finalScore = cnt / elapsed * 1000;

            debugData.elapsedTime = elapsed;
            debugData.operations = cnt;
            debugData.ops = finalScore;

            // Submit result
            benchmark.submitResult(finalScore, guide, debugData);
        });
    }
};