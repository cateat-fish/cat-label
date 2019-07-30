<template>
	<view class="cat-label">
		<view :class="['container',mode == 'labelTop' ? 'labelTop' : '']" :style="noP?'padding:4px 14px' : 'padding:11px 14px'">
			<!-- 左侧 -->
			<view :class="['text',hasX ? 'hasX' : '',] " :style="{textAlign,textAlign}">{{text}}</view>
			<view class="data">
				
				<!-- dataText -->
				<view v-if="dataType == ''"  class="data-l">
					{{dataText}}
				</view>
				<!-- dataText -->
				
				<!-- click -->
				<view v-if="dataType == 'click'" class="data-l" @tap="toggleTabClick">
					<view>请点击选择{{text}}</view>
				</view>
				<!-- click -->
				
				<!-- img -->
				<view  v-if="dataType == 'img' " class="data-l modeImg" @tap="toggleTabGetImg">
					<cpimg v-if="dataType == 'img' && copyimgList"  ref="cpimgs" :number='ImgNumber' @result="cpimgOk" :iscamera="true" @err="cpimgErr" :fixOrientation="true" :size="500" :maxWidth="1000"
					 :ql="0.9" type="base64" />
					<view v-if="dataType == 'img' && copyimgList" class="imgs"  v-for="(itemImg,indexImg) in copyimgList" :key="indexImg">
						<image class="img" :src="itemImg" mode="aspectFill" @tap.stop="showPreview(indexImg)"></image>
						<view v-if="editImg" class="edit" @tap.stop="clearImg(copyimgList.length, indexImg)">
							<uni-icon type="clear" color="red" :size="16" />
						</view>
					</view>
					<view class="info">{{copyimgList.length}}/{{imgNumber}}</view>
				</view>
				<!-- img -->
				
				
				<!-- textarea -->
				<view v-if="dataType == 'textarea'" class="data-l text" :style="{width: hasR ? '75%': '100%' }">
					<textarea 
						@input="handtextarea"
						class="textarea"
						value="" 
						:placeholder=" placeholder? placeholder: '请输入'+text" 
						:maxlength="textareaLength"
						v-model="inputValue"
					/>
					<view class="info">{{textareaVal.length}}/{{textareaLength}}</view>
				</view>
				<!-- textarea -->
				
				
				<!-- text -->
				<view v-if="dataType == 'text'" class="data-l text" :style="{width: hasR ? '75%': '100%' }">
					<input  
						:class="['input',staticColor]"
						:type="inputType" 
						:placeholder=" placeholder? placeholder: '请输入'+text" 
						:value="inputValue"
						@blur="textBlur"
						@focus="textFocus"
						@input="handleChange"  
						v-if="dataType == 'text'" 
						v-model="inputValue"
					/>
				</view>
				<!-- text -->
				
				<!-- mode selector -->
				<view v-if="dataType == 'selector'"  @tap="toggleTabSelector" class="data-l">
					<view>{{selectList[tabIndex].label}}</view>		<!-- selectList[tabIndex].label -->
				</view>
				<w-picker v-if="dataType == 'selector'" mode="selector" :defaultVal="selectorD" @confirm="onConfirm" ref="selector" themeColor="#f00" :selectList="selectList" />
				<!-- mode selector -->
				
				<!-- mode  date-->
				<view v-if="dataType == 'date'"  @tap="toggleTabDate" class="data-l">
					<view>{{dataText}}</view>
				</view>
				<w-picker v-if="dataType == 'date'" mode="date" :startYear="startYear" :endYear="endYear" :defaultVal="defaultVal2" :current="true" @confirm="onConfirm2" ref="date" themeColor="#f00"  />
				<!-- mode date -->

				<!-- mode  time-->
				<view v-if="dataType == 'time'"  @tap="toggleTabTime" class="data-l">
					<view>{{dataText}}</view>
				</view>
				<w-picker v-if="dataType == 'time'" mode="time" :startYear="startYear" :endYear="endYear" :defaultVal="defaultVal3" :current="true" @confirm="onConfirm3" ref="time" themeColor="#f00"  />
				<!-- mode time -->
				
				<!-- mode  dateTime-->
				<view v-if="dataType == 'dateTime'"  @tap="toggleTabDateTime" class="data-l">
					<view>{{dataText}}</view>
				</view>
				<w-picker v-if="dataType == 'dateTime'" mode="dateTime" :startYear="startYear" :endYear="endYear" :defaultVal="defaultVal4" :current="true" @confirm="onConfirm4" ref="dateTime" themeColor="#f00"  />
				<!-- mode dateTime -->
				
				
				<!-- mode range -->
				<view v-if="dataType == 'range'"  @tap="toggleTabRange" class="data-l">
					<view>{{dataText}}</view>
				</view>
				<w-picker v-if="dataType == 'range'"  mode="range"  dayStep="60" :startHour="startHour" :endYear="endYear" :endHour="endHour" :minuteStep="minuteStep" afterStep="30" :defaultVal="[0,0,0]" :current="true" @confirm="onConfirm5" ref="range"  themeColor="#f00" />
				<!-- mode range -->
				
				<!-- mode yearMonth -->
				<view v-if="dataType == 'yearMonth'"  @tap="toggleTabYearMonth" class="data-l">
					<view>{{dataText}}</view>
				</view>
				<w-picker v-if="dataType == 'yearMonth'"  mode="yearMonth"  dayStep="60" :startHour="startHour" :endYear="endYear" :endHour="endHour" :minuteStep="minuteStep" afterStep="30" :defaultVal="[0,0,0]" :current="true" @confirm="onConfirm6" ref="yearMonth"  themeColor="#f00" />
				<!-- mode yearMonth -->
				
				<!-- mode region -->
				<view v-if="dataType == 'region'"  @tap="toggleTabRegion" class="data-l">
					<view>{{dataText}}</view>
				</view>
				 <w-picker  v-if="dataType =='region' " mode="region" :defaultVal="[0,0,0]"  @confirm="onConfirm7"  ref="region"  themeColor="#f00"></w-picker>
				<!-- mode region -->
				
				<!-- mode limit -->
				<view v-if="dataType == 'limit'"  @tap="toggleTabLimit" class="data-l">
					<view>{{dataText}}</view>
				</view>
				<w-picker v-if="dataType =='limit' "  mode="limit"  dayStep="60" :startHour="startHour" :endHour="endHour" :minuteStep="minuteStep" :afterStep="afterStep" :defaultVal="[0,0,0]" :current="true"  @confirm="onConfirm8" ref="limit"   themeColor="#f00" ></w-picker>
				<!-- mode limit-->
				
				
				<!-- 右侧 -->
				<view v-if="hasR" class="data-r" @tap="rightClick">
					<uni-icon :type="icon" />
				</view>
				
				<view class="data-r" v-if="showRightText">
					<view class="rightText" >{{rightText}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cpimg from "@/components/cpimg.vue"
	import wPicker from "@/components/w-picker/w-picker.vue";
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	export default {
		components:{wPicker,uniIcon,cpimg},
		props:{
			text:{
				default:"默认占位符",
				type:String
			},
			textAlign:{
				default:"left",
				type:String
			},
			mode:{
				default:"default",
				type:String
			},
			model:{
				default:"",
				type:String
			},
			placeholder:{
				default:"",
				type:String
			},
			textareaLength:{
				type:Number,
				default:500,
			},
			dataText:{
				default:"默认占位符",
				type:String || Number,
			},
			hasR:{
				default:false,
				type:Boolean,
			},
			showRightText:{
				default:false,
				type:Boolean,
			},
			rightText:{
				default:'',
				type:String,
			},
			value:{
				default:'',
				type:String,
			},
			name:{
				default:'',
				type:String,
			},
			icon:{
				type:String,
				default:"arrowright"
			},
			preview:{
				type:Boolean,
				default:true
			},
			// selector  
			startYear:{
				type:String,
				default:'1949'
			},
			endYear:{
				type:String,
				default:'2030'
			},
			startHour:{
				type:String,
				default:'8'
			},
			endHour:{
				type:String,
				default:'20'
			},
			minuteStep:{
				type:String,
				default:'5'
			},
			afterStep:{
				type:String,
				default:'30'
			},
			editImg:{
				type:Boolean,
				default:false,
			},
			imgList:{
				type:Array,
				default:()=>{
					return []
				}
			},
			imgNumber:{
				type:Number,
				default:9,
			},
			dataType:{
				default:"",
				type:String
			},
			noP:{
				default:false,
				type:Boolean
			},
			initIndex:{
				type:Number,
				default:0,
			},
			selectList:{
				type:Array,
				default: function(){
					return (
						[{label:"男",value:"0"},{label:"女",value:"1"}]
					)
				}
			},
			
			// input type
			inputType:{
				default:"text",
				type:String
			},
			// 不为空 * 
			hasX:{
				default:false,
				type:Boolean
			},
			useReg:{
				default:false,
				type:Boolean
			},
			reg:{
				// #ifdef H5
				default: ()=>/(?:)/,	// /^ \S $/  不能为空
				// #endif
				
				// #ifndef H5
				default: /(?:)/,
				// #endif
				type:RegExp
			},
			regText:{
				type:String,
				default:''
			}
			
		},
		created() {
			this.ImgNumber = this.imgNumber - this.copyimgList.length;
		},
		watch:{
			initIndex(val,oldval){
				this.tabIndex = val
			},
			imgList(val,oldval){
				this.copyimgList = val;
			},
			value(val){
				this.inputValue = val;
			},
			
		},
		data() {
			return {
				ImgNumber:'',
				inputValue:this.value,
				staticColor:'default',
				selectorD : [this.initIndex],
				defaultVal2:[0,1,3],
				defaultVal3:[0,0,0],
				defaultVal4:[0,0,0,0,0,0],
				tabIndex : this.initIndex,
				copyimgList:this.imgList,
				
				textareaVal:'',
			};
		},
		methods:{
			// 点击右侧事件
			rightClick(){
				this.$emit("handRight")
			},
			// 图片压缩
			cpimgOk(file) {
				file.map(item=>{
					this.copyimgList.push(item)
				});
				this.ImgNumber = this.imgNumber - this.copyimgList.length;
				uni.hideLoading()
				this.$emit('getImg',this.copyimgList)
			},
			cpimgErr(e) {
				this.$emit('getImgErr',e)
			},
			// 图片压缩
			// 删除图片
			clearImg(l,i){
				var length = l-1;
				this.copyimgList.splice(i,1)
				this.ImgNumber = this.imgNumber - this.copyimgList.length;
				this.$emit('clearImg',length)
			},
			// 删除图片
			
			textFocus(){
				this.staticColor = 'default';
				this.$emit('focus')
			},
			textBlur(event){
				if(this.useReg){
					if(this.reg.test(event.target.value)){
						// 满足正则
						this.staticColor = 'default';
					}else{
						// 不满足正则
						this.staticColor = 'err';
						uni.showToast({title:this.regText,icon:"none"});
					}
				}
				this.$emit('blur',event.target.value)
			},
			// input 输入框输入事件
			handleChange(event){
				this.$emit("input",event.target.value);
			},
			handtextarea(event){
				this.textareaVal = event.target.value;
				this.$emit("input",event.target.value);
			},
			toggleTabClick(){
				this.$emit("handClick");
			},
			toggleTabImg(){
				console.log(1)
			},
			toggleTabGetImg(){
				if(!this.editImg){
					return;
				}
				if(this.ImgNumber <0 || this.imgNumber <= this.copyimgList.length){
					uni.showToast({title:'none',icon:'none'})
					return;
				}
				this.$refs.cpimgs._changImg()
				
			},
			showPreview(index){
				if(!this.preview){
					return
				}
				uni.previewImage({
					urls: this.copyimgList,
					indicator:'number',
					current:index,
					longPressActions: {
						itemList: ['保存图片'],	//, '收藏','发送给朋友',
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			toggleTabSelector(){
				this.$refs.selector.show();
			},
			toggleTabDate(){
				this.$refs.date.show();
			},
			toggleTabTime(){
				this.$refs.time.show();
			},
			toggleTabDateTime(){
				this.$refs.dateTime.show();
			},
			toggleTabRange(){
				this.$refs.range.show();
			},
			toggleTabYearMonth(){
				this.$refs.yearMonth.show();
			},
			toggleTabRegion(){
				this.$refs.region.show();
			},
			toggleTabLimit(){
				this.$refs.limit.show();
			},
			
			onConfirm(val){
				this.tabIndex=val.checkArr.index;
				this.$emit("handSelect",val);
			},
			onConfirm2(val){
				this.$emit("handDate",val);
			},
			onConfirm3(val){
				this.$emit("handTime",val);
			},
			onConfirm4(val){
				this.$emit("handDateTime",val);
			},
			onConfirm5(val){
				this.$emit("handRange",val);
			},
			onConfirm6(val){
				this.$emit("handYearMonth",val);
			},
			onConfirm7(val){
				this.$emit("handRegion",val);
			},
			onConfirm8(val){
				this.$emit("handLimit",val);
			},
		}
	}
</script>

<style lang="scss">
	.cat-label{
		width: 100%;
		.container.labelTop{
			display: block;
			.data{width: 100%}
		}
		.container{
			padding:$uni-spacing-col-lg $uni-spacing-row-lg;
			width: 100%;
			box-sizing: border-box;
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			.text{width: 25%;margin-right:5%; font-size: $uni-font-size-base;text-overflow: ellipsis;white-space: nowrap;color: inherit;line-height: 1.5;overflow: hidden;}
			.hasX::before{
				content: "*";
				color: red;
			}
			.data{width: 70%;min-height: 40upx; display: flex;justify-content: space-between; font-size:28upx;text-overflow: ellipsis;white-space: nowrap;color: inherit;line-height: 1.5;overflow: hidden;
				.data-l.modeImg{width: 100%;display: flex;flex-wrap: wrap;
					.imgs:last-child{margin: 0}
					.imgs{width: 140upx;height: 140upx;margin-right: 16upx; position: relative;
						.edit{z-index: 10; position: absolute;right: 0;top: 0;margin-top:-4px;}
						.img{width: 100%;height: 100%;border-radius: $uni-border-radius-lg}
					}
				}
				.data-l.text{margin: 0;padding:0}
				.data-l{width: 90%; position: relative;
					.input,.dataText{padding: 0;margin: 0;width: 100%;border: none;outline: none;font-size: $uni-font-size-base}
					.input.err{color: red;}
					.input.default{color:#333}
					
				}
				.data-r{width: 15%;display: flex;flex-direction: row;justify-content: flex-end;align-items: center;}
			}
			
		}
		.container::after{
			position: absolute;
			z-index: 3;
			right: $uni-spacing-row-lg;
			bottom: 0;
			left: $uni-spacing-row-lg;
			height: 1px;
			content: '';
			transform: scaleY(.5);
			background-color: $uni-text-color-disable;
		}
		.textarea{font-size: 28upx;width: 100%;height: 200upx;position: relative;}
		.info{
			position: absolute;
			bottom: 0;right: 0;font-size:24upx;
		}
	}
</style>
