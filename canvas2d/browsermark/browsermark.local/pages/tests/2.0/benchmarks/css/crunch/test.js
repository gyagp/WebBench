/**
 * CSS Crunch
 *
 * Test browser speed when crunching multiple CSS operations at a time. Static content is simple HTML5 lorem ipsum but affected
 * by modern CSS3 selectors. Next script will start to highlight words. After highlight, script will look that highlighted word
 * have correct CSS styles. If true, counter is increased and highlighted word is removed.
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
    time : 0,
    internalCounter : true,
    testName : 'CSS Crunch',
    testVersion : '2.0',
    compareScore : 116.2,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

// Expand jQuery functionality with highligh function
jQuery.fn.highlight = function (str, className) {
    var regex = new RegExp(str, "gi");
    return this.each(function () {
        $(this).contents().filter(function() {
            return this.nodeType == 3 && regex.test(this.nodeValue);
        }).replaceWith(function() {
            return (this.nodeValue || "").replace(regex, function(match) {
                return "<span class=\"" + className + "\">" + match + "</span>";
            });
        });
    });
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
    testSpan : function(span, selectors)
    {
        // Get parent classes
        var parentClasses = $(span).parents();

        // Loop through selectors
        $.each(selectors, function(i)
        {
            if ($(parentClasses).hasClass('selector-' + i))
            {
                // If index 0 is an array
                if (typeof(selectors[i][0]) == 'object')
                {
                    // Loop through each value array value
                    $.each(selectors[i][0], function(s)
                    {
                        if (typeof($(span).css(selectors[i][0][s])) != 'undefined')
                        {
                            if ($(span).css(selectors[i][0][s]).match(selectors[i][1][s]))
                            {
                                benchmark.increaseCounter();
                            }
                        }
                    });
                }
                // Else if index 1 is an array
                else if (typeof(selectors[i][1]) == 'object' && typeof($(span).css(selectors[i][0])) != 'undefined')
                {
                    $.each(selectors[i][1], function(s)
                    {
                        if ($(span).css(selectors[i][0]).match(selectors[i][1][s]))
                        {
                            benchmark.increaseCounter();
                        }
                    });
                }
                // Otherwise plain == comparison
                else if (typeof($(span).css(selectors[i][0])) != 'undefined')
                {
                    if ($(span).css(selectors[i][0]).match(selectors[i][1]))
                    {
                        benchmark.increaseCounter();
                    }
                }
            }
        });
    },
    run : function(isFinal, loopCount)
    {
        // Create array for selectors specialties
        // Possible combinations:
        // 1. key and value are strings: compare key against value
        // 2. key is string and value is array: compare key against all values in array (multiple choices)
        // 3. key and value is array: each value in key array is compared to corresponding value in value array
        var selectors = [
            ['text-shadow', '2px 2px 2px #666'],
            ['font-weight', ['bold', '700', '900']],
            ['border', ['1px solid #fff', '1px solid white']],
            [['height', 'margin', 'vertical-align'], ['20px', '5px', 'middle']],
            ['padding', '10px'],
            ['padding', '20px'],
            ['padding', '15px'],
            ['background-color', ['rgba\\(88, 88, 88, 0\\.', 'rgba\\(88,88,88,0\\.']],
            ['background-color', ['rgba\\(99, 99, 99, 0\\.', 'rgba\\(99,99,99,0\\.']],
            ['background-color', ['rgba\\(110, 110, 110,', 'rgba\\(110,110,110,']],
            ['background-color', ['rgba\\(121, 121, 121, 0\\.', 'rgba\\(121,121,121,0\\.']],
            ['background-color', ['rgba\\(132, 132, 132, 0\\.', 'rgba\\(132,132,132,0\\.']],
            ['background-color', ['rgba\\(143, 143, 143, 0\\.', 'rgba\\(143,143,143,0\\.']],
            ['font-style', 'italic'],
            ['display', 'none'],
            ['background-color', ['rgba\\(255, 255, 255, 0\\.', 'rgba\\(255,255,255,0\\.']],
            ['outline', '#fff dotted thin'],
            ['opacity', '0\.5'],
            ['outline', '#fff dotted thin'],
            ['text-decoration', 'underline']
        ];

        // Loop through each #content element
        $('#test_area section article *, #test_area aside article *').each(function()
        {
            var _this = this;
            var wholeText = $(this).text().replace(/\s/g, ' ');

            // Loop through each word of element textnode
            var wordsArray = wholeText.split(' ');
            $.each(wordsArray, function(i)
            {
                if (wordsArray[i].trim() != '')
                {
                    $(_this).highlight(wordsArray[i], 'highlight');
                    // Read recently created span properties and test it
                    var span = $(_this).children('span.highlight').first();
                    test.testSpan(span, selectors);
                    // Remove span
                    span.remove();
                }
            });
        });

        // If round is final round, remove #content child elements
        if (isFinal)
        {
            $('#content > :not(div)').remove();

            // Submit result
            var elapsed = benchmark.elapsedTime();
            var finalScore = counter / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: counter, ops: finalScore});
        }
    }
};