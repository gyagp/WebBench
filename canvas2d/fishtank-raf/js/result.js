var CELL_SIZE=60;
var pb_content_element;
var wl_times = Number(getQueryValue("wl_total_round"));
var sc_times = Number(getQueryValue("se_total_round"));
var total_times = wl_times * sc_times;

function page_load_func(){
	var btime = getQueryValue("btime");
	var etime = new Date().toLocaleTimeString();
		
	build_result_head("Workload Fishtank",btime,etime);
		
	var scenario_name_list = Workload_Category.scenarios.all;

	for ( plfi in scenario_name_list){
		var result = getQueryValue(scenario_name_list[plfi] + "_result");
		
		if( result == "") continue;
		
		var target = scenario_name_list[plfi];
		var scenario_list = getQueryValue("scenarios");
		var case_list = getScenarioTestString(scenario_list,target);
		
		result_list = result.split(";");
		for( rllsi in result_list){
			result_list[rllsi] += "|"+case_list[rllsi];
		}
		result = result_list.join(";");
		pb_content_element = document.getElementById("result_pb_content");
	
		var target_name = eval("Workload_Category.scenarios."+target+".name");
	
		build_result_content(target,result);
		//pb_content_element.appendChild(document.createElement("hr"));
		//pb_content_element.appendChild(document.createElement("hr"));
	}
}

function build_result_head(target_name,btime,etime){
	document.getElementById("title_main").innerHTML = "Result for "	+ target_name;
	document.getElementById("title_sub").innerHTML = "Run whole worklod " + wl_times + 
														" times, each scenario " + sc_times + " times" +
														", from " + btime +" to " + etime+ "<br/>" + getOsAndBrowserInfo() ;
		
		
}

function build_result_content(target,result){
	var single_result_list = result.split(";");
	var total_time = 0;
	
	for ( x in single_result_list ){
		total_time += buildResultContent(target,single_result_list[x]);
	}
	
	var div_pm = document.createElement("div");
 	div_pm.className = "cont_primary_metric	";
	div_pm.innerHTML = "&nbsp;" +target+" Scenario Primary Metrics = " + Math.ceil(total_time) + "ms";
	pb_content_element.appendChild(div_pm);
}

function buildResultContent(target,result_list){
	var items = result_list.split("|");
	var test_id = items.pop();
	
	buildItemResultHead(target,test_id);	
	
	var div_detail = document.createElement("div");
	//div_detail.className = "cont_detail";
	
	
	buildItemResultTable(div_detail,items);
	
	var dl_title = document.createElement("div");
	//dl_title.className = "dl_title";
	
	var single_result = buildSingleMetric(target,dl_title,items);
	div_detail.appendChild(dl_title);
	
	
	pb_content_element.appendChild(div_detail);
	pb_content_element.appendChild(document.createElement("hr"));
	
	return single_result;
}

function buildItemResultHead(target,test_id){
	var div_head = document.createElement("div");
	div_head.className = "cont_title";
	div_head.innerHTML = eval("Workload_Category.scenarios." + target +
				".cases[" + test_id + "].name");
	pb_content_element.appendChild(div_head);
}

function buildItemResultTable(div_detail,items){
	var re_table = document.createElement("table");
	re_table.className = "result_table";
	
	var head_row = re_table.insertRow(0);
	head_row.className = "result_table_head";
	var contain_row = re_table.insertRow(1);
	contain_row.className = "result_table_content";
	
	for( x in items ){
		var value_pair = items[x].split(":");
		
		var cell_title = head_row.insertCell(x);
		cell_title.width = CELL_SIZE + "px";
		cell_title.innerHTML = value_pair[0];
		contain_row.insertCell(x).innerHTML = Math.ceil(Number(value_pair[1])/total_times) + "ms";
	}
	
	div_detail.appendChild(re_table);
	
}

function buildSingleMetric(target,dl_title,items){
	var target_function = eval("metricCalculator." + target);
	var mresult = target_function(items);
	
	dl_title.innerHTML = mresult.ihtml;
	return mresult.value;
}


function getQueryValue(para_name){
	var sValue=location.search.match(new RegExp("[\?\&]"+para_name+"=([^\&]*)(\&?)","i"))
	return sValue?sValue[1]:sValue;
}

function getScenarioTestString(scenario_list,sc_name){
	var sc_str = scenario_list.match(new RegExp(sc_name+":[^|]*(?=($|\|))","i"));
	
	sc_str = sc_str[0]; 
	var case_list = sc_str.split(":");
	case_list = case_list[1];

	var case_array = case_list.split(",");
	if(case_list == "") case_array = new Array();
	return case_array;
}

function getOsAndBrowserInfo(){
	return navigator.appVersion;
}