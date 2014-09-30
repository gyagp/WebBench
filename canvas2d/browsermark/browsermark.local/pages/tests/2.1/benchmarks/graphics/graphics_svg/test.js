/**
 * HTML5 SVG
 *
 * HTML 5 SVG graphics test measure browser capability of rendering, scaling, pan and scroll of SVG. Also browser
 * capability for boundary box measurements are included. In this test script will use embedded SVG which contains
 * three different papers. At each phase script will zoom on one of these papers (in order 1-2-3-1-2...) and starts
 * to scroll down. When doing scroll, script will measure each group element boundary box position and based on these
 * measurements script will increase counter when measured group is displayed completely on current zoom. Counter is
 * also increased when ever script does operation (zoom, scroll or pan).
 *
 * To determine internal score, script will use operations/second (ops): counter / elapsed time in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).

 * @version 2.1
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2013 Rightware
 **/
// Default guide for benchmark.js
var guide =
{
    isDoable : false,
    operations : 0,
    time : 0,
    internalCounter : true,
    testName : 'Graphics SVG',
    testVersion : '2.1',
    compareScore : 15.1,
    isConformity : 0 // Not false but zero because this value is sent
    // through POST which stringify values
};

var debugData = [];
var svgMatrix = null;
var currentMatrix = [1.5, 0, 0, 1.5, -917, 0];
var internalResult = 0;
var test =
{
    init : function()
    {
        // Save test but not asynchronous, before continue test must
        // be saved to prevent mismatch error
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
        // Ensure browser supports SVG
        if (Modernizr.svg)
        {
            // Browser supports SVG, continue
            guide.isDoable = true;
            guide.operations = 11;
            // Get matrix to a global variable
            var svgContent = document.getElementById('svg-content').getSVGDocument();
            // Firefox have bug which cause getSVGDocument malfunction if document.domain is set. If this bug occurs,
            // Test will return zero points
            if (svgContent == null)
            {
                guide.isDoable = false;
                guide.operations = 0;
            }
            else
            {
                svgMatrix = $(svgContent).find('g#svg-matrix');
                // Set SVG to display second paper top
                test.updateMatrix(false, false, 0, 0);
            }
        }
        // Before returning guide you can do other initializations,
        // like test if browser is capable of doing this test
        return guide;
    },
    run : function(isFinal, loopCount)
    {
        if (isFinal)
        {
            // Last animation without changes
            test.updateMatrix(true, false, 0, 0);
        }
        else
        {
            // Calculate page number based on loopCount
            var pageNumber = (loopCount == 0) ? 1 : (loopCount % 3) + 1;
            // View page
            test.viewPage(pageNumber, loopCount);
        }
    },
    updateMatrix: function(isFinal, measureGroups, pageNumber, loopCount)
    {
        var svgGroups = svgMatrix.find('svg > g > g');
        var stepCounter = 0
        svgMatrix.animate(
        {
            svgTransform: 'matrix(' + currentMatrix.join(' ') + ' )'
        },{
            speed: 12,
            easing: 'linear',
            step: function()
            {
                // Increase operations count
                internalResult++;
                // If measureGroups is true
                if (measureGroups && stepCounter % 11 == 0)
                {
                    var stepMatrix = svgMatrix.attr('transform').replace('matrix(', '').replace(')', '').split(',');
                    // Get this step position scaled on base zoom
                    var stepLeft = parseFloat(stepMatrix[4]) * 0.5;
                    var stepTop = parseFloat(stepMatrix[5]) * 0.5;
                    svgGroups.each(function(i)
                    {
                        // Measure if group element fits in current screen
                        var bBox = this.getBBox();
                        if (bBox.height > 0 && bBox.width > 0 && bBox.y > 0 && bBox.x > 0)
                        {
                            var x = (stepLeft + bBox.x > 0 && stepLeft + bBox.x < 999);
                            var y = (stepTop + bBox.y > 0 && stepTop + bBox.y < 600);
                            var right = (stepLeft + bBox.x + bBox.width < 999);
                            var bottom = (stepTop + bBox.y + bBox.height < 600);
                            if (x & y & right & bottom)
                            {
                                internalResult++;
                                // Debug data
                                var key = "loop " + loopCount + ", page " + pageNumber;
                                debugData.push({
                                    LoopInfo: key,
                                    GroupInfo: 'Group #' + i + ' [' + bBox.x + ',' + bBox.y + ',' + bBox.width + ',' + bBox.height + '] inside viewport'
                                });
                            }
                        }
                    })
                }
                stepCounter++;
            },
            complete: function()
            {
                // Increase time
                benchmark.increaseElapsedTime(12);
                if (isFinal)
                {
                    var elapsed = benchmark.elapsedTime();
                    finalScore = internalResult / elapsed * 1000;
                    // Set overall score debug data
                    debugData.push({elapsedTime: elapsed});
                    debugData.push({operations: internalResult});
                    debugData.push({ops: finalScore});
                    benchmark.submitResult(finalScore, guide, debugData);
                }
            }
        });
    },
    viewPage: function(pageNumber, loopCount)
    {
        // First: zoom out
        test.zoomOut();
        // Second: zoom in
        test.zoomIn(pageNumber);
        // Third: scroll
        test.scroll(pageNumber, loopCount);
    },
    zoomOut: function()
    {
        // Set matrix zoom to 0.5 and top to 0
        currentMatrix[0] = 0.5;
        currentMatrix[3] = 0.5;
        currentMatrix[4] = 26;
        currentMatrix[5] = 0;
        test.updateMatrix(false, false, 0, 0);
    },
    zoomIn: function(pageNumber)
    {
        // Set matrix zoom to 1.5
        currentMatrix[0] = 1.5;
        currentMatrix[3] = 1.5;
        currentMatrix[4] = 0 - (947 * (pageNumber-1)) + 26;
        currentMatrix[5] = 0;
        test.updateMatrix(false, false, 0, 0);
    },
    scroll: function(pageNumber, loopCount)
    {
        currentMatrix[5] = -704;
        test.updateMatrix(false, true, pageNumber, loopCount);
    }
}