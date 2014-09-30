var WORLOAD_NAME = "MyAlbum";
var WORKLOAD_VERSION = "1.0.0.0";


var Workload_Category = {
	scenarios : {
		fish_tank : {
			cases : [
				{	name : "20 Fish for 500 frames",
					url : "fish_tank.html?mode=auto&web_auto=true"
				}
			],
			
			name : "Fish Tank Scenario	 ",
			description : "This demo uses the canvas element to draw fish swimming in a fish tank. The FPS count tells you how many frames per second the browser is able to draw."
		},
			
		all : ["fish_tank"]
	},
	
	name : "Fish Tank",
	version : "1.0.0.0",
	team : "SSG",
	description : "This demo uses the canvas element to draw fish swimming in a fish tank. The FPS count tells you how many frames per second the browser is able to draw."
};

function workloadSpecificInit(){};

var metricCalculator = { 
	fish_tank : function(items) { 
		var values = items[0].split(":");
		var val = Math.ceil(Number(values[1]) / total_times);
		return { ihtml : "&nbsp;Draw total "+values[0] +" frames in " + val + "ms" ,
				value : val };
	}
};