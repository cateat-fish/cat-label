// 不能为空
let noemptyPatt = /\S/
// 手机号
let phonePatt = /^1((3[\d])|(4[5,6,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[1-8])|(9[1,8,9]))\d{8}$/;
// 身份证号
let cardPatt = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/;
// email地址
let emailPatt = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// 国内座机电话
let landlinePatt = /\d{3}-\d{8}|\d{4}-\d{7}/;
// 护照
let passportPatt = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;
// 中国邮政编码
let zipPatt = /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/
// 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线组合
let usernamePatt = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
let passwordPatt = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
// qq号
let qqPatt = /^[1-9][0-9]{4,10}$/;
// 微信号，6至20位，以字母开头，字母，数字，减号，下划线
let wechatPatt = /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/;
// A股代码
let ACodePatt = /^(s[hz]|S[HZ])(000[\d]{3}|002[\d]{3}|300[\d]{3}|600[\d]{3}|60[\d]{4})$/;
// 版本号
let versionCodePatt = /^\d+(\.\d+){2}$/;
// 日期	2000-01-01或2000-1-1
let datePatt = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
// 24小时制时间
let time24Patt = /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/;
// 12小时制时间
let time12Patt = /^(1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/;
// 日期时间  2014-01-01 12:00:00
let dateTimePatt = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
// 数字/货币金额  (支持负数、千分位分隔符)
let moneyPatt = /(^[-]?[1-9]\d{0,2}($|(,\d{3})*($|(\.\d{1,2}$))))|((^[0](\.\d{1,2})?)|(^[-][0]\.\d{1,2}))$/;
// 数字/货币金额 (只支持正数、不支持校验千分位分隔符)
let money2Patt = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
// 银行卡号
let bankCardPatt = /^([1-9]{1})(\d{15}|\d{18})$/;
// 中文姓名
let chineseName = /^([\u4e00-\u9fa5·]{2,16})$/;
// 英文姓名
let englistName = /(^[a-zA-Z]{1}[a-zA-Z\s]{0,20}[a-zA-Z]{1}$)/;
// 车牌号(新能源+非新能源)
let carNumberPatt = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/;






module.exports = {
	error:'',
	check : function (data, rule){
		for(var i = 0; i < rule.length; i++){
			if (!rule[i].checkType){return true;}
			if (!rule[i].name) {return true;}
			if (!rule[i].errorMsg) {return true;}
			if (!data[rule[i].name]) {this.error = rule[i].errorMsg; return false;}
			switch (rule[i].checkType){
				case 'noempty':
					if(!noemptyPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'phone':
					if(!phonePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'card':
					if(!cardPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'email':
					if(!emailPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'landline':
					if(!landlinePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'passport':
					if(!passportPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'zip':
					if(!zipPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'username':
					if(!usernamePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'password':
					if(!passwordPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'qq':
					if(!qqPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'wechat':
					if(!wechatPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'ACode':
					if(!ACodePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'versionCode':
					if(!versionCodePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'date':
					if(!datePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'time24':
					if(!time24Patt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'time12':
					if(!time12Patt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'dateTime':
					if(!dateTimePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'money':
					if(!moneyPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'money2':
					if(!money2Patt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'bankCard':
					if(!bankCardPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'chineseName':
					if(!chineseNamePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'englistName':
					if(!englistNamePatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				case 'carNumber':
					if(!carNumberPatt.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
					break;
				default: 
					if(!rule[i].checkType.test(data[rule[i].name])) {this.error = rule[i].errorMsg; return false;}
				
				
			}
		}
		return true;
	}
}