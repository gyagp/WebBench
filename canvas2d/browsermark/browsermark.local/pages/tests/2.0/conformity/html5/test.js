/**
 * Conformity HTML5
 *
 * HTML5 Conformity test will check browser support in HTML5. Script will test new elements, new attributes, new selectors
 * and new input types introduced in HTML5. Script will also test elements that were removed from HTML5 and increase score
 * if browser do not support element anymore.
 *
 * Test result is transformed to a support percentage.
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
    testName : 'Conformity HTML5',
    testVersion : '2.0',
    compareScore : 1,
    isConformity : 1
};

var debugData = {
    validElements: [],
    invalidElements: [],
    validAttributes: [],
    invalidAttributes: [],
    validSelectors: [],
    invalidSelectors: [],
    validEvents: [],
    invalidEvents: [],
    validMisc: [],
    invalidMisc: [],
    pts: 0,
    max: 0
};

var maxPoints = 0;

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
    isValidElement: function(tagname)
    {
        return !(document.createElement('foobarbaz').toString() == document.createElement(tagname).toString());
    },
    testAttributes: function(elementName, attributes, values)
    {
        // Test new attributes
        $.each(attributes, function(i)
        {
            // Create new element
            var el = $('<' + elementName + '></' + elementName + '>');

            // If current attribute is object, loop through each
            if (typeof(values[i]) == 'object')
            {
                $.each(values[i], function(c)
                {
                    maxPoints++;
                    el.attr(attributes[i], values[i][c]);
                    if (el.attr(attributes[i]) == values[i][c])
                    {
                        benchmark.increaseCounter();
                        debugData.validAttributes.push(elementName + ' ' + attributes[i] + '="' + values[i][c] + '"');
                    }
                    else
                    {
                        debugData.invalidAttributes.push(elementName + ' ' + attributes[i] + '="' + values[i][c] + '"');
                    }
                });
            }
            else
            {
                maxPoints++;
                el.attr(attributes[i], values[i]);
                if (el.attr(attributes[i]) == values[i])
                {
                    benchmark.increaseCounter();
                    debugData.validAttributes.push(elementName + ' ' + attributes[i] + '="' + values[i] + '"');
                }
                else
                {
                    debugData.invalidAttributes.push(elementName + ' ' + attributes[i] + '="' + values[i] + '"');
                }
            }
        });
    },
    testCssSelectors: function(values)
    {
        var input = $('<input type="text"></input>');
        $('#content').append(input);
        $.each(values, function(i)
        {
            maxPoints++;
            try
            {
                if ($('input:' + values[i]).length > 0)
                {
                    benchmark.increaseCounter();
                    debugData.validSelectors.push(':' + values[i]);
                }
                else
                {
                    debugData.invalidSelectors.push(':' + values[i]);
                }
            } catch(e)
            {
                debugData.invalidSelectors.push(':' + values[i]);
            }
        });

        // Destroy input
        input.remove();
    },
    testEvents: function(elementName, events)
    {
        // Create element
        var el = document.createElement(elementName);
        $.each(events, function(i)
        {
            maxPoints++;
            if (events[i] in el)
            {
                benchmark.increaseCounter();
                debugData.validEvents.push(elementName + ' ' + events[i]);
            }
            else
            {
                debugData.invalidEvents.push(elementName + ' ' + events[i]);
            }
        });
    },
    run : function(isFinal, loopCount)
    {
        // New elements introduced in HTML5
        var newElements = [
            'article', 'aside', 'bdi', 'command', 'details',
            'summary', 'figure', 'figcaption', 'footer', 'header',
            'hgroup', 'mark', 'meter', 'nav', 'progress',
            'ruby', 'rt', 'rp', 'section', 'time',
            'wbr', 'audio', 'video', 'source', 'embed',
            'track', 'canvas', 'datalist', 'keygen', 'output',
            'svg'
        ];

        // Test new elements and select which tag is used for media tests
        var useForMedia = 'embed'; // Failsafe element in case browser doesn't support audio nor video
        $.each(newElements, function(i)
        {
            maxPoints++;
            if (test.isValidElement(newElements[i]))
            {
                benchmark.increaseCounter();
                debugData.validElements.push(newElements[i]);
                if (newElements[i] == 'audio' || newElements[i] == 'video')
                {
                    useForMedia = newElements[i];
                }
            }
            else
            {
                debugData.invalidElements.push(newElements[i]);
            }
        });

        // Removed elements from HTML5
        var removedElements = [
            'acronym', 'applet', 'basefont', 'big', 'center',
            'dir', 'font', 'frame', 'frameset', 'noframes',
            'strike', 'tt'
        ];

        // Test that removed elements does not work
        var additionalInfo = '* (element is removed from HTML5 specifications)';
        $.each(removedElements, function(i)
        {
            if (!test.isValidElement(removedElements[i]))
            {
                benchmark.increaseCounter();
                debugData.validElements.push(removedElements[i] + additionalInfo);
                additionalInfo = '*';
            }
            else
            {
                debugData.invalidElements.push(removedElements[i] + additionalInfo);
                additionalInfo = '*';
            }
        });

        // New global attributes
        var newAttributes = [
            'hidden', 'draggable', 'dropzone', 'contenteditable', 'contextmenu',
            'spellcheck'
        ];
        var newAttrValues = [
            'hidden', true, ['copy', 'move', 'link'], true, 'some-menu',
            true
        ];

        test.testAttributes('div', newAttributes, newAttrValues);

        // New input types
        newInputs = [
            'color', 'date', 'datetime', 'datetime-local', 'email',
            'month', 'number', 'range', 'search', 'tel',
            'time', 'url', 'week'
        ];

        $.each(newInputs, function(i)
        {
            maxPoints++;
            if (Modernizr.inputtypes[newInputs[i]])
            {
                debugData.validElements.push('input type="' + newInputs[i] + '"');
                benchmark.increaseCounter();
            }
            else
            {
                debugData.invalidElements.push('input type="' + newInputs[i] + '"');
            }

        });

        // New input attributes
        newAttributes = [
            'autocomplete', 'autofocus', 'form', 'formaction', 'formenctype',
            'formmethod', 'formnovalidate', 'formtarget', 'height',    'width',
            'list', 'min', 'max', 'multiple', 'pattern',
            'placeholder', 'required', 'step'
        ];

        $.each(newAttributes, function(i)
        {
            maxPoints++;
            if (Modernizr.input[newAttributes[i]])
            {
                debugData.validAttributes.push('input ' + newAttributes[i]);
                benchmark.increaseCounter();
            }
            else
            {
                debugData.invalidAttributes.push('input ' + newAttributes[i]);
            }
        });

        // New form attributes
        newAttributes = [
            'autocomplete', 'novalidate'
        ];

        newAttrValues = [
            ['on', 'off'], 'novalidate'
        ];

        test.testAttributes('form', newAttributes, newAttrValues);


        $.each(newAttributes, function()
        {

        });

        newAttrValues = [
            ['on', 'off'], 'autofocus', 'someform', 'someprocessor.php', 'multipart/form-data',
            ['post', 'get'], 'formnovalidate', '_blank', 300, 600,
            'somedatalist', '1900-01-01', '2049-12-31', 'multiple', '[a-zA-Z0-9\-\_\.\+]',
            'Some placeholder', 'required', 3
        ];

        test.testAttributes('input', newAttributes, newAttrValues);

        // New CSS Selectors
        var newSelectors = [
            'valid', 'invalid', 'optional', 'required', 'in-range',
            'out-of-range', 'read-write', 'read-only'
        ];

        test.testCssSelectors(newSelectors);

        // New window events
        var newEvents = [
            'onafterprint', 'onbeforeprint', 'onbeforeonload', 'onerror', 'onhaschange',
            'onmessage', 'onoffline', 'ononline', 'onpagehide', 'onpageshow',
            'onpoststate', 'onredo', 'onresize', 'onstorage', 'onundo', 'onunload'
        ];

        test.testEvents('body', newEvents);

        // New input events
        newEvents = [
            'oncontextmenu', 'onformchange', 'onforminput', 'oninput', 'oninvalid'
        ];

        test.testEvents('input', newEvents);

        // New mouse events
        newEvents = [
            'ondrag', 'ondragend', 'ondragenter', 'ondragover', 'ondragstart',
            'ondrop', 'onmousewheel', 'onscroll'
        ];

        test.testEvents('div', newEvents);

        // New media events
        newEvents = [
            'oncanplay', 'oncanplaythrough', 'ondurationchange', 'onemptied', 'onended',
            'onerror', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onpause',
            'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreadystatechange',
            'onseeked', 'onseeking', 'onstalled', 'onsuspend', 'ontimeupdate',
            'onvolumechange', 'onwaiting'
        ];

        test.testEvents(useForMedia, newEvents);

        // Misc tests

        // applicationCache
        maxPoints++;
        if (Modernizr.applicationcache)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('applicationCache');
        }
        else
        {
            debugData.invalidMisc.push('applicationCache');
        }

        // Canvas
        maxPoints++;
        if (Modernizr.canvas)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Canvas');
        }
        else
        {
            debugData.invalidMisc.push('Canvas');
        }

        // Canvas Text
        maxPoints++;
        if (Modernizr.canvastext)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Canvas Text');
        }
        else
        {
            debugData.invalidMisc.push('Canvas Text');
        }

        // Drag and Drop
        maxPoints++;
        if (Modernizr.draganddrop)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Drag and Drop');
        }
        else
        {
            debugData.invalidMisc.push('Drag and Drop');
        }

        // History Management
        maxPoints++;
        if (Modernizr.history)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('History Management');
        }
        else
        {
            debugData.invalidMisc.push('History Management');
        }

        // HTML5 Audio ogg
        maxPoints++;
        if (Modernizr.audio.ogg)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('HTML5 Audio ogg');
        }
        else
        {
            debugData.invalidMisc.push('HTML5 Audio ogg');
        }

        // HTML5 Audio mp3
        maxPoints++;
        if (Modernizr.audio.mp3)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('HTML5 Audio mp3');
        }
        else
        {
            debugData.invalidMisc.push('HTML5 Audio mp3');
        }

        // HTML5 Audio wav
        maxPoints++;
        if (Modernizr.audio.wav)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('HTML5 Audio wav');
        }
        else
        {
            debugData.invalidMisc.push('HTML5 Audio wav');
        }

        // HTML5 Audio m4a
        maxPoints++;
        if (Modernizr.audio.m4a)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('HTML5 Audio m4a');
        }
        else
        {
            debugData.invalidMisc.push('HTML5 Audio m4a');
        }

        // HTML5 Video ogg
        maxPoints++;
        if (Modernizr.video.ogg)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('HTML5 Video ogg');
        }
        else
        {
            debugData.invalidMisc.push('HTML5 Video ogg');
        }

        // HTML5 Video webm
        maxPoints++;
        if (Modernizr.video.webm)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('HTML5 Video webm');
        }
        else
        {
            debugData.invalidMisc.push('HTML5 Video webm');
        }

        // HTML5 Video h264
        maxPoints++;
        if (Modernizr.video.h264)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('HTML5 Video h264');
        }
        else
        {
            debugData.invalidMisc.push('HTML5 Video h264');
        }

        // indexedDB
        maxPoints++;
        if (Modernizr.indexedDB)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('indexedDB');
        }
        else
        {
            debugData.invalidMisc.push('indexedDB');
        }

        // localStorage
        maxPoints++;
        if (Modernizr.localstorage)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('localStorage');
        }
        else
        {
            debugData.invalidMisc.push('localStorage');
        }

        // Cross-window Messaging
        maxPoints++;
        if (Modernizr.postmessage)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Cross-window Messaging');
        }
        else
        {
            debugData.invalidMisc.push('Cross-window Messaging');
        }

        // sessionStorage
        maxPoints++;
        if (Modernizr.sessionstorage)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('sessionStorage');
        }
        else
        {
            debugData.invalidMisc.push('sessionStorage');
        }

        // Web Sockets
        maxPoints++;
        if (Modernizr.websockets)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Web Sockets');
        }
        else
        {
            debugData.invalidMisc.push('Web Sockets');
        }

        // Web SQL Database
        maxPoints++;
        if (Modernizr.websqldatabase)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Web SQL Database');
        }
        else
        {
            debugData.invalidMisc.push('Web SQL Database');
        }

        // Web Workers
        maxPoints++;
        if (Modernizr.webworkers)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Web Workers');
        }
        else
        {
            debugData.invalidMisc.push('Web Workers');
        }

        // Geolocation API
        maxPoints++;
        if (Modernizr.geolocation)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Geolocation API');
        }
        else
        {
            debugData.invalidMisc.push('Geolocation API');
        }

        // Inline SVG
        maxPoints++;
        if (Modernizr.inlinesvg)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Inline SVG');
        }
        else
        {
            debugData.invalidMisc.push('Inline SVG');
        }

        // SMIL
        maxPoints++;
        if (Modernizr.smil)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('SMIL');
        }
        else
        {
            debugData.invalidMisc.push('SMIL');
        }

        // SVG
        maxPoints++;
        if (Modernizr.svg)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('SVG');
        }
        else
        {
            debugData.invalidMisc.push('SVG');
        }

        // SVG Clip paths
        maxPoints++;
        if (Modernizr.svgclippaths)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('SVG Clip paths');
        }
        else
        {
            debugData.invalidMisc.push('SVG Clip paths');
        }

        // Touch Events
        maxPoints++;
        if (Modernizr.touch)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('Touch Events');
        }
        else
        {
            debugData.invalidMisc.push('Touch Events');
        }

        // WebGL
        maxPoints++;
        if (Modernizr.webgl)
        {
            benchmark.increaseCounter();
            debugData.validMisc.push('WebGL');
        }
        else
        {
            debugData.invalidMisc.push('WebGL');
        }

        debugData.pts = counter;
        debugData.max = maxPoints;

        var percentage = (counter / maxPoints) * 100;
        benchmark.submitResult(percentage, guide, debugData);

    }
};