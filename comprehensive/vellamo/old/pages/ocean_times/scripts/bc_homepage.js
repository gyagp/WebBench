var new_node = document.createElement('script');
new_node.setAttribute('language', 'javascript');
new_node.setAttribute('type', 'text/javascript');
new_node.setAttribute('src', 'http://localhost:18081/ocean_times/scripts/playlistCache.js');
document.getElementsByTagName('head').item(0).appendChild(new_node);
sleep_for(8);