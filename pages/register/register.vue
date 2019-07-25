<template>
	<view>
		<catLabel text="账号" :noP="true" dataType='text' :value="upData.username" v-model="upData.username" />
		<catLabel text="密码" textAlign="center" dataType='text' :value="upData.password" v-model="upData.password" inputType="password" />
		<catLabel text="注册日期" textAlign="right" dataType='date' :dataText="upData.date" @handDate="handDate"  />
		<catLabel text="备注" dataType='textarea' :value="upData.remarks"  v-model="upData.remarks"    />
		<catLabel text="照片" @getImg="getImg" dataType='img' :editImg='true' :imgList="upData.imgs" :dataText="upData.date"  />
	
		<view class="btns">
			<button class="btn" @tap="formSubmit" type="primary">Submit</button>
			<button class="btn" @tap="formReset" type="default">Reset</button>
		</view>
	</view>
</template>

<script>
	var  checker = require("@/common/checker.js");
	import {formateDate} from "@/common/catUtil.js"
	import catLabel from "@/components/cat-label/cat-label.vue"
	export default {
		components:{catLabel},
		data() {
			return {
				upData:{
					username:'username123',
					password:'123@qQ.com',
					date:formateDate(new Date(),"Y-M-D"),
					remarks:'',
					imgs:[],
				},
				
			}
		},
		methods: {
			formSubmit(){
				var rule = [
					{name:"username", checkType : "username",  errorMsg:"请正确输入的账号"},
					{name:"password", checkType : "password", errorMsg:"请正确输入的密码"},
					{name:"date", checkType : "date", errorMsg:"请正确输入的日期"},
					{name:"remarks", checkType : "noempty", errorMsg:"请正确输入备注"},
					{name:"imgs", checkType : 'noempty', errorMsg:"请正确选择图片"},
				];
				var checkRes = checker.check(this.upData,rule);
				if(!checkRes){
					uni.showToast({ title: checker.error, icon: "none" });
					return;
				}
			},
			formReset(){
				for(let i in this.upData){
					this.upData[i] = ''
				}
			},
			handDate(val){
				this.upData.date = val.result;
			},
			getImg(val){
				this.upData.imgs = [];
				val.map(item=>{
					this.upData.imgs.push(item)
				})
			}
		
		
		}
	}
</script>

<style>
	
</style>
