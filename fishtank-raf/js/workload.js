/*=====run selected link====*/

function runSelectedLink(){
	var sce_list_array = new Array();
	var first_scenario_index = -1;
	
	var scenario_name_list = Workload_Category.scenarios.all;
	
	for ( rsl in scenario_name_list){
		var sce_name = scenario_name_list[rsl];
	
		var case_list = eval("Workload_Category.scenarios." + 
							sce_name + ".cases");
		
		var case_num_list = new Array();
		
		for ( rslasi in case_list){
			var cb_ref = document.getElementById("cb_" + 
								sce_name +"_" + rslasi);
			if(cb_ref.checked == true ){
				case_num_list.push(rslasi);
			}
			
		}
		
		if( first_scenario_index == -1 && case_num_list.length != 0){
			first_scenario_index = rsl;
		}
		
		sce_list_array.push(sce_name +
				":" + case_num_list.join(","));
	}
	
	if( first_scenario_index == -1){
		alert("Please Select Scearios Need to Test");
		return;
	}
	
	var btime = new Date().toLocaleTimeString();
	
	workload_status.scenario_list = sce_list_array.join("|");
	workload_status.btime = btime;
	workload_status.cur_sce_index = first_scenario_index;
	jumpIndexRunningStatus();
}

function jumpIndexRunningStatus(){
	var index_url = "index_auto.html?mode=running";
	
	var workload_times = document.getElementById("wl_times").value;
	var scenario_times = document.getElementById("sc_times").value;
	
	if ( workload_times.search(/^\d+$/) == -1 ) workload_times = "1";
	if ( scenario_times.search(/^\d+$/) == -1 ) scenario_times = "1";
	
	if( index_url.search("=") != -1)
		index_url = encodeURL(index_url,"wl_total_round",workload_times);
	else
		index_url = index_url.concat("?wl_total_round=" + wokload_times);
	index_url = encodeURL(index_url,"se_total_round",scenario_times);
	index_url = encodeURL(index_url,"wl_rem_round",(Number(workload_times) - 1));
	index_url = encodeURL(index_url,"se_rem_round",(Number(scenario_times) - 1));
	
	index_url = encodeURL(index_url,"scenarios",
						workload_status.scenario_list);
	

	index_url = encodeURL(index_url,"cur_sce_index",workload_status.cur_sce_index);
	index_url = encodeURL(index_url,"cur_cas_index",-1);
	
	var scenario_name_list = Workload_Category.scenarios.all;
	
	for ( jirsi in scenario_name_list){
		index_url = encodeURL(index_url,
							scenario_name_list[jirsi]+"_result",
							"");
	}
	
	index_url = encodeURL(index_url,"btime",
						workload_status.btime);
	//alert(index_url);

	window.location.href = index_url;
}

function encodeURL(url,para_name,para_value){
		
	return url.concat("&" + para_name +
						"=" + para_value);
}

function getScenarioTestString(sc_name){
	var sc_str = workload_status.scenario_list.match(
										new RegExp(sc_name+":[^|]*(?=($|\|))","i"));
	if( sc_str == null) return new Array();
	sc_str = sc_str[0]; 
	var case_list = sc_str.split(":");
	case_list = case_list[1];

	var case_array = case_list.split(",");
	if(case_list == "") case_array = new Array();
	return case_array;
}

var workload_status = {
	wl_total_round	:	1 ,
	se_total_round	:	1 ,
	wl_rem_round	:	1 ,
	se_rem_round	:	1 ,
	scenario_list	:	"" ,
	cur_sce_index	:	0 ,
	cur_cas_index	:	0 ,
	result 			: 	[],
	btime			:	"",
	status_flag		:	0
}

function getQueryValue(para_name){
	var sValue=location.search.match(new RegExp("[\?\&]"+para_name+"=([^\&]*)(\&?)","i"))
	return sValue?sValue[1]:sValue;
}

window.onload = function() {
	var mode = getQueryValue("mode");
	var autostart = getQueryValue("autostart");
	// do the normally page init process
	if( mode == null || mode == ""){
		page_content_init();
		
		if( autostart != null && autostart == "yes"){
			runSelectedLink();
		}
		
		
	}
	
	// do the running process
	if( mode == "running" ){
		fetchURLParameterValue();
		
		
		var sc_name = Workload_Category.scenarios.all[workload_status.cur_sce_index];
		var case_array = getScenarioTestString(sc_name);
		/*alert(workload_status.wl_rem_round + " " +
				workload_status.se_rem_round + " " + 
				workload_status.cur_sce_index + " " +
				workload_status.cur_cas_index);
		alert(case_array.length);
		alert(workload_status.scenario_list);
		*/
		if( workload_status.cur_cas_index < case_array.length - 1 ){
			
			workload_status.cur_cas_index ++;			
			runScenarioCase();
			return;
		}
		
		
		if( workload_status.se_rem_round > 0 ){
			workload_status.cur_cas_index = 0;
			workload_status.se_rem_round --;
			
			runScenarioCase();
			return;
		}
		
		
		
		//alert("next scenario");
		if( workload_status.cur_sce_index < Workload_Category.scenarios.all.length - 1){
			
			do{
				workload_status.cur_sce_index ++;
			//	alert("next scenario = " + workload_status.cur_sce_index);
				if( workload_status.cur_sce_index == Workload_Category.scenarios.all.length ){
					if( workload_status.wl_rem_round == 0){
						callResultPage();
						return ;
					}
					workload_status.wl_rem_round --;
					
					workload_status.cur_sce_index = 0;
				}	
			
				sc_name = Workload_Category.scenarios.all[workload_status.cur_sce_index];
				case_array = getScenarioTestString(sc_name);
				//alert("next sce = " +case_array.length);
			}while( case_array.length == 0 );
			
			
			workload_status.cur_cas_index = 0;
			workload_status.se_rem_round = workload_status.se_total_round - 1;
			
			runScenarioCase();
			return;
		}
		
		if( workload_status.wl_rem_round == 0){
			callResultPage();
			return ;
		}else{
			workload_status.wl_rem_round --;
			workload_status.cur_sce_index = 0;
			workload_status.cur_cas_index = 0;
			workload_status.se_rem_round = workload_status.se_total_round - 1;
			
			runScenarioCase();
			return;
		}
				
	}
}

function fetchURLParameterValue(){
	workload_status.wl_total_round = testParamterAndReturnValueDefault("wl_total_round",Number,1);
	workload_status.se_total_round = testParamterAndReturnValueDefault("se_total_round",Number,1);
	workload_status.wl_rem_round = testParamterAndReturnValueDefault("wl_rem_round",Number,0);
	workload_status.se_rem_round = testParamterAndReturnValueDefault("se_rem_round",Number,0);
	
	workload_status.scenario_list = testParamterAndReturnValueDefault("scenarios",null,"");
	
	var scenario_name_list = Workload_Category.scenarios.all;
	var sclist = new Array();
	for ( fupvi in scenario_name_list){
		var sc_ca_list = getScenarioTestString(scenario_name_list[fupvi]);
		
		workload_status.result[fupvi] = testParamterAndReturnValueDefault(scenario_name_list[fupvi]+"_result",null,"");
		
		if(sc_ca_list.length == 0)
			sclist.push(scenario_name_list[fupvi]+":");
		else
			sclist.push(scenario_name_list[fupvi] + ":" + sc_ca_list.join(","));
	}

	workload_status.scenario_list = sclist.join("|");
	
	workload_status.cur_sce_index = testParamterAndReturnValueDefault("cur_sce_index",Number,0);
	workload_status.cur_cas_index = testParamterAndReturnValueDefault("cur_cas_index",Number,-1);

	workload_status.btime = testParamterAndReturnValueDefault("btime",null,new Date().toLocaleTimeString());
	
	//alert(workload_status.result[0]);	
	
	mergeResult();
	
	//alert(workload_status.result[0]);
	
	
}

function testParamterAndReturnValueDefault(pa_name, func,default_value){
	var temp_values = getQueryValue(pa_name);
	
	if( temp_values != "" && temp_values != null){
		if( func != null)
			return func(temp_values);
		else return temp_values;
	}
	return default_value;
	
}

function mergeResult(){
	var last_result = getQueryValue("last_result");
	
	if( last_result != "" && last_result != null){
		
		if( workload_status.result[workload_status.cur_sce_index] == "" ){
			workload_status.result[workload_status.cur_sce_index] = last_result;
			return;
		}
		
		var result_list = workload_status.result[workload_status.cur_sce_index].split(";");
		
		if ( result_list.length -1 < workload_status.cur_cas_index) {
			workload_status.result[workload_status.cur_sce_index] += ";" + last_result;
			return ;
		}
		
		var detail_list = result_list[workload_status.cur_cas_index].split("|");
		var lst_det_list = last_result.split("|");
		
		for( mri in detail_list){
			detail_list[mri] = pairMerge(detail_list[mri],lst_det_list[mri]);
		}
		
		result_list[workload_status.cur_cas_index] = detail_list.join("|");
		
		workload_status.result[workload_status.cur_sce_index] = result_list.join(";");
	}
}

function pairMerge(pair1,pair2){
	var p1_values = pair1.split(":");
	var p2_values = pair2.split(":");
	
	return p1_values[0] + ":" + (Number(p1_values[1]) + Number(p2_values[1]));
}

function runScenarioCase(){
	/*alert(workload_status.wl_rem_round + " " +
				workload_status.se_rem_round + " " + 
				workload_status.cur_sce_index + " " +
				workload_status.cur_cas_index);
	*/
	var sc_name = Workload_Category.scenarios.all[workload_status.cur_sce_index];
	var case_list = getScenarioTestString(sc_name);

	var next_url = eval("Workload_Category.scenarios." + sc_name +
				".cases[" + case_list[workload_status.cur_cas_index] + "].url");

	if( next_url.search("=") != -1)
		next_url = encodeURL(next_url,
					"wl_total_round",workload_status.wl_total_round);
	else 
		next_url = next_url.concat("?wl_total_round=" + workload_status.wl_total_round);
	next_url = encodeURL(next_url,
					"se_total_round",workload_status.se_total_round);
	next_url = encodeURL(next_url,
					"wl_rem_round",workload_status.wl_rem_round);
	next_url = encodeURL(next_url,
					"se_rem_round",workload_status.se_rem_round);
	
	next_url = encodeURL(next_url,"scenarios",
						workload_status.scenario_list);
	
	next_url = encodeURL(next_url,
					"cur_sce_index",workload_status.cur_sce_index);
	next_url = encodeURL(next_url,
					"cur_cas_index",workload_status.cur_cas_index);
	
	
	var scenario_name_list = Workload_Category.scenarios.all;
	
	for ( rsci in scenario_name_list){
		next_url = encodeURL(next_url,
							scenario_name_list[rsci]+"_result",
							workload_status.result[rsci]);
	}
	
	next_url = encodeURL(next_url,"btime",
						workload_status.btime);
				
	//alert("next url = " + next_url);
	var war_element = document.getElementById("warning_message");
	var time_count = 3;
	
	function runnext(){
		if( time_count != 0){
			war_element.innerHTML = "Automaticlly Start Next Test in "+ 
								time_count+" Secondes...";
			time_count --;
			setTimeout(runnext,1000);
		}else{
			window.location.href = next_url;
		}
	}
	page_content_init();
	
	var a_links = document.getElementsByTagName("a");
	
	for( var a_i =0; a_i < a_links.length ; a_i ++){
		a_links[a_i].href = null;
	}
	
	var button_links = document.getElementsByTagName("button");
	
	for( var b_i =0; b_i < button_links.length ; b_i ++){
		button_links[b_i].disabled = true;
	}
	
	var input_links = document.getElementsByTagName("input");
	
	for( var in_i =0; in_i < input_links.length ; in_i ++){
		input_links[in_i].disabled = true;
	}
	
	runnext();
}
/*==========================================*/
/* used for check box policy                */
/*==========================================*/
function page_content_init(){
	buildCheckBoxHierarchy();
	selectAllScenario();
	
	workloadSpecificInit();
}

function buildCheckBoxHierarchy(){
	var wcwa = Workload_Category.scenarios.all;
	var wl_id_list = new Array();
	
	for( x in wcwa ){
		wl_id_list.push("cb_" + wcwa[x]);
	}
	
	bindCheckBoxHierarchy("cb_all",wl_id_list);
	
	for( x in wcwa){
		buildWorkloadItemCheckBoxHierarchy(wcwa[x]);
	}
}

function buildWorkloadItemCheckBoxHierarchy(wl_name){
	var wl_case_num = eval("Workload_Category.scenarios."
							+ wl_name + ".cases.length");
							
	var item_id_list = new Array();
	
	for ( i = 0; i< wl_case_num ; i++ ){
		item_id_list.push( "cb_"+ wl_name + "_" + i );
	}
	
	bindCheckBoxHierarchy("cb_" + wl_name,item_id_list);
}

function selectAllScenario(){
	document.getElementById("cb_all").cbhierarchy.select();	
}


function show_hide_detail(name){
		
	var detail_target = document.getElementById(name);
	
	if(detail_target == null){
		return;
	}
	if(detail_target.style.display == "none") 
		detail_target.style.display = "";
	else
		detail_target.style.display = "none"
		
}

function cbonclick(){
	if(this.checked == true){
		this.cbhierarchy.select();
		this.cbhierarchy.siblingAllSelectTest();
	}
	else{
		this.cbhierarchy.unselect();
		this.cbhierarchy.uncheckParent();
	}		
	
}
	
function bindCheckBoxHierarchy(parentId,childNameIdList){
	var parent = document.getElementById(parentId);
	if( parent.cbhierarchy == null){
		parent.cbhierarchy = new checkBoxHierarchy(parent);
	}
	
	for( i in childNameIdList){
		var child = document.getElementById(childNameIdList[i]);
		if( child.cbhierarchy == null){
			child.cbhierarchy = new checkBoxHierarchy(child);
		} 
		
		parent.cbhierarchy.childList.push(child);
		child.cbhierarchy.parent = parent;
	}
	
}

function unbindCheckBoxHierarchy(parentId,childNameId){
	//alert("unbind " +parentId +" and "+ childNameId);
	var parent = document.getElementById(parentId);
	var child = document.getElementById(childNameId);
	
	if( parent.cbhierarchy == null)
		return;
	
	if( child.cbhierarchy.parent == null)
		return;
	
	var newChildList = new Array();
	
	for ( ui in parent.cbhierarchy.childList){
		if ( parent.cbhierarchy.childList[ui] != child) 
			newChildList.push(parent.cbhierarchy.childList[ui]);
		else child.cbhierarchy.parent = null;
	}
	
	if ( parent.cbhierarchy.childList.length > newChildList.length) 
		parent.cbhierarchy.childList = newChildList;
		
	return;
}

function checkBoxHierarchy(self){
	var parent;
	var self;
	var childList;
	
	this.self = self;
	this.childList = new Array()
		
	this.select = cbselect;
	this.unselect = cbunselect;
	this.siblingAllSelectTest = cbtestIfAllSiblingSelected;
	this.uncheckParent = cbuncheckParent;
		
	this.self.onclick = cbonclick;
	
}

function cbselect(){
	this.self.checked = true;
	
	for ( x in this.childList){
		this.childList[x].cbhierarchy.select();
	}
}

function cbunselect(){
	this.self.checked = false;
	
	for ( x in this.childList){
		this.childList[x].cbhierarchy.unselect();
	}
}

function cbtestIfAllSiblingSelected(){
	if( this.parent == null) return;
	
	var clst = this.parent.cbhierarchy.childList;
	for ( x in clst ){
		if( clst[x].checked == false) return;
	}
	
	this.parent.checked = true;
	
	this.parent.cbhierarchy.siblingAllSelectTest();
}

function cbuncheckParent(){
	if (this.parent == null) return;
	
	this.parent.checked = false;
	
	this.parent.cbhierarchy.uncheckParent();
}

function callResultPage(){
	//alert("result page");
	
	var result_url = "result.html";
	
	result_url = result_url.concat("?wl_total_round=",
				workload_status.wl_total_round);
	result_url = encodeURL(result_url,
				"se_total_round",workload_status.se_total_round);
					
	result_url = encodeURL(result_url,"scenarios",
				workload_status.scenario_list);
	

	
	var scenario_name_list = Workload_Category.scenarios.all;
	
	for ( rsci in scenario_name_list){
		result_url = encodeURL(result_url,
					scenario_name_list[rsci]+"_result",
					workload_status.result[rsci]);
	}
	
	result_url = encodeURL(result_url,"btime",
						workload_status.btime);				
	
	
	window.location.href = result_url;
}