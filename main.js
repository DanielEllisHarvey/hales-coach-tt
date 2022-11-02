import times from "./times.json" assert {type: "json"};
//shows the time every second
setInterval(function () {var d = new Date();document.getElementById("time").innerHTML = String("Current time: "+String(d).substr(16,8))}, 1000);
//stuff you can edit
//coach numbers
const cL = times.coachNames;
//coach times
const cT = times.coachTimes;
//number of times per name
const nT = 2;
let tMs = [];
function getMs(n) {
	let dT = new Date();
	let now = Date.parse("01 Jan 2020 "+String(dT).substr(16,8));
	tMs[n] = Date.parse(String("01 Jan 2020 "+cT[n]+":00"));
	let tO = tMs[n] - now;
	if ((Math.sign(tO) != -1) && (dT.getDay() != (6||0))) {
		if (tO < 3600000 && tO > 60000) {
			return(String(Math.ceil((tO)/60000))+" Min - ");
		}
		else if (tO < 60000) {
			return("Now - ");
		}
		else if (tO > 10800000) {
			return(0);
		}
		else {
			return(String(Math.floor(tO/3600000))+" Hr "+String(Math.ceil(tO/60000)%60)+" Min - ");
		};
	}
	else {
		return(0);
	};
};

//makes and refreshes the table
setInterval(createTable, 1000);
function createTable() {
	let cTT = "<tr><th>Coach</th><th>arrival time</th></tr>";
	for (let i=0;i<cT.length;i++) {
		if (getMs(i) != 0) {
			cTT += "<tr class=\"body\"><td>"+cL[Math.floor(i/nT)]+"</td><td>"+getMs(i)+cT[i]+"</td></tr>";
		};
	};
	if (cTT != "<tr><th>Coach</th><th>arrival time</th></tr>") {
		document.getElementById("coachTable").innerHTML = cTT;
	}
	else {
		document.getElementById("coachTable").innerHTML = cTT+"<tr><td class=nocoach></td><td class=nocoach>There are no coaches arriving soon</td>";
	};
}
