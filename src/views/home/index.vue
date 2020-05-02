<template>
  <div class="home-container">
    <div class="bgphoto"></div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex'
}
</script>

<style scoped lang="less">
.home-container {
  width: 100%;
  height: 100%;
  .bgphoto {
    background: url('./shuaiqi.jpg') no-repeat center;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
