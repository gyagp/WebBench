/**
 * Conformity CSS
 *
 * CSS Conformity test will check browser support in CSS3. Test is weighted with way where new method introduced first
 * in CSS3 will score more than method introduced in CSS2 or in CSS1. Test will also detect if support is only partial
 * and gives lower scores from partial supports than fully supported methods.
 *
 * Test result is transformed to a support percentage.
 *
 * @version 2.1
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : true, // test is always doable
    operations : 0,
    time : 0,
    internalCounter : false,
    testName : 'Conformity CSS',
    testVersion : '2.1',
    compareScore : 1,
    isConformity : 1
};

var fullySupported = [];
var partiallySupported = [];
var notSupported = [];
var selectorSupported = [];
var selectorNotSupported = [];
var points = 0;
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

    testMethods : function()
    {
        var cssMethods = [
            // Since CSS1
            [
                'background', 'backgroundAttachment', 'backgroundColor', 'backgroundImage', 'backgroundPosition', 'backgroundRepeat', 'border', 'borderBottom',
                'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth',
                'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth',
                'borderWidth', 'height', 'width', 'font', 'fontFamily', 'fontSize', 'fontStyle', 'fontVariant', 'fontWeight', 'listStyle', 'listStyleImage',
                'listStylePosition', 'listStyleType', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'padding', 'paddingBottom', 'paddingLeft',
                'paddingRight', 'paddingTop', 'clear', 'display', 'float', 'color', 'letterSpacing', 'lineHeight', 'textAlign', 'textDecoration', 'textIndent',
                'textTransform', 'verticalAlign', 'whiteSpace', 'wordSpacing'
            ],
            // Since CSS2
            [
                'outline', 'outlineColor', 'outlineStyle', 'outlineWidth', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'content', 'counterIncrement', 'counterReset',
                'quotes', 'bottom', 'clip', 'cursor', 'left', 'overflow', 'position', 'right', 'top', 'visibility', 'zIndex', 'orphans', 'pageBreakAfter', 'pageBreakBefore',
                'pageBreakInside', 'widows', 'borderCollapse', 'borderSpacing', 'captionSize', 'emptyCells', 'tableLayout', 'direction', 'unicodeBidi'
            ],
            // Since CSS3
            [
                'animation', 'animationName', 'animationDuration', 'animationTimingFunction', 'animationDelay', 'animationIterationCount', 'animationDirection',
                'animationPlayState', 'backgroundClip', 'backgroundOrigin', 'backgroundSize', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'borderImage',
                'borderImageOutset', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderRadius', 'borderTopLeftRadius', 'borderTopRightRadius',
                'boxDecorationBreak', 'boxShadow', 'overflowX', 'overflowY', 'overflowStyle', 'rotation', 'rotationPoint', 'colorProfile', 'opacity', 'renderingIntent',
                'bookmarkLabel', 'bookmarkLevel', 'bookmarkTarget', 'floatOffset', 'hyphenateAfter', 'hyphenateBefore', 'hyphenateCharacter', 'hyphenateLines',
                'hyphenateResource', 'hyphens', 'imageResolution', 'marks', 'stringSet', 'boxAlign', 'boxDirection', 'boxFlex', 'boxFlexGroup', 'boxLines',
                'boxOrdinalGroup', 'boxOrient', 'boxPack', 'fontSizeAdjust', 'fontStretch', 'crop', 'moveTo', 'pagePolicy', 'gridColumns', 'gridRows', 'target',
                'targetName', 'targetNew', 'targetPosition', 'alignmentAdjust', 'alignmentBaseline', 'baselineShift', 'dominantBaseline', 'dropInitialAfterAdjust',
                'dropInitialAfterAlign', 'dropInitialBeforeAdjust', 'dropInitialBeforeAlign', 'dropInitialSize', 'dropInitialValue', 'inlineBoxAlign', 'lineStacking',
                'lineStackingRuby', 'lineStackingShift', 'lineStackingStrategy', 'textHeight', 'marqueeDirection', 'marqueePlayCount', 'marqueeSpeed', 'marqueeStyle',
                'columnCount', 'columnFill', 'columnGap', 'columnRule', 'columnRuleColor', 'columnRuleStyle', 'columnRuleWidth', 'columnSpan', 'columnWidth', 'columns',
                'fit', 'fitPosition', 'imageOrientation', 'page', 'size', 'rubyAlign', 'rubyOverhang', 'rubyPosition', 'rubySpan', 'mark', 'markAfter', 'markBefore',
                'phonemes', 'rest', 'restAfter', 'restBefore', 'voiceBalance', 'voiceDuration', 'voicePitch', 'voicePitchRange', 'voiceRate', 'voiceStress', 'voiceVolume',
                'hangingPunctuation', 'punctuationTrim', 'textAlignLast', 'textJustify', 'textOutline', 'textOverflow', 'textShadow', 'textWrap', 'wordBreak', 'wordWrap',
                'transform', 'transformOrigin', 'transformStyle', 'perspective', 'perspectiveOrigin', 'backfaceVisibility', 'transition', 'transitionProperty',
                'transitionDuration', 'transitionTimingFunction', 'transitionDelay', 'appearance', 'boxSizing', 'icon', 'navDown', 'navIndex', 'navLeft', 'navRight',
                'navUp', 'outlineOffset', 'resize'
            ]
        ];

        var full = 3;
        var partial = 1;

        $.each(cssMethods, function(cssVersion, cssSince)
        {
            cssVersion += 1;
            $.each(cssSince, function(cssIndex, cssValue)
            {
                maxPoints += full * cssVersion;
                prefixed = Modernizr.prefixed(cssValue);
                if (prefixed == cssValue)
                {
                    fullySupported.push(prefixed);
                    points += full * cssVersion;
                }
                else if (prefixed != false)
                {
                    partiallySupported.push(prefixed);
                    points += partial * cssVersion;
                }
                else
                {
                    notSupported.push(cssValue);
                }
            });
        });

        // Selectors
        var cssSelectors = [
            // Since CSS1
            [
                "div", "div#id", "div.class", "div div", "a:active", "a:link"
            ],
            // Since CSS2
            [
                "*", "div:hover", "div:focus", ":dir(ltr)", "div:lang(en)", "div[title]", "div[title='foo']", "div[title~='foo']", "div[title|='foo']", "div:first-child",
                "div > div", "div + div"
            ],
            // Since CSS3
            [
                ":not(div)", ":target", ":scope", "input:enabled", "input:disabled", "input:checked", "div:empty", "div:last-child", "div:only-child", "div:first-of-type",
                "div:last-of-type", "div:only-of-type", "div:nth-child(1)", "div:nth-last-child(1)", "div:nth-of-type(1)", "div:nth-last-of-type(1)", "div[title^='foo']",
                "div[title$='foo']", "div[title*='foo']", "div ~ div"
            ],
            // Since CSS4
            [
                ":not(div, p)", ":matches(div, p) a", ":local-link(1)", ":current(div, p)", ":indeterminate", ":default", ":in-range", ":out-of-range", ":required",
                ":optional", ":read-only", ":read-write", "div:nth-match(2n+1)", "div:nth-last-match(2n+1)", ":column(.class)", ":nth-column(2n+1)",
                ":nth-last-column(2n+1)", "div[title='foo' i]", "label:hover /for/ input", "!div > p", ":any-link"
            ]
        ];

        // Selectors do not have prefix scores, only full or nothing
        var full = 1;

        $.each(cssSelectors, function(cssVersion, cssSince)
        {
            cssVersion += 1;
            $.each(cssSince, function(cssIndex, cssSelector)
            {
                maxPoints += full * cssVersion;
                var error = false;
                try
                {
                    var el = document.querySelector(cssSelector);
                }
                catch(e)
                {
                    error = true;
                }
                if (error)
                {
                    selectorNotSupported.push(cssSelector);
                }
                else
                {
                    selectorSupported.push(cssSelector);
                    points += full * cssVersion;
                }
            });
        });

    },
    run : function(isFinal, loopCount)
    {
        // Test methods
        test.testMethods();

        // Calculate score
        var percentage = (points / maxPoints) * 100;

        // Gather debug data
        var debugData = {
            full: fullySupported,
            partial: partiallySupported,
            not: notSupported,
            selectors: selectorSupported,
            selectors_not: selectorNotSupported,
            pts: points,
            max: maxPoints
        };

        // Submit result
        benchmark.submitResult(percentage, guide, debugData);
    }
};