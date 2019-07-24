<template>
	<view>
		<catLabel text="账号" dataType='text' :value="upData.username" v-model="upData.username" />
		<catLabel text="密码" dataType='text' :value="upData.password" textAlign="center" v-model="upData.password" inputType="password" />
		<view class="btns">
			<button class="btn" @tap="formSubmit" type="primary">Submit</button>
			<button class="btn" @tap="formReset" type="default">Reset</button>
		</view>
		{{JSON.stringify(upData)}}
		<catLabel text="账号" textAlign="center" :dataText="upData.username" />
		<catLabel text="密码" textAlign="center" :dataText="upData.password" />
	</view>
</template>

<script>
	var  checker = require("@/common/checker.js");
	import catLabel from "@/components/cat-label.vue"
	export default {
		components:{catLabel},
		data() {
			return {
				upData:{
					username:'username123',
					password:'123456@qQ.com',
				},
				rule : [
					{name:"username", checkType : "username",  errorMsg:"请正确输入的账号"},
					{name:"password", checkType : "password", errorMsg:"请正确输入的密码"},
				],
			}
		},
		methods: {
			formSubmit(){
				var formData = this.upData;
				var checkRes = checker.check(formData, this.rule);
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"});
				}else{
					uni.showToast({ title: checker.error, icon: "none" });
				}
			},
			formReset(){
				for(let i in this.upData){
					this.upData[i] = ''
				}
			},
		
		
		}
	}
</script>

<style>
	.btns{margin: 24upx 30upx;display: flex;}
	.btns .btn{width: 45%;}
</style>
