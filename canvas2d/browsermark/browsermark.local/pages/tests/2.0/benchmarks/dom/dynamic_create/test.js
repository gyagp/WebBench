/**
 * DOM Dynamic Create
 *
 * Brute-force Document Object Model elements create. Test will create dynamically new elements inside dynamically created
 * playground. After each round counter is increased by one.
 *
 * Test is  mainly imported from old Browsermark.
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
    isDoable : true, // Always doable
    operations : 0,
    time : 2000,
    internalCounter : false,
    testName : 'DOM Dynamic Create',
    testVersion : '2.0',
    compareScore : 310.9,
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
        var score = document.createElement("div");
        score.className = "score";
        score.innerHTML = "10451";

        var product = document.createElement("div");
        product.className = "product";
        product.innerHTML = "3DMark06";

        var scoreArea = document.createElement("div");
        scoreArea.className = "scoreArea";

        var infoAreaPadding = document.createElement("div");
        infoAreaPadding.innerHTML = "AMD Athlon(tm) 7750 Dual-Core Processor 2702 MHz ATI Radeon HD 4850";

        var infoArea = document.createElement("div");
        infoArea.className = "infoArea";

        var clear = document.createElement("div");
        clear.style.clear = "both";

        var padding = document.createElement("div");
        padding.className = "padding";

        var itemContent = document.createElement("div");
        itemContent.className = "itemContent";

        var borderHorizontal = document.createElement("div");
        borderHorizontal.className = "borderHorizontal";

        var item = document.createElement("div");
        item.className = "item";

        scoreArea.appendChild(score);
        scoreArea.appendChild(product);
        infoArea.appendChild(infoAreaPadding);

        padding.appendChild(scoreArea);
        padding.appendChild(infoArea);
        padding.appendChild(clear);

        itemContent.appendChild(padding);

        item.appendChild(borderHorizontal);
        item.appendChild(itemContent);

        $('div#hidden_playground').append(item);

        if (isFinal)
        {
            // Destroy playground
            $('div#hidden_playground').remove();

            var elapsed = benchmark.elapsedTime();
            var finalScore = counter / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: counter, ops: finalScore});
        }
    }
};