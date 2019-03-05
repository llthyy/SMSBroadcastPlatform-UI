<style scoped>
h1 {
  color: red;
}
#allmap {
  width: 100%;
  height: 600px;
  overflow: hidden;
}
#query {
   z-index:20;
   width:665px;
   height:44px;
   background:#ccc;
   position:absolute;
   left:30px;
   top:10px;
   padding: 10px;
   line-height:24px;
   font-size:14px;
  } 
</style>
<template>
  <!-- <div style="margin-top:30px;padding-left:10px" id="allmap" >
    <div style="margin:0 0 20px 10px;font-size:20px">地图管理</div>
  </div> -->
<div>
  <div id="query">查询条件:
       <select id="select" class="btn w80" style="padding:0.8px;background:#fff;color:#000;margin-left:10px;">
          <option value="0" selected="selected">设备</option>
          <option value="1">地区</option>
			</select>
      <input type="text" placeholder="请输喇叭的地址物理码"  class="btn bts" style="width: 160px;background:#fff;color:#000;margin-left:10px;">
      <input type="button"  value="查询 "  class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button"  value="高音量 "  class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button"  value="中音量 "  class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
      <input type="button"  value="低音量 "  class="btn bts" style="padding:0.8px;background:#fff;color:#000;margin-left:10px; padding:0 15px;">
    </div>
  <div id="allmap"></div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    test() {
      console.log(BMap);
      var map = new BMap.Map("allmap",{minZoom:6});
      var point = new BMap.Point(116.404, 39.915);
      console.log(map, 123);
      map.centerAndZoom("杭州", 9);
      map.enableScrollWheelZoom();
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      map.setMapStyle({style:'normal'})

    }
  },
  mounted() {
    this.test();
  }
};
</script>