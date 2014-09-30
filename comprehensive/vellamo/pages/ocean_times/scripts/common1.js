//Lots of versions of sleep_for in order to keep JS compiler busier (nytimes has >1MB of JS code!)

function sleep_for(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
//	performAll = delay > 5 && Math.random() < 0.2;
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep1(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep1_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep1(mod);
	for (i = 0; i < tens; i += 1) {
		sleep1(10);
	}
}
function sleep2(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep2_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep2(mod);
	for (i = 0; i < tens; i += 1) {
		sleep2(10);
	}
}
function sleep3(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep3_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep2(mod);
	for (i = 0; i < tens; i += 1) {
		sleep3(10);
	}
}
function sleep4(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep4_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep4(mod);
	for (i = 0; i < tens; i += 1) {
		sleep4(10);
	}
}
function sleep5(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep5_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep4(mod);
	for (i = 0; i < tens; i += 1) {
		sleep5(10);
	}
}
function sleep6(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep6_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep6(mod);
	for (i = 0; i < tens; i += 1) {
		sleep6(10);
	}
}
function sleep7(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep7_for(delay) {
	'use strict';
	var fortys, mod, i;
	fortys = Math.floor(delay / 40);
	mod = delay - fortys * 40;
	sleep7(mod);
	for (i = 0; i < fortys; i += 1) {
		sleep4(10);
		sleep5(10);
		sleep6(10);
		sleep7(10);
	}
}
function sleep8(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep8_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep8(mod);
	for (i = 0; i < tens; i += 1) {
		sleep8(10);
	}
}
function sleep9(delay) {
	'use strict';
	var sleep_now, performAll, i, fillMe, sum, mess, bigMess, loop, longString,
		a1, a2, a3, a4, a5, a6, a7, a8, a9,
		b1, b2, b3, b4, b5, b6, b7, b8, b9,
		c1, c2, c3, c4, c5, c6, c7, c8, c9,
		d1, d2, d3, d4, d5, d6, d7, d8, d9,
		e1, e2, e3, e4, e5, e6, e7, e8, e9,
		f1, f2, f3, f4, f5, f6, f7, f8, f9,
		g1, g2, g3, g4, g5, g6, g7, g8, g9,
		h1, h2, h3, h4, h5, h6, h7, h8, h9;
	sleep_now = Number(new Date());
	performAll = Math.random() > 1.0;
	if (performAll) {
		fillMe = [];
		for (i = 0; i < 100; i += 1) {
			fillMe[i] = delay;
		}
		a1 = a2 = a3 = a4 = a5 = a6 = a7 = a8 = a9 = [b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = [c1 = c2 = c3 = c4 = c5 = c6 = c7 = c8 = c9 = [d1 = d2 = d3 = d4 = d5 = d6 = d7 = d8 = d9 = [e1 = e2 = e3 = e4 = e5 = e6 = e7 = e8 = e9 = [f1 = f2 = f3 = f4 = f5 = f6 = f7 = f8 = f9 = [g1 = g2 = g3 = g4 = g5 = g6 = g7 = g8 = g9 = [
			h1 = h2 = h3 = h4 = h5 = h6 = h7 = h8 = h9 = function () { return ["abcdefgh", 0]; }
		]]]]]]];
		mess = [
			[a1, a2, a3, a4, a5, a6, a7, a8, a9],
			[b1, b2, b3, b4, b5, b6, b7, b8, b9],
			[c1, c2, c3, c4, c5, c6, c7, c8, c9],
			[d1, d2, d3, d4, d5, d6, d7, d8, d9],
			[e1, e2, e3, e4, e5, e6, e7, e8, e9],
			[f1, f2, f3, f4, f5, f6, f7, f8, f9],
			[g1, g2, g3, g4, g5, g6, g7, g8, g9],
			[h1, h2, h3, h4, h5, h6, h7, h8, h9]
		];
		bigMess = {
			"num": 100.0,
			"pi": 3.14159265358979323846,
			"str7": "abcdefg",
			"prop": {
				"mess1": mess,
				"mess2": mess
			},
			"func": function () { return bigMess; },
			"regExp": new RegExp(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8)).exec(mess[0][0][0][0][0][0][0][0][0]()[0].substring(0, 8))
		};
	}
	loop = 0;
	longString = "-1";
	while (sleep_now + delay > Number(new Date())) {
		if (performAll) {
			sum = 0;
			for (i = 0; i < fillMe.length; i += 1) {
				sum += fillMe[i];
			}
			longString += " " + loop;
			loop += 1;
			delay = Math.floor(sum / bigMess.func().num);
		}
	}
	return longString;
}
function sleep9_for(delay) {
	'use strict';
	var tens, mod, i;
	tens = Math.floor(delay / 10);
	mod = delay - tens * 10;
	sleep8(mod);
	for (i = 0; i < tens; i += 1) {
		sleep9(10);
	}
}
function doc_write_url(url) {
	'use strict';
	var txt = "<script type='text/javascript' src='" + url + "'></script>";
	document.write(txt);
}
function doc_write_raw(txt) {
	'use strict';
	document.write(txt);
}
sleep_for(25);
doc_write_url("http://localhost:18082/ocean_times/scripts/prototype.js");
doc_write_url("http://localhost:18082/ocean_times/scripts/template.js");
doc_write_url("http://localhost:18082/ocean_times/scripts/env.js");
doc_write_url("http://localhost:18081/ocean_times/scripts/urllist.js");
doc_write_url("http://localhost:18081/ocean_times/scripts/boot.js");
doc_write_url("http://localhost:18081/ocean_times/scripts/boot2.js");

/*
var sleep_now = Number(new Date());

function externalFunction1(i) { return i + 1; }

while(sleep_now+500>Number(new Date())) { var tmp = sleep_now; }

if ( 'function' == typeof(scriptSleepOnload) ) 
	// scriptSleepOnload('http://1.cuzillion.com/bin/resource.cgi?type=js&sleep=2&n=2&t=1314296593');
	scriptSleepOnload('JS1.js');

document.write("<script type='text/javascript' src='JS2.js'></script>")
*/

