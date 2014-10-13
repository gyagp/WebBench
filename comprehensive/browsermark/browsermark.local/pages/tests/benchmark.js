var startTime = 0;
var counter = 0;
var operationsCount = 0;
var animateReverse = false;
var preloadDone = false;
var benchmark = {
    startTimer: function() {
        var d = new Date();
        startTime = d.getTime();
    },
    elapsedTime: function() {
        var d = new Date();
        var endTime = d.getTime();
        return endTime - startTime;
    },
    increaseCounter: function()
    {
        counter++;
    },
    increaseElapsedTime: function(milliseconds)
    {
        // To increase elapsed time we actually modify start time
        startTime = startTime - milliseconds;
    },
    submitResult: function(rawScore, guideInformation, metaInformation)
    {
        var resultData = {
            test_name: guideInformation.testName,
            test_version: guideInformation.testVersion,
            raw_score: rawScore,
            compare_score: guideInformation.compareScore,
            is_conformity: guideInformation.isConformity,
            meta_information: metaInformation
        };

        $.ajax(
        {
            url: '/ajax/results_handler',
            type: 'POST',
            data: resultData,
            dataType: 'json'
        }).done(function(returnObject)
        {
            if (debug)
            {
                benchmark.logger(resultData);

                // Clear content
                //$('#content > *:not(#group_info)').remove();

                // Show details also in page
                $('#content').append('<div id="details"></div>');
                $('#details').append('<p><b style="display: inline-block; width: 100px">Test name:</b> ' + guideInformation.testName + '</p>');
                $('#details').append('<p><b style="display: inline-block; width: 100px">Test version:</b> ' + guideInformation.testVersion + '</p>');
                $('#details').append('<p><b style="display: inline-block; width: 100px">Final score:</b> ' + returnObject.finalScore + '</p>');
                $('#details').append('<p><b style="display: inline-block; width: 100px">Formula:</b> ' + returnObject.formula + '</p>');
                $('#details').append('<p id="continue">Next test</div>');
                if (nextTest.indexOf('result') != -1)
                {
                    $('#details').append('<p id="console_notice">Last change to see console log messages!</p>');
                }
                $('#details').show();

                // Bring on button that allows move to a next test
                $('#continue').show();
                $('#continue').click(function()
                {
                    // If next test is results page, redirect instead of dynamic update
                    if (nextTest.indexOf('result') != -1)
                    {
                        if(typeof(sessionStorage) != 'undefined')
                        {
                            sessionStorage.span = 999;
                        }

                        window.location.href = nextTest;
                    }
                    else
                    {
                        // Update #content
                        $.ajax(nextTest,
                        {
                            async: false,
                            type: 'POST',
                            data: {content_only: '1'}
                        }).done(function(data)
                        {
                            $('#content').html(data);

                            var dataNext = $(data).filter('#next_test').attr('data-next');

                            // Reset counter etc.
                            startTime = 0;
                            counter = 0;
                            operationsCount = 0;
                            animateReverse = false;

                            // Get test.js
                            $.getScript(nextTest + '/test.js', function()
                            {
                                 // Update next test
                                nextTest = dataNext;
                                // Initialize benchmark
                                benchmark.init();
                            });
                        });
                    }
                });
            }
            else
            {
                // If next test is results page, redirect instead of dynamic update
                if (nextTest.indexOf('result') != -1)
                {
                    if(typeof(sessionStorage) != 'undefined')
                    {
                        sessionStorage.span = 999;
                    }

                    window.location.href = nextTest;
                }
                else
                {
                    // Update #content
                    $.ajax(nextTest,
                    {
                        async: false,
                        type: 'POST',
                        data: {content_only: '1'}
                    }).done(function(data)
                    {
                        $('#content').html(data);

                        var dataNext = $(data).filter('#next_test').attr('data-next');

                        // Reset counter etc.
                        startTime = 0;
                        counter = 0;
                        operationsCount = 0;
                        animateReverse = false;

                        // Get test.js
                        $.getScript(nextTest + '/test.js', function()
                        {
                            // Update next test
                            nextTest = dataNext;
                            // Initialize benchmark
                            benchmark.init();
                        });
                    });
                }
            }
        });
    },
    logger: function(logData)
    {
        if (typeof(console) != "undefined")
        {
            // Loop through logData
            try
            {
                for (prop in logData)
                {
                  if (logData.hasOwnProperty(prop))
                  {
                      if (typeof(logData[prop]) == 'object')
                      {
                          // re-iterate
                          console.log(prop + ':');
                          benchmark.logger(logData[prop]);
                      }
                      else
                      {
                        console.log(prop + ': ' + logData[prop]);
                    }
                  }
                }
            } catch(e) { console.log(e); console.log(logData); }
        }
    },
    init: function()
    {
        // Dummy wait
        setTimeout(benchmark.run, 300);
    },
    run: function()
    {
        // Initialize test to receive guidance for test
        guide = test.init();

        // In case of redirect
        if (typeof guide == 'undefined')
        {
            // Do nothing
        }

        // Ensure browser can run this test
        else if (guide.isDoable == true)
        {
            // Update title
            $('#content').prepend('<h1>' + guide.testName + '</h1>');

            // Conformity tests are ran only once
            if (guide.isConformity == true)
            {
                // Show content two seconds before execute
                test.run(true, 1);
            }
            // Other tests are ran multiple times
            else
            {
                // Start global timer
                benchmark.startTimer();

                // If test is time based, loop test.run inside while until elapsed time reach the top
                if (guide.time != null && guide.time != 0)
                {
                    while (benchmark.elapsedTime() < guide.time)
                    {
                        // run test isFinal = false
                        test.run(false, operationsCount);

                        // If test do not have any internal counter method, handle counting on main loop
                        if (guide.internalCounter == false)
                        {
                            benchmark.increaseCounter();
                        }
                        operationsCount++;
                    }
                }

                // Otherwise if test is operations based, loop test.run inside for until enough operations is done
                else
                {
                    for (operationsCount = 0; operationsCount < guide.operations; operationsCount++)
                    {
                        // run test isFinal = false
                        test.run(false, operationsCount);

                        // If test do not have any internal counter method, handle counting on main loop
                        if (guide.internalCounter == false)
                        {
                            benchmark.increaseCounter();
                        }
                    }
                }

                // Run final test run
                test.run(true, operationsCount);
            }
        }
        // Test cannot be done with this browser, register zero result
        else
        {
            benchmark.submitResult(0, guide, {});
            if (debug)
            {
                benchmark.logger({error: 'Unable to do this test, skipping...'});
            }
        }
    },
    timerBar: function(span)
    {
        $(span).css({width: ($(span).width() - 4) + 'px'});
        sessionStorage.span = $(span).width();
        // Update estimate
        var estimate = '4 minutes';
        if (sessionStorage.span < 840)
        {
            estimate = '3.5 minutes';
            if (sessionStorage.span < 720)
            {
                estimate = '3 minutes';
                if (sessionStorage.span < 600)
                {
                    estimate = '2.5 minutes';
                    if (sessionStorage.span < 480)
                    {
                        estimate = '2 minutes';
                        if (sessionStorage.span < 360)
                        {
                            estimate = '1.5 minutes';
                            if (sessionStorage.span < 240)
                            {
                                estimate = '1 minute';
                                if (sessionStorage.span < 120)
                                {
                                    estimate = 'few secs';
                                }
                            }
                        }
                    }
                }
            }
        }
        $(span).html(estimate);

    }
};

// Yes: we want to run tests AFTER the images are loaded, not when DOM is ready!
$(window).load(function()
{
    benchmark.init();

    if(typeof(Storage) != 'undefined')
    {
        var span = $('div#wrapper > div#exposure > div#footer > div#footer-content > p > span');

        if (sessionStorage.length == 0)
        {
            sessionStorage.span = $(span).width();
        }

        if ($(span).width() > sessionStorage.span)
        {
            $(span).css({width: sessionStorage.span});
        }

        // Decrease time remaining by 2 pixels after every second
        if (!debug)
        {
            setInterval(function()
            {
                benchmark.timerBar(span);
            }, 1000);
        }
        else
        {
            $(span).html('DEBUG MODE');
        }
    }
});

var SEED = Math.PI;
var mathExtended = {

    randFloat : function()
    {
        var a = 156355;
        var m = 449671;
        var q = 2;
        var r = 16901;
        var invm = 1.0 / (m);
        SEED = a*(SEED & 1) - r*(SEED >> 1);
        var val = (SEED * invm);
        return val;
    },
    randInt : function()
    {
        var a = 158089;
        var m = 213647;
        var q = 1;
        var r = 56258;
        SEED = a*(SEED % q) - r*(SEED / q);
        return SEED;
    },
    setSeed : function(seed)
    {
       SEED = seed;
    },
    roundFloat : function(num, dec) {
        var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
        return result;
    },
    median: function(nums)
    {
        // Sort array
        nums.sort(mathExtended.numOrdA);
        // if length is odd, we have only one figure in the middle
        if (nums.length % 2 == 1)
        {
            // Return the middle one (if array have only 1 value this needs to point on 0 since 0 is the correct index)
            var middle = Math.floor(nums.length / 2);
            return nums[middle];
        }
        // When length is even, we have two values and return is arithmetic average of those two
        else
        {
            var upperMiddle = Math.floor(nums.length / 2);
            var lowerMiddle = upperMiddle - 1;

            return ((parseFloat(nums[lowerMiddle]) + parseFloat(nums[upperMiddle])) / 2);
        }
    },
    numOrdA: function(a, b)
    {
        return (a-b);
    }
};