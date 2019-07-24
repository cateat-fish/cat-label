
function forMatNum(num){
	return num<10?'0'+num:num+'';
}

function initHours(startHour,endHour){
	let hours=[];
	for(let k=startHour*1;k<=endHour*1;k++){
		hours.push({
			label:forMatNum(k),
			value:forMatNum(k),
			flag:false
		})
	}
	return hours;
}
function initMinutes(minuteStep){
	let minutes=[];
	for(let j=0;j<60;j+=minuteStep*1){
		minutes.push({
			label:forMatNum(j),
			value:forMatNum(j)
		})
	}
	return minutes;
}
function initBefore(dayStep=7,startHour=8,endHour=20,minuteStep=1,afterStep=30) {
	let startDate=new Date();
	let bsDate=new Date(new Date().getTime()+afterStep*60*1000);
	let date=[];
	let hours=[];
	let minutes=[];
	let hour=bsDate.getHours();
	let minute=Math.floor(bsDate.getMinutes()/minuteStep)*minuteStep;
	let weeks=["周日","周一","周二","周三","周四","周五","周六"];
	for(let i=0;i<dayStep;i++){
		let year,month,day,weekday;
		year=startDate.getFullYear();
		month=forMatNum(startDate.getMonth()+1);
		day=forMatNum(startDate.getDate());
		weekday=weeks[startDate.getDay()];
		let label="";
		switch(i){
			case 0:
				label="今天";
				break;
			case 1:
				label="明天"
				break;
			case 2:
				label="后天"
				break;
			default:
				label=month+"月"+day+"日"+" "+weekday;
				break;
		}
		date.push({
			label:label,
			value:year+"-"+month+"-"+day,
			flag:i==0?true:false
		})
		startDate.setDate(startDate.getDate()+1);
	}
	for(let k=hour;k<=endHour;k++){
		hours.push({
			label:forMatNum(k),
			value:forMatNum(k),
			flag:k==hour?true:false
		})
	}
	for(let j=minute;j<60;j+=minuteStep*1){
		minutes.push({
			label:forMatNum(j),
			value:forMatNum(j)
		});
	}
	return {date,hours,minutes};
}
export{
	initHours,
	initMinutes,
	initBefore
}