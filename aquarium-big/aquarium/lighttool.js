




var W2N = {
	startframe:1,
	endframe:600,//10s
	endflag:0,
	frame_count : 0,
 
   	SetStartEndFrame: function(startf,endf){
	this.startframe=startf;
	this.endframe=endf;
	},

    WrapGLContext : function (gl) { //重新封装一下gl
   
        return gl;
    },
    BeginInitialize : function () {
    },
    EndInitialize : function () {

		
    },
    BeginFrame : function () {
        this.frame_count++;
		if(this.frame_count>this.endframe||this.frame_count<this.startf){
		this.endflag=1;
		}
		line="W2N:"+this.frame_count;
		console.log(line);
        
    },
    EndFrame : function () {
		line="W2N:end"+this.frame_count;
		console.log(line);
		if (this.endflag){
			window.requestAnimationFrame=null;
			g_drawOnce=true;
			console.log("W2N:STOP FRAME");
			}
	},

};
