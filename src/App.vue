<template>
  <router-view />
</template>

<style lang="scss">
.lazy__img[lazy=loading] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy=loaded] {
  width: 100%;
}

.lazy__img[lazy=error] {
  padding: 5em 0;
  width: 48px;
}

.el-calendar-day {
  overflow: scroll;
}

.music {
  // position: absolute;
  // top: 10px;
  // left: 10px;

  canvas {
    cursor: pointer;
  }
}
</style>
