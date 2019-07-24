<template>
	<view>
		<catLabel/>
		<catLabel text="账号" :dataText="upData.username" />
		<catLabel text="账号" :hasX="true" :noP="true" dataType='text' :value="upData.username" v-model="upData.username" />
		<catLabel text="密码" :hasX="true" textAlign="center" dataType='text' :value="upData.password" v-model="upData.password" inputType="password" />
		<catLabel :hasR='true' text="单选" :selectList="selectList" dataType='selector' :initIndex="initIndex" icon="arrowdown" :dataText="upData.date" @handSelect="handSelect"  />
		<catLabel :hasR='true' text="注册日期" textAlign="right" dataType='date' :dataText="upData.date" @handDate="handDate"  />
		<catLabel :hasR='true' text="注册时间"  dataType='time' :dataText="upData.time" @handTime="handTime"  />
		<catLabel :hasR='true' text="日期时间"  dataType='dateTime' :dataText="upData.datetime" @handDateTime="handDateTime"  />
		<catLabel :hasR='true' text="活动时间"  dataType='range' :dataText="upData.range" @handRange="handRange"  />
		<catLabel mode="labelTop" text="备注" dataType='textarea' :value="upData.remarks"  v-model="upData.remarks"    />
		<catLabel mode="labelTop" text="照片" @getImg="getImg" dataType='img' :editImg='true' :imgList="upData.imgs" :dataText="upData.date"  />
		
		
		<catLabel text="金额" :value='upData.money' v-model='upData.money' :showRightText='true' rightText='万元'  inputType='number' dataType="text" />
		
		<catLabel text="金额" @blur="blur" :value='upData.money2' v-model='upData.money2'   dataType="text" />
		
	</view>
</template>

<script>
	var  checker = require("@/common/checker.js");
	import {formateDate,formatMoneyAuto} from "@/common/catUtil.js"
	import catLabel from "@/components/cat-label.vue"
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
					time:formateDate(new Date(),"h:min:s"),
					datetime:formateDate(new Date(),"Y-M-D h:min:s"),
					range:'点击选择',
					select:'',
					money:'',
					money2:'',
				},
				initIndex:0,
				selectList:[
					{label:'保密',value:'0'},
					{label:'男',value:'1'},
					{label:'女',value:'2'},
				]
			}
		},
		onLoad() {
			this.selectList.map((item,index)=>{
				item.index = index
			})
			
		},
		methods: {
			blur(val){
				this.upData.money2 = formatMoneyAuto(val)
			},
			handSelect(val){
				this.initIndex = val.checkArr.index;
				this.upData.select = val.checkArr.value
			},
			handDate(val){
				this.upData.date = val.result;
			},
			handTime(val){
				this.upData.time = val.result;
			},
			handDateTime(val){
				this.upData.datetime = val.result;
			},
			handRange(val){
				this.upData.range = val.result;
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
