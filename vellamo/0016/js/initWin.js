// JavaScript Document<script type="text/javascript">
var gl, canvas, docWidth, docHeight, deltaJellyfishCount, lastDeltaJellyfishCount, lastLastDeltaJellyfishCount, lastLastLastDeltaJellyfishCount, startedTime;
var resultsReported = 0;
var TARGET_FPS = 20;

function reportResults() {
  var elem, report;
  if (!resultsReported) {
    elem = document.getElementById('frameRate');
    if (gl)
      report = elem.textContent + ',' + Param.jCount;
    else
      report = "!WebGL";
    if (window.vellamo) {
      setTimeout(function () { window.vellamo.write(report); }, 1000);
    } else {
      //for in-browser running/debugging of benchmark
      elem = document.getElementById("results");
      if (!elem) {
        elem = document.createElement("div");
        elem.id = "results";
        elem.setAttribute("style", "background-color:#808080; width:100%; height: 20px;");
        document.getElementById("console").appendChild(elem);
      }
      elem.innerText = report;
    }
    resultsReported = 1;
  }
}

function updateCount() {
  var fpsDiff, newCount;
  // find out how many to create/remove
  lastLastLastDeltaJellyfishCount = lastLastDeltaJellyfishCount;
  lastLastDeltaJellyfishCount = lastDeltaJellyfishCount;
  lastDeltaJellyfishCount = deltaJellyfishCount;
  deltaJellyfishCount = 0;
  fpsDiff = localParam.fpsAverage - TARGET_FPS;
  if (fpsDiff > 10)
    deltaJellyfishCount = 5;
  else if (fpsDiff < -10)
    deltaJellyfishCount = -2;
  else {
    if (fpsDiff > 0)
      deltaJellyfishCount = Math.round(fpsDiff / 2);
    else
      deltaJellyfishCount = Math.round(fpsDiff / 4);
  }
  // sanity check
  if (deltaJellyfishCount + Param.jCount < 1) {
    Param.jCount = 1;
    deltaJellyfishCount = 0;
  }
  // If stable, we're done
  if (deltaJellyfishCount === 0 && lastDeltaJellyfishCount === 0 && lastLastDeltaJellyfishCount === 0 && lastLastLastDeltaJellyfishCount === 0) 
    reportResults();
  // if times up (20s), we're done
  if ((new Date().getTime() - startedTime) > 20000) {
    reportResults();
  }
  newCount = Param.jCount + deltaJellyfishCount;
  $("#jCount").val(newCount);
  $("#jellyfishCount").text(newCount);
}

function initWin(w, h) {
  var webglImplementationNames, nameIndex;
  (w) ? docWidth = w : docWidth = $(window).width();
  (h) ? docHeight = h : docHeight = $(window).height();
//  docWidth = Math.min(480, docWidth);
//  docHeight = Math.min(480, docHeight);
  $("#webgl-canvas").width(docWidth);
  $("#webgl-canvas").height(docHeight);    
  canvas.width = docWidth;
  canvas.height = docHeight;
  webglImplementationNames = ["webgl", "experimental-webgl", "webkit-3d"];	// subset of list from khronos.org
  gl = null;
  for (var nameIndex = 0; nameIndex < webglImplementationNames.length; ++nameIndex) {
    try {
      gl = canvas.getContext(webglImplementationNames[nameIndex]);
    } catch(e) {}
    if (gl) {
      gl.viewportWidth = docWidth;
      gl.viewportHeight = docHeight;
      break;
    }
  }
  if (!gl) {
    reportResults();
    return false;
  } else {
    window.setInterval(updateCount, 2000);
    return true;
  }
}

$(window).resize(function() {
  initWin();
});

function webGLStart() {
  startedTime = new Date().getTime();

  canvas = document.getElementById("webgl-canvas");

  if (initWin()) {
    initBuffers();
    initShaders();
    initTextures();

    setDebugParam();

    gl.clearColor(0., 0., 0., 0.);
    gl.clearDepth(1.);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    interact();
    animate();
  }
}