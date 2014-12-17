
var w2n_endframe = 900; //the number of the recorded frames
var w2n_skipsearch = true; // whether skip merging the global variables with same value


var WebGLDebugUtilsW2N = function () {
	var glValidEnumContexts = { 
		'enable' : {
			1 : {
				0 : true
			}
		},
		'disable' : {
			1 : {
				0 : true
			}
		},
		'getParameter' : {
			1 : {
				0 : true
			}
		},
		'drawArrays' : {
			3 : {
				0 : true
			}
		},
		'drawElements' : {
			4 : {
				0 : true,
				2 : true
			}
		},
		'createShader' : {
			1 : {
				0 : true
			}
		},
		'getShaderParameter' : {
			2 : {
				1 : true
			}
		},
		'getProgramParameter' : {
			2 : {
				1 : true
			}
		},
		'getShaderPrecisionFormat' : {
			2 : {
				0 : true,
				1 : true
			}
		},
		'getVertexAttrib' : {
			2 : {
				1 : true
			}
		},
		'vertexAttribPointer' : {
			6 : {
				2 : true
			}
		},
		'bindTexture' : {
			2 : {
				0 : true
			}
		},
		'activeTexture' : {
			1 : {
				0 : true
			}
		},
		'getTexParameter' : {
			2 : {
				0 : true,
				1 : true
			}
		},
		'texParameterf' : {
			3 : {
				0 : true,
				1 : true
			}
		},
		'texParameteri' : {
			3 : {
				0 : true,
				1 : true,
				2 : true
			}
		},
		'texImage2D' : {
			9 : {
				0 : true,
				2 : true,
				6 : true,
				7 : true
			},
			6 : {
				0 : true,
				2 : true,
				3 : true,
				4 : true
			},
		},
		'texSubImage2D' : {
			9 : {
				0 : true,
				6 : true,
				7 : true
			},
			7 : {
				0 : true,
				4 : true,
				5 : true
			},
		},
		'copyTexImage2D' : {
			8 : {
				0 : true,
				2 : true
			}
		},
		'copyTexSubImage2D' : {
			8 : {
				0 : true
			}
		},
		'generateMipmap' : {
			1 : {
				0 : true
			}
		},
		'compressedTexImage2D' : {
			7 : {
				0 : true,
				2 : true
			}
		},
		'compressedTexSubImage2D' : {
			8 : {
				0 : true,
				6 : true
			}
		},
		'bindBuffer' : {
			2 : {
				0 : true
			}
		},
		'bufferData' : {
			3 : {
				0 : true,
				2 : true
			}
		},
		'bufferSubData' : {
			3 : {
				0 : true
			}
		},
		'getBufferParameter' : {
			2 : {
				0 : true,
				1 : true
			}
		},
		'pixelStorei' : {
			2 : {
				0 : true,
				1 : true
			}
		},
		'readPixels' : {
			7 : {
				4 : true,
				5 : true
			}
		},
		'bindRenderbuffer' : {
			2 : {
				0 : true
			}
		},
		'bindFramebuffer' : {
			2 : {
				0 : true
			}
		},
		'checkFramebufferStatus' : {
			1 : {
				0 : true
			}
		},
		'framebufferRenderbuffer' : {
			4 : {
				0 : true,
				1 : true,
				2 : true
			}
		},
		'framebufferTexture2D' : {
			5 : {
				0 : true,
				1 : true,
				2 : true
			}
		},
		'getFramebufferAttachmentParameter' : {
			3 : {
				0 : true,
				1 : true,
				2 : true
			}
		},
		'getRenderbufferParameter' : {
			2 : {
				0 : true,
				1 : true
			}
		},
		'renderbufferStorage' : {
			4 : {
				0 : true,
				1 : true
			}
		},
		'clear' : {
			1 : {
				0 : true
			}
		},
		'depthFunc' : {
			1 : {
				0 : true
			}
		},
		'blendFunc' : {
			2 : {
				0 : true,
				1 : true
			}
		},
		'blendFuncSeparate' : {
			4 : {
				0 : true,
				1 : true,
				2 : true,
				3 : true
			}
		},
		'blendEquation' : {
			1 : {
				0 : true
			}
		},
		'blendEquationSeparate' : {
			2 : {
				0 : true,
				1 : true
			}
		},
		'stencilFunc' : {
			3 : {
				0 : true
			}
		},
		'stencilFuncSeparate' : {
			4 : {
				0 : true,
				1 : true
			}
		},
		'stencilMaskSeparate' : {
			2 : {
				0 : true
			}
		},
		'stencilOp' : {
			3 : {
				0 : true,
				1 : true,
				2 : true
			}
		},
		'stencilOpSeparate' : {
			4 : {
				0 : true,
				1 : true,
				2 : true,
				3 : true
			}
		},
		'cullFace' : {
			1 : {
				0 : true
			}
		},
		'frontFace' : {
			1 : {
				0 : true
			}
		},
	};
	var glEnums = null;
	function init(ctx) {
		if (glEnums == null) {
			glEnums = {};
			for (var propertyName in ctx) {
				if (typeof ctx[propertyName] == 'number') {
					glEnums[ctx[propertyName]] = propertyName;
				}
			}
		}
	}
	function glEnumToString(value) {
		var name = glEnums[value];
		return (name !== undefined) ? ("GL_" + name) : value.toString();
	}

	//return the enum name of the argument, if not, return ""
	function glFunctionArgSuggestion(functionName, numArgs, argumentIndex, value) {
		var funcInfo = glValidEnumContexts[functionName];
		if (funcInfo !== undefined) {
			var funcInfo = funcInfo[numArgs];
			if (funcInfo !== undefined) {
				if (funcInfo[argumentIndex]) { //is enum
					return glEnumToString(value);
				}
			}
		}
		return "";
	}

	function WebGLUint(v) {
		this.value = v;
	}
	WebGLUint.prototype.valueOf = function () {
		return this.value;
	};
	function makeDebugContext(ctx, opt_onFunc) {

		init(ctx);

		function makeErrorWrapper(ctx, functionName) {
			var f = ctx["_" + functionName];
			return function () {
				for (var i = 0; i < W2N.gllist.length; i++) {
					if (W2N.gllist[i] == this)
						//console.log(i);
						W2N.gllist[i].callnum++;
				}
				var result = f.apply(ctx, arguments); 
				switch (functionName) {
				case "getAttribLocation": //cast the number to object
					result = new WebGLUint(result);
					break;
				}
				if (opt_onFunc) {
					opt_onFunc(functionName, arguments, result);
				}
				return result;

			};
		}
		//for all functioins in webgl, _fun=fun; fun=fun_error
		//when the workload calls fun, it actually calls fun_error, which contains the _fun and opt_onFunc.
		for (var propertyName in ctx) {
			if (typeof ctx[propertyName] == 'function') {
				ctx["_" + propertyName] = ctx[propertyName];
				ctx[propertyName] = makeErrorWrapper(ctx, propertyName); 
			}
		}
		return ctx;
	}
	return {
		'init' : init, //build a map from number to enum name.
		'glFunctionArgSuggestion' : glFunctionArgSuggestion, ////return the enum name of the argument, if not, return ""
		'makeDebugContext' : makeDebugContext, //hook all functions of webglcontext 
	};
}
();

var W2N = {
	endframe : w2n_endframe,
	skipsearch : w2n_skipsearch,
	blocksize : 50,//how many frames of commands are dumpped in one file
	varsize : 20000,//how many global vars are dumpped in one file
	arrayblock:10000,
	endflag : false,//true means tool stops recording.
	frame_count : 0,//current frame number
	flipY : false,// true means the next texture image need to flip y axis.
	global_variable : {}, //save all global variables
	variable_context : [], //webgl object variables. which means pointer in C/C++
	body_current : [], //save the opengl es functions in current frame
	body_list : [],// save all opengl es functions so far
	blob_list_global : [],// for dumping codes
	blob_list_init : [],
	blob_list_frame : [],
	blob_list_macro : [],
	gllist : [],
	widthdef : "",//the width of the canvas
	heightdef : "",//the height of the canvas
	
	WrapGLContext : function (gl) {
		gl = WebGLDebugUtilsW2N.makeDebugContext(gl, logGLCall);
		return gl;
	},
	GetCppArrayType : function (js_type) {// cast js array type to opengl C/C++ array type
		var ret = {
			"Array" : "GLfloat", 
			"Int8Array" : "GLbyte",
			"Uint8Array" : "GLubyte",
			"Int16Array" : "GLshort",
			"Uint16Array" : "GLushort",
			"Int32Array" : "GLint",
			"Uint32Array" : "GLuint",
			"Float32Array" : "GLfloat",
			"Float64Array" : "GLdouble",
		}
		[js_type];
		if (ret == undefined)
			this.ReportError("unknow js type conversion");
		else
			return ret;
	},
	GetGlobalVariableType : function (type) { //find the corresponding array in the global_variable.
		if (this.global_variable[type] == undefined)
			this.global_variable[type] = [];

		return this.global_variable[type];
	},
	GetGlobalVariableName : function (type, arrayvalue) {//if the variable is included in the global_variable, return its name.
		var arr = this.GetGlobalVariableType(type);
		var name = undefined;
		if (!this.skipsearch) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i]["value"] == arrayvalue) {
					name = arr[i]["name"];
					return name;
				}
			}
		}
		return name;
	},
	SetGlobalVariableName : function (type) { //set the global variable's name
		var arr = this.GetGlobalVariableType(type);
		return "g_" + type + "_" + arr.length;
	},
	GetStringFromArray : function (array) {//cast array to string
		var arrayvalue = "";
		var tmp;
		tmp = isNaN(array[0]) ? 0 : array[0];
		arrayvalue = arrayvalue + tmp;
		for (var i = 1; i < array.length; i++) {
			tmp = isNaN(array[i]) ? 0 : array[i];
			arrayvalue = arrayvalue + ", " + tmp;
		}
		return arrayvalue;
	},
	GetArrayCopy:function(array){//get the clone array of the original array object
		if (!array.slice){
			var clone= new array.constructor(array.length);
			clone.set(array);
		}
		else{
			var clone=array.slice(0);
		}
		return clone;
		
	},
	AddGlobalVariable : function (type, variable) {// add the variable to the global_variable
		var arr = this.GetGlobalVariableType(type);
		arr.push(variable);
	},
	AddVariableContext : function (object, name) { // add the webgl object to the variable_context
		this.variable_context.push({
			"name" : name,
			"object" : object,
		});
	},
	GetNameByObject : function (object) { //if the webgl object is included in the variable_context, return its name. 
		var name = undefined;
		var arr = this.variable_context;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i]["object"] == object){
				name = arr[i]["name"];
				return name;
				}
		}
		return undefined;
	},

	DumpGlobalVariableBlob : function () {//dump global variables
		this.blob_list_global = [];
		var varnum = 1;
		for (var type in this.global_variable) {
			var arr = this.global_variable[type];
			for (var i = 0; i < arr.length; i++) {
				var line = "";
				var item = arr[i];
				if (item["isconst"])
					line += "const ";
				line += item["type"] + " ";
				line += item["name"];
				if (item["isarray"])
					line += "[]";
				else
					line += "";
				if (item["value"]) {
					line += " = ";
					if (type == "String") {
						line += item["value"];
					} else if (type.indexOf("Array") != -1) {
						line += "{ ";
						/*line += item["value"][0]
                        for (var j=1; j<item["value"].length; j++) {
                           
                            line = line+", "+item["value"][j];
                        }
						*/
						if (item["value"].constructor.name=="Array"){
							line += item["value"].toString();
							line += ","
						}
						else{
							var div=parseInt(item["value"].length/W2N.arrayblock);
							var rem=item["value"].length%W2N.arrayblock;
							if (div>=1){
								console.log("length="+item["value"].length+" varnum="+varnum);
							}
							for (var j=0;j<div;j++){
								var tmp=Array.apply(null,item["value"].subarray(j*W2N.arrayblock,(j+1)*W2N.arrayblock));
								line += tmp.toString();
								line += ","
							}
							if (rem>1)
							{
								var tmp=Array.apply(null,item["value"].subarray(div*W2N.arrayblock,div*W2N.arrayblock+rem));
								line += tmp.toString();
								line += ","
							}else if(rem==1){
								line += item["value"][div*W2N.arrayblock];
								line += ","
							}
						
						}
						line += " }";
					}
				}
				line += ";"
				this.OutputBlobList(this.blob_list_global, line)

				if (varnum % this.varsize == 0) {
					console.log("" + varnum);
					this.OutputBlobList(this.blob_list_global, "W2N CONTINUE");
					var blob = new Blob(this.blob_list_global, {
							type : "text/plain;charset=utf-8"
						});
					saveAs(blob, "global" + varnum / this.varsize + ".txt");
					blob=null;
					this.blob_list_global = [];
				}
				varnum = varnum + 1;
			}
		}
		var blob = new Blob(this.blob_list_global, {
				type : "text/plain;charset=utf-8"
			});
		saveAs(blob, "global" + Math.ceil(varnum / this.varsize) + ".txt");
		blob=null;
	},

	DumpInitializeBlob : function () {// dump commands in initialization
		this.blob_list_init = [];
		this.OutputBlobList(this.blob_list_init, "/**** W2N Init Function *****/");
		var arr = this.body_list[0];
		for (var i = 0; i < arr.length; i++)
			this.OutputBlobList(this.blob_list_init, arr[i]);
		var blob = new Blob(this.blob_list_init, {
				type : "text/plain;charset=utf-8"
			});
		saveAs(blob, "init.txt");
		blob=null;
	},

	BeginInitialize : function () {},
	EndInitialize : function () {
		this.body_list.push(this.body_current);
		this.body_current = [];
	},
	BeginFrame : function () {
		this.frame_count++;
		if (this.frame_count > this.endframe) {
			this.endflag = true;
		}

	},
	EndFrame : function () {
		if (!this.endflag) {
			this.body_list.push(this.body_current);
			this.body_current = [];
		} else {
			//window.requestAnimationFrame=null;
		}
	},

	DumpFrameBlob : function (n) {
		var arr = this.body_list[n];
		for (var i = 0; i < arr.length; i++)
			this.OutputBlobList(this.blob_list_frame, arr[i]);
	},

	DumpAllFrameBlob : function () {
		this.blob_list_frame = [];
		var tmp = "";
		for (var i = 1; i <= this.endframe; i++) {
			tmp = "W2N FRAME: " + i;
			this.OutputBlobList(this.blob_list_frame, tmp);
			this.DumpFrameBlob(i);
			if (i % this.blocksize == 0) {
				console.log("" + i);
				tmp = "W2N CONTINUE"
					this.OutputBlobList(this.blob_list_frame, tmp);
				var blob = new Blob(this.blob_list_frame, {
						type : "text/plain;charset=utf-8"
					});
				saveAs(blob, "function" + i / this.blocksize + ".txt");
				blob=null;
				this.blob_list_frame = [];
			}
		}
		var blob = new Blob(this.blob_list_frame, {
				type : "text/plain;charset=utf-8"
			});
		saveAs(blob, "function" + Math.ceil(i / this.blocksize) + ".txt");
		blob=null;
	},
	CheckAttrib : function (attrib) {//get the attribute of webglcontext
		this.blob_list_macro = [];
		if (typeof(attrib) == 'undefined') {
			this.OutputBlobList(this.blob_list_macro, "#define PRESERVE_DARWING_BUFFER FALSE");
			this.OutputBlobList(this.blob_list_macro, "#define ALPHA TRUE");
			this.OutputBlobList(this.blob_list_macro, "#define STENCIL FALSE");
			this.OutputBlobList(this.blob_list_macro, "#define DEPTH TRUE");
			this.OutputBlobList(this.blob_list_macro, "#define ANTIALIAS TRUE");
			this.OutputBlobList(this.blob_list_macro, "#define PREMULTIPLIE_ALPHA  TRUE");
			return;
		}
		if (attrib['alpha'] == false)
			this.OutputBlobList(this.blob_list_macro, "#define ALPHA FALSE");
		else
			this.OutputBlobList(this.blob_list_macro, "#define ALPHA TRUE");
		if (attrib['depth'] == false)
			this.OutputBlobList(this.blob_list_macro, "#define DEPTH FALSE");
		else
			this.OutputBlobList(this.blob_list_macro, "#define DEPTH TRUE");
		if (attrib['stencil'] == true)
			this.OutputBlobList(this.blob_list_macro, "#define STENCIL TRUE");
		else
			this.OutputBlobList(this.blob_list_macro, "#define STENCIL FALSE");
		if (attrib['antialias'] == false)
			this.OutputBlobList(this.blob_list_macro, "#define ANTIALIAS FALSE");
		else
			this.OutputBlobList(this.blob_list_macro, "#define ANTIALIAS TRUE");
		if (attrib['premultipliedAlpha'] == false)
			this.OutputBlobList(this.blob_list_macro, "#define PREMULTIPLIE_ALPHA  FALSE");
		else
			this.OutputBlobList(this.blob_list_macro, "#define PREMULTIPLIE_ALPHA TRUE");
		if (attrib['preserveDrawingBuffer'] == true)
			this.OutputBlobList(this.blob_list_macro, "#define PRESERVE_DARWING_BUFFER TRUE");
		else
			this.OutputBlobList(this.blob_list_macro, "#define PRESERVE_DARWING_BUFFER FALSE");
	},

	DumpMacro : function () {//dump the macro
		this.OutputBlobList(this.blob_list_macro, "#define WIDTH_DEF " + this.widthdef);
		this.OutputBlobList(this.blob_list_macro, "#define HEIGHT_DEF " + this.heightdef);
		var blob = new Blob(this.blob_list_macro, {
				type : "text/plain;charset=utf-8"
			});
		saveAs(blob, "macro.txt");
		blob=null;
	},
	OutputBlobList : function (bloblist, line) {
		var line1 = line + '\r\n';
		bloblist.push(line1);
	},
	OutputLine : function (line) {
		console.log(line);
	},

	ReportError : function (msg) {
		console.error(msg);
	},
	Dump : function () {//dump functions, global vars and macro
		console.log("start downloading MACRO");
		this.DumpMacro();
		console.log("start downloading INIT");
		this.DumpInitializeBlob();
		console.log("start downloading FRAME");
		this.DumpAllFrameBlob();
		this.body_list=null;
		console.log("start downloading GV");
		this.DumpGlobalVariableBlob();
		this.global_variable=null;
		
		
		console.log("FINISH");

	},

};


//record the webgl commands and variables, and translate to opengl style
function logGLCall(functionName, args, result) {

	var cIsComment = false; // if some functions exist only in webgl or are used for querying, comment them.
	var cFunctionName = "gl" + functionName.substr(0, 1).toUpperCase() + functionName.substr(1); //function name change: from webgl style to opengl style
	var cArgs = [];
	var cResult = "";

	if (!W2N.endflag) {
		// step 1:
		// deal with all arguments of the funtion
		// classify into 4 types: string, array, number and webgl object.
		for (var i = 0; i < args.length; i++) {
			var suggestion = WebGLDebugUtilsW2N.glFunctionArgSuggestion(functionName, args.length, i, args[i]);
			var type = args[i] && args[i].constructor ? args[i].constructor.name : "";
			if (type.indexOf("Array") != -1) { 
				if (type == "Array" &&
					(functionName == "uniform1i" || functionName == "uniform2i" || functionName == "uniform3i" || functionName == "uniform4i" ||
						functionName == "uniform1iv" || functionName == "uniform2iv" || functionName == "uniform3iv" || functionName == "uniform4iv")) {
					type = "Int32Array";
				}
				var arrayvalue = W2N.GetArrayCopy(args[i]);
				var name = W2N.GetGlobalVariableName(type, arrayvalue);
				if (name == undefined) {
					name = W2N.SetGlobalVariableName(type);
					W2N.AddGlobalVariable(type, {
						"name" : name,
						"type" : W2N.GetCppArrayType(type),
						"value" : arrayvalue,
						"isarray" : true,
						"isconst" : true,
					});
				}
				cArgs.push(name);
			} else if (type.indexOf("WebGL") != -1) { 
				var name = W2N.GetNameByObject(args[i]);
				if (name == undefined) {
					name = W2N.SetGlobalVariableName(type);
					W2N.AddGlobalVariable(type, {
						"name" : name,
						"type" : "GLuint",
					});
					W2N.AddVariableContext(args[i], name);
				}
				cArgs.push(name);
			} else if (type == "String") { 
				var stringvalue = '';
				stringvalue = '"' + args[i].replace(/\n/g, "\\n\"\n\"") + '"';
				var name = W2N.GetGlobalVariableName(type, stringvalue);
				if (name == undefined) {
					name = W2N.SetGlobalVariableName(type);
					W2N.AddGlobalVariable(type, {
						"name" : name,
						"type" : "GLchar*",
						"value" : stringvalue,
						"isconst" : true,
					});
				}
				cArgs.push(name);
			} else {
				if (suggestion != "")
					cArgs.push(suggestion);
				else if (args[i] == null)
					cArgs.push("NULL");
				else
					cArgs.push(args[i].valueOf()); 
			}
		}
		// step 2:
		// process the "return" value, only deal with the webgl object
		var type = result ? result.constructor.name : "";
		if (type.indexOf("WebGL") != -1
			 && functionName != "getActiveAttrib"
			 && functionName != "getActiveUniform") { // WebGL object
			var name = W2N.SetGlobalVariableName(type);
			W2N.AddGlobalVariable(type, {
				"name" : name,
				"type" : "GLuint",
			});
			W2N.AddVariableContext(result, name);
			cResult = name;
		}
		// step 3:
        //special operations for some function.for some query functions, we "comment" them.
		switch (functionName) { 
		case "bindBuffer":
			if (cArgs[1] == "NULL")
				cArgs[1] = "0";
			break;
		case "bindFramebuffer":
			if (cArgs[1] == "NULL")
				cArgs[1] = "0";
			break;
		case "bindRenderbuffer":
			if (cArgs[1] == "NULL")
				cArgs[1] = "0";
			break;
		case "bindTexture":
			if (cArgs[1] == "NULL")
				cArgs[1] = "0";
			break;
		case "bufferData":
			var oldArgs = cArgs;
			if (cArgs[1].toString().indexOf("Array") == -1) {
				W2N.body_current.push("createZeros(" + cArgs[1] + ");");
				cArgs = [];
				cArgs.push(oldArgs[0]);
				cArgs.push(oldArgs[1]);
				cArgs.push("zerosArray");
				cArgs.push(oldArgs[2]);
			} else {

				cArgs = [];
				cArgs.push(oldArgs[0]);
				cArgs.push("sizeof(" + oldArgs[1] + ")");
				cArgs.push(oldArgs[1]);
				cArgs.push(oldArgs[2]);
			}
			break;
		case "bufferSubData":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(oldArgs[1]);
			cArgs.push("sizeof(" + oldArgs[2] + ")");
			cArgs.push(oldArgs[2]);
			break;
		case "compressedTexImage2D":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(oldArgs[1]);
			cArgs.push(oldArgs[2]);
			cArgs.push(oldArgs[3]);
			cArgs.push(oldArgs[4]);
			cArgs.push(oldArgs[5]);
			cArgs.push(args[6].byteLength);
			cArgs.push(oldArgs[6]);
			break;
		case "compressedTexSubImage2D":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(oldArgs[1]);
			cArgs.push(oldArgs[2]);
			cArgs.push(oldArgs[3]);
			cArgs.push(oldArgs[4]);
			cArgs.push(oldArgs[5]);
			cArgs.push(oldArgs[6]);
			cArgs.push(args[7].byteLength);
			cArgs.push(oldArgs[7]);
			break;
		case "clearDepth":
			cFunctionName = "glClearDepthf";
			break;
		case "createBuffer":
			cFunctionName = "glGenBuffers";
			cArgs.push("1");
			cArgs.push("&" + cResult);
			cResult = "";
			break;
		case "createFramebuffer":
			cFunctionName = "glGenFramebuffers";
			cArgs.push("1");
			cArgs.push("&" + cResult);
			cResult = "";
			break;
		case "createRenderbuffer":
			cFunctionName = "glGenRenderbuffers";
			cArgs.push("1");
			cArgs.push("&" + cResult);
			cResult = "";
			break;
		case "createTexture":
			cFunctionName = "glGenTextures";
			cArgs.push("1");
			cArgs.push("&" + cResult);
			cResult = "";
			break;
		case "depthRange":
			cFunctionName = "glDepthRangef";
			break;
		case "drawElements":
			cArgs[3] = "(const GLvoid*)" + cArgs[3];
			break;
		case "deleteTexture":
			cFunctionName = "glDeleteTextures";
			var oldArgs = cArgs;
			cArgs=[];
			cArgs.push("1");
			cArgs.push("&"+oldArgs[0]);
			break;
		case "deleteBuffer":
			cFunctionName = "glDeleteBuffers";
			var oldArgs = cArgs;
			cArgs=[];
			cArgs.push("1");
			cArgs.push("&"+oldArgs[0]);
			break;
		case "deleteFramebuffer":
			cFunctionName = "glDeleteFramebuffers";
			var oldArgs = cArgs;
			cArgs=[];
			cArgs.push("1");
			cArgs.push("&"+oldArgs[0]);
			break;
		case "deleteRenderbuffer":
			cFunctionName = "glDeleteRenderbuffers";
			var oldArgs = cArgs;
			cArgs=[];
			cArgs.push("1");
			cArgs.push("&"+oldArgs[0]);
			break;
		case "framebufferRenderbuffer":
			if (cArgs[1] == "GL_DEPTH_STENCIL_ATTACHMENT") {
				cArgs[1] = "GL_STENCIL_ATTACHMENT";
				W2N.body_current.push("glFramebufferRenderbuffer(" + cArgs[0] + ",GL_DEPTH_ATTACHMENT," + cArgs[2] + "," + cArgs[3] + ");");
				W2N.body_current.push("checkGlError(\"glFramebufferRenderbuffer\",__LINE__);");
			}
			if (args[3]==null)
				cArgs[3]='0';
			break;
		case "framebufferTexture2D":
			if (args[3]==null)
				cArgs[3]='0';
			break;
		case "getParameter":
			cFunctionName = "glGetString";
			cIsComment = true;
			break;
		case "getSupportedExtensions":
			cFunctionName = "glGetString";
			cIsComment = true;
			break;
		case "getShaderParameter":
			cFunctionName = "glGetShaderiv";
			cIsComment = true;
			break;
		case "getProgramParameter":
			cFunctionName = "glGetProgramiv";
			cIsComment = true;
			break;
		case "pixelStorei":
			if (cArgs[0] == "GL_UNPACK_FLIP_Y_WEBGL") {
				cIsComment = true;
				if (args[1] == true)
					W2N.flipY = true;
			}
			if (cArgs[0] == "GL_UNPACK_PREMULTIPLY_ALPHA_WEBGL")
				cIsComment = true;
			if (cArgs[0] == "GL_UNPACK_COLORSPACE_CONVERSION_WEBGL")
				cIsComment = true;
			break;

		case "getShaderInfoLog":
		case "getProgramInfoLog":
		case "getActiveAttrib":
		case "getActiveUniform":
		case "getUniform":
		case "getExtension":
		case "getVertexAttrib":
		case "getVertexAttribOffset":
		case "getAttachedShaders":
		case "getShaderSource":
		case "getShaderPrecisionFormat":
		case "getError":
		case "ignoreErrors":
		case "isBuffer":
		case "isEnabled":
		case "isFramebuffer":
		case "isProgram":
		case "isRenderbuffer":
		case "isShader":
		case "isTexture":
			cIsComment = true;
			break;
		case "shaderSource":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push("1");
			cArgs.push("(const char **)&" + oldArgs[1]);
			cArgs.push("NULL");
			break;
		case "texImage2D":
			if (cArgs.length == 6) {
				var tmp = cArgs[5].outerHTML;
				var index1 = tmp.indexOf('src="') + 5;
				var index2 = tmp.indexOf('"', index1);
				var img_name = tmp.substr(index1, index2 - index1);
				var img_suffix = img_name.substr(img_name.lastIndexOf(".") + 1);
				var stringvalue = '"/sdcard/' + img_name + '"';
				var variable_name = W2N.GetGlobalVariableName("String", stringvalue);
				if (variable_name == undefined) {
					variable_name = W2N.SetGlobalVariableName("String");
					W2N.AddGlobalVariable("String", {
						"name" : variable_name,
						"type" : "GLchar*",
						"value" : stringvalue,
						"isconst" : true,
					});
				}
				console.log(stringvalue); //for debug
				W2N.body_current.push("decodeImage(" + variable_name + "," + cArgs[3] + "," + cArgs[4] + "," + W2N.flipY.toString() + ");");
				W2N.flipY = false;
				var oldArgs = cArgs;
				cArgs = [];
				cArgs.push(oldArgs[0]);
				cArgs.push(oldArgs[1]);
				cArgs.push(oldArgs[2]);
				cArgs.push("imgWidth");
				cArgs.push("imgHeight");
				cArgs.push("0");
				cArgs.push(oldArgs[3]);
				cArgs.push(oldArgs[4]);
				cArgs.push("(void *)bitImage");
			}
			break;
		case "uniform1i":
		case "uniform2i":
		case "uniform3i":
		case "uniform4i":
		case "uniform1f":
		case "uniform2f":
		case "uniform3f":
		case "uniform4f":
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform1iv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length);
			cArgs.push(oldArgs[1]);
			//cArgs[2] = "(const GLint*)" + oldArgs[1];
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform2iv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length / 2);
			cArgs.push(oldArgs[1]);
			//cArgs[2] = "(const GLint*)" + oldArgs[1];
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform3iv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length / 3);
			cArgs.push(oldArgs[1]);
			//cArgs[2] = "(const GLint*)" + oldArgs[1];
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform4iv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length / 4);
			cArgs.push(oldArgs[1]);
			//cArgs[2] = "(const GLint*)" + oldArgs[1];
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform1fv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length);
			cArgs.push(oldArgs[1]);
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform2fv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length / 2);
			cArgs.push(oldArgs[1]);
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform3fv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length / 3);
			cArgs.push(oldArgs[1]);
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniform4fv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[1].length / 4);
			cArgs.push(oldArgs[1]);
			if (cArgs[0] == "NULL")
				cIsComment = true;
			break;
		case "uniformMatrix2fv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[2].length / 4);
			cArgs.push(oldArgs[1]);
			cArgs.push(oldArgs[2]);
			if (cArgs[0] == "NULL")
				cIsComment = true;
			if (cArgs[2] == "NULL")
				cArgs[2] = "GL_FALSE";
			break;
		case "uniformMatrix3fv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[2].length / 9);
			cArgs.push(oldArgs[1]);
			cArgs.push(oldArgs[2]);
			if (cArgs[0] == "NULL")
				cIsComment = true;
			if (cArgs[2] == "NULL")
				cArgs[2] = "GL_FALSE";
			break;
		case "uniformMatrix4fv":
			var oldArgs = cArgs;
			cArgs = [];
			cArgs.push(oldArgs[0]);
			cArgs.push(args[2].length / 16);
			cArgs.push(oldArgs[1]);
			cArgs.push(oldArgs[2]);
			if (cArgs[0] == "NULL")
				cIsComment = true;
			if (cArgs[2] == "NULL")
				cArgs[2] = "GL_FALSE";
			break;
		case "renderbufferStorage":
			if (cArgs[1] == "GL_DEPTH_STENCIL") {
				cArgs[1] = "GL_DEPTH24_STENCIL8_OES";
			}
			break;

		case "vertexAttribPointer":
			if (cArgs.length == 6) {
				cArgs[5] = "(const GLvoid*)" + cArgs[5];
			}
			if (args[0].value == -1) {
				cIsComment = true;
			} else {
				W2N.body_current.push("if((int)" + cArgs[0] + "!=-1)// W2N:active attribute");
			}
			break;
		case "viewport":
			W2N.widthdef = String(args[2] - args[0]);
			W2N.heightdef = String(args[3] - args[1]);
			cArgs[0] = '0';
			cArgs[1] = '0';
			cArgs[2] = 'w';
			cArgs[3] = 'h';
			break;
		case "enableVertexAttribArray":
		case "disableVertexAttribArray":
			if (args[0].value == -1) {
				cIsComment = true;
			} else {
				W2N.body_current.push("if((int)" + cArgs[0] + "!=-1)// W2N:active attribute");
			}
			break;
		}
		// step 4
		// generate c++ code
		var line = "";
		if (cIsComment)
			line += "// ";
		if (cResult != "")
			line += cResult + " = ";
		line += cFunctionName + "(";
		for (var i = 0; i < cArgs.length; i++) {
			if (i != 0)
				line += ", ";
			line += cArgs[i];
		}
		line += ");";
		W2N.body_current.push(line);
		if (!cIsComment) {
			W2N.body_current.push("checkGlError(\"" + cFunctionName + "\",__LINE__);");
		}
	}
	
}

//hook the webglcontext
var _getContext_ = HTMLCanvasElement.prototype.getContext;
HTMLCanvasElement.prototype.getContext = function () {
	var contextNames = ["moz-webgl", "webkit-3d", "experimental-webgl", "webgl", "3d"];
	var requestingWebGL = contextNames.indexOf(arguments[0]) != -1;
	var skip = 0;
	if (requestingWebGL) {
		W2N.CheckAttrib(arguments[1]);
		var trueWebgl = _getContext_.apply(this, arguments);
		for (var i = 0; i < W2N.gllist.length; i++) {
			if (W2N.gllist[i] == trueWebgl){
				skip=1;//skip to re-wrap the glcontext, or it will call logGLCall twice.
				break;
			}			
		}
		if (!skip) 
		{
			var wrapWebgl = W2N.WrapGLContext(trueWebgl);
			wrapWebgl.callnum = 0;
			W2N.gllist.push(wrapWebgl);
			return wrapWebgl;
		} else
			return trueWebgl;

	} else {
		return _getContext_.apply(this, arguments);
	}
};

//hook the requestanimationframe
_requestAnimationFrame_ = window.requestAnimationFrame;
window.requestAnimationFrame = function (callback) {
	if (W2N.endflag == false) {
		if (W2N.frame_count == 0) {
			arguments[0] = function (cb) {
				return function () {
					W2N.EndInitialize();
					W2N.BeginFrame();
					cb();
					W2N.EndFrame();
				}
			}
			(callback);
		} else {
			arguments[0] = (function (cb) {
				return function () {
					W2N.BeginFrame();
					cb();
					W2N.EndFrame();
				}
			})(callback);
		}
		return _requestAnimationFrame_.apply(window, arguments);
	} else {
		console.log("W2M:RAF STOP");
	}
};
_webkitRequestAnimationFrame_ = window.wibkitRequestAnimationFrame;
window.wibkitRequestAnimationFrame = function (callback) {
	if (W2N.endflag == false) {
		if (W2N.frame_count == 0) {
			arguments[0] = function (cb) {
				return function () {
					W2N.EndInitialize();
					W2N.BeginFrame();
					cb();
					W2N.EndFrame();
				}
			}
			(callback);
		} else {
			arguments[0] = (function (cb) {
				return function () {
					W2N.BeginFrame();
					cb();
					W2N.EndFrame();
				}
			})(callback);
		}
		return _webkitRequestAnimationFrame_.apply(window, arguments);
	} else {
		console.log("W2M:RAF STOP");
	}
};
