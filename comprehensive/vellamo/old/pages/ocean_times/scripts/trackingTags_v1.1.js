sleep_for(20);
var new_node = document.createElement('script');
new_node.setAttribute('language', 'javascript');
new_node.setAttribute('type', 'text/javascript');
new_node.setAttribute('src', 'http://localhost:18080/ocean_times/scripts/controller_v1.1.js');
document.getElementsByTagName('head').item(0).appendChild(new_node);

var new_node2 = document.createElement('script');
new_node2.setAttribute('language', 'javascript');
new_node2.setAttribute('type', 'text/javascript');
new_node2.setAttribute('src', 'http://localhost:18080/ocean_times/scripts/gw.js');
document.getElementsByTagName('head').item(0).appendChild(new_node2);

var new_node3= document.createElement('script');
new_node3.setAttribute('language', 'javascript');
new_node3.setAttribute('type', 'text/javascript');
new_node3.setAttribute('src', 'http://localhost:18080/ocean_times/scripts/revenuescience.js');
document.getElementsByTagName('head').item(0).appendChild(new_node3);

doc_write_url("http://localhost:18085/ocean_times/scripts/beacon.js");
doc_write_raw("<script> sleep_for(19);</script>");
// adding async nodes