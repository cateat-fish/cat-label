# 欢迎使用 cat-label 组件

**cat-label 是基于uni-app开发的一个组件**

+ cat-label 用于复杂的，表单内容较多的场景，可以大大简化开发人员的代码量；表单内容较多不仅仅指添加的表单，还包括查看，修改。
+ 在cat-label中使用到了其他依赖组件，包括uni-icon,w-picker,cpimg以及改写的表单验证js checker.js,再次感谢开源，感谢他们的付出。

#### 使用说明
+ import catLabel from "@/components/cat-label/cat-label.vue"
+ components:{catLabel}
``` html
<catLabel dataType="text" text="账号"  />
```

#### 表单验证说明
``` javascript
var  checker = require("@/common/checker.js");
var rule = [
	{name:"username", checkType : "username",  errorMsg:"请正确输入的账号"},
	{name:"password", checkType : "password", errorMsg:"请正确输入的密码"},
]
var formData = {
	username:'username123',
	password:'123456@qQ.com',
}
var checkRes = checker.check(formData, rule);
if(checkRes){
	uni.showToast({title:"验证通过!", icon:"none"});
}else{
	uni.showToast({ title: checker.error, icon: "none" });
}
```

## 参数说明（参数较多，以多种方式划分）

#### 最重要的
| 参数名  | 类型 | 默认值 | 可选值 | 说明 |
| ------------- | ------------- | ------------- | ------------- |
| dataType | String | '' | 'text','selector','click','img','date','time','dateTime','range' | 以下会介绍 |
#### 公共用
| 参数名  | 类型 | 默认值 | 可选值 | 说明 |
| ------------- | ------------- | ------------- | ------------- |
| text | String | '默认占位符' |  | 说明文字 |
| textAlign | String | 'left' | 'center','right' | 说明文字的对齐方式 |
| mode | String | 'default' | 'labelTop' | 显示的方式 'default' 'labelTop' 左右 上下 |
#### dataType 为 空 时
+ 主要用于数据展示
+ 
``` html
<catLabel text="账号" :dataText="upData.user"  />
<catLabel v-for="(item,index) in Arr" :key='index' :text="item.text" :dataText="item.data"  />
```

```javascript
Arr:[
	{text:'text1',data:'123'},
	{text:'text2',data:'456'}
]
```

#### dataType 为 text 时
+ 主要用于收集数据
``` html
<catLabel dataType="text" text="账号" v-model="upData.user"   />
<catLabel dataType="text" inputType="number" text="数字"  />
<catLabel dataType="text" inputType="password" text="密码"  />
```

| 参数名  | 类型 | 默认值 | 可选值 | 说明 |
| ------------- | ------------- | ------------- | ------------- |
| placeholder | String | 请输入${text} |  | input的placeholder|
| inputType | String | 'text' | 'number' 'idcard' 'digit' | 等同于input的type |
| value | String | '' |  | 等同于input的value |
| v-model | String | '' |  | 双向绑定 |
| @blur | function |  |  | 失去焦点事件 |
| @focus | function |  |  | 获得焦点事件 |
| @input | function |  |  | 输入事件 |

#### dataType 为 textarea 时
+ 等同于textarea 组件 使用与 dataType为input时类似
#### dataType 为 click 时
+ @handClick 点击事件
#### dataType 为 img 时
+ imgList 默认图片列表
+ editImg 是否可以删除图片 默认不能
+ imgNumber 图片张数
+ @getImg(file) 事件 file参数 为 列表数组
+ @getImgErr err事件

#### dataType 为 selector 时
+  picker下拉单选
+ selectList 下拉数据 数据类型 格式为: [{label:'text1',value:1,inde:0}，{label:'text2',value:99,inde:1}]
+  @handSelect(val) 确定事件 val 参数 为选择的参数 具体打印查看
#### dataType 为 date 时
+  日期选择
+ startYear 类型 string 开始日期
+ endYear 类型 string 结束日期
+ @handDate(val)  确定事件 val 参数 为选择的参数 具体打印查看
#### dataType 为 time 时
+  事件选择
+ startYear 类型 string 开始日期
+ endYear 类型 string 结束日期
+ @handTime(val)  确定事件 val 参数 为选择的参数 具体打印查看
#### dataType 为 dateTime 时
+  事件选择
+ startYear 类型 string 开始日期
+ endYear 类型 string 结束日期
+ @handDateTime(val)  确定事件 val 参数 为选择的参数 具体打印查看
#### dataType 为 range 时
+  事件选择
+ startYear 类型 string 开始日期
+ endYear 类型 string 结束日期
+ @handRange(val)  确定事件 val 参数 为选择的参数 具体打印查看
#### 其他参考 https://ext.dcloud.net.cn/plugin?id=273

#####  其他参数
| 参数名 | 类型 | 默认值 | 可选值 | 说明 |
| ------------- | ------------- | --- | ------------- | --- |
| textareaLength | Number | 500 |  1 | textarea 的 maxlength |
| imgNumber | Number | 9 |  | dataType 为 img时 img的最大图片张数 |
| dataText | String | '默认占位符' | 1 | dataType 为空时 有效，内容 |
| noP | Boolean | false | true | padding 为true时padding:4px 14px  false时padding:11px 14px |
| hasR | Boolean | false | true | 是否显示右侧icon |
| icon | Stringn | 'arrowright' | 1 | icon |
| showRightText | Boolean | false | true | 是否显示右侧文字 |
| rightText | Stringn | '' | 1 | 右侧文字 |
| hasX | Boolean | false | 1  | 左侧文字是否有* 仅是变现  |
| useReg | Boolean | false |  | dataType 为text 时 ，失去焦点时是否验证  |
| reg | RegExp | default: ()=>/(?:)/ |  | 验证的正则表达式  |
| regText | String | '' | 1 | 验证失败的文字提示  |


### End