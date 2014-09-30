/**
 * CSS 3D Transform
 *
 * Test browser capability of rendering object in 3D. Script will create matrixes just like 2D test but in 3D
 * (like matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)) which will be used to transform 3D cubes. Cubes also
 * use scaling and z-index to create more realistic 3D experience.
 *
 * After each transform script will measure each cube side top left position. If at least one side top left position is
 * changed more than one pixel, counter is increased. However if all sides top left corner is same (ie cube is flat),
 * final score is divided by 5.
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
    isConformity : false,
    operations : 0,
    time : 0,
    internalCounter : false,
    testName : 'CSS 3D Transform',
    testVersion : '2.1',
    compareScore : 15.7,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

// Position measurement object to ensure that position has changed before increasing counter
var oldOffset = [
    [
        {}, {}, {}, {}, {}, {}
    ],
    [
        {}, {}, {}, {}, {}, {}
    ]
];
// Old matrix details
var oldMatrix = 'none';

// Debug data storage for debugging situations
var debugData = [];

// getMatrix needs these three variables
var rotateX = [0,0];
var rotateY = [0,0];
var rotateZ = [0,0];

var pulse = [-0.25, 0.25];
var pulseReverse = [false, true];
var zOrders = [
    [],
    []
];

var divider = 1;

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

        // Ensure that 3D transform is supported
        if (Modernizr.csstransforms3d)
        {
            // Delegate .transition() calls to .animate()
            // if the browser can't do CSS transitions.
            if (!$.support.transition)
                $.fn.transition = $.fn.animate;

            // 675 operations should run approximately 15 seconds
            guide.operations = 675;
            // Test have no time limit since test is doing asynchronous operations
            guide.time = null;
            // Counting is done internally (in this test)
            guide.internalCounter = true;
            // Browser supports 3D transform, give permission to run this test
            guide.isDoable = true;
            if (test.isFlat())
            {
                debugData.push({warning: 'Cube is flat, final score is divided by 5'});
                divider = 5;
            }
        }
        return guide;
    },
    run : function(isFinal, loopCount)
    {
        $('.cube').each(function(i)
        {
            _this = this;
            var d = new Date();
            internalStart = d.getTime();
            var newMatrix = test.getMatrix(i);

            //Set old position before transform
            if (typeof(oldOffset[i][0].top) == 'undefined') {
                test.setOffset($(this).children('figure'), i);
            }

            $(this).transition(newMatrix, 20, function()
            {
                $(this).css('z-index', zOrders[i][loopCount]);
                if (test.offsetChanged($(this).children('figure'), i))
                {
                    test.setOffset($(this).children('figure'), i);
                    benchmark.increaseCounter();
                }
                else
                {
                    debugData.push({
                        Round: loopCount + 1,
                        Error: 'Counter not increased since old top-left (' + oldOffset[i].top + ', ' + oldOffset[i].left + ') is same as new top-left (' + $(this).offset().top + ', ' + $(this).offset().left + ')',
                        From: 'transform: ' + oldMatrix,
                        To: 'transform: ' + newMatrix
                    });
                }

                oldMatrix = newMatrix;
                if (isFinal && i == 1)
                {
                    // Final score is 0 by default
                    var finalScore = 0;
                    var elapsed = benchmark.elapsedTime();

                    // Ensure that counter is not zero to avoid division by zero -error
                    if (counter != 0)
                    {
                        // Update final score
                        finalScore = counter / elapsed * 1000 / divider;
                    }

                    debugData.push({elapsedTime: elapsed});
                    debugData.push({operations: counter});
                    debugData.push({ops: finalScore});

                    // Send score via benchmark.submitResult
                    benchmark.submitResult(finalScore, guide, debugData);
                }
            });
        });
    },

    setOffset : function(newOffset, i)
    {
        // Loop through cube figures
        $(newOffset).children('figure').each(function(f)
        {
            oldOffset[i][f] = $(this).offset()
        });
    },
    offsetChanged : function(newOffset, i)
    {
        var ret = false;
        $(newOffset).each(function(f, elem)
        {
            if (ret == false && (Math.round(oldOffset[i][f].top) != Math.round($(elem).offset().top) || Math.round(oldOffset[i][f].left) != Math.round($(elem).offset().left)))
            {
                ret = true;
            }
        });
        return ret;
    },
    isFlat : function()
    {
        return $('div.cube').first().css('transform-style') != 'preserve-3d';
    },
    getMatrix : function(i)
    {
            var deg2rad = Math.PI / 180;

            var scale = 1 + pulse[i];
            if (pulseReverse[i] == false)
            {
                pulse[i]    += 0.008;
                if (pulse[i] >= 0.99)
                {
                    pulseReverse[i] = true;
                }
            }
            else
            {
                pulse[i] -= 0.008;
                if (pulse[i] <= -0.99)
                {
                    pulseReverse[i] = false;
                }
            }

            // Should we show this cube on front or on back?
            var other = Math.abs(i-1);
            if (pulse[i] > pulse[other])
            {
                zOrders[i].push('10');
            }
            else
            {
                zOrders[i].push('5');
            }

            var matrixObject = {
                scale: scale,
                rotate3d: rotateX[i] + ',' + rotateY[i] + ',' + rotateZ[i] + ',' + Math.sin(rotateX[i] * deg2rad) * 250 + 250 + 'deg',
                x: Math.sin(rotateX[i] * deg2rad) * 250 + 250,
                y: Math.sin(rotateY[i] * deg2rad) * 150 + 150
            };

            var rotateXValue = Math.abs(mathExtended.randFloat());
            rotateXValue = mathExtended.roundFloat((rotateXValue - Math.floor(rotateXValue)), 1);

            var rotateYValue = Math.abs(mathExtended.randFloat());
            rotateYValue = mathExtended.roundFloat((rotateYValue - Math.floor(rotateYValue)), 1);

            var rotateZValue = Math.abs(mathExtended.randFloat());
            rotateZValue = mathExtended.roundFloat((rotateZValue - Math.floor(rotateZValue)), 1);

            if (i == 0)
            {
                rotateX[i] -= (2 + rotateXValue);
                rotateY[i] -= (3 + rotateYValue);
                rotateZ[i] -= (2 + rotateZValue);
            } else {
                rotateX[i] += (1 + rotateXValue);
                rotateY[i] += (2 + rotateYValue);
                rotateZ[i] += (1 + rotateZValue);
            }

            return matrixObject;
    }
};