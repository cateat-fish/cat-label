<template>
	<view>
		<catLabel dataType="text" text="账号"  />
		<catLabel dataType="text" inputType="number" text="数字"  />
		<catLabel dataType="text" inputType="password" text="密码"  />
		<catLabel dataType="text" text="账号" v-model="upData.user"   />
		<catLabel text="账号" :dataText="upData.user"  />
		<catLabel v-for="(item,index) in Arr" :key='index' :text="item.text" :dataText="item.data"  />
		
		<catLabel dataType="textarea" text="备注" :dataText="upData.user"  />
		<catLabel dataType="click" @handClick="handClick" text="位置" :hasR="true" icon="location" />
		
		
		<catLabel dataType="img" text="图片资料" :imgNumber='1' :imgList="imgList"  :dataText="upData.user"  />
		<catLabel text='单选' @handSelect="handSelect" :initIndex="initIndex" dataType="selector" :selectList="selectList" />
		<catLabel text="日期选择" dataType="date" :hasR="true" :dataText="upData.date"  />
		<catLabel text="时间选择" dataType="time" :hasR="true" :dataText="upData.time" />
		<catLabel text="日期时间选择" dataType="dateTime" :hasR="true" :dataText="upData.dateTime" />
		<catLabel text="日期间隔" dataType="range" :hasR="true" :dataText="upData.range" />
		
		<catLabel text="年月选择" dataType="yearMonth" @handYearMonth ="handYearMonth" />
		<catLabel text="省市县选择" dataType="region"  @handRegion ="handRegion" />
		<catLabel text="短时间选择" dataType="limit"  @handLimit ="handLimit" />
	</view>
</template>

<script>
	import catLabel from "@/components/cat-label/cat-label.vue"
	export default {
		components:{catLabel},
		data() {
			return {
				upData:{
					user:'username123',
					pass:'password123',
					remarks:'',
					date:'点击选择日期',
					time:'点击选择时间',
					dateTime:'点击选择日期时间',
					range:'点击选择日期间隔'
				},
				Arr:[
					{text:'text1',data:'123'},
					{text:'text2',data:'456'}
				],
				imgList:[
					'/static/logo.png'
				],
				selectList:[{label:'text1',value:1,index:0},{label:'text2',value:99,index:1}],
				initIndex:0,
			}
		},
		methods: {
			handClick(){
				console.log(1)
			},
			handSelect(val){
				this.initIndex = val.checkArr.index;
			},
			
			handYearMonth(val){
				console.log(val)
			},
			handRegion(val){
				console.log(val)
			},
			handLimit(val){
				console.log(val)
			}
		},
	}
</script>

<style>

</style>
