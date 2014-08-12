/**
 * CSS 2D Transform
 *
 * Test browser capability of rendering object in 2D. Script will create matrixes like (0, 0, 0, 0, 0, 0) which will be used to
 * transform image in 2D. After each step script will look image top left corner, and if it position has changed more than
 * one pixel, counter is increased.
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
    isDoable : false,
    operations : 0,
    time : 0,
    internalCounter : false,
    testName : 'CSS 2D Transform',
    testVersion : '2.1',
    compareScore : 88.2,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

// Position measurement object to ensure that position has changed before increasing counter
var oldPosition = {};

// Debug data storage for debugging situations
var debugData = [];

// Debug data variables
oldCount = 0;
oldElapsed = 0;
oldMatrix = 'none';
lowestScore = 0;
highestScore = 0;

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

        // Set up go permission if browser support CSS 2D Transform
        if (Modernizr.csstransforms)
        {
            // Delegate .transition() calls to .animate()
            // if the browser can't do CSS transitions.
            if (!$.support.transition)
                $.fn.transition = $.fn.animate;

            // 47 operations should run approximately 15 seconds
            guide.operations = 47;
            // Test have no time limit since test is doing asynchronous operations
            guide.time = null;
            // Counting is done internally (in this test)
            guide.internalCounter = true;
            // Browser supports transform, give permission to run this test
            guide.isDoable = true;
        }
        return guide;
    },
    run : function(isFinal, loopCount)
    {
        // Create matrix of six values
        var matrix = [];
        for (i=0;i<6;i++)
        {
            randFloat = mathExtended.randFloat();
            if (Math.abs(randFloat) == randFloat)
            {
                randFloat = randFloat - Math.floor(randFloat);
            }
            else
            {
                randFloat = randFloat - Math.floor(randFloat) - 1;
            }
            randFloat = mathExtended.roundFloat(randFloat, 3);
            matrix.push(randFloat);
        }

        // Create transformation
        var deg2rad = Math.PI / 180;
        var transformationObject = {
            scale: matrix[0] + "," + matrix[3],
            skewX: (Math.sin(matrix[1] * deg2rad) * 250 + 250) + 'deg',
            skewY: Math.sin(matrix[2] * deg2rad) * 150 + 150 + 'deg',
            rotateX: matrix[4] + 'deg',
            rotateY: matrix[5] + 'deg'
        };

        // Set up internal clock to measure speed
        var d = new Date();
        internalStart = d.getTime();

        if (isFinal)
        {
            transformationObject = {
                scale: 1,
                skewX: 0,
                skewY: 0,
                x: 0,
                y: 0
            };
        }

        //Set old position before transform
        oldPosition = $('img#transform_this').offset();

        // Start animation
        $('img#transform_this').transition(transformationObject, 300, function ()
            {
                // Increase counter based on corner change values
                if (Math.round(oldPosition.top) != Math.round($(this).position().top) || Math.round(oldPosition.left) != Math.round($(this).position().left))
                {
                    counter += Math.round(Math.abs(Math.round(oldPosition.top) - Math.round($(this).position().top)) / 2);
                    counter += Math.round(Math.abs(Math.round(oldPosition.left) - Math.round($(this).position().left)) / 2);
                    oldPosition = $(this).position();
                }

                // Every time animation is completed, measure internal time for debugging purposes
                var internalElapsed = d.getTime() - internalStart;
                benchmark.increaseElapsedTime(internalElapsed);
                var elapsed = benchmark.elapsedTime();

                // When run is final run and animation is completed, we need to send results via ajax for resultsHandler and set up debug data (if necessary)
                if (isFinal)
                {

                    // Final score is 0 by default
                    var finalScore = 0;

                    // Ensure that counter is not zero to avoid division by zero -error
                    if (counter != 0)
                    {
                        // Update final score
                        finalScore = counter / elapsed * 1000;

                        // Set final round debug data
                        debugData.push({
                            Round: loopCount + 1,
                            From: oldMatrix,
                            To: matrix.join(','),
                            Elapsed: (elapsed - oldElapsed) + ' microseconds',
                            Operations: (counter - oldCount) + ' pcs',
                            ops: ((counter - oldCount) / (elapsed - oldElapsed) * 1000)
                        });

                        // Set overall score debug data
                        debugData.push({elapsedTime: elapsed});
                        debugData.push({operations: counter});
                        debugData.push({ops: finalScore});
                    }
                    // counter == 0
                    else
                    {
                        // Set final round debug data
                        debugData.push({
                            Round: loopCount + 1,
                            From: oldMatrix,
                            To: matrix.join(','),
                            Elapsed: (elapsed - oldElapsed) + ' microseconds',
                            Operations: '0 pcs',
                            ops: 0
                        });

                        // Set overall score debug data
                        debugData.push({elapsedTime: elapsed});
                        debugData.push({operations: 0});
                        debugData.push({ops: 0});
                    }

                    // Send score via benchmark.submitResult
                    benchmark.submitResult(finalScore, guide, debugData);

                    // If debugging, send data to benchmark.logger which will handle data output
                    if (debug == true)
                    {
                        benchmark.logger(debugData);
                    }
                }
                // Not a final round, add some debug data
                else
                {
                    // Ensure that counter is not zero to avoid division by zero -error
                    if (counter != 0)
                    {
                        // Set current round debug data
                        score = ((counter - oldCount) / (elapsed - oldElapsed) * 1000);
                        debugData.push({
                            Round: loopCount + 1,
                            From: oldMatrix,
                            To: matrix.join(','),
                            Elapsed: (elapsed - oldElapsed) + ' microseconds',
                            Operations: (counter - oldCount) + ' pcs',
                            ops: score
                        });

                        // Update old values to new ones
                        oldCount = counter;
                        oldElapsed = elapsed;
                        oldMatrix = matrix.join(',');

                        // If we had new lowest score, update it
                        if (lowestScore == 0 || lowestScore > score)
                        {
                            lowestScore = score;
                        }

                        // If we had new highest score, update it
                        if (highestScore == 0 || highestScore < score)
                        {
                            highestScore = score;
                        }
                    }
                    // counter == 0
                    else
                    {
                        // current round debug data: 0 points
                        debugData.push({
                            Round: loopCount + 1,
                            From: oldMatrix,
                            To: matrix.join(','),
                            Elapsed: (elapsed - oldElapsed) + ' microseconds',
                            Operations: '0 pcs',
                            ops: 0
                        });
                    }
                }
            });
    }
};