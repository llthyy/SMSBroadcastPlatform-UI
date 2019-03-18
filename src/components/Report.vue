<style scoped>
#zztu-1{
   /* visibility:hidden  */
}
</style>
<template>
 <div style="margin-top:30px;padding-left:10px">
   <div style="margin:0 0 20px 10px;font-size:20px">报表统计
        <i-button type="success" style="float:right;margin-right:20px" @click="clickout">导出报表</i-button>
   </div>
    <div style="width:20%;background:#fff;float:left;height:300px;overflow-x:hidden;overflow-y:auto;">
        <i-option v-for="item of treelist" :value="item.id" :key="item.id" style="display: none;">
            {{ item.title }}
        </i-option>
        <Tree :data="baseData" @on-check-change="getID" show-checkbox check-strictly></Tree>
    </div>
    <div style="mrgin-right:20px;width:80%">
        <Tabs type="card">
            <TabPane label="播出统计报表">
                <div id="zxtu-1">
                    <div id="myChart" :style="{width: '665px', height: '300px',}"></div>
                    <div id="myChart2" :style="{width: '665px', height: '300px',}"></div>
                </div>
                <div id="zztu-1">
                    <div id="myChart_1" :style="{width: '665px', height: '300px',}"></div>
                   <div id="myChart2_1" :style="{width: '665px', height: '300px',}"></div>
                </div>
                <div id="bztu-1">
                    <div id="myChart_2" :style="{width: '665px', height: '300px',}"></div>
                    <!-- <div id="myChart2_2" :style="{width: '665px', height: '300px',}"></div> -->
                </div>
            </TabPane>
            <TabPane label="设备状态统计报表">
                <div id="zxtu-2">
                    <div id="myChart3" :style="{width: '665px', height: '300px',}"></div>
                    <!-- <div id="myChart4" :style="{width: '665px', height: '300px',}"></div> -->
                </div>
                <div id="zztu-2">
                    <div id="myChart3_1" :style="{width: '665px', height: '300px',}"></div>
                    <!-- <div id="myChart3_2" :style="{width: '665px', height: '300px',}"></div> -->
                </div>
                <div id="bztu-2">
                    <!-- <div id="myChart3_4" :style="{width: '665px', height: '300px',}"></div> -->
                    <div id="myChart3_3" :style="{width: '665px', height: '300px',}"></div>
                </div>
            </TabPane>
            <i-select v-model="options" id="sel" style="width:130px;text-indent:10px" slot="extra" placeholder="请选择报表类型" @on-change="selectchange(options);">
                <i-option value="1">折线图</i-option>
                <i-option value="2">柱状图</i-option>
                <i-option value="3">饼状图</i-option>
            </i-select>
        </Tabs>
    </div>

    <Modal title="导出报表" v-model="modal1" :mask-closable="false" width="45%" height="220px">
        <div style="height:250px;width:100%">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <div style="width:40%;float:left;">
                <div style="font-size:18px;margin-bottom:10px;font-weight:500;">请选择区域</div>
                <div style="width:100%;background:#fff;float:left;overflow-x:hidden;overflow-y:auto;;height:200px">
                    <Tree :data="baseData1" @on-select-change="getlevel" style="width:100%"></Tree>
                </div>
            </div>
            <div style="width:56%;float:right">
                <FormItem label="已选区域" prop="level">
                    <Input v-model="formValidate.level" placeholder="请选择导出区域" readonly="readonly"></Input>
                </FormItem>
                <FormItem label="报表标题" prop="title">
                    <Input v-model="formValidate.title" placeholder="请输入报表标题"></Input>
                </FormItem>
                <FormItem label="导出时间:" prop="cols">
                    <Select v-model="formValidate.cols" multiple="multiple" placeholder="请选择导出时间： 月份">
                         <Option value="01">1月</Option>
                         <Option value="02">2月</Option>
                         <Option value="03">3月</Option>
                         <Option value="04">4月</Option>
                         <Option value="05">5月</Option>
                         <Option value="06">6月</Option>
                         <Option value="07">7月</Option>
                         <Option value="08">8月</Option>
                         <Option value="09">9月</Option>
                         <Option value="10">10月</Option>
                         <Option value="11">11月</Option>
                         <Option value="12">12月</Option>
                    </Select>
                </FormItem>
                <div>
                    <FormItem class="fuck" style="width:95%;margin-bottom:25px">
                        <div style="float: right;">
                            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                            <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                        </div>
                    </FormItem>
                </div>
            </div>

        </Form></div>
        <div slot="footer">
      </div>

    </Modal>

</div>

</template>
<script>
import echarts from 'echarts'
 export default{
   data(){
     return {
        modal1:false,
        cnm:[],
        formValidate:{
            level:'',
            title:'',
            //cols:[],
        },
        ruleValidate:{
            level: [{ required: true, message: "请选择区域", trigger: "blur" }],
            title: [{ required: true, message: "请输入标题", trigger: "blur" }],
            cols: [{ type:'array',required: true, message: "请选择导出时间", trigger: "blur" }],
        },
        title1:[],
        title2:[],
       options:'1',
       treelist:[],
       titles: [],
       baseData:[],
       baseData1:[],
       idd:[],
       Data1:[],
       Data2:[],
       data:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       data1:[],
       data3:[],
       data2:[{ value:0,name:'一月'},{value:0,name:'二月'},{value:0,name:'三月'},{value:0,name:'四月'},{value:0,name:'五月'},{value:0,name:'六月'},{value:0,name:'七月'},{value:0,name:'八月'},{value:0,name:'九月'},{value:0,name:'十月'},{value:0,name:'十一月'},{value:0,name:'十二月'}]
      ,Data3:[{value:'',name:'离线'},{value:'',name:'在线'}],
     }
   },
   methods:{
       download (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'excel.xlsx')

        document.body.appendChild(link)
        link.click()
    },
       handleSubmit(name){
           this.$refs[name].validate(valid => {
                 if(valid){
                     this.axios({
                         url: `${this.baseUrl1}/statistical/play/excel`,
                         method: "post",
                         data:{
                             level: this.formValidate.level,
                             title: this.formValidate.title,
                             cols: this.formValidate.cols
                         },
                         responseType: 'blob'
                     }).then(res=>{
                        this.$Message.info('提交成功');
                        this.$refs[name].resetFields();
                        this.modal1= false;
                        this.download(res.data)
                     });
                 }
           })
       },
      getlevel(data){
        if(data.length != 0){
            //console.log(data[0].orgClass)
            if(data[0].orgClass==="市级" || data[0].orgClass==="省级"){
                 this.formValidate.level=''
                 this.$Message.info('请选择 省级 市级或镇级');
             }else{
                 this.formValidate.level=data[0].orgClass
             }
        } else {
             this.formValidate.level=''
        }
      },
      clickout(){
         this.modal1=true;
      },
    handleReset(formValidate) {
      this.$refs[formValidate].resetFields();
    },
    selectchange(){
      //console.log(this.options)
      var Div0=document.getElementById('zxtu-1')
      var Div1=document.getElementById('zxtu-2')
      var Div2=document.getElementById('zztu-1')
      var Div3=document.getElementById('zztu-2')
      var Div4=document.getElementById('bztu-1')
      var Div5=document.getElementById('bztu-2')
      let  opts=this.options

      if(opts=="1"){
          Div0.style.display="block"
          Div1.style.display="block"
          Div2.style.display="none"
          Div3.style.display="none"
          Div4.style.display="none"
          Div5.style.display="none"
      }else if(opts=='2'){
          Div0.style.display="none"
          Div1.style.display="none"
          Div2.style.display="block"
          Div3.style.display="block"
          Div4.style.display="none"
          Div5.style.display="none"
      }else if(opts=='3'){
           Div0.style.display="none"
          Div1.style.display="none"
          Div2.style.display="none"
          Div3.style.display="none"
          Div4.style.display="block"
          Div5.style.display="block"
      }
     },

/*按月播放折线图 */
    getData(){
       this.axios({
        method: "post",
        url: `${this.baseUrl1}/statistical/play/month`,
        data:{
            ids:this.ids
        }
      }).then(res => {
        let sb1 = res.data.body
        this.Data1=[];
        if(sb1!='请转区域ID数组' && sb1.length!=0){
        let sb2=(sb1[0].play_time)
        let timesb=parseInt(sb2.substr(-2,2))
        if(timesb>1){

        this.Data1=new Array(timesb-1).join(0).split(' ')

        }else if(timesb==1){

            this.Data1=[];
        }
        for(let i in sb1){
            this.Data1.push(sb1[i].count)
        }

        for( let j in this.data2){
              this.data2[j].value=this.Data1[j]
          }
          //console.log(this.data2)
        this.drawLine_2()
        this.drawLine();
        this.drawLine_1();
       }else if(sb1== '请转区域ID数组' || sb1.length==0){
           //console.log('啊')
        this.Data1=[];
        this.data2=[{ value:0,name:'一月'},{value:0,name:'二月'},{value:0,name:'三月'},{value:0,name:'四月'},{value:0,name:'五月'},{value:0,name:'六月'},{value:0,name:'七月'},{value:0,name:'八月'},{value:0,name:'九月'},{value:0,name:'十月'},{value:0,name:'十一月'},{value:0,name:'十二月'}];
        this.drawLine_2()
        this.drawLine();
        this.drawLine_1()
       }
      });
     },
/*按区域播放折线图*/
    getData1(){
        this.title1=[]
        this.data3=[];
       this.axios({
        method: "post",
        url: `${this.baseUrl1}/statistical/play/region`,
        data:{
            ids:this.ids
        }
      }).then(res => {
          let sb1=res.data.body
        if(sb1!='请转区域ID数组' && sb1.length!=0 ){
        for(let i in sb1){
            this.data3.push(sb1[i].count)
        }
        for(let j in sb1){
            this.title1.push(sb1[j].name)
        }
        } else if(sb1== '请转区域ID数组' && sb1.length== 0) {
            this.title1=[]}
        this.drawLine2();
        this.drawLine_1_1()
      });
      },
/*区域设备统计折线图 */
    getData2(){
        this.axios({
            method: "post",
            url: `${this.baseUrl1}/statistical/main`,
            data:{
                ids:this.ids
            }
        }).then(res => {
            var resnull=res.data.body
            this.data1=[];
            this.title2=[];
            if(resnull!='请转区域ID数组'){
                for(let i in resnull){
                    this.title2.push(resnull[i].name)
                }
                for(let j in resnull){
                    this.data1.push(resnull[j].dev_count)
                }
                this.drawLine3();
                this.drawLine_1_2();
            }else{
                this.title2=[];
                this.data1=[];
                this.drawLine3();
                this.drawLine_1_2();
            }
        });
        },
/* 按设备状态统计折线图*/
 getData3(){
        this.axios({
            method: "post",
            url: `${this.baseUrl1}/statistical/state`,
            data:{
                ids:this.ids
            }
        }).then(res => {
            var zxres=res.data.body
            this.data1=[];
            this.title2=[];

            if(zxres!='请转区域ID数组' && zxres.length!=0){
                for(let i in zxres){
                    this.title2.push(zxres[i].name)
                }
                for(let j in zxres){
                    this.data1.push(zxres[j].dev_count)
                }
                 for(let a in this.Data3){
                    this.Data3[a].value=zxres[a].count
                }
                console.log(this.Data3)
                this.drawLine_2_2();
                //this.drawLine4();
            }else{
                this.Data3=[{value:'',name:'离线'},{value:'',name:'在线'}],
                this.title2=[];
                this.data1=[];
                this.drawLine_2_2();
                //this.drawLine4();
            }
        });
    },
/* 按区域放柱状图 */
/* 折线图 */
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按月播放次数统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                  data:['播放次数']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '播放次数',
                type: 'line',
                data: this.Data1
            }]
        });
      },

    drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按区域播放统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                   y:'top',
                  data:['播出次数']
              },
            xAxis: {
                data: this.title1
            },
            yAxis: {},
            series: [
            {
                name: '播出次数',
                type: 'line',
                data: this.data3
            }]
        });
        },
    drawLine3(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart3'))
        // 绘制图表
        myChart.setOption({
            title: { text: '区域设备统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['设备数量']
              },
            xAxis: {
                data: this.title2
            },
            yAxis: {},
            series: [{
                name: '设备数量',
                type: 'line',
                data: this.data1
            }]
        });
      },
    /* drawLine4(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart4'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按设备状态统计' },
            tooltip: { trigger:'axis', },
             legend: {
                  x:'right',
                  y:'top',
                  x:'right',
                  orient: 'vertical',
                  data:['离线','在线']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '离线',
                type: 'line',
                data: this.data1
            },
            {
                name: '在线',
                type: 'line',
                data: this.data3
            }]
        });
      }, */

 /* 柱状图 */
    drawLine_1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart_1'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按月播放次数统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                  data:['播放次数']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '播放次数',
                type: 'bar',
                data: this.Data1
            }]
        });
      },

    drawLine_1_1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart2_1'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按区域播放统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                   y:'top',
                  data:['播出次数']
              },
            xAxis: {
                data: this.title1
            },
            yAxis: {},
            series: [{
                name: '播出次数',
                type: 'bar',
                data: this.data3
            }]
        });
        },
    drawLine_1_2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart3_1'))
        // 绘制图表
        myChart.setOption({
            title: { text: '区域设备统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['设备数量']
              },
            xAxis: {
                data: this.title2
            },
            yAxis: {},
            series: [{
                name: '双模数字终端',
                type: 'bar',
                data: this.data1
            }]
        });
      },
    /* drawLine_1_3(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart3_2'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按设备状态统计' },
            tooltip: { trigger:'axis', },
             legend: {
                  x:'right',
                  y:'top',
                  x:'right',
                  orient: 'vertical',
                  data:['离线','在线']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '离线',
                type: 'bar',
                data: this.data1
            },
            {
                name: '在线',
                type: 'bar',
                data: this.data3
            }]
        });
      },   */
/* 饼状图 */
    drawLine_2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart_2'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按月播放次数统计' },
            tooltip: {trigger:'item', formatter: "{a} <br/>{b}: {c} ({d}%)"},
             legend: {
                   x:'right',
                   orient: 'vertical',
                  data:[]
              },
            series: [{
                name: '播放次数',
                type: 'pie',
                data:this.data2
            }]
        });
      },
    /* drawLine_2_1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart2_2'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按区域播放统计' },
            tooltip: { trigger:'axis',formatter: "{a} <br/>{b}: {c} ({d}%)"},
             legend: {
                   x:'right',
                  data:['播出时长（分钟）','播出次数']
              },
            series: [{
                name: '播出时长（分钟）',
                type: 'pie',
                data: this.data2
            },
            {
                name: '播出次数',
                type: 'pie',
                data: this.data3
            }]
        });
        },  */
    drawLine_2_2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('myChart3_3'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按设备状态统计' },
            tooltip: { trigger:'item', formatter: "{a} <br/>{b}: {c} ({d}%)"},
             legend: {
                  x:'right',
                  orient: 'vertical',
                  data:['离线','在线']
              },
            series: [{
                name: '设备类型',
                type: 'pie',
                data: this.Data3
            }]
        });
      },
     //获取区域数据
    getDatas() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/org/allArea`
      }).then(res => {
        this.baseData = res.data.body;
      });
    },
    getDatas1() {
      this.axios({
        method: "get",
        url: `${this.baseUrl}/org/allArea`
      }).then(res => {
        this.baseData1 = res.data.body;
      });
    },
    //点击当前的树节点
    getID(data) {
      this.ids = []
      this.titles = []
      this.cnm=[]
     data.forEach((item, index) => {
        let id = item.id
        this.titles.push(item.title)
        this.ids.push(item.id)
      }) ;
     this.drawLine();
     this.drawLine_1();
     this.drawLine3();
     //this.drawLine4();
     this.getData();
     this.getData1();
     this.getData2();
     this.getData3();
    },
   },
   mounted(){
     this.selectchange();
     this.getDatas();
     this.getDatas1();
     this.drawLine();
     this.drawLine2();
     this.drawLine3();
     //this.drawLine4();
     this.drawLine_1();
     this.drawLine_2();
     this.drawLine_1_1();
     this.drawLine_1_2();
     //this.drawLine_1_3();
     //this.drawLine_2_1();
     this.drawLine_2_2();
   }
 }


 </script>