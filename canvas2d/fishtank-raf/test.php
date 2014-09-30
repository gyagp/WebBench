<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=9" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <title>FishIE Tank</title>
    <script type="text/javascript" src="fpsometer.js"></script>
    <script type="text/javascript" src="config.js"></script>
    <script type="text/javascript" src="version.js"></script>
    <script type="text/javascript" src="report.js"></script>
    <link rel="stylesheet" type="text/css" href="fpsometer.css" />
    <style>
        #canvas1
        {
            position: absolute;
            top: 0px;
            left: 0px;
        }
        #returnbutton
        {
            position: absolute;
            display: block;
            top: 0px;
            right: 6px;
            width: 210px;
            height: 29px;
            background-image: url(../../includes/image/ReturnButton.png);
            background-position: left top;
            text-indent: -9999px;
        }
        #avg_fps_lable
        {
          display: none;
          position: absolute;
          top: 20px;
          left: 20px;
          width: 300px;
          height: 500px;
          background-color: white;
          border: 3px solid gray;
        }
        html
        {
            height: 100%;
        }
        body
        {
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0;
            padding: 0;
        }
        div.hidden {
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }
    </style>
    <meta name="t_omni_demopage" content="1" />
</head>
<body>
	<div align="center" tabIndex="1"><span id="avg_fps_lable"></span> </div>
    <script>
        var devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI;
		var ctx;                     //canvas context for drawing the fish
		var cur_fish_num;
        var fish = [];               //array of fish
        var fishW = 307;             //fish width
        var fishH = 313;             //fish height
        var velocity = 100;          //base velocity
        var backgroundImage;         //background image
        var backgroundImageW = 981;  //background image width
        var backgroundImageH = 767;  //background image height
        var imageStripLeft;              //fish image strip left
        var imageStripRight;              //fish image strip right
        //var WIDTH = document.body.offsetWidth;
        //var HEIGHT = document.body.offsetHeight;
        // configure a fix size instead get from system resolution
        var CANVAS_SIZE_WIDTH = canvas_default_width/devicePixelRatio;
        var CANVAS_SIZE_HEIGHT = canvas_default_height/devicePixelRatio;
        var WIDTH = CANVAS_SIZE_WIDTH;
        var HEIGHT = CANVAS_SIZE_HEIGHT;
        var initial_fish_num = default_start_fishes;
	var frameLimit = default_frame_limit;
	var TotalAreaDrawn = 0;
		var fpsMeter = null;
		var iid = 0;
		var totalFrames = 0;
		//var frameLimit = 500;
		var t0;
		var avg_fps = 0;


	var flag = 1;

        window.onload = init;
/////////////////////////

window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
	 window.setTimeout(callback, 16);
        };
      })();
////////////////////////////////////////


        function init() {
          // parse query strings
	      var search = window.limitSearch || (window.location.search || "?").substr(1);

      	var parts = search.split("&");

        try{
          for (var pp = 0; pp < parts.length; pp++) {
            var ees = parts[pp].split("=");
            if (ees.length == 2) {
              if (ees[0] == 'width') {
                CANVAS_SIZE_WIDTH = parseInt(ees[1])/devicePixelRatio;
                WIDTH = CANVAS_SIZE_WIDTH;
              }
              else if (ees[0] == 'height') {
                CANVAS_SIZE_HEIGHT = parseInt(ees[1])/devicePixelRatio;
                HEIGHT = CANVAS_SIZE_HEIGHT;
              }
              else if (ees[0] == 'fish') {
                initial_fish_num  = parseInt(ees[1]);
              }
              else if (ees[0] == 'frames') {
                frameLimit = parseInt(ees[1]);
              }
			  else if (ees[0] == 'resolution') {
				if (ees[1] == 'logical') {
					CANVAS_SIZE_WIDTH = canvas_default_width;
					WIDTH = CANVAS_SIZE_WIDTH;
					CANVAS_SIZE_HEIGHT = canvas_default_height;
					HEIGHT = CANVAS_SIZE_HEIGHT;
				}
			  }
            }
          }
        } catch (e) {
          alert(e);
        }



            //set up the fpsometer
            fpsMeter = new FpsMeter(0, "fish");
            fpsMeter.SetSettingsHtml("<div id='timeDur'>0ms</div><div class='settingsLabel'>Choose number of fish</div><div class='control'><div class='control'><a class='control' href='javascript:createFish(1);'>1</a></div><div class='control'><a class='control' href='javascript:createFish(10);'>10</a></div><div class='control'><a class='control' href='javascript:createFish(20);'>20</a></div><div class='control'><a class='control' href='javascript:createFish(50);'>50</a></div><div class='control'><a class='control' href='javascript:createFish(100);'>100</a></div><div class='control'><a class='control' href='javascript:createFish(250);'>250</a></div><div class='control'><a class='control' href='javascript:createFish(500);'>500</a></div><div class='control'><a class='control' href='javascript:createFish(1000);'>1000</a></div>");

            //set up the canvas
            var tempCtx = document.createElement("canvas");
            tempCtx.id = "canvas1";
            tempCtx.setAttribute('width', WIDTH);
            tempCtx.setAttribute('height', HEIGHT);
            tempCtx.setAttribute('tabIndex', -1);
            document.body.insertBefore(tempCtx, document.body.firstChild);

            var tempCtx3 = document.createElement("canvas");
            tempCtx3.id = "background";
            tempCtx3.setAttribute('width', WIDTH);
            tempCtx3.setAttribute('height', HEIGHT);
            tempCtx3.setAttribute('tabIndex', -1);
            document.body.insertBefore(tempCtx3, document.body.firstChild);

            ctx = tempCtx.getContext("2d");

            ctx3 = tempCtx3.getContext("2d");

            //draw the background
            backgroundImage = document.getElementById('backgroundImage');
            drawBackground();

            //create the fish
            imageStripLeft = document.getElementById('imageStripLeft');
            imageStripRight = document.getElementById('imageStripRight');
            createFish(initial_fish_num);

            //start animation
			
		draw();
		

			window.addEventListener("resize", OnWindowResize, false);

        }
        function createFish(max) {

			// To make the benchmark results predictable, we replace Math.random
			// with a 100% deterministic alternative.
			Math.random = (function() {
			  var seed = 49734321;
			  return function() {
				// Robert Jenkins' 32 bit integer hash function.
				seed = ((seed + 0x7ed55d16) + (seed << 12))  & 0xffffffff;
				seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
				seed = ((seed + 0x165667b1) + (seed << 5))   & 0xffffffff;
				seed = ((seed + 0xd3a2646c) ^ (seed << 9))   & 0xffffffff;
				seed = ((seed + 0xd3a2646c) ^ (seed << 9))   & 0xffffffff;
				seed = ((seed + 0xfd7046c5) + (seed << 3))   & 0xffffffff;
				seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
				return (seed & 0xfffffff) / 0x10000000;
			  };
			})();

			cur_fish_num = max;

			fpsMeter.Reset();
      // hide the result pane
      document.getElementById("avg_fps_lable").style.display = "none";
			fish = [];
            if (fish.length < max) {
                //add fish
                for (var i = fish.length; i < max; i++) {
                    fish.push(new Fish());
                }
            }


			totalFrames = 0;
			t0 = (new Date()).getTime();

			
		//		draw();
			
        }

        function drawBackground() {

            if (WIDTH < backgroundImageW) {
               //Show a portion of the background if the window is more narrow than the backgroundImage
               ctx3.drawImage(backgroundImage, 0, 0, backgroundImageW, HEIGHT);
            }
           else {
                //tile the backgroundImage horizontally if the window is more wide than the image
                var tileCount = Math.floor(WIDTH / backgroundImageW);
                var flip = 1; //flip the image when flip==-1 for better looking tiles
                for (i = 0; i <= tileCount; i++) {
                    //loop through all the tiles that are needed and position them
                    ctx3.save();
                    ctx3.transform(flip, 0, 0, 1, 0, 0);
                    ctx3.drawImage(backgroundImage, (flip-1)*backgroundImageW/2+flip*backgroundImageW*i, 0, backgroundImageW, HEIGHT);
                    ctx3.restore();
                    flip = flip * -1;
                }

            }
        }

        function OnWindowResize(e) {
			var bodyWidth = window.innerWidth;
			var bodyHeight = window.innerHeight;

            if (typeof e == 'undefined')
                e = window.event;
            //on resize reset the WIDTH, HEIGHT and canvas sizes
            WIDTH = CANVAS_SIZE_WIDTH;
            HEIGHT = CANVAS_SIZE_HEIGHT;
            document.getElementById('canvas1').width = WIDTH;
            document.getElementById('canvas1').height = HEIGHT;
            document.getElementById('background').width = WIDTH;
            document.getElementById('background').height = HEIGHT;
            //redraw the background
            ctx3.clearRect(0, 0, WIDTH, HEIGHT);
            drawBackground();
        }

        function draw() {
			totalFrames = totalFrames + 1;
			if (totalFrames >= frameLimit) {
				clearInterval(iid);
				iid = 0;
				var durMs = (new Date()).getTime() - t0;
                avg_fps = totalFrames.toString()/durMs.toString()*1000;
                var rString = "insert.php?";
                rString += "width="   + CANVAS_SIZE_WIDTH  + "&";
                rString += "height="  + CANVAS_SIZE_HEIGHT + "&";
                rString += "results=" + avg_fps.toFixed(1) + "&";
                rString += "fish="    + cur_fish_num + "&";
                rString += "frames="  + totalFrames.toString();
                //window.location = rString;
				document.getElementById("timeDur").innerHTML = "Avg FPS: <font color='red'>" +avg_fps.toFixed(2) + "</font> = " + totalFrames.toString()+" frames / "+durMs.toString()+"ms";
				document.getElementById("avg_fps_lable").innerHTML = "<font face='arial' size=20 color='red'><B>Version " +version+ "<BR>Result: " + avg_fps.toFixed(1) + "fps @" +canvas_default_width + "x" + canvas_default_height + " with "+ cur_fish_num + " fishes</B></font>";
				document.getElementById("avg_fps_lable").style.display = "inline";
				//on_report(version, avg_fps, CANVAS_SIZE_WIDTH, CANVAS_SIZE_HEIGHT, cur_fish_num);
				console.log("Version " +version+ ", Result: " + avg_fps.toFixed(1) + "fps @" +canvas_default_width + "x" + canvas_default_height + " with "+ cur_fish_num + " fishes");
				totalFrames = 0;
				return;
			}
            //clear the canvas
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            //set velocity of fish as a function of FPS
			var fps = fpsMeter.meterFps;

            power = Math.min(fps, 60);
			if(isNaN(power)) power = 1;
            //velocity = 100 + 100 * (power * power / 3600); //exponential curve between 100-200
            velocity = Math.floor((power * power * .5) / 3) < 1 ? 1 : Math.floor((power * power * .5) / 3);  //exponential curve between 1 and 600.

            // Draw each fish
            for (var fishie in fish) {
                fish[fishie].swim();
            }




//////////////////////////////////////
	requestAnimFrame(function() {
            draw();
          });
///////////////////////////////////////



			//draw fpsometer with the current number of fish
            fpsMeter.Draw(fish.length);
        }

        function Fish() {

            var angle = Math.PI * 2 * Math.random();                            //set the x,y direction this fish swims
            var xAngle = Math.cos(angle);                                       //set the x value of the angle
            var yAngle = Math.sin(angle);                                       //set the y value of the angle
            var zAngle = 1+-2*Math.round(Math.random());                        //set if the fish is swimming toward us or away. 1 = toward us; -1 = away from us
            var x = Math.floor(Math.random() * (WIDTH - fishW) + fishW / 2);    //set the starting x location
            var y = Math.floor(Math.random() * (HEIGHT - fishH) + fishH / 2);   //set the starting y location
            var zFar = 100;                                                     //set how far away can a fish go
            var zFarFactor = 1;                                                 //set the max size the fish can be. 1=100%
            var zClose = 0;                                                     //set how near a fish can come
            var z = Math.floor(Math.random() * ((zFar - zClose)));              //set the starting z location
            var scale = .1;                                                     //set the rate of scaling each frame
            var flip = 1;                                                       //set the direction of the fish. 1=right; -1=left
            var cellCount = 16;                                                 //set the number of cells (columns) in the image strip animation
            var cell = Math.floor(Math.random() * (cellCount-1));               //set the first cell (columns) of the image strip animation
            var cellReverse = -1;                                               //set which direction we go through the image strip
            var species = Math.floor(Math.random() * 3);                        //set which species of fish this fish is. each species is a row in the image strip

            // stop fish from swimming straight up or down
            if (angle > Math.PI * 4 / 3 && angle < Math.PI * 5 / 3 || angle > Math.PI * 1 / 3 && angle < Math.PI * 2 / 3) {
                angle = Math.PI * 1 / 3 * Math.random();
                xAngle = Math.cos(angle);
                yAngle = Math.sin(angle);
            }
            // face the fish the right way if angle is between 6 o'clock and 12 o'clock
            if (angle > Math.PI / 2 && angle < Math.PI / 2 * 3) {
                flip = -1;
            }

            // draw the fish each frame -------------------------------------------------------------------------------
            function swim() {

                // Calculate next position of fish
                var nextX = x + xAngle * velocity * fpsMeter.timeDeltaS;
                var nextY = y + yAngle * velocity * fpsMeter.timeDeltaS;
                var nextZ = z + zAngle * .1 * velocity * fpsMeter.timeDeltaS;
                var nextScale = Math.abs(nextZ) / (zFar - zClose) / devicePixelRatio;

                // If fish is going to move off right side of screen
                if (nextX + fishW / 2 * scale > WIDTH) {
                    // If angle is between 3 o'clock and 6 o'clock
                    if ((angle >= 0 && angle < Math.PI / 2)) {
                        angle = Math.PI - angle;
                        xAngle = Math.cos(angle);
                        yAngle = Math.sin(angle) * Math.random();
                        flip = -flip;
                    }
                    // If angle is between 12 o'clock and 3 o'clock
                    else if (angle > Math.PI / 2 * 3) {
                        angle = angle - (angle - Math.PI / 2 * 3) * 2
                        xAngle = Math.cos(angle);
                        yAngle = Math.sin(angle) * Math.random();
                        flip = -flip;
                    }
                }

                // If fish is going to move off left side of screen
                if (nextX - fishW / 2 * scale < 0) {
                    // If angle is between 6 o'clock and 9 o'clock
                    if ((angle > Math.PI / 2 && angle < Math.PI)) {
                        angle = Math.PI - angle;
                        xAngle = Math.cos(angle);
                        yAngle = Math.sin(angle) * Math.random();
                        flip = -flip;
                    }
                    // If angle is between 9 o'clock and 12 o'clock
                    else if (angle > Math.PI && angle < Math.PI / 2 * 3) {
                        angle = angle + (Math.PI / 2 * 3 - angle) * 2
                        xAngle = Math.cos(angle);
                        yAngle = Math.sin(angle) * Math.random();
                        flip = -flip;
                    }
                }

                // If fish is going to move off bottom side of screen
                if (nextY + fishH / 2 * scale > HEIGHT) {
                    // If angle is between 3 o'clock and 9 o'clock
                    if ((angle > 0 && angle < Math.PI)) {
                        angle = Math.PI * 2 - angle;
                        xAngle = Math.cos(angle);
                        yAngle = Math.sin(angle) * Math.random();
                    }
                }

                // If fish is going to move off top side of screen
                if (nextY - fishH / 2 * scale < 0) {
                    // If angle is between 9 o'clock and 3 o'clock
                    if ((angle > Math.PI && angle < Math.PI * 2)) {
                        angle = angle - (angle - Math.PI) * 2;
                        xAngle = Math.cos(angle);
                        yAngle = Math.sin(angle);
                    }
                }
                // If fish is going too far (getting too small)
                if (nextZ <= zClose && zAngle < 0) {
                   zAngle = -zAngle;
                 //   zAngle = 0;
		}
                // If fish is getting to close (getting too large)
                //if (((WIDTH / fishW) * 10) < ((fishW * fish.length) / WIDTH)) {
                 //  zFarFactor = .3
                //}
                //else if (((WIDTH / fishW) * 2) < ((fishW * fish.length) / WIDTH)) {
                 //zFarFactor = .5
                //}
                //else { zFarFactor = 1 }
		zFarFactor = 1;
                if (nextZ >= zFar * zFarFactor && zAngle > 0) {
                    zAngle = -zAngle;

                }
                if (scale < .1) { scale = .1 }; //don't let fish get too tiny

                //draw the fish
                //locate the fish
                ctx.save();
                ctx.translate(x, y);
                ctx.scale(scale, scale); // make the fish bigger or smaller depending on how far away it is.
                ctx.transform(flip, 0, 0, 1, 0, 0); //make the fish face the way he's swimming.

				if ( cell < 8 )
					ctx.drawImage(imageStripLeft, fishW * cell, fishH * species, fishW, fishH, -fishW / 2, -fishH / 2, fishW, fishH); //draw the fish
                else
					ctx.drawImage(imageStripRight, fishW * (cell - 8) , fishH * species, fishW, fishH, -fishW / 2, -fishH / 2, fishW, fishH); //draw the fish
                TotalAreaDrawn = TotalAreaDrawn + (fishW * fishH * scale);
		ctx.save();
                scale = nextScale // increment scale for next time
                ctx.restore();
                ctx.restore();

                //increment to next state
                x = nextX;
                y = nextY;
                z = nextZ;
                if (cell >= cellCount-1 || cell <= 0) { cellReverse = cellReverse * -1; } //go through each cell in the animation
                cell = cell + 1 * cellReverse; //go back down once we hit the end of the animation
            }
            return {
                swim: swim
            }
        }

    </script>


    <img id="imageStripLeft" src="fishstrip-left.png" style="display: none" tabIndex="-1">
	<img id="imageStripRight" src="fishstrip-right.png" style="display: none" tabIndex="-1">
	<!--image strip with the fish animation-->
    <img id="backgroundImage" src="background-flip2.jpg" style="display: none" tabIndex="-1"> <!--background image-->
	<div class="hidden" tabIndex="-1">Thanks for checking out this site. This demo uses the canvas element to draw fish swimming in a fish tank. The FPS count tells you how many frames per second the browser is able to draw. If you add or remove fish, the frames per second will go up or down depending on how much work the browser is able to do each frame.
        The UI is primarliy driven through Javascript and Canvas. The purpose of these demos is to convey a concept and not intended to be used as a best practice for web development.
        It’s not the cleanest code, and in some places we took shortcuts to get more demos to you. Enjoy! </div> <!--description for screen readers-->


</body>
</html>
