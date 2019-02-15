<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
*{
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
}
html, body{
  width:100%;
  height: 100%;
  overflow: hidden;
  background-image: url(./assets/bg.png);
}
*, :after, :before {
  box-sizing: border-box;
}
#app {
  width:100%;
  height: 100%;
  margin:0;
  padding:0;
  /* opacity: 0.6; */
}
</style>
