
	<template>
  <!-- <div style="margin-top:30px;padding-left:10px" id="allmap" >
		<div style="margin:0 0 20px 10px;font-size:20px">地图管理</div>
	  </div> -->
  <div id="main">

    <div id="query">查询条件:
      <Select v-model="options" size="small" @on-change="selectchange()" id="select" class="btn w80" style="padding:0.8px;background:#fff;color:#000;margin-left:10px;width:80px">
        <Option value="0">设备</Option>
        <Option value="1">地区</Option>
      </Select>
      <input v-if="value2" type="text" v-model="value" placeholder="请输地名,例:【滨江区】" class="btn bts" style="width: 160px;background:#fff;color:#000;margin-left:10px;">
      <input v-else type="text" v-model="value" placeholder="请输喇叭的地址物理码" class="btn bts" style="width: 160px;background:#fff;color:#000;margin-left:10px;">
      <input type="button" value="查询 " @click="query()" class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <!-- <input type="button" value="高音量 " class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button" value="中音量 " class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button" value="低音量 " class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;"> -->
    </div>
    <div>
      <div @click="value1 = true" class="btnll">
        <Icon size="32" type="ios-arrow-back" style="position:absolute;left:0;top:50%;margin-top:-16px;" />
      </div>
      <div class="drawer" :style="value1?'width:405px':'display:none;'">
        <div style="position:absolute;left:0;top:-30px;">
          <input type="button" @click="showRadios();" v-model="value3" id="but_showRadios" class="btn bts" style="background:#fff;color:#000;margin-right:30px;border:">
          <!-- <input type="button" @click="showRadios();" value="按区域广播" id="but_showRadios" class="btn bts" style="background:#fff;color:#000;margin-right:30px;">
          <input type="button" @click="showRadios();" value="开始广播" id="but_showRadios" class="btn bts" style="background:#fff;color:#000;margin-right:30px;"> -->
        </div>
        <div class="closebtn" @click="value1 = false">
          <Icon size="32" type="ios-arrow-forward" style="position:absolute;left:0;top:50%;margin-top:-16px;" />
        </div>
        <div style="margin-left:24px;">
          <div style="height:20px;border:1px solid #ccc;background:#ccc;padding-left:10px;font-size:14px;font-weight:700;">在线率统计</div>
          <Table border :columns="columns" :data="data" height="180"></Table>
          <div style="height:20px;border:1px solid #ccc;background:#ccc;padding-left:10px;font-size:14px;font-weight:700;">控制区域</div>
          <Table border :columns="columns1" :data="data1" height="180"></Table>
        </div>
      </div>

    </div>
    <div id="allmap" style="overflow:hidden">
      <div id="map" style="height:100%;-webkit-transition: all 0.5s ease-in-out;transition: all 0.5s ease-in-out;"></div>
    </div>
    <div class="lonlat">
      经纬度：<span>{{lnglat}}</span>
    </div>
    <div class="imgts"><img src="@/assets/statebs.png" alt=""></div>
  </div>
</template>

	<script>
import expandRow from "../components/expand.vue";
import { close } from "fs";
export default {
  data() {
    return {
      websocket: null,
      devmarkers: [],
      value: "",
      value3: "隐藏终端",
      overLayerData: [],
      options: "0",
      markers: [],
      lnglat: "",
      value1: false,
      value2: false,
      value4: false,
      columns: [
        {
          type: "expand",
          width: 30,
          align: "center",
          render: (h, params) => {
            return h(expandRow, {
              style: {
                padding: 0
              },
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "行政区域",
          key: "regionName",
          width: 90,
          align: "center"
        },
        {
          title: "在线数",
          key: "online",
          width: 60,
          align: "center"
        },
        {
          title: "回传数",
          width: 60,
          key: "backDevice",
          align: "center"
        },
        {
          title: "总数",
          key: "allDevice",
          width: 60,
          align: "center"
        },
        {
          title: "在线率(%)",
          key: "onlinepenc",
          width: 80,
          align: "center"
        }
      ],
      data: [],
      columns1: [
        {
          title: "编号",
          key: "regionId",
          align: "center"
        },
        {
          title: "区域名",
          key: "regionName",
          align: "center",
          tooltip: true
        },
        {
          title: "管辖终端",
          key: "allDevice",
          align: "center",
          tooltip: true
        }
      ],
      data1: []
    };
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      this.websocket = new WebSocket(
        `ws://${this.baseUrl.split("//")[1]}/websocket`
      );
      this.websocket.onopen = this.websocketonopen;

      this.websocket.onerror = this.websocketonerror;

      this.websocket.onmessage = this.websocketonmessage;
      this.websocket.onclose = this.websocketclose;
    },
    websocketonopen() {
      console.log("WebSocket连接成功");
    },
    websocketonerror(e) {
      //错误
      // console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      //数据接收
      this.data =JSON.parse(e.data);
      this.setData();
      // this.addMapOverlay(); //向地图添加覆盖物
    },
    websocketclose(e) {
      //关闭
      console.log("connection closed (" + e.code + ")");
    },
    //创建和初始化地图函数：
    initMap() {
      this.createMap(); //创建地图
      this.addMapControl(); //向地图添加控件
      // this.frash();
      setTimeout(this.frash, 100);
      // setInterval(this.frash, 3000); //定时器，每3秒调用frash()
    },
    frash() {
      var overLayers = this.map.getOverlays();
      console.log(overLayers);
      for (var i = 0; i < overLayers.length; i++) {
        if (overLayers[i].type == "marker")
          this.map.removeOverlay(overLayers[i]);
      }
      // this.map.clearOverlays(); //清空地图上标注点
      this.addMapOverlay(); //将marker点的信息显示在地图上
    },
    createMap() {
      this.map = new BMap.Map("allmap", {
        maxZoom: 19,
        minZoom: 4,
        enableMapClick: false
      }); //建立map实例，设置缩放范围
      this.map.centerAndZoom(new BMap.Point(120.2245, 30.205712), 14); //初始化地图,设置中心点坐标和地图级别。
      this.map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
      this.map.addEventListener("zoomend", e => {
        this.frash();
      });
      this.map.addEventListener("mousemove", e => {
        this.lnglat = e.point.lng + " , " + e.point.lat;
      });
    },
    //向地图添加控件
    addMapControl() {
      var overlays = [];
      var overlaycomplete = e => {
        var cirCount = 0;
        var polyCount = 0;
        drawingManager.close(); //关闭画图
        var drawingModeType = e.drawingMode;
        e.overlay.type = drawingModeType;
        var overLayers = this.map.getOverlays();
        //清楚之前绘制的状态
        for (var item of this.overLayerData) {
          if (
            item.type == "rectangle" ||
            item.type == "circle" ||
            item.type == "polygon"
          ) {
            this.map.removeOverlay(item);
          }
        }
        var arr = this.markers;
        var that = [];
        arr.forEach(value => {
          value.marker.setIcon(this.myIcon);
          var pointAIcon2 = new BMap.Icon(
            require("../assets/green-dot.png"),
            new BMap.Size(32, 64)
          );
          if (drawingModeType == "circle") {
            if (BMapLib.GeoUtils.isPointInCircle(value, e.overlay)) {
              value.marker.setIcon(pointAIcon2);
              that.push(value.arr);
            }
          } else if (
            drawingModeType == "rectangle" ||
            drawingModeType == "polygon"
          ) {
            //矩形  或  多边形
            if (BMapLib.GeoUtils.isPointInPolygon(value, e.overlay)) {
              value.marker.setIcon(pointAIcon2);
            }
          }
        });
        this.data1 = that;
        this.overLayerData = overLayers;
      };
      var styleOptions = {
        strokeColor: "red", //边线颜色。
        fillColor: "", //填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3, //边线的宽度，以像素为单位。
        strokeOpacity: 0.8, //边线透明度，取值范围0 - 1。
        fillOpacity: 0.6, //填充的透明度，取值范围0 - 1。
        strokeStyle: "solid" //边线的样式，solid或dashed。
      };
      var drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: false, //是否开启绘制模式
        enableDrawingTool: true, //是否显示工具栏
        drawingToolOptions: {
          anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
          offset: new BMap.Size(-45, 5), //偏离值
          scale: 0.6, //调整工具栏大小
          drawingModes: [
            //工具栏显示
            // BMAP_DRAWING_MARKER,
            BMAP_DRAWING_CIRCLE,
            // BMAP_DRAWING_POLYLINE,
            BMAP_DRAWING_RECTANGLE,
            BMAP_DRAWING_POLYGON
          ]
        },
        circleOptions: styleOptions, //圆的样式
        // polylineOptions: styleOptions, //线的样式
        polygonOptions: styleOptions, //多边形的样式
        rectangleOptions: styleOptions //矩形的样式
      });
      // 添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener("overlaycomplete", overlaycomplete);
      drawingManager.addEventListener("click", e => {
        console.log(99);
        this.map.removeOverlay();
      });
    },
    //递归处理区域数据
    getItem(data, zoom, arr) {
      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].zoomArea == zoom) {
            arr.push(data[i]);
          }
          this.getItem(data[i].children, zoom, arr);
        }
      }
    },
    // 编写自定义函数,创建标注
    addMapOverlay() {
      var data = this.data;
      var arr = [];
      var u = ""; // 定义地图缩放等级的变量
      u = this.map.getZoom();
      console.log(u, 8838);
      if (u < 10) {
        this.getItem(data, "市级", arr);
      } else if (u < 12) {
        this.getItem(data, "县级", arr);
      } else if (u < 14) {
        this.getItem(data, "镇级", arr);
      } else {
        this.getItem(data, "村级", arr);
      }
      var markers = [];
      this.pointAIcon2 = new BMap.Icon(
        require("../assets/green-dot.png"),
        new BMap.Size(32, 64)
      );
      for (var i = 0; i < arr.length; i++) {
        var point = new BMap.Point(arr[i].longitude, arr[i].latitude);
        this.myIcon = new BMap.Icon(
          require("../assets/red-dot.png"),
          new BMap.Size(32, 64)
        );
        point.arr = arr[i];
        var marker = new BMap.Marker(point, { icon: this.myIcon });
        point.marker = marker;
        markers.push(point);
        marker.arr = arr[i];
        marker.type = "marker";
        var that = [];
        //右击marker事件
        marker.addEventListener("onrightclick", e => {
          if (e.target.arr.icon == "green") {
            e.target.arr.icon = "red";
            e.target.setIcon(this.myIcon);
          } else {
            e.target.arr.icon = "green";
            e.target.setIcon(this.pointAIcon2);
            that.push(e.target.arr);
          }
          var data1 = [];
          this.data1=[];
          that.forEach(ele => {
            if (ele.icon == "green") {
              data1.push(ele);
            }else{
              var index=that.indexOf(ele);
              that.splice(index,1);
            }
          });
          this.data1 = data1;
        });

        //双击marker事件
        var arrAreaName = [];
        var devmarkers = [];
        marker.ondblclick = e => {
          var data = e.target.arr;
          arrAreaName.push(data.regionName);
          this.axios({
            method: "post",
            url: `${this.baseUrl}/device/getByOrgNames`,
            data: this.qs.stringify({
              names: JSON.stringify(arrAreaName)
            })
          }).then(res => {
            var data2 = res.data.body;
            for (var i = 0; i < data2.length; i++) {
              var point1 = new BMap.Point(
                data2[i].longitude,
                data2[i].latitude
              );
              var devIcon = new BMap.Icon(
                require("../assets/radio3.png"),
                new BMap.Size(30, 30)
              );
              var marker1 = new BMap.Marker(point1, { icon: devIcon });
              marker1.arr = data2[i];
              marker1.addEventListener("onmouseover", e => {
                var data = e.target.arr;
                console.log(e.target);
                var point2 = e.target.point;
                var opts = {
                  width: 400, // 信息窗口宽度
                  height: 200, // 信息窗口高度
                  // title: "信息窗口:" ,// 信息窗口标题
                  offset: new BMap.Size(0, -13) //设置文本偏移量
                };

                var sContent = `<table border='0' cellspacing='0' cellpadding='0' class="Infotable">
                  <tr>
                    <td style="font-weight:600;">物理编码:</td><td>${
                      data.devCode
                    }</td><td style="font-weight:600;">逻辑编码:</td><td>${
                  data.devLogic
                }</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">设备别名:</td><td>${
                      data.alias
                    }</td><td style="font-weight:600;">设备型号:</td><td>${
                  data.model
                }</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">设备厂家:</td><td>${
                      data.manufacturer
                    }</td><td style="font-weight:600;">硬件版本:</td><td>${
                  data.hardwareVersion
                }</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">固件版本:</td><td>${
                      data.softwareVersion
                    }</td><td style="font-weight:600;">联系人:</td><td>${
                  data.person
                }</td>
                  </tr>
                  <tr>
                    <td style="font-weight:600;">联系电话:</td><td>${
                      data.devicePhone
                    }</td><td style="font-weight:600;">设备电话:</td><td>${
                  data.personPhone
                }</td>
                  </tr>
                </Table>`;
                var infoWindow = new BMap.InfoWindow(sContent, opts); // 创建信息窗口对象
                this.infoWindow = infoWindow;
                this.map.openInfoWindow(infoWindow, e.target.point); //开启信息窗口
              });
              marker1.addEventListener("onmouseout", e => {
                this.map.closeInfoWindow(this.infoWindow, e.target.point); //开启信息窗口
              });
              devmarkers.push(marker1);
              this.map.addOverlay(marker1);
            }
          });
        };
        this.devmarkers = devmarkers;
        this.map.addOverlay(marker);
        var opts = {
          position: point, // 指定文本标注所在的地理位置
          offset: new BMap.Size(0, 0) //设置文本偏移量
        };
        var label = new BMap.Label(
          arr[i].regionName + ":" + arr[i].online + "/" + arr[i].backDevice,
          opts
        );
        label.setStyle({
          color: "red",
          fontSize: "12px",
          height: "20px",
          lineHeight: "20px",
          fontFamily: "微软雅黑"
        });
        label.type = "marker";
        this.map.addOverlay(label);
      }
      this.markers = markers;
    },
    // 获取表格数据
    getDatatable() {
      this.axios({
        url: `${this.baseUrl}/device/AllOinline?name=-1`,
        method: "get"
      }).then(res => {
        this.data = res.data.body;
        this.setData();
        this.addMapOverlay(); //向地图添加覆盖物
      });
    },
    //表格数据处理
    setData() {
      var data = this.data;
      this.dg(data);
      this.data = data;
    },
    dg(data) {
      if (data) {
        for (var i = 0; i < data.length; i++) {
          data[i].onlinepenc = (
            (data[i].online / data[i].backDevice) *
            100
          ).toFixed(2);
          if (data[i].children == null) {
            data[i]._disableExpand = true;
          }
          this.dg(data[i].children);
        }
      }
    },
    //设备和地区选择器
    selectchange() {
      if (this.options == "0") {
        this.value2 = false;
        this.value = "";
      } else {
        this.value2 = true;
        this.value = "";
      }
    },
    //设备和地区查询
    query() {
      if (this.value2 == false) {
        //设备查询
        this.axios({
          url: `${this.baseUrl}/device/findByDevCode`,
          method: "post",
          data: this.qs.stringify({
            devCode: this.value
          })
        }).then(res => {
          var data2 = res.data.body;
          var point1 = new BMap.Point(data2.longitude, data2.latitude);
          var devIcon = new BMap.Icon(
            require("../assets/radio3.png"),
            new BMap.Size(30, 86)
          );
          var marker1 = new BMap.Marker(point1, { icon: devIcon });
          this.map.addOverlay(marker1);
          this.map.panTo(point1);
        });
      } else {
        //地区查询
        this.axios({
          url: `${this.baseUrl}/device/AllOinline?name=${this.value}`,
          method: "get"
        }).then(res => {
          this.data = res.data.body;
          var data = res.data.body;
          var new_point = new BMap.Point(data[0].longitude, data[0].latitude);
          this.map.panTo(new_point);
          this.setData();
        });
      }
    },
    //显示和隐藏终端
    showRadios() {
      console.log(11);
      if (this.value3 == "隐藏终端") {
        this.value3 = "显示终端";
        this.devmarkers.forEach(marker => {
          marker.hide();
        });
      } else {
        this.value3 = "隐藏终端";
        this.devmarkers.forEach(marker => {
          marker.show();
        });
      }
    }
  },
  created() {
    //页面刚进入时开启长连接
    this.initWebSocket();
  },
  mounted() {
    this.getDatatable();
    this.initMap();
  },
  destroyed() {
    this.websocketclose();
  }
};
</script>


<style >
#main {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin-top: 5px;
  margin: auto;
}
#allmap {
  width: 100%;
  height: 600px !important;
  position: relative;
}
#query {
  z-index: 20;
  height: 44px;
  background: #ccc;
  position: absolute;
  left: 30px;
  top: 10px;
  padding: 10px;
  line-height: 24px;
  font-size: 14px;
  color: #000;
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
  padding: 0;
  z-index: 20;
  width: 25px;
  height: 350px;
  background: #ccc;
  position: absolute;
  right: 0px;
  top: 100px;
  line-height: 24px;
  font-size: 14px;
}
.btnll .ivu-btn {
  padding: 0;
}
.drawer .ivu-btn {
  padding: 0;
}
.drawer {
  z-index: 20;
  background: #fff;
  width: 300px;
  height: 350px;
  position: absolute;
  top: 100px;
  right: 0px;
}
.closebtn {
  float: left;
  width: 25px;
  height: 400px;
  background: #ccc;
}
tr .ivu-table-expanded-cell {
  padding: 0;
}
.BMap_cpyCtrl {
  display: none;
}
.anchorBL {
  display: none;
}
.imgts {
  position: absolute;
  left: 550px;
  bottom: 0;
}

.drawer .ivu-table-cell {
  padding-left: 0px;
  padding-right: 0px;
}
.drawer .ivu-table td {
  height: 32px;
  padding: 0;
}
.drawer .ivu-table-cell-expand {
  height: 32px;
}
.drawer .ivu-table .ivu-icon {
  height: 32px;
}
.ivu-table-header,
.ivu-table-header .ivu-table-column-center {
  height: 34px;
}
.ivu-table-overflowX {
  overflow-x: hidden;
}
.ivu-table-body > table {
  width: auto;
}
.btn.bts {
  border-width: 2px;
  padding: 0 15px;
  line-height: 20px;
  font-size: 12px;
  border: 3px solid #78a1cc;
}
.devcheck td {
  height: 40px;
  font-size: 14px;
}
.Infotable {
  width: 100%;
  height: 180px;
  background: #dbe2eb;
  border-right: 0.1px solid #d6d5d5;
  border-bottom: 0.1px solid #d6d5d5;
  margin-top: 15px;
}
.Infotable,
.Infotable tr,
.Infotable td {
  text-align: center;
  border-top: 0.1px solid #d6d5d5;
  border-left: 0.1px solid #d6d5d5;
}
</style>