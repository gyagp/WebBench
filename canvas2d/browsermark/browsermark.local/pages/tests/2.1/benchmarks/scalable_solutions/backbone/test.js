/**
 * Scalable Solutions Backbone
 *
 * Scalable Solutions Backbone test will use Javascript framework called Backbone, to perform a basic task.
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
    isDoable : true, // Always doable
    operations : 1000,
    time : null,
    internalCounter : false,
    testName : 'Scalable Solutions Backbone',
    testVersion : '2.1',
    compareScore : 1355.1, // Compare score
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

var myList;

var test = {
    init : function()
    {
        // Model
        var Item = Backbone.Model.extend({});

        // Collection
        var List = Backbone.Collection.extend({
            model: Item
        });

        // View
        var ListView = Backbone.View.extend({
            el: $('#backboneApp'),
            initialize: function()
            {
                _.bindAll(this, 'render', 'addItem', 'appendItem');
                this.collection = new List();
                this.collection.bind('add', this.appendItem);
                this.render();
            },
            render: function()
            {
                var self = this;
                $(this.el).append("<div></div>");
                _(this.collection.models).each(function(item)
                {
                    self.appendItem(item);
                }, this);
            },
            addItem: function(value)
            {
                var item = new Item();
                item.set({
                    value: value
                });
                this.collection.add(item);
            },
            appendItem: function(item)
            {
                $('div', this.el).append("<span>"+item.get('value')+"</span>");
            }
        });

        myList = new ListView();

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
        // Push to backbone instance loop number
        myList.addItem(loopCount + ', ');

        // If final, calculate score
        if (isFinal)
        {
            var elapsed = benchmark.elapsedTime();

            // Final push to backbone instance
            myList.addItem('FINISHED');
            var finalScore = counter / elapsed * 1000;
            benchmark.submitResult(finalScore, guide, {elapsedTime: elapsed, operations: counter, ops: finalScore});
        }
    }
};