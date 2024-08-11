<template>
  <div class="home-container" v-show="logFlag">

    <div :class="['music meun-switch animated flex-row', uploadflag ? 'active rubberBand off' : 'leave jello']"
      @mouseleave="uploadleave" @mouseenter="uploadenter" v-if="uploadShow">
      <AVCircle src="./miss.mp3" :progress-width="2" :rotate-graph="true" :line-width="2" :bar-width="2"
        :bar-length="25" :audio-controls="false" />
    </div>
    <!-- <div class="music">
      <AVCircle src="./miss.mp3" :progress-width="2" :rotate-graph="true" :line-width="2" :bar-width="2"
        :bar-length="25" :audio-controls="false" />
    </div> -->
    <div class="day">
      <div class="day-now">第 {{ day }} 天</div>
      <div class="day-lover">{{ bridegroom }} <span class="love-text">{{ love }}</span> {{ bride }}</div>
      <div class="day-desc">
        <p>不知不觉，你我相依已过{{ day }}天</p>
        <p>期间的点点滴滴，如同这漫天飞舞的纸鹤</p>
        <p>飘然于心间，无论时光如何流转，你我始终依偎</p>
      </div>
    </div>

    <div class="calendar">
      <h3 class="title">
        岁月留痕
        <p class="sub-title">愿我如星君如月，夜夜流光相皎洁</p>
      </h3>
      <el-calendar ref="calendar" v-model="pickDate">
        <template #date-cell="{ data }">
          <div style="margin: 5px;">{{ data.day.split('-').pop() }}</div>
          <template v-for="item in calendarList">
            <div class="calendar-thin" v-if="item.date === data.day" :title="item.desc">{{ item.desc
              }}</div>
          </template>
        </template>
        <template #header="{ date }">
          <div class="calendar-box">
            <span>{{ date }}</span>
            <el-button-group>
              <el-button size="small" @click="selectDate('prev-month')"> &lt; 上月 </el-button>
              <el-button size="small" @click="selectDate('today')">今天</el-button>
              <el-button size="small" @click="selectDate('next-month')"> 下月 &gt; </el-button>
            </el-button-group>
            <el-date-picker v-model="pickDate" type="date" placeholder="宝宝可以选择日期" :disabled-date="disabledDate"
              :shortcuts="shortcuts" />
          </div>
        </template>
      </el-calendar>
    </div>

    <h3 class="title">
      时光留影
      <p class="sub-title">我见青山多妩媚，料青山见我应如是</p>
    </h3>
    <Waterfall :list="recordList" class="waterfall">
      <template #item="{ item, url, index }">
        <div class="card">
          <LazyImg :url="url" />
          <!-- <p class="text">{{ item.time }}</p> -->
          <p class="text">{{ item.desc }}</p>
        </div>
      </template>
    </Waterfall>

    <WebsiteFiling></WebsiteFiling>

  </div>
</template>

<script setup>
import { ref, h, onMounted } from 'vue'
import { useHome } from '@/store/home'
import { differTime } from '@/utils/ximingx/dayjs'
import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import WebsiteFiling from '@/components/WebsiteFiling/WebsiteFiling.vue'
import { AVCircle } from 'vue-audio-visual'

document.title = '你好呀！'

const homeStore = useHome()
// day
const day = differTime(homeStore.day)
const bridegroom = homeStore.bridegroom
const bride = homeStore.bride
const love = homeStore.love
// calendar
const calendarList = homeStore.calendarList
const calendar = ref()
// record
const recordList = homeStore.recordList

const pickDate = ref(new Date())
const shortcuts = [
  {
    text: '初识',
    value: new Date(calendarList[0].date)
  },
  {
    text: '今日',
    value: new Date()
  }
]

// 计算一天的毫秒数
const oneDayInMillis = 24 * 60 * 60 * 1000;
const disabledDate = (time) => {
  return time.getTime() < (new Date(calendarList[0].date)).getTime() - oneDayInMillis
}

const selectDate = (type) => {
  calendar.value.selectDate(type)
}

import { ElMessageBox, ElInput, ElMessage } from 'element-plus'
const logFlag = ref(false)

const uploadflag = ref(true);
const uploadShow = ref(true);

const uploadenter = () => {
  uploadflag.value = true;
};

const uploadleave = () => {
  uploadflag.value = false;
};

let openElMessageBox, audio;
let isElMessageBoxOpen = false;

const handleKeydown = (event) => {
  if (event.key === ' ') {
    if (logFlag.value) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    } else if (!isElMessageBoxOpen) {
      openElMessageBox();
      isElMessageBoxOpen = true;
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);

  audio = document.querySelector('.music audio')
  audio.setAttribute('loop', 'loop');

  const audioCanvas = document.querySelector('.music canvas')
  audioCanvas.addEventListener('click', function () {
    // 检查音频当前是否在播放
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });


  const username = ref('')
  const password = ref('')

  const handleEnter = (event, close) => {
    if (event.key === 'Enter') {
      const confirmButton = document.querySelector('.el-message-box__btns .el-button--primary')
      if (confirmButton) {
        confirmButton.click() // 触发 confirm 按钮的点击事件
      }
    }
  }

  const validateLogin = () => {
    if ((username.value === 'xfy' && password.value === '99.06.15') || (username.value === 'xk' && password.value === '97.11.16')) {
      logFlag.value = true
      ElMessage({
        message: '宝宝，终于等到你啦！(づ￣ ³￣)づ ',
        type: 'success',
      })
      // 修改网页标题
      document.title = '爱你，宝贝！'

      // 修改网页图标
      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon) {
        favicon.href = './icon.ico'
      } else {
        const link = document.createElement('link')
        link.rel = 'icon'
        link.href = './icon.ico'
        document.head.appendChild(link)
      }
      audio.play();
    } else {
      ElMessage({
        message: '账号或密码错误哦！( ̄へ ̄)',
        type: 'error',
      })
    }
  }

  openElMessageBox = () => {
    ElMessageBox({
      title: '需要先登录哦',
      message: () =>
        h('div', [
          h(ElInput, {
            modelValue: username.value,
            'onUpdate:modelValue': (value) => (username.value = value),
            placeholder: '请输入账号',
            onKeyup: handleEnter,
            // onKeyup: (event) => handleEnter(event, done),
          }),
          h(ElInput, {
            type: 'password',
            modelValue: password.value,
            'onUpdate:modelValue': (value) => (password.value = value),
            placeholder: '请输入密码',
            style: 'margin-top: 10px',
            onKeyup: handleEnter,
          }),
        ]),
      showCancelButton: true,
      confirmButtonText: '登录',
      cancelButtonText: '取消',
      beforeClose: (action, instance, done) => {
        if (action === 'confirm') {
          validateLogin()
          if (logFlag.value) {
            done()
            isElMessageBoxOpen = false;
          }
        } else {
          done()
          isElMessageBoxOpen = false;
        }
      },
    })
  }
  openElMessageBox();
  isElMessageBoxOpen = true;
})

</script>

<style scoped lang="scss">
.home-container {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  opacity: 0.9;

  .title {
    font-family: "ZCOOL KuaiLe", sans-serif;
    font-size: 25px;
    text-align: center;
    color: #fff;
    margin-top: 60px;
  }

  .sub-title {
    font-size: 18px;
    font-family: "Ma Shan Zheng", cursive;
    text-align: center;
    color: #fff;
  }

  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20vh 0 15vh 0;
    font-family: "Ma Shan Zheng", cursive;

    .day-now {
      // margin: 10px 0;
      font-size: 60px;
      font-weight: 500;
      font-family: 'FangSong', 'KaiTi', sans-serif;
      color: #fff;
    }

    .day-lover {
      margin-top: 10px;
      font-size: 32px;
      font-weight: 700;
      color: #fff;

      .love-text {
        // color: #f68084;
        font-family: "Dancing Script", cursive;
      }
    }

    .day-desc {
      margin-top: 10px;
      font-size: 16px;
      color: #fff;
      text-align: center;
    }

    @media screen and (min-width: 768px) {
      .day-now {
        font-size: 100px;
      }

      .day-lover {
        font-size: 30px;
      }
    }
  }

  .calendar {
    .calendar-thin {
      margin-top: 5px;
      font-size: 6px;
      color: #f68084;
    }

    .calendar-box {
      width: 100vw;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }

    @media screen and (min-width: 768px) {
      .calendar-thin {
        font-size: 16px;
      }
    }
  }

  .waterfall {
    width: 90vw;
    margin: 30px auto;
    border-radius: 10px;
  }
}

::-webkit-scrollbar {
  display: none;
  width: 0 !important;
}

::v-deep(.el-button--small) {
  margin: 0 10px;
  box-sizing: border-box;
}

::v-deep(.el-calendar) {
  margin: 0 auto;
  width: 90%;
  border-radius: 10px;
  font-size: 0.8em;
}

::v-deep(.is-today) {
  color: red;
}

::v-deep(.el-calendar-day) {
  height: 110px;
}

@media screen and (min-width: 768px) {
  ::v-deep(.el-calendar) {
    font-size: 1.2em;
  }

  ::v-deep(.el-button--small) {
    font-size: 18px;
  }

  .off {
    -webkit-animation: 0.8s seconddiv;
    animation: 0.8s seconddiv;
    background: transparent;
  }

  /* @keyframes seconddiv {
    0% {
        transform: scale(1.4, 1.4);
    }

    10% {
        transform: scale(1, 1);
    }

    25% {
        transform: scale(1.2, 1.2);
    }

    50% {
        transform: scale(1, 1);
    }

    70% {
        transform: scale(1.2, 1.2);
    }

    100% {
        transform: scale(1, 1);
    }
} */

  @keyframes seconddiv {
    0% {
      transform: scale(1, 1);
    }

    10% {
      transform: scale(1.1, 1.1);
    }

    25% {
      transform: scale(1.2, 1.2);
    }

    50% {
      transform: scale(1, 1);
    }

    75% {
      transform: scale(1.2, 1.2);
    }

    100% {
      transform: scale(1.1, 1.1);
    }
  }

  .meun-switch {
    position: fixed;
    top: 60px;
    left: 0px;
    z-index: 2001;
    cursor: pointer;
    // width: 90px;
    /* height: 150px; */
    padding: 5px;
    transition: all 0.2s;

    &.leave {
      left: -50px;
      transition: left 0.8s 0.2s;
      /* 设置离开的动画延迟时间为 1s，持续时间为 0.2s */
    }

    &.active {
      left: 0;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
