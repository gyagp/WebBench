function sleep_for(delay) {
    var sleep_now = Number(new Date());
    var i;
    var fillMe = [];
    while(sleep_now+delay>Number(new Date())) {
    	for (i=0; i<100; i++) {
        	fillMe[i] = sleep_now;
    	}
    }
}
sleep_for(4);