<style scoped>
h1 {
  color: red;
}
#allmap {
  width: 100%;
  height: 100%;
}
</style>
<template>
  <!-- <div style="margin-top:30px;padding-left:10px" id="allmap" >
    <div style="margin:0 0 20px 10px;font-size:20px">地图管理</div>

  </div> -->
  <div id="allmap"></div>
</template>

<script>
// import BMap from 'BMap'
export default {
  // name: 'Map',
  data() {
    return {};
  },
  methods: {
    test() {
      console.log(BMap);
      var map = new BMap.Map("allmap",{maxZoom:9,minZoom:6});
      var point = new BMap.Point(116.404, 39.915);
      console.log(map, 123);
      map.centerAndZoom("杭州", 9);
      map.enableScrollWheelZoom();
      var marker = new BMap.Marker(point);
      map.addOverlay(marker);
      // map.setMinZoom(6);
      // map.setMaxZoom(9);
      map.setMapStyle({style:'normal'})

    }
  },
  mounted() {
    this.test();
  }
};
</script>