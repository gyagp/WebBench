/**
 * Graphics HTML5 WebGL
 *
 * WebGL test draws the Senate Square located in Helsinki, Finland, with simplified objects and start to rotate camera
 * around the Square while slowly changing camera angle. After each screen update counter is increased by one.
 *
 * To determine internal score, script will use operations/second (ops): counter / elapsed time in milliseconds x 1000
 * Final score is calculated with formula 1000 x (ops / compare).
 *
 * @version 2.1
 * @author Teemu Virolainen <teemu.virolainen@rightware.com>
 * @copyright 2012 Rightware
 **/

// Default guide for benchmark.js
var guide = {
    isDoable : false,
    operations : 0,
    time : 0,
    internalCounter : true,
    testName : 'Graphics WebGL',
    testVersion : '2.1',
    compareScore : 9.7,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

var myScene = {};

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

        // Ensure browser supports WebGL
        if (Modernizr.webgl)
        {
            // Browser supports WebGL, continue
            guide.isDoable = true;
            guide.operations = 1;

            // Try to create scene
            try
            {
                // Hide canvas
                $('#theCanvas').css({opacity: 0});
                SceneJS.createScene({type:"scene",id:"the-scene",canvasId:"theCanvas",flags:{backfaces:false},nodes:[{type:"renderer",clearColor:{r:122/255,g:218/255,b:225/255},clear:{depth:true,color:true},nodes:[{type:"rotate",id:"pitch",angle:0,x:1,nodes:[{type:"rotate",id:"yaw",angle:0,y:1,nodes:[{type:"lookAt",eye:{x:0,y:0.8,z:1.1},look:{x:0,y:0.8,z:1},up:{y:1},nodes:[{type:"camera",optics:{type:"perspective",fovy:40,aspect:1.47,near:0.1,far:300},nodes:[{type:"translate",x:0,y:-0.1,z:-2,nodes:[{type:"material",baseColor:{r:1,g:1,b:1},specularColor:{r:0.4,g:0.4,b:0.4},specular:0.2,shine:6,emit:1,nodes:[lipasto,portaikko,statue,tuomiokirkko,vvm,ground,kirjasto,kortteli_a,kortteli_b,kortteli_c,museo,skydome]}]}]}]}]}]}]}]});
                myScene = SceneJS.scene("the-scene");
                $('#theCanvas').animate({opacity: 0.05}, 100);
                $('#theCanvas').animate({opacity: 0.1}, 95);
                $('#theCanvas').animate({opacity: 0.15}, 90);
                $('#theCanvas').animate({opacity: 0.2}, 85);
                $('#theCanvas').animate({opacity: 0.25}, 80);
                $('#theCanvas').animate({opacity: 0.3}, 75);
                $('#theCanvas').animate({opacity: 0.35}, 70);
                $('#theCanvas').animate({opacity: 0.4}, 65);
                $('#theCanvas').animate({opacity: 0.45}, 60);
                $('#theCanvas').animate({opacity: 0.5}, 55);
                $('#theCanvas').animate({opacity: 0.55}, 50);
                $('#theCanvas').animate({opacity: 0.6}, 45);
                $('#theCanvas').animate({opacity: 0.65}, 40);
                $('#theCanvas').animate({opacity: 0.7}, 35);
                $('#theCanvas').animate({opacity: 0.75}, 30);
                $('#theCanvas').animate({opacity: 0.8}, 25);
                $('#theCanvas').animate({opacity: 0.85}, 20);
                $('#theCanvas').animate({opacity: 0.9}, 15);
                $('#theCanvas').animate({opacity: 0.95}, 10);
                $('#theCanvas').animate({opacity: 1}, 5);
            }
            catch(e)
            {
                guide.isDoable = false;
            }
        }

        return guide;

    },
    run : function(isFinal, loopCount)
    {
        myScene.start(
        {
            idleFunc: function()
            {
                if (benchmark.elapsedTime() >= 15000)
                {
                    myScene.stop();
                    $('canvas').remove();
                    debugData = {};
                    elapsed = benchmark.elapsedTime();
                    finalScore = counter / elapsed * 1000;
                    // Because current WebGL test is more like capability test, we set artifical top limit to 60
                    if (finalScore > 60)
                    {
                        finalScore = 60;
                    }
                    debugData.elapsedTime = elapsed;
                    debugData.operations = counter;
                    debugData.ops = finalScore;

                    benchmark.submitResult(finalScore, guide, debugData);
                }
                else
                {
                    var nd = myScene.findNode("yaw");
                    var pd = myScene.findNode("pitch");
                    nd.set("angle", nd.get("angle")+0.4);
                    if (benchmark.elapsedTime() < 7500)
                    {
                        pd.set("angle", pd.get("angle")+0.05);
                    }
                    else
                    {
                        pd.set("angle", pd.get("angle")-0.05);
                    }
                    benchmark.increaseCounter();
                }
            }
        });
    }
};