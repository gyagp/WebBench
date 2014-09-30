/**
 * Graphics HTML5 Canvas
 *
 * Test browser capability to render basic graphics elements using HTML5 canvas. The script creates balls which are
 * animated by real time physics calculations. Test uses HTML 2d-context draw methods to draw semi transparent graphics
 * primitives like lines, arcs and boxes. Test uses linear and radial gradient for making of the glow effect.
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
    isDoable : false,
    operations : 0,
    time : 0,
    internalCounter : true,
    testName : 'Graphics HTML5 Canvas',
    testVersion : '2.0',
    compareScore : 5173.5,
    isConformity : 0 // Not false but zero because this value is sent through POST which stringify values
};

// Global variable for the ball physics test
var ballPhysicsTest;

var debugData = {

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

        // Ensure browser supports Canvas
        if (Modernizr.canvas)
        {
            // Browser supports WebGL, continue
            guide.isDoable = true;
            guide.operations = 1;

            // Try initialize test area
            try
            {
                var canvas = document.getElementById("tutorial");
                if (canvas.getContext)
                {
                    var ctx = canvas.getContext("2d");
                    ballPhysicsTest = new CanvasTest(ctx);
                }
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
        draw();
        testStats();
    }
};

function draw()
{
    if (benchmark.elapsedTime() >= 15000)
    {
        // Get last second stats
        var s = ballPhysicsTest.getStats();
        var elapsed = benchmark.elapsedTime();
        var elapsedSec = Math.round(elapsed / 1000);
        var primitivePerSecond = s.primitiveCount / elapsed * 1000;
        debugData['second_' + elapsedSec] = [
            'frameCount: ' + s.frameCount,
            'internalRenderTime: ' + s.renderTime,
            'internalUpdateTime: ' + s.updateTime,
            'internalTotalTime: ' + s.totalTime,
            'benchmarkTime: ' + elapsed,
            'primitiveCount: ' + s.primitiveCount,
            'primitivePerSecond: ' + primitivePerSecond
        ];
        counter = s.primitiveCount;

        // Calculate score
        $('canvas').remove();
        clearTimeout(timerDraw);
        elapsed = benchmark.elapsedTime();
        finalScore = counter / elapsed * 1000;
        debugData.elapsedTime = elapsed;
        debugData.operations = counter;
        debugData.ops = finalScore;

        benchmark.submitResult(finalScore, guide, debugData);
    }
    else
    {
        ballPhysicsTest.draw();
        timerDraw = setTimeout("draw()", 1);
    }
}


function testStats()
{
    if (benchmark.elapsedTime() < 14000)
    {
        var s = ballPhysicsTest.getStats();
        if (s.primitiveCount > 0)
        {
            var elapsed = benchmark.elapsedTime();
            var elapsedSec = Math.round(elapsed / 1000);
            var primitivePerSecond = s.primitiveCount / elapsed * 1000;
            debugData['second_' + elapsedSec] = [
                'frameCount: ' + s.frameCount,
                'internalRenderTime: ' + s.renderTime,
                'internalUpdateTime: ' + s.updateTime,
                'internalTotalTime: ' + s.totalTime,
                'benchmarkTime: ' + elapsed,
                'primitiveCount: ' + s.primitiveCount,
                'primitivePerSecond: ' + primitivePerSecond
            ];
            //counter += primitivePerSecond;
            //s.reset();
        }
        timerStats = setTimeout( "testStats()", 982 );
    }
    else
    {
        clearTimeout(timerStats);
    }
}


var Statistics = function()
{
    this.reset();
};

Statistics.prototype.reset = function()
{
    this.frameCount        = 0; // Number of updates done.
    this.renderTime        = 0; // Time used (in milliseconds) in drawing the scene
    this.updateTime        = 0; // Time used (in milliseconds) in updating the physics and other logic of the scene
    this.totalTime        = 0;  // Total time spent (renderTime+updateTime);

    this.primitiveCount    = 0; // Number of primitives drawn
};

Statistics.prototype.addPrimitive = function()
{
    ++this.primitiveCount;
};

Statistics.prototype.addFrame = function(updateTime,renderTime)
{
    ++this.frameCount;
    this.renderTime += renderTime;
    this.updateTime += updateTime;
    this.totalTime = this.renderTime+this.updateTime;
};

var Stats;




var physScale = 10;

// Precalculated random numbers
var randomSeed = 1;
var random = function()
{
    var randomNums = [ 0.0976592,0.558489,0.741295,0.412519,0.493332,0.20716,0.977569,0.0885342,0.515885,0.372387,0.628986,0.155705,0.861415,0.860805,0.0907926,0.483505,0.255867,0.99118,0.4167,0.380078,0.867153,0.482955,0.27897,0.836909,0.195837,0.908963,0.235145,0.853664,0.725944,0.86874,0.832759,0.249336,0.116062,0.539048,0.582873,0.866054,0.213477,0.757561,0.334452,0.571551,0.671346,0.295785,0.0800501,0.966826,0.450728,0.47795,0.724448,0.205145,0.988861,0.801691,0.84753,0.828639,0.314158,0.716941,0.992492,0.0284738,0.890622,0.219337,0.510605,0.235603 ];
    randomSeed = (randomSeed+1) % randomNums.length;
    return randomNums[randomSeed];
};

var screenToPhys = function(v)
{
    return v/physScale;
};

var physToScreen = function(v)
{
    return v*physScale;
};

var rgba = function(r,g,b,a)
{
    if( a <= 0.0 )
    {
        return "rgba(" + r + "," + g + "," + b + ",0.0)";
    }
    if( a >= 1.0 )
    {
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

var lineColor = function(alpha)
{
    return rgba(0, 13, 55, alpha);
};

// Constructor for HitEffect
var HitEffect = function(posX,posY)
{
    this.posX = posX;
    this.posY = posY;
    this.TTL  = 0;
};

// Updates and draws a single hit effect.
HitEffect.prototype.draw = function(ctx)
{
    // move to config.
    var NUM_HIT_EFFECT_WAVES = 6;
    var HIT_EFFECT_WAVE_RADIUS = 35;
    var HIT_EFFECT_WAVE_SPEED = 1.0;

    this.TTL += HIT_EFFECT_WAVE_SPEED;

    var count = 0;
    for( var i=this.TTL; i>=1; i = i-NUM_HIT_EFFECT_WAVES )
    {
        ++count;
        if( count <= (NUM_HIT_EFFECT_WAVES/2) )
        {
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, i, 0, 2*Math.PI, false);
            ctx.strokeStyle = lineColor( 1.0 - (i/HIT_EFFECT_WAVE_RADIUS) );
            ctx.lineWidth = 2;
            Stats.addPrimitive();
            ctx.stroke();
        }
    }

    return count < NUM_HIT_EFFECT_WAVES + 1;


};


// Constructor for HitEffectController
var HitEffectController = function()
{
    this.effects = new Array();
};

// Draws all hit effects.
HitEffectController.prototype.draw = function(ctx)
{
    // Draw each effect
    for( var i=0; i<this.effects.length; ++i )
    {
        this.effects[i].draw(ctx);
        if( this.effects[i].draw(ctx) == false )
        {
            this.effects.pop();
            --i;
        }
    }
};

// Checks that is there any effects in aproximately in the same position.
// This is needed to prevent several effects, when two balls collides.
HitEffectController.prototype.hasSimilar = function(posX,posY)
{
    for( var i=0; i<this.effects.length; ++i )
    {
        var dX = Math.abs(this.effects[i].posX-posX);
        var dY = Math.abs(this.effects[i].posY-posY);
        if( dX < 25 && dY < 25 )
        {
            this.effects.posX = (this.effects.posX + posX) / 2;
            this.effects.posY = (this.effects.posY + posY) / 2;
            return true;
        }
    }

    return false;
};

HitEffectController.prototype.add = function(posX,posY)
{
    if( false == this.hasSimilar(posX,posY) )
    {
        this.effects.unshift( new HitEffect(posX,posY) );
    }
};


// Constructor for ball
var Ball = function(world,posX,posY,radius,speed,ballRestitution,ballFriction)
{
    this.radius = radius;
    this.speed  = speed;

    // Create circle collision shape (this is dynamic, because it has density)
    var circleSd = new b2CircleDef();
    circleSd.density        = 10.0;
    circleSd.radius            = screenToPhys(radius);
    circleSd.restitution    = ballRestitution;
    circleSd.friction        = ballFriction;

    // Create body
    var circleBd = new b2BodyDef();
    circleBd.AddShape(circleSd);
    circleBd.position.Set(screenToPhys(posX),screenToPhys(posY));
    circleBd.linearVelocity = new b2Vec2( 2*(random()-0.5), 2*(random()-0.5) ); // random direction
    circleBd.linearVelocity.Normalize();
    circleBd.linearVelocity.x *= screenToPhys(speed);
    circleBd.linearVelocity.y *= screenToPhys(speed);

    this.body = world.CreateBody(circleBd);

    this.prevVelocity = this.body.GetLinearVelocity().Copy();
    this.prevVelocity.Normalize();
    this.collisionPosition = new b2Vec2(0,0);
    this.prevPos =  new b2Vec2(posX,posY);
    this.trajectories = new Array();
    this.trajectories[this.trajectories.length] = new b2Vec2(posX,posY);
};

// Checks collision of the ball to an obstacle by detecting previous frame velocity
// to velocity in this frame. This function is made because Box2D have some bugs in
// collision detection (can not get all collision points correctly).
Ball.prototype.detectCollision = function()
{
    var curVelocity = this.body.GetLinearVelocity().Copy();
    curVelocity.Normalize();

    this.collisionPosition = curVelocity.Copy();
    this.collisionPosition.Subtract(this.prevVelocity);

    var res = false;

    if( this.collisionPosition.Length() > 0.05 )
    {
        this.collisionPosition.Normalize();

        var colPos = this.body.GetCenterPosition().Copy();
        colPos.Multiply(physToScreen(1));
        this.trajectories[this.trajectories.length] = this.prevPos.Copy();
        this.collisionPosition.Multiply(-this.radius);
        this.collisionPosition.Add(colPos);

        res = true;
    }

    this.prevVelocity = curVelocity.Copy();
    return res;
};

// Draws ball trajectories.
Ball.prototype.drawTrajectories = function(ctx)
{
    var TRAJECTORY_LENGTH = 400.0;

    var posX = physToScreen(this.body.GetCenterPosition().x);
    var posY = physToScreen(this.body.GetCenterPosition().y);
    this.prevPos.x = posX;
    this.prevPos.y = posY;
    var prevPos = new b2Vec2(posX,posY);
    var totalLen = 0;

    for(var i=this.trajectories.length-1; i>=0; --i )
    {
        var delta = this.trajectories[i].Copy();
        delta.Subtract(prevPos);
        var thisLen = delta.Length();

        var startC = 0.999 - (totalLen/TRAJECTORY_LENGTH);
        // Check trail color, if this trajectory line is invisible due
        // start color is total transparent, don't draw this line
        if( startC > 0.0  )
        {
            var endC = 0.999 - ((totalLen+thisLen)/TRAJECTORY_LENGTH);
            var endP = 1.0;
            if( endC < 0.0 )
            {
                endC = 0.0;
                endP = (TRAJECTORY_LENGTH-totalLen)/thisLen;
                if (endP>1.0)
                    endP = 1.0;
            }

            ctx.beginPath();
            ctx.lineWidth = 3;
            ctx.lineCap = "butt";
            ctx.moveTo(prevPos.x, prevPos.y);
            var grd = ctx.createLinearGradient(prevPos.x, prevPos.y,this.trajectories[i].x, this.trajectories[i].y);
            grd.addColorStop(0.0, lineColor(startC));
            grd.addColorStop(endP, lineColor(endC));
            startC = endC;
            ctx.strokeStyle = grd;
            ctx.lineTo(this.trajectories[i].x, this.trajectories[i].y);
            Stats.addPrimitive();
            ctx.stroke();

            prevPos.x = this.trajectories[i].x;
            prevPos.y = this.trajectories[i].y;
        }
        else
        {
            // Delete trajectories, which are invisible
            for( var j=0; j<i; ++j )
            {
                this.trajectories.shift();
            }
        }
        totalLen += thisLen;
    }
};

// Draws the ball to context according to ball position and rotation.
Ball.prototype.draw = function(ctx)
{
    // Fix speed to be constant (this.speed)
    var linVel = this.body.GetLinearVelocity();
    linVel.Normalize();
    linVel.x *= screenToPhys(this.speed);
    linVel.y *= screenToPhys(this.speed);
    this.body.SetLinearVelocity(linVel);

    // Draw ball
    var start = this.body.GetRotation();
    var step = Math.PI*2;

    var posX = physToScreen(this.body.GetCenterPosition().x);
    var posY = physToScreen(this.body.GetCenterPosition().y);

    // Draw trajectories
    this.drawTrajectories(ctx);

    // Glow
    ctx.beginPath();
    ctx.arc(posX, posY, this.radius+6, start, start+step, false);
    var grd = ctx.createRadialGradient(  posX, posY, this.radius+2, posX, posY, this.radius+6 );
    grd.addColorStop(0, lineColor(0.35));
    grd.addColorStop(1, lineColor(0.0));
    ctx.fillStyle = grd;
    Stats.addPrimitive();
    ctx.fill();

    // Center fill with almost black color
    ctx.beginPath();
    ctx.arc(posX, posY, this.radius, start, start+step, false);
    ctx.fillStyle = "#f0f0f0";
    Stats.addPrimitive();
    ctx.fill();

    // Stroke outlines and line inside the ball
    var p = this.body.GetWorldPoint( new b2Vec2(screenToPhys(-this.radius),0) );
    ctx.lineTo(physToScreen(p.x), physToScreen(p.y));
    ctx.strokeStyle = lineColor(1.0);
    ctx.lineWidth = 2;
    Stats.addPrimitive();
    ctx.stroke();
};

// Constructor for Box
var Box = function(world,posX,posY,rotation,sizeX,sizeY,wallRestitution,wallFriction)
{
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    // Create static box collision shape (this is static, because it does not have density)
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(screenToPhys(sizeX*0.5), screenToPhys(sizeY*0.5));
    groundSd.restitution = wallRestitution;
    groundSd.friction = wallFriction;

    // Create body
    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(screenToPhys(posX),screenToPhys(posY));
    groundBd.rotation = rotation;

    this.body = world.CreateBody(groundBd);
};

// Draws the box to context according to box position
Box.prototype.draw = function(ctx)
{
    var posX = physToScreen(this.body.GetCenterPosition().x);
    var posY = physToScreen(this.body.GetCenterPosition().y);

    var angle = this.body.GetRotation();
    ctx.translate(posX, posY);
    ctx.rotate(angle);

    // Draw Glow
    var w = 20;
    ctx.beginPath();
    ctx.moveTo(0, -this.sizeY*0.5 + this.sizeX*0.5 );
    ctx.lineTo(0, this.sizeY*0.5 - this.sizeX*0.5 );
    ctx.lineWidth = w;
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColor(0.15);
    Stats.addPrimitive();
    ctx.stroke();

    ctx.lineWidth = w+2;
    Stats.addPrimitive();
    ctx.stroke();

    ctx.strokeStyle = lineColor(0.08);
    ctx.lineWidth = w+4;
    Stats.addPrimitive();
    ctx.stroke();

    ctx.strokeStyle = lineColor(0.08);
    ctx.lineWidth = w+8;
    Stats.addPrimitive();
    ctx.stroke();

    ctx.strokeStyle = lineColor(0.04);

    ctx.lineWidth = w+12;
    Stats.addPrimitive();
    ctx.stroke();

    // Draw rectangle
    ctx.beginPath();
    ctx.rect(-this.sizeX*0.5, -this.sizeY*0.5, this.sizeX, this.sizeY);
    ctx.lineWidth = 2;
    ctx.strokeStyle = lineColor(1.0);
    ctx.fillStyle = "#f0f0f0";
    Stats.addPrimitive();
    ctx.fill();
    Stats.addPrimitive();
    ctx.stroke();

    ctx.rotate(-angle);
    ctx.translate(-posX, -posY);
};

// Class for grid impulse
var GridImpulse = function(startX, startY, delta)
{
    this.reset(startX,startY,delta);
};

GridImpulse.prototype.reset = function(startX, startY, delta)
{
    this.impulsePosX = startX;
    this.impulsePosY = startY;
    this.delta = delta;
};

GridImpulse.prototype.drawImpulse = function(ctx,posX,posY,directionX,directionY)
{
    var sx = Math.round(posX-directionX);
    var sy = Math.round(posY-directionY);
    var ex = Math.round(posX);
    var ey = Math.round(posY);
    var grd = ctx.createLinearGradient( sx, sy, ex, ey );
    grd.addColorStop(1, rgba(255,255,255,1.0) );
    grd.addColorStop(0, lineColor(0.0));
    ctx.strokeStyle = grd;
    //ctx.strokeStyle = rgba(255,255,255,1.0);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(posX-directionX, posY-directionY);
    ctx.lineTo(posX,posY);
    Stats.addPrimitive();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(posX, posY, 3, 0, Math.PI*2, false);
    var grd = ctx.createRadialGradient(  posX, posY, 0, posX, posY, 3 );
    grd.addColorStop(0, rgba(255,255,255,1.0));
    grd.addColorStop(1, lineColor(0.0));
    ctx.fillStyle = grd;
    Stats.addPrimitive();
    ctx.fill();
    ctx.closePath();
};

GridImpulse.prototype.drawHorizontal = function(ctx)
{
    var speed = 20;
    this.impulsePosX += speed;
    var d = this.delta*speed;
    this.impulsePosY += d;
    this.drawImpulse(ctx, this.impulsePosX,this.impulsePosY,speed,speed*this.delta);

    if( this.impulsePosX > 3900 )
        return false;

    return true;
};


GridImpulse.prototype.drawVertical = function(ctx)
{
    var speed = 20;
    this.impulsePosY -= speed;
    var d = this.delta*speed;
    this.impulsePosX += d;
    this.drawImpulse(ctx, this.impulsePosX,this.impulsePosY,speed*this.delta,-speed);

    if( this.impulsePosY < -1210 )
        return false;

    return true;
};


// Class for Level
var Level = function(world,sizeX,sizeY,wallRestitution,wallFriction)
{
    this.boxes = new Array();

    var scale = sizeX*sizeY / (1000*600);

    var padWidth = scale*12; // 12 if width == 1000
    var halfPadWidth = padWidth*0.5;

    // outlines
    //                      world,               posX,               posY, rotation,    sizeX,    sizeY, wallRestitution, wallFriction
    this.boxes[0] = new Box(world,      -halfPadWidth,          sizeY*0.5,        0, padWidth,    sizeY, wallRestitution, wallFriction);
    this.boxes[1] = new Box(world, sizeX+halfPadWidth,          sizeY*0.5,        0, padWidth,    sizeY, wallRestitution, wallFriction);
    this.boxes[2] = new Box(world,          sizeX*0.5,      -halfPadWidth, Math.PI*0.5, padWidth,    sizeX, wallRestitution, wallFriction);
    this.boxes[3] = new Box(world,          sizeX*0.5, sizeY+halfPadWidth, Math.PI*0.5, padWidth,    sizeX, wallRestitution, wallFriction);

    // pads in the center of level
    //                      world,       posX,      posY,      rotation,    sizeX,     sizeY, wallRestitution, wallFriction
    this.boxes[4] = new Box(world, sizeX*0.8, sizeY*0.75,  Math.PI*0.25, padWidth, scale*200, wallRestitution, wallFriction);
    this.boxes[5] = new Box(world, sizeX*0.2, sizeY*0.75, -Math.PI*0.25, padWidth, scale*200, wallRestitution, wallFriction);
    this.boxes[6] = new Box(world, sizeX*0.8, sizeY*0.25, -Math.PI*0.25, padWidth, scale*200, wallRestitution, wallFriction);
    this.boxes[7] = new Box(world, sizeX*0.2, sizeY*0.25,  Math.PI*0.25, padWidth, scale*200, wallRestitution, wallFriction);

    this.verticalGridStarts = new Array();
    this.verticalGridDeltas = new Array();
    this.horizontalGridStarts = new Array();
    this.horizontalGridDeltas = new Array();

    // Vertical grid
    var dir = 0.5;
    var dist = -2500;
    for(var i=0; i<26; ++i )
    {
        this.verticalGridStarts[i] = 60 + i*(80-i*0.9);
        var dx = (dir*dist) - this.verticalGridStarts[i];
        var dy = sizeY-dist;
        this.verticalGridDeltas[i] = dx/dy;
    }

    // Horizontal grid
    var dir = 44;
    var dist = 60;
    for(var i=0; i<15; ++i )
    {
        this.horizontalGridStarts[i] = -15 + i*(40+i*1.7);
        var dx = (dir*dist) - 0;
        var dy = dist-this.horizontalGridStarts[i];
        this.horizontalGridDeltas[i] = dy/dx;
    }

    var index = random()*this.horizontalGridDeltas.length-1;
    this.horizontalGridImpulse = new GridImpulse(0, this.horizontalGridStarts[7],this.horizontalGridDeltas[7]);

    var index = random()*this.verticalGridDeltas.length-1;
    this.verticalGridImpulse = new GridImpulse(this.verticalGridStarts[25],sizeY,this.verticalGridDeltas[25]);

};


Level.prototype.generateHorizontalGridImpulse = function()
{
    var index = Math.round(random() * (this.horizontalGridStarts.length-1));
    index %= this.horizontalGridStarts.length;
    var p1 = this.horizontalGridStarts[index];
    var p2 = this.horizontalGridDeltas[index];
    this.horizontalGridImpulse = new GridImpulse(0, p1,p2);
};

Level.prototype.generateVerticalGridImpulse = function()
{
    var index = Math.round(random() * (this.verticalGridStarts.length-1));
    index %= this.verticalGridStarts.length;
    var p1 = this.verticalGridStarts[index];
    var p2 = this.verticalGridDeltas[index];
    this.verticalGridImpulse = new GridImpulse(p1,600,p2);
};


// Utility function to draw grid line in the background.
drawLine = function(ctx, startX, startY, endX, endY)
{
    // Draw line itself
    ctx.beginPath();
    ctx.moveTo( startX, startY );
    ctx.lineTo( endX, endY );

    // Draw glow
    ctx.lineWidth = 2;
    ctx.strokeStyle = lineColor(0.1);
    Stats.addPrimitive();
    ctx.stroke();

    /*
     ctx.lineWidth = 8;
     ctx.strokeStyle = lineColor(0.008);
     Stats.addPrimitive();
     ctx.stroke();
     ctx.lineTo( startX, startY );
     */
    ctx.lineWidth = 14;
    ctx.strokeStyle = lineColor(0.008);
    Stats.addPrimitive();
    ctx.stroke();
    //ctx.lineTo( endX, endY );
};

// Draws world outlines to context.
Level.prototype.draw = function(ctx)
{
    // Horizontal grid
    for( var i=0; i<this.horizontalGridStarts.length; ++i )
    {
        drawLine(ctx, 0, this.horizontalGridStarts[i], 1000, this.horizontalGridStarts[i]+this.horizontalGridDeltas[i]*1000 );
    }

    // Vertical grid
    for( var i=0; i<this.verticalGridStarts.length; ++i )
    {
        drawLine(ctx, this.verticalGridStarts[i], 600, this.verticalGridStarts[i]+this.verticalGridDeltas[i]*600, 0 );
    }


    if( !this.horizontalGridImpulse.drawHorizontal(ctx) )
    {
        this.generateHorizontalGridImpulse();
    }

    if( !this.verticalGridImpulse.drawVertical(ctx) )
    {
        this.generateVerticalGridImpulse();
    }

    // Draw each box, ignore outlines
    for( var i=4; i<this.boxes.length; ++i )
    {
        this.boxes[i].draw(ctx);
    }
};

// Canvas test constructor. Initializes new canvas test from "2d" context
var CanvasTest = function(ctx)
{
    this.sizeX    = 1000;    // width
    this.sizeY    = 600; // height
    this.ctx    = ctx;    // save 2d context
    this.hitEffects = new HitEffectController();

    // Create physics world
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-50, -50);
    worldAABB.maxVertex.Set(this.sizeX + 50, this.sizeY + 50);
    var gravity = new b2Vec2(0, 0);
    var doSleep = false;
    this.physWorld = new b2World(worldAABB, gravity, doSleep);

    // Create level
    this.level = new Level(this.physWorld, this.sizeX, this.sizeY, 0.8, 0.95);

    var scale = this.sizeX*this.sizeY / (1000*600);

    // Create some balls
    this.balls = new Array();
    for( var x=0; x<5; ++x )
    {
        //                           phys world,                         posX,            posY,       radius, speed,   restitution, friction
        this.balls[x*2+0] = new Ball(this.physWorld, this.sizeX*(0.35+x*0.070), this.sizeY*0.2, 5+scale*(15+x), scale*500, 1.0, 1.0);
        //this.balls[x*3+1] = new Ball(this.physWorld, this.sizeX*(0.27+x*0.053), this.sizeY*0.50, 5+scale*(15+x), scale*500, 1.0, 0.95);
        this.balls[x*2+1] = new Ball(this.physWorld, this.sizeX*(0.35+x*0.070), this.sizeY*0.8, 5+scale*(15+x), scale*500, 1.0, 1.0);
    }

    Stats = new Statistics();
    Stats.reset();
};

// Updates and draws test.
CanvasTest.prototype.draw = function()
{
    // Get milliseconds in the beginning of the frame
    var d = new Date();
    var ms1 = d.getTime();

    // Animate physics world
    var timeStep = 1.0/(120);
    var iteration = 10;
    this.physWorld.Step(timeStep, iteration);

    //TODO: Box2D bugaa jotenkin ja t�m� ei oikein toimi kunnolla
    /*for (var cn = this.physWorld.GetContactList(); cn != null; cn = cn.next)
     {
     for( var i=0; i<cn.GetManifoldCount(); ++i )
     {
     var manifold = cn.GetManifolds()[i];

     var sumX=0;
     var sumY=0;
     for( var j=0; j<manifold.pointCount; ++j )
     {
     var pos = manifold.points[j].position;
     sumX += physToScreen(pos.x);
     sumY += physToScreen(pos.y);
     }

     if( manifold.pointCount > 0 )
     {
     this.numC++;
     this.hitEffects.add(sumX/manifold.pointCount, sumY/manifold.pointCount);
     }

     }
     }*/

    // Milliseconds after phys update
    var d = new Date();
    var ms2 = d.getTime();

    // Clear screen
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.sizeX, this.sizeY);
    var grd = this.ctx.createLinearGradient(0, this.sizeY, this.sizeX, 0);
    grd.addColorStop(0, "rgba(255,255,255,1.0)");
    grd.addColorStop(1, "rgba(225,225,225,1.0)");
    this.ctx.fillStyle = grd;
    Stats.addPrimitive();
    this.ctx.fill();

    // Draw level
    this.level.draw(this.ctx);

    // Draw balls
    for( var i=0; i<this.balls.length; ++i )
    {
        if( this.balls[i].detectCollision() )
        {
            this.hitEffects.add(this.balls[i].collisionPosition.x, this.balls[i].collisionPosition.y);
        }

        this.balls[i].draw(this.ctx);
    }

    // Draw hit effects
    this.hitEffects.draw(this.ctx);

    // Milliseconds after render
    var d = new Date();
    var ms3 = d.getTime();

    Stats.addFrame( ms2-ms1, ms3-ms2 );
};


// Returns statistics. Function call reset statictics values.
CanvasTest.prototype.getStats = function()
{
    return Stats;
};
