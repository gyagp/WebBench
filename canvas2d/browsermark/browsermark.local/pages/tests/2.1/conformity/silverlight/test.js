/**
 * Conformity Silverlight
 *
 * Simple Silverlight support test. Will return 1 if Silverlight is supported, otherwise 0.
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
    testName : 'Conformity Silverlight',
    testVersion : '2.0',
    compareScore : 1,
    isConformity : 1
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
    run : function(isFinal, loopCount)
    {
        var supportValue = 0;
        var silverlight = PluginDetect.getVersion('Silverlight');
        var silverlightVer = '0.0.0.0';
        if (silverlight != null)
        {
            supportValue = 1;
            silverlightVer = silverlight.replace(/,/gi, '.');
        }

        var debugData = {
            silverlightVersion: silverlightVer
        };

        // Submit result
        benchmark.submitResult(supportValue, guide, debugData);
    }
};