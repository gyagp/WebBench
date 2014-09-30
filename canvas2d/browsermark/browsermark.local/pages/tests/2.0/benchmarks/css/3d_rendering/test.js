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
 * @version 2.0
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
    testVersion : '2.0',
    compareScore : 10.1,
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
var debugData = {};

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
        // Delete current transform effect
        delete $.fx.step.transform;

        /*
         * transform: A jQuery cssHooks adding 2D/3D transform capabilities to $.fn.css() and $.fn.animate()
         *
         * Requirements:
         * - jQuery 1.5.1+
         * - jquery.transition.js for animations
         * - browser implementing W3C's CSS 2DTransforms for 2D tranform
         * - browser implementing W3C's CSS 3DTransforms for 3D tranform
         *
         * latest version and complete README available on Github:
         * https://github.com/louisremi/jquery.transform.js
         *
         * Copyright 2011 @louis_remi
         * Licensed under the MIT license.
         *
         * This saved you an hour of work?
         * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
         *
         */
        (function(d,k,m){var a=m.createElement("div"),b=a.style,e=["O","ms","Webkit","Moz"],h,f=e.length,l=["transform","transformOrigin","transformStyle","perspective","perspectiveOrigin","backfaceVisibility"],n,c=e.length;while(f--){if(e[f]+g(l[0]) in b){h=e[f];continue}}if(!h){return}while(c--){n=h+g(l[c]);if(n in b){d.cssNumber[l[c]]=true;d.cssProps[l[c]]=n;n==="MozTransform"&&(d.cssHooks[l[c]]={get:function(j,i){return(i?d.css(j,n).split("px").join(""):j.style[n])},set:function(i,j){/matrix\([^)p]*\)/.test(j)&&(j=j.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/,"matrix$1$2px,$3px"));i.style[n]=j}})}}function g(i){return i.slice(0,1).toUpperCase()+i.slice(1)}})(jQuery,window,document);

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
            // 450 operations should run approximately 15 seconds
            guide.operations = 450;
            // Test have no time limit since test is doing asynchronous operations
            guide.time = null;
            // Counting is done internally (in this test)
            guide.internalCounter = true;
            // Browser supports 3D transform, give permission to run this test
            guide.isDoable = true;
            if (test.isFlat())
            {
                debugData['warning'] = 'Cube is flat, final score is divided by 5';
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

            $(this).animate({transform: newMatrix}, 1, function()
            {
                $(this).css('z-index', zOrders[i][loopCount]);
                if (test.offsetChanged($(this).children('figure'), i))
                {
                    test.setOffset($(this).children('figure'), i);
                    benchmark.increaseCounter();
                }
                else
                {
                    debugData['round_' + (loopCount + 1)] = {
                        error: 'Counter not increased since old top-left (' + oldOffset[i].top + ', ' + oldOffset[i].left + ') is same as new top-left (' + $(this).offset().top + ', ' + $(this).offset().left + ')',
                        from: 'transform: ' + oldMatrix,
                        to: 'transform: ' + newMatrix
                    };
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

                    debugData.elapsedTime = elapsed;
                    debugData.operations = counter;
                    debugData.ops = finalScore;

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
                zOrders[i].push('100');
            }
            else
            {
                zOrders[i].push('10');
            }

            var rotationXMatrix, rotationYMatrix, rotationZMatrix, s, scaleMatrix, transformationMatrix, translationMatrix;
            rotationXMatrix = $M([[1, 0, 0, 0], [0, Math.cos(rotateX[i] * deg2rad), Math.sin(-rotateX[i] * deg2rad), 0], [0, Math.sin(rotateX[i] * deg2rad), Math.cos(rotateX[i] * deg2rad), 0], [0, 0, 0, 1]]);
            rotationYMatrix = $M([[Math.cos(rotateY[i] * deg2rad), 0, Math.sin(rotateY[i] * deg2rad), 0], [0, 1, 0, 0], [Math.sin(-rotateY[i] * deg2rad), 0, Math.cos(rotateY[i] * deg2rad), 0], [0, 0, 0, 1]]);
            rotationZMatrix = $M([[Math.cos(rotateZ[i] * deg2rad), Math.sin(-rotateZ[i] * deg2rad), 0, 0], [Math.sin(rotateZ[i] * deg2rad), Math.cos(rotateZ[i] * deg2rad), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
            s = scale;
            scaleMatrix = $M([[s, 0, 0, 0], [0, s, 0, 0], [0, 0, s, 0], [0, 0, 0, 1]]);
            translationMatrix = $M([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [Math.sin(rotateX[i] * deg2rad) * 250 + 250, Math.sin(rotateY[i] * deg2rad) * 150 + 150, 0, 1]]);
            transformationMatrix = rotationXMatrix.x(rotationYMatrix).x(rotationZMatrix).x(scaleMatrix).x(translationMatrix);
            s = "matrix3d(";
            s += transformationMatrix.e(1, 1).toFixed(10) + "," + transformationMatrix.e(1, 2).toFixed(10) + "," + transformationMatrix.e(1, 3) + "," + transformationMatrix.e(1, 4).toFixed(10) + ",";
            s += transformationMatrix.e(2, 1).toFixed(10) + "," + transformationMatrix.e(2, 2).toFixed(10) + "," + transformationMatrix.e(2, 3) + "," + transformationMatrix.e(2, 4).toFixed(10) + ",";
            s += transformationMatrix.e(3, 1).toFixed(10) + "," + transformationMatrix.e(3, 2).toFixed(10) + "," + transformationMatrix.e(3, 3) + "," + transformationMatrix.e(3, 4).toFixed(10) + ",";
            s += transformationMatrix.e(4, 1).toFixed(10) + "," + transformationMatrix.e(4, 2).toFixed(10) + "," + transformationMatrix.e(4, 3) + "," + transformationMatrix.e(4, 4).toFixed(10);
            s += ")";

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

            return s;
    }
};