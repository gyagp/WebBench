var guide={isDoable:false,operations:0,time:0,internalCounter:true,testName:"Graphics HTML5 WebGL",testVersion:"2.0",compareScore:10.4,isConformity:0};var myScene={};
var test={
init:function(){
//$.ajax({url:"/ajax/set_test",async:false,type:"POST",data:{test_name:guide.testName,test_version:guide.testVersion}});
if(Modernizr.webgl){
guide.isDoable=true;
guide.operations=1;
try{
$("#theCanvas").css({opacity:0});
SceneJS.createScene({type:"scene",id:"the-scene",canvasId:"theCanvas",flags:{backfaces:false},nodes:[{type:"renderer",clearColor:{r:122/255,g:218/255,b:225/255},clear:{depth:true,color:true},nodes:[{type:"rotate",id:"pitch",angle:0,x:1,nodes:[{type:"rotate",id:"yaw",angle:0,y:1,nodes:[{type:"lookAt",eye:{x:0,y:0.8,z:1.1},look:{x:0,y:0.8,z:1},up:{y:1},nodes:[{type:"camera",optics:{type:"perspective",fovy:40,aspect:1.47,near:0.1,far:300},nodes:[{type:"translate",x:0,y:-0.1,z:-2,nodes:[{type:"material",baseColor:{r:1,g:1,b:1},specularColor:{r:0.4,g:0.4,b:0.4},specular:0.2,shine:6,emit:1,nodes:[lipasto,portaikko,statue,tuomiokirkko,vvm,ground,kirjasto,kortteli_a,kortteli_b,kortteli_c,museo,skydome]}]}]}]}]}]}]}]});myScene=SceneJS.scene("the-scene");$("#theCanvas").animate({opacity:0.05},100);$("#theCanvas").animate({opacity:0.1},95);$("#theCanvas").animate({opacity:0.15},90);$("#theCanvas").animate({opacity:0.2},85);$("#theCanvas").animate({opacity:0.25},80);$("#theCanvas").animate({opacity:0.3},75);$("#theCanvas").animate({opacity:0.35},70);$("#theCanvas").animate({opacity:0.4},65);$("#theCanvas").animate({opacity:0.45},60);$("#theCanvas").animate({opacity:0.5},55);$("#theCanvas").animate({opacity:0.55},50);$("#theCanvas").animate({opacity:0.6},45);$("#theCanvas").animate({opacity:0.65},40);$("#theCanvas").animate({opacity:0.7},35);$("#theCanvas").animate({opacity:0.75},30);$("#theCanvas").animate({opacity:0.8},25);$("#theCanvas").animate({opacity:0.85},20);$("#theCanvas").animate({opacity:0.9},15);$("#theCanvas").animate({opacity:0.95},10);$("#theCanvas").animate({opacity:1},5)}catch(a){guide.isDoable=false}}return guide},run:function(b,a){myScene.start({idleFunc:function(){if(benchmark.elapsedTime()>=15000){myScene.stop();$("canvas").remove();debugData={};elapsed=benchmark.elapsedTime();finalScore=counter/elapsed*1000;debugData.elapsedTime=elapsed;debugData.operations=counter;debugData.ops=finalScore;benchmark.submitResult(finalScore,guide,debugData)}else{var d=myScene.findNode("yaw");var c=myScene.findNode("pitch");d.set("angle",d.get("angle")+0.4);if(benchmark.elapsedTime()<7500){c.set("angle",c.get("angle")+0.05)}else{c.set("angle",c.get("angle")-0.05)}benchmark.increaseCounter()}}})}};