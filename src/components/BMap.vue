<style scoped>
#main {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  margin: auto;
}
#allmap {
  width: 100%;
  height: 100% !important;
  position: relative;
}
#query {
  z-index: 20;
  width: 665px;
  height: 44px;
  background: #ccc;
  position: absolute;
  left: 30px;
  top: 10px;
  padding: 10px;
  line-height: 24px;
  font-size: 14px;
}
.lonlat {
  position: absolute;
  left: 50px;
  bottom: 0;
  color: #ccc;
}
.lonlat span {
  color: rgb(250, 58, 58);
}
.btnll {
  padding:0;
  z-index: 20;
  width: 25px;
  height: 350px;
  background: #ccc;
  position: absolute;
  right: 0px;
  top: 100px;;
  line-height: 24px;
  font-size: 14px;
}
.btnll .ivu-btn{
  padding: 0;
}
.drawer .ivu-btn {
  padding: 0;
}
.drawer {
  z-index: 20;
  background: #ccc;
  width: 400px;
  height: 350px;
  position: absolute;
  top: 100px;
  right: 0px;
}
</style>
	<template>
  <!-- <div style="margin-top:30px;padding-left:10px" id="allmap" >
		<div style="margin:0 0 20px 10px;font-size:20px">地图管理</div>
	  </div> -->
  <div id="main">

    <div id="query">查询条件:
      <select id="select" class="btn w80" style="padding:0.8px;background:#fff;color:#000;margin-left:10px;">
        <option value="0" selected="selected">设备</option>
        <option value="1">地区</option>
      </select>
      <input type="text" placeholder="请输喇叭的地址物理码" class="btn bts" style="width: 160px;background:#fff;color:#000;margin-left:10px;">
      <input type="button" value="查询 " class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button" value="高音量 " class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button" value="中音量 " class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button" value="低音量 " class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
    </div>
    <div>
      <!-- <Button @click="value1 = true" class="btnll">
        <Icon size="32" type="ios-arrow-back" />
      </Button> -->
      <div @click="value1 = true" class="btnll">
        <Icon size="32" type="ios-arrow-back" style="position:absolute;left:0;top:50%;margin-top:-16px;" />
      </div>
      <div v-if="value1" class="drawer">
        <Icon size="32" @click="value1 = false" type="ios-arrow-forward" style="position:absolute;left:0;top:50%;margin-top:-16px;" />
        <Drawer title="" :closable="false" :mask="false" :transfer="false" :inner="true" v-model="value1" width="360" >
          <slot>nide</slot>

        </Drawer>
      </div>
      <div v-else></div>
    </div>
    <div id="allmap" style="overflow:hidden">
      <div id="map" style="height:100%;-webkit-transition: all 0.5s ease-in-out;transition: all 0.5s ease-in-out;"></div>
    </div>
    <div class="lonlat">
      经纬度：<span>{{lnglat}}</span>
    </div>
  </div>
</template>

	<script>
export default {
  data() {
    return {
      lnglat: "",
      value1: false
    };
  },
  methods: {
    getMap() {
      var map = new BMap.Map("allmap", { maxZoom: 9, minZoom: 6 });
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom("杭州", 9);
      map.enableScrollWheelZoom();
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      // map.setMapStyle({ style: "normal" });
      map.addEventListener("mousemove", e => {
        this.lnglat = e.point.lng + " , " + e.point.lat;
      });

      // var overlays = [];
      // var overlaycomplete = function(e){
      //   overlays.push(e.overlay);
      // };
      var styleOptions = {
        strokeColor:"red",    //边线颜色。
        fillColor:"",      //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       //边线的宽度，以像素为单位。
        strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid' //边线的样式，solid或dashed。
    }
       var drawingManager = new BMapLib.DrawingManager(map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingTypes : [
            // BMAP_DRAWING_MARKER,
            BMAP_DRAWING_CIRCLE,
            // BMAP_DRAWING_POLYLINE,
            // BMAP_DRAWING_POLYGON,
            BMAP_DRAWING_RECTANGLE
         ]
        },
        "drawingModes" : {

        },
        circleOptions: styleOptions, //圆的样式
        polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
    });
    // 添加鼠标绘制工具监听事件，用于获取绘制结果
    // drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    }
  },
  mounted() {
    this.getMap();
  }
};
</script>