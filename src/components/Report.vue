<style scoped>
</style>
<template>
 <div style="margin-top:30px;padding-left:10px">
   <div style="margin:0 0 20px 10px;font-size:20px">报表统计</div>
    <div style="width:20%;background:#fff;float:left;">
        <i-option v-for="item of treelist" :value="item.id" :key="item.id" style="display: none;">
            {{ item.title }}
        </i-option>
        <Tree :data="baseData" @on-check-change="getID" show-checkbox check-strictly></Tree>
    </div>
    <div style="mrgin-right:20px;width:80%">
        <Tabs type="card">
            <TabPane label="播出统计报表">
                <div><div id="myChart" :style="{width: '100%', height: '300px',}"></div></div>
                <div><div id="myChart1" :style="{width: '100%', height: '300px',}"></div></div>
                <div><div id="myChart2" :style="{width: '100%', height: '300px',}"></div></div>
            </TabPane>
            <TabPane label="设备状态统计报表">
                <div><div id="myChart3" :style="{width: '100%', height: '300px',}"></div></div>
                <div><div id="myChart4" :style="{width: '100%', height: '300px',}"></div></div>
            </TabPane>
        </Tabs>   
    </div>   
        
</div>
 
</template>
<script>
 export default{
   data(){
     return {
       treelist:[],
       titles: [],
       baseData:[],
       idd:[],
       data:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       data1:[],
     }
   },
   methods:{
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按月播放次数统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['播放次数']
              },
            xAxis: {
                data: this.data 
            },
            yAxis: {},
            series: [{
                name: '播放次数',
                type: 'bar',
                data: []
            }]
        });
      },
    drawLine1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按播出类型统计' },
            tooltip: { trigger:'axis'},
             legend: {
                   x:'right',
                 /* y:'top', */
                  data:['应急播出','日常播出']
              },
            xAxis: {
                data: this.titles
            },
            yAxis: {},
            series: [{
                name: '应急播出',
                type: 'bar',
                data: this.data1
            },
            {
                name: '日常播出',
                type: 'bar',
                data: this.data1
            }]
        });},
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
                data: this.titles
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
                data: this.data1
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
                data: this.titles
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
                data: this.data1
            }]
        });
      },
    drawLine4(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart4'))
        // 绘制图表
        myChart.setOption({
            title: { text: '按设备状态统计' },
            tooltip: { trigger:'item', formatter: "{a} <br/>{b}: {c} ({d}%)"},
             legend: {
                 /*  x:'right',
                  y:'top', */
                  x:'right',
                   orient: 'vertical',
                  data:['离线','在线']
              },
           /*  xAxis: {
                data: this.data
            },
            yAxis: {}, */
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
            },]
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
      this.idd = []
      this.titles = []
     data.forEach((item, index) => {
        let id = item.id        
        this.titles.push(item.title)  
        this.idd.push(item.id)   
      }) ; 
      //console.log(this.titles) 
     this.drawLine1();
     this.drawLine2();
     this.drawLine3();
    },    
   },
   mounted(){
     this.getDatas();
     this.drawLine();
     this.drawLine1();
     this.drawLine2();
     this.drawLine3();
     this.drawLine4();
   }
 }
 
 
 </script>