/**
 * DOM Create Source
 *
 * Brute-force Document Object Model elements creation from source. Script will create inside dynamically created playground
 * multiple times content by using HTML source code. After each create counter is increased by one.
 *
 * Test is mainly imported from old Browsermark.
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
    operations : 2000,
    time : 0,
    internalCounter : false,
    testName : 'DOM Create Source',
    testVersion : '2.1',
    compareScore : 478.6,
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

        // Create playground
        $('body').append('<div id="hidden_playground" style="display: none"></div>');

        return guide;

    },
    run : function(isFinal, loopCount)
    {
        $('div#hidden_playground_3').append('<div class="item"><div class="borderHorizontal"></div><div class="itemContent"><div class="padding"><div class="scoreArea"><div class="score">10451</div><div class="product">3DMark06, loop ' + loopCount + '</div></div><div class="infoArea"><div>AMD Athlon(tm) 7750 Dual-Core Processor 2702 MHz ATI Radeon HD 4850</div></div><div style="clear: both;"></div></div></div></div>');
        if (isFinal)
        {
            // Destroy playground
            $('div#hidden_playground_3').remove();

            var elapsed = benchmark.elapsedTime();
            var finalScore = counter / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: counter, ops: finalScore});
        }
    }
};