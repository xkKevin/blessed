<script setup>
// import { websiteFiling, websiteFilingLink, policeFiling, policeFilingLink } from '../../../setting'
</script>

<template>
  <div class="filing-container">
    <span class="item" id="busuanzi_container_site_pv">
      本站总访问量<span id="busuanzi_value_site_pv"></span>次；
    </span>
    <span class="item" id="busuanzi_container_site_uv">
      共有<span id="busuanzi_value_site_uv"></span>人见证了我们的爱情；
    </span>
    <span class="item" id="busuanzi_container_page_pv">
      往事已被回顾<span id="busuanzi_value_page_pv"></span>次。
    </span>
    <span class="item">加油，冲鸭！！！</span>
    <!-- <a :href="websiteFilingLink">{{ websiteFiling }}</a>
    <a class="police-filing" target="_blank" :href="policeFilingLink">
      <img src="@/assets/filing.png" alt="" />
      <p>{{ policeFiling }}</p>
    </a> -->
  </div>
</template>

<style scoped lang="scss">
.filing-container {
  width: 90%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  // visibility: hidden;

  .item {
    margin: 0 2px;
    font-size: 15px;

    span {
      margin: 0 3px;
      color: whitesmoke;
    }
  }

  // a {
  //   font-size: 12px;
  //   color: whitesmoke;
  // }

  // .police-filing {
  //   margin: 0 0 0 20px;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  // }
}
</style>
