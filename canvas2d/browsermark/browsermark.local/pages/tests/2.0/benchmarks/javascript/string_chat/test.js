/**
 * Javascript String Chat
 *
 * String Chat test will simulate simple chat: each message is checked and if it contains "bad words",
 * script will remove word from message before accepting it. After each run counter is increased by one.
 *
 * Test is  mainly imported from old Browsermark.
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
    operations : null,
    time : 4000,
    internalCounter : false,
    testName : 'Javascript String Chat',
    testVersion : '2.0',
    compareScore : 19903.3,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

var test = {
    messages: ["Nulla blandit congue odio. Cras rutrum nulla a est. Sed eros ligula, blandit in, aliquet id.",
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Proin varius justo vitae dolor.",
                "Aliquam sed eros. Maecenas viverra. Duis risus enim, rhoncus posuere, sagittis tincidunt.",
                "Ullamcorper at, purus. Quisque in lectus vitae tortor rhoncus dictum. Ut molestie semper sapien. ",
                "Suspendisse potenti. Sed quis elit. Suspendisse potenti. Aenean sodales.",
                "Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. ",
                "Phasellus pulvinar venenatis augue. Suspendisse mi. Suspendisse id velit. ",
                "Proin eleifend pharetra augue. Praesent vestibulum metus vitae pede.",
                "Cras augue lectus, venenatis sed, molestie viverra, ornare at, justo. "],

    bannedWords: ["cock","cockandball","cockbite","cockboy","cockface","cockhead","cocklick","cocknball","cocksmoke","cocksniff"],

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

        // Remove swearing.
        for (var i = 0; i < this.messages.length; i++) {
            for (var k = 0; k < this.bannedWords.length; k++) {
                this.messages[i] = this.messages[i].replace(this.bannedWords[k]);
            }
        }

        if (isFinal)
        {
            var elapsed = benchmark.elapsedTime();
            var finalScore = counter / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: counter, ops: finalScore});
        }

    }
};