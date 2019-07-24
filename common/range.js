function forMatNum(num){
	return num<10?'0'+num:num+'';
}

function initToDate(){
	let years,months,days;
	return [years,months,days]
}
function initRangeDays(year,month){
	let totalDays=new Date(year,month,0).getDate();
	let dates=[];
	for(let d=1;d<=totalDays;d++){
		dates.push(forMatNum(d));
	};
	return dates;
}
function initRange(start,end,value,flag) {
	let aToday=new Date();
	let tYear,tMonth,tDay,tHours,tMinutes,tSeconds,defaultVal=[];
	let initstartDate=new Date(start);
	let endDate=new Date(end);
	if(start>end){
		initstartDate=new Date(end);
		endDate=new Date(start);
	};
	let startYear=initstartDate.getFullYear();
	let startMonth=initstartDate.getMonth()+1;
	let endYear=endDate.getFullYear();
	let fyears=[],fmonths=[],fdays=[],tyears=[],tmonths=[],tdays=[],returnArr=[];
	let curMonth=flag?value[1]*1:(value[1]+1);
	let totalDays=new Date(startYear,curMonth,0).getDate();
	for(let s=startYear;s<=endYear;s++){
		fyears.push(s+'');
	};
	for(let m=1;m<=12;m++){
		fmonths.push(forMatNum(m));
	};
	for(let d=1;d<=totalDays;d++){
		fdays.push(forMatNum(d));
	};
	for(let s=startYear;s<=endYear;s++){
		tyears.push(s+'');
	};
	for(let m=1;m<=12;m++){
		tmonths.push(forMatNum(m));
	};
	for(let d=1;d<=totalDays;d++){
		tdays.push(forMatNum(d));
	};
	if(flag){
		defaultVal=[fyears.indexOf(value[0]),fmonths.indexOf(value[1]),fdays.indexOf(value[2]),0,tyears.indexOf(value[0]),tmonths.indexOf(value[1]),tdays.indexOf(value[2])]
		return {
			fyears,
			fmonths,
			fdays,
			tyears,
			tmonths,
			tdays,
			defaultVal
		}
	}else{
		return {
			fyears,
			fmonths,
			fdays,
			tyears,
			tmonths,
			tdays,
		}
	}
}
export{
	initToDate,
	initRangeDays,
	initRange
}