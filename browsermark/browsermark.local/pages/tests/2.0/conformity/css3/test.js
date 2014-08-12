/**
 * Conformity CSS3
 *
 * CSS3 Conformity test will check browser support in CSS3. Test is weighted with way where new method introduced first
 * in CSS3 will score more than method introduced in CSS2 or in CSS1. Test will also detect if support is only partial
 * and gives lower scores from partial supports than fully supported methods.
 *
 * Test result is transformed to a support percentage.
 *
 * @version 2.0
 * @author Jouni Tuovinen <jouni.tuovinen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : true, // test is always doable
    operations : 0,
    time : 0,
    internalCounter : false,
    testName : 'Conformity CSS3',
    testVersion : '2.0',
    compareScore : 1,
    isConformity : 1
};

var fullySupported = [];
var partiallySupported = [];
var notSupported = [];
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
        cssMethods = [
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
            pts: points,
            max: maxPoints
        };

        // Submit result
        benchmark.submitResult(percentage, guide, debugData);
    }
};