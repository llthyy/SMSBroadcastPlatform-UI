<style scoped>
#zztu-1{
   /* visibility:hidden  */
}
</style>
<template>
 <div style="margin-top:30px;padding-left:10px">
   <div style="margin:0 0 20px 10px;font-size:20px">报表统计
        <i-button type="success" style="float:right;margin-right:20px">导出报表</i-button>
   </div>
    <div style="width:20%;background:#fff;float:left;">
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
                    <div id="myChart2_2" :style="{width: '665px', height: '300px',}"></div>
                </div>
            </TabPane>
            <TabPane label="设备状态统计报表">
                <div id="zxtu-2">
                    <div id="myChart3" :style="{width: '665px', height: '300px',}"></div>
                    <div id="myChart4" :style="{width: '665px', height: '300px',}"></div>
                </div>
                <div id="zztu-2">
                    <div id="myChart3_1" :style="{width: '665px', height: '300px',}"></div>
                    <div id="myChart3_2" :style="{width: '665px', height: '300px',}"></div>
                </div>
                <div id="bztu-2">
                    <div id="myChart3" :style="{width: '665px', height: '300px',}"></div>
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
        
</div>
 
</template>
<script>
 export default{
   data(){
     return {
       options:'1',
       treelist:[],
       titles: [],
       baseData:[],
       idd:[],
       Data1:[],
       Data2:[],
       data:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       data1:["2","2","2","3","4","5","2","2","2","3","4","5"],
       data3:["1","3","1","2","4","5","6","2","3","3","6","1"],
       data2:[{ value:2,name:'一月'},{value:2,name:'二月'},{value:2,name:'三月'},{value:3,name:'四月'},{value:4,name:'五月'},{value:5,name:'六月'},{value:2,name:'七月'},{value:2,name:'八月'},{value:2,name:'九月'},{value:3,name:'十月'},{value:4,name:'十一月'},{value:5,name:'十二月'}]
     }
   },
   methods:{
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
    getData(){
       this.axios({
        method: "post",
        url: `${this.baseUrl1}/statistical/main`,
        data:{
            ids:this.ids
        }
      }).then(res => {
          //console.log(res)
        this.Data1 = res.data.body;
      });
     },

     /* 按月播放 */
     getData1(){
       this.axios({
        method: "post",
        url: `${this.baseUrl1}//play/month`,
        data:{
            ids:this.ids
        }
      }).then(res => {
          console.log(res)
        this.Data2 = res.data.body;
      });
     },

/* 折线图 */
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
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
                //data: this.data2
                data: this.data1
            }]
        });
      },
    
    drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按区域播放统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['播出时长（分钟）','播出次数']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '播出时长（分钟）',
                type: 'line',
                data: this.data1
            },
            {
                name: '播出次数',
                type: 'line',
                data: this.data3
            }]
        });
        },
    drawLine3(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart3'))
        // 绘制图表
        myChart.setOption({
            title: { text: '区域设备统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['双模数字终端','广播音响']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '双模数字终端',
                type: 'line',
                data: this.data1
            },
            {
                name: '广播音响',
                type: 'line',
                data: this.data3
            }]
        });
      },
    drawLine4(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart4'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按设备状态统计' },
            tooltip: { trigger:'axis', },
             legend: {
                 /*  x:'right',
                  y:'top', */
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
      },
 
 /* 柱状图 */
    drawLine_1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart_1'))
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
                data: this.data1
            }]
        });
      },
     
    drawLine_1_1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2_1'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按区域播放统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['播出时长（分钟）','播出次数']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '播出时长（分钟）',
                type: 'bar',
                data: this.data1
            },
            {
                name: '播出次数',
                type: 'bar',
                data: this.data3
            }]
        });
        }, 
    drawLine_1_2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart3_1'))
        // 绘制图表
        myChart.setOption({
            title: { text: '区域设备统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['双模数字终端','广播音响']
              },
            xAxis: {
                data: this.data
            },
            yAxis: {},
            series: [{
                name: '双模数字终端',
                type: 'bar',
                data: this.data1
            },
            {
                name: '广播音响',
                type: 'bar',
                data: this.data3
            }]
        });
      },
    drawLine_1_3(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart3_2'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按设备状态统计' },
            tooltip: { trigger:'axis', },
             legend: {
                 /*  x:'right',
                  y:'top', */
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
      },  
/* 饼状图 */
    drawLine_2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart_2'))
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
    drawLine_2_1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart2_2'))
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
        }, 
    drawLine_2_2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart3_3'))
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
                data: [
                {
                    value:10,name:'离线'
                },{
                    value:20,name:'在线'
                },
                ]
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
    //点击当前的树节点
    getID(data) {
      this.ids = []
      this.titles = []
     data.forEach((item, index) => {
        let id = item.id        
        this.titles.push(item.title)  
        this.ids.push(item.id)   
      }) ; 
     // console.log(this.titles)
      console.log(this.ids)  
     this.drawLine();
     this.drawLine2();
     this.drawLine3();
     this.drawLine4();
     this.getData();
     this.getData1();
    },    
   },
   mounted(){
     this.selectchange();
     this.getDatas();
     this.drawLine();     
     this.drawLine2();
     this.drawLine3();
     this.drawLine4();
     this.drawLine_1();
     this.drawLine_2();
     this.drawLine_1_1();
     this.drawLine_1_2();
     this.drawLine_1_3();
     //this.drawLine_2_1();
     this.drawLine_2_2();
   }
 }
 
 
 </script>