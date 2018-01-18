/*!
 * jPerf v0.1.0
 * jperf.com
 *
 * Copyright (c) Yang Gu
 * MIT License
 */ 
/*
 * jPerf is a JavaScript library that helps you measure performance.
 */
(function(window, document, undefined){
  var jPerfProto = {
    _version : 'v0.1.0',

    _config : {
      classPrefix : '',
      enableClasses : true
    }
  };

  

  var jPerf = function(){};
  jPerf.prototype = jPerfProto;
  jPerf = new jPerf();
  window.jPerf = jPerf;
  
  


  var global = jPerfProto;
  var singletonify = function(constructorName) {
    var constructorFunction = global[constructorName];
    var instance = null;

    global[constructorName] = function() {
      if (instance == null) {
        instance = new constructorFunction();
        instance.constructor = null;
      }
      return instance;
    };
  };
  
  

 
  function RelativeTime() {
    var timeFunction;
    
    function callOnce() {
      function fromDate() {
        return new Date();
      }
    
      function fromPerformance() {
        return window.performance.now();
      }
      
      if (typeof window.performance == 'object' && typeof window.performance.now == 'function')
        timeFunction = fromPerformance;
      else
        timeFunction = fromDate;
    }
  
    callOnce();
    
    this.now = function() {
      return timeFunction();
    };
  }
  
  jPerfProto.RelativeTime = RelativeTime;
  
  singletonify("RelativeTime");

  

  function Timer() {
    var startTime = 0;
    var rt = new jPerfProto.RelativeTime();

    this.start = function() {
      startTime = rt.now();
    };

    this.duration = function() {
        var endTime = rt.now();
        return endTime - startTime;
    };
  }
  
  jPerfProto.Timer = Timer;

  

  function CSSFPSMeter(autoStart, iterationInterval, skipIterationNumber) {
    // Common to all meters
    var canStart = autoStart;
    var interval = iterationInterval ? iterationInterval : 1000;
    var skipNumber = skipIterationNumber ? skipIterationNumber : 3;
    var intervalID = null;
    var recentFPS;
    var averageFPS;
    var rt = new jPerfProto.RelativeTime();
    var framesIteration;
    var elapsedIteration;
    var framesTotal = 0;
    var elapsedTotal = 0;

    var reportFPS = function(eventName) {
      var event = document.createEvent("Event");
      event.initEvent(eventName, true, true);
      event.recentFPS = recentFPS;
      event.averageFPS = averageFPS;
      document.dispatchEvent(event);
    };

    // Specific to this meter
    var ref = null;
    var frames = null;
    var frameID = null;
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;

    // Repeatedly store value of left
    var storeValue = function () {
      frameID = requestAnimationFrame(storeValue);
      var frame = parseFloat(window.getComputedStyle(ref, null).left);
      frames.push(frame);
    };

    this.start = function() {
      // Common to all meters
      var startTime = null;
      var skippedNumber = 0;

      var startIteration = function() {
        frames = [];
        startTime = rt.now();
        storeValue();
      };

      if (!ref) {
        // Create a simple CSS animation
        ref = document.createElement("div");
        ref.setAttribute('id', 'ref');
        var style = '-webkit-animation: ref 1s linear infinite; width:1px; height:1px; background:transparent; position:absolute;';
        ref.setAttribute('style', style);
        document.body.appendChild(ref);

        var keyframes = '@-webkit-keyframes ref { 0% {left:0px;} 100% {left:100px;} }';
        var s = document.createElement('style');
        s.innerHTML = keyframes;
        document.body.appendChild(s);

        // Report fps
        intervalID = setInterval(
          function () {
            cancelAnimationFrame(frameID);
            if (skippedNumber >= skipNumber) {
              framesIteration = frames.length;
              elapsedIteration = rt.now() - startTime;
              framesTotal += framesIteration;
              elapsedTotal += elapsedIteration;

              recentFPS = Math.min(Math.round(framesIteration * 100000 / elapsedIteration) / 100, 60.00);
              averageFPS = Math.min(Math.round(framesTotal * 100000 / elapsedTotal) / 100, 60.00);
              reportFPS("CSSFPSReport");

            } else {
              skippedNumber++;
            }

            startIteration();
          },
          interval);

        startIteration();
      }
    };

    this.stop = function() {
      cancelAnimationFrame(frameID);
      frameID = null;
      document.body.removeChild(ref);
      ref = null;
      clearInterval(intervalID);
    };

    if (autoStart)
      this.start();
  }

  jPerfProto.CSSFPSMeter = CSSFPSMeter;

  
// Usage is simple, just call start() and stop(). And it also supports pause, play in video controller.
// States: start, running, pause, stop


  function VideoFPSMeter(videoElement, autoStart, iterationInterval, skipIterationNumber) {
    // Common to all meters
    var canStart = autoStart;
    var interval = iterationInterval ? iterationInterval : 1000;
    var skipNumber = skipIterationNumber ? skipIterationNumber : 3;
    var intervalID = null;
    var recentFPS;
    var averageFPS;
    var rt = new jPerfProto.RelativeTime();
    var framesIteration;
    var elapsedIteration;
    var framesTotal = 0;
    var elapsedTotal = 0;

    var reportFPS = function(eventName) {
      var event = document.createEvent("Event");
      event.initEvent(eventName, true, true);
      event.recentFPS = recentFPS;
      event.averageFPS = averageFPS;
      document.dispatchEvent(event);
    };

    // Specific to this meter
    var running = 0;
    var displayedFrameCount = function() {
      return videoElement.webkitDecodedFrameCount - videoElement.webkitDroppedFrameCount;
    };
    var pause = function(event) {
      recentFPS = 0;
      reportFPS("VideoFPSReport");
      running = 0;
      if (intervalID)
        clearInterval(intervalID);
    };

    var playingHandler = function(event) {
      console.log(event.type);
      if (canStart)
        this.start();
    };

    var pauseHandler = function(event) {
      console.log(event.type);
      pause();
    };

    this.start = function(event) {
      // Common to all meters
      var startTime = null;
      var skippedNumber = 0;

      // Specific to this meter
      var startFrameCount = 0;

      var startIteration = function() {
        startTime = rt.now();
        startFrameCount = displayedFrameCount();
      };

      canStart = true;
      if (videoElement.paused || videoElement.ended)
        return;

      if (!running) {
        intervalID = setInterval(
          function () {
            if (skippedNumber >= skipNumber) {
              framesIteration = displayedFrameCount() - startFrameCount;
              elapsedIteration = rt.now() - startTime;
              framesTotal += framesIteration;
              elapsedTotal += elapsedIteration;

              recentFPS = Math.min(Math.round(framesIteration * 100000 / elapsedIteration) / 100, 60.00);
              averageFPS = Math.min(Math.round(framesTotal * 100000 / elapsedTotal) / 100, 60.00);
              reportFPS("VideoFPSReport");
            } else {
              skippedNumber++;
            }

            startIteration();
          },
          interval
        );

        startIteration();
        running = 1;
      }
    };

    this.stop = function() {
      canStart = false;
      running = 0;
      recentFPS = 0;
      reportFPS();
      if (intervalID)
        clearInterval(intervalID);
    };

    if (!videoElement) {
      console.log("You must specify a video element");
      return;
    }
    videoElement.addEventListener("playing", playingHandler.bind(this));
    videoElement.addEventListener("pause", pauseHandler.bind(this));
  }

  jPerfProto.VideoFPSMeter = VideoFPSMeter;

  

;
})(this, document);