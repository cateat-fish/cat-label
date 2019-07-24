<template>
	<view class="index">
		<navigator url="/pages/login/login">登录</navigator>
		<navigator url="/pages/register/register">注册</navigator>
		<navigator url="/pages/all/all">所有示例</navigator>
	 </view>
</template>
<script>
	import testInput from "@/components/testInput.vue"
	import request from '@/common/request/request.js'
	import Search from "@/components/mehaotian-search-revision/mehaotian-search-revision.vue"
	import catFilter from "@/components/cat-filter/cat-filter.vue"
	export default {
		components:{testInput,catFilter,Search,},
		data() {
			return {
				upData:{
					username:'123',
					password:'',
					code:'',
				},
				
				thisI:'test',
				
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				menuList:[
					{
						title: '职位',
						detailTitle: '请选择职位类型（可多选）',
						isMutiple: true,
						key: 'jobType',
						mode:"mutiple",
						defaultSelectedIndex: [1,2,5],
						detailList: [
							{
									'title': '不限',
									'value': ''
								},
								{
									'title': 'uni-app',
									'value': 'uni-app'
								},
								{
									'title': 'java开发',
									'value': 'java'
								},
								{
									'title': 'web开发',
									'value': 'web'
								},
								{
									'title': 'Android开发',
									'value': 'Android'
								},
								{
									'title': 'iOS开发',
									'value': 'iOS'
								},
								{
									'title': '测试工程师',
									'value': '测试'
								},
								{
									'title': 'UI设计',
									'value': 'UI'
								},
								{
									'title': 'Ruby开发',
									'value': 'Ruby'
								},
								{
									'title': 'C#开发',
									'value': 'C#'
								},
								{
									'title': 'PHP开发',
									'value': 'php'
								},
								{
									'title': 'Python开发',
									'value': 'Python'
								}
							]
					
						},
						{
							'title': '月薪',
							isScroll:true,
							'key': 'salary',
							mode:"scroll",
							'detailList': [
								{
									label:"A",value:0,
									childer:[
										{
											label:"A1",value:'00',childer:[
												{label:"A11",value:'000',},
												{label:"A12",value:'001',}
											],
										},
										{label:"A2",value:'01',childer:[
												{label:"A21",value:'010',},
												{label:"A22",value:'011',}
											],
										}
									],
								},{
									label:"B",value:0,
									childer:[
										{
											label:"B1",value:'00',childer:[
												{label:"B11",value:'000',},
												{label:"B12",value:'001',}
											],
										},{
											
											label:"B2",value:'01',childer:[
												{label:"B11",value:'010',},
												{label:"B12",value:'011',}
											],
										}
									],
								},{
									label:"C",value:0,
									childer:[
										{
											label:"C1",value:'00',childer:[
												{label:"C11",value:'000',},
												{label:"C12",value:'001',}
											],
										},{
											label:"C2",value:'01',childer:[
												{label:"C11",value:'010',},
												{label:"C12",value:'011',}
											],
										}
									],
								},
							]
					
						},
						{
							'title': '单选',
							'key': 'single',
							'isMutiple': true,
							'detailTitle': '请选择（单选）',
							'reflexTitle': true,
							'defaultSelectedIndex': 2,
							'detailList': [{
									'title': '不限',
									'value': ''
								},
								{
									'title': '条件1',
									'value': 'test_1'
								},
								{
									'title': '条件2',
									'value': 'test_2'
								},
								{
									'title': '条件3',
									'value': 'test_3'
								},
								{
									'title': '条件4',
									'value': 'test_4'
								},
								{
									'title': '条件5',
									'value': 'test_5'
								},
								{
									'title': '条件6',
									'value': 'test_6'
								},
								{
									'title': '条件7',
									'value': 'test_7'
								},
								{
									'title': '条件8',
									'value': 'test_8'
								},
							]
						},
						{
							'title': '排序',
							'key': 'sort',
							'isSort': true,
							'reflexTitle': true,
							'defaultSelectedIndex': 2,
							'detailList': [{
									'title': '默认排序',
									'value': ''
								},
								{
									'title': '发布时间',
									'value': 'add_time'
								},
								{
									'title': '薪资最高',
									'value': 'wages_up'
								},
								{
									'title': '离我最近',
									'value': 'location'
								}
							]
						}
				],
				
			}
		},
		onReady() {
		    this.$request.setConfig({
		      header: {
		        'token': 'token from page on ready',
		        'content-type': 'application/json'
		      }
		    })
		},
		methods: {
			formSubmit(e){
				var rule = [
					{name:"username", checkType : "phone",  errorMsg:"请输入正确的手机号码"},
					{name:"password", checkType : "email", errorMsg:"请输入正确的邮箱"},
					{name:"code", checkType : /^\S$/, errorMsg:"请输入验证码"}
				];
				//进行表单检查
				var formData = e.detail.value;
				console.log(formData,rule)
				var checkRes = checker.check(formData, rule);
				if(checkRes){
					uni.showToast({title:"验证通过!", icon:"none"});
				}else{
					uni.showToast({ title: checker.error, icon: "none" });
				}
			},
			formReset: function (e) {
				console.log("清空数据")
				this.chosen = ''
			},
			
			
			
			
			
		    getConfig() {
		      console.log(this.$request.getConfig());
		    },
		    async sendRequest1 () {
		      try {
		        //   不修改请求头
		        let res1 = await this.$request.get("/request/get", {
		          data: {
		            id: 1
		          }
		        });
		        console.log(res1)
		
		      } catch (error) {
		        console.error('error:',error);
		      }
		    },
		    sendRequest2 () {
		      this.$request
		      .get("/request/get", {
		        data: {
		          id: 1
		        },
		        header: {
		          'token': "token from page",
		          'content-type': 'application/json'
		        },
		        dataType: 'json',
		        responseType: 'text'
		      })
		      .then(res => {
		        console.log(res);
		      })
		      .catch(error => {
		        console.error('error:',error);
		      });
		    }
		  }
	}
</script>

<style lang="scss">
	.index{
		
	}
</style>