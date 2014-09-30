/**
 * Network Page Load
 *
 * Page Load test will call PHP script and pass timestamp for it. PHP will calculate it own load time and return it and
 * own timestamp for this script. From these values this script will calculate time needed for a page load.
 *
 * To ensure page load happened correctly, PHP need to be decached and CSS file created by PHP need to be decached.
 * PHP page will contain also some "cache traps" like parametrized images and js scripts which should be cached.
 *
 * After each run script will save page load time in milliseconds and finally select median value from those.
 *
 * To determine internal score, script will use operations/second (ops): 1 / page loads median in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).
 *
 * @version 2.1
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : false, // Doable only if iframe access is possible with browser
    operations : 0,
    time : null,
    internalCounter : true,
    testName : 'Conformity Page Load',
    testVersion : '2.1',
    compareScore : 1, // Compare score
    isConformity : 1 // Not false but zero because this value is sent through POST which stringify values
};

var debugData = [];

var ms = 0;
var pageLoads = [];
var responsiveness = [];
// Operations are counted internally too
var internalOperations = 0;

var diffPing = 0;
var downloadKBs = 0;

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

        // CORS
        document.domain = domainHost;

        // Because of IE <= 9 lack of Access-Control-Allow-Origin we need to test IE9 and below against browsermark own
        // server
        if ($.support.cors == false)
        {
            if (continentServer != window.location.protocol + '//' + window.location.hostname)
            {
                continentServer = window.location.protocol + '//' + window.location.hostname;
                forceContinent = 1; // North America forced
            }
        }

        debugData.push({server: continentServer});

        var iframe = $('#content').append('<iframe name="testframe" width="1" height="1" frameborder="0"></iframe>');

        // Get start milliseconds
        var d = new Date();
        ms = d.getTime();

        // Update iframe src
        $('iframe')[0].origin = domainHost;
        $('iframe')[0].src = continentServer + '/page_load/?rand=' + ms + '&ver=' + version;

        // Try reading iframe content
        $($('iframe')[0].document).ready(function()
        {
            // Destroy iframe
            $('iframe').remove();
            guide.isDoable = true;
        });

        return guide;
    },
    run : function(isFinal, loopCount)
    {

       // Measure download speed
        d = new Date();
        startDownload = d.getTime();
        $.ajax(
            {
                url: continentServer + '/network_speed/download.php',
                async: false,
                cache: false
            }).done(function(data)
            {
                d = new Date();
                endDownload = d.getTime();
                diffDownload = endDownload - startDownload;
                downloadBytes = data.length;
                downloadKBs = (downloadBytes / 1024) / (diffDownload / 1000);
            });


        // Create 1x1 iframe
        var iframe = $('#content').append('<iframe name="testframe" width="1" height="1" frameborder="0"></iframe>');

        // Get start milliseconds
        var d = new Date();
        ms = d.getTime();

        // Update iframe src
        $('iframe')[0].origin = domainHost;
        $('iframe')[0].src = continentServer + '/page_load/?rand=' + ms + '&ver=' + version;

        test.iframeLoaded(ms);

    },

    iframeLoaded : function(ms)
    {
        $('iframe').load(function()
        {
            if ($('iframe').contents().find('span#page_load'))
            {
                var pageLoadValue = parseFloat($('iframe').contents().find('span#page_load').html());
                var responsivenessValue = parseFloat($('iframe').contents().find('span#responsiveness').html());

                // Check that CSS and JS affects correct elements
                var count = 0;
                $('iframe').contents().find('h3.dostuff-' + ms).each(function()
                {
                    // Increase count
                    count++;

                    // Get color
                    var clr = $(this).css('color');
                    // Get background
                    var bg = $(this).css('background-color');

                    // Allowed values for color
                    var allowedClr = ['white', '#FFF', '#fff', '#FFFFFF', '#ffffff', 'rgb(255, 255, 255)', 'rgb(255,255,255)'];
                    // Allowed values for background
                    var allowedBg = ['black', '#000', '#000000', 'rgb(0, 0, 0)', 'rgb(0,0,0)'];

                    // Test CSS
                    if ($.inArray(clr, allowedClr))
                    {
                        // Do nothing
                    }
                    else
                    {
                        // Set debug notification
                        debugData.push({
                            round: internalOperations,
                            cssError: 'CSS load failed: ' + clr + ' was h3.dostuff-' + ms + ' color value when it should be white. 1000 milliseconds added to page load and 100 milliseconds added to responsiveness'
                        });
                        pageLoadValue += 1000;
                        responsivenessValue += 100;
                    }

                    // Test JS
                    if ($.inArray(bg, allowedBg))
                    {
                        // Do nothing
                    }
                    else
                    {
                        // Set debug notification
                        debugDatapush({
                            round: internalOperations,
                            jsError: 'JS load failed: ' + bg + ' was h3.dostuff-' + ms + ' background-color value when it should be black. 1000 milliseconds added to page load and 100 milliseconds added to responsiveness'
                        });
                        pageLoadValue += 1000;
                        responsivenessValue += 100;
                    }
                });

                // Ensure there were two h3's
                if (count != 2)
                {
                    debugDatapush({
                        round: internalOperations,
                        countError: 'Wrong count: there should be two h3s but ' + (count / 3) + ' h3s was found. 1000 milliseconds added to page load and 100 milliseconds added to responsiveness'
                    });
                    pageLoadValue += 1000;
                    responsivenessValue += 100;
                }

                // To calculate page load and responsiveness with way where connection speed is excluded, we need all the following

                // Overall time what page load and responsiveness used
                var overallTime = pageLoadValue + responsivenessValue;

                // Relative percentages to determine how large part is responsiveness and how large part is page load
                var pageLoadP = 100 * pageLoadValue / overallTime;
                var responsivenessP = 100 - pageLoadP;

                // Optimal speed for complete process (content length when cache is done correctly is 106.25 kilobytes)
                var optimalSpeed = (106.25 / downloadKBs * 1000) + responsivenessValue; // + diffPing;

                // Difference in milliseconds compared between optimalSpeed and actual time where ping is negated
                var msDiff = (optimalSpeed - overallTime) * pageLoadP / 100;

                // Diff bonus / sanction percentage
                var diffP = 100 * msDiff / optimalSpeed;

                // diffP needs to be between -35 and 35, otherwise connection between measure and test has changed too much and result is not valid
                if (diffP > -35 && diffP < 35)
                {
                    // Hide network error
                    $('#network-error').hide()

                    // Next we can calculate fixed values: 100 * (1 + (diffP * relativePercentage / 100 / 100))
                    var pageLoadFixed = 100 - (diffP * pageLoadP / 100);
                    var responsivenessFixed = 100 - (diffP * responsivenessP / 100);

                    debugData.push([
                        {downloadKBs: downloadKBs},
                        {pageLoadValue: pageLoadValue},
                        {responsivenessValue: responsivenessValue},
                        {overallTime: overallTime},
                        {pageLoadP: pageLoadP},
                        {responsivenessP: responsivenessP},
                        {optimalSpeed: optimalSpeed},
                        {msDiff: msDiff},
                        {diffP: diffP},
                        {pageLoadFixed: pageLoadFixed},
                        {responsivenessFixed: responsivenessFixed}
                    ]);

                    pageLoads.push(pageLoadFixed);
                    responsiveness.push(responsivenessFixed);
                }
                else
                {
                    // Show network error
                    $('#network-error').hide().show();
                }
                // Destroy iframe
                $('iframe').remove();

                if (internalOperations == 42)
                {
                    // Pass responsiveness via ajax for a next test (not asynchronous, data must pass before continuing)
                    $.ajax(
                    {
                        url: '/ajax/responsiveness',
                        async: false,
                        type: 'POST',
                        data:
                        {
                            values:    responsiveness
                        }
                    });

                    // Calculate page load median
                    var pageLoadsMedian = mathExtended.median(pageLoads);

                    debugData.push({loadTimes: pageLoads});
                    debugData.push({loadMedian: pageLoadsMedian});

                    var elapsed = pageLoadsMedian;
                    var cnt = pageLoads.length;
                    // compare score / fixed elapsed * 100 - (total loops - succesfull loops) = percentage
                    var finalScore = 80.8 / elapsed * 100 - (43 - cnt);

                    debugData.push({elapsedTime: elapsed});
                    debugData.push({operations: cnt});
                    //debugData.push({ops: finalScore});

                    // Submit result
                    benchmark.submitResult(finalScore, guide, debugData);
                }
                else
                {
                    // Increase internal operations counter
                    internalOperations++;

                    // Start test from beginning
                    test.run(true, 0);
                }
            }
            else
            {
                // Wait 100 milliseconds more, it won't affect page load nor responsiveness
                // since it is not measured anymore
                setTimeout(test.iframeLoaded(ms), 100);
            }
        });
    }
};