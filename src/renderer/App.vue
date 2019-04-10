<template>
  <div id="app">
    <div class="github-icon">
      <div class="date">
        {{time}}
      </div>
      <div>
        <a href="https://github.com/ShenJet/filename.ext" target="_blank" class="github-corner" aria-label="View source on GitHub">
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;"
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style="transform-origin: 130px 106px;"
            class="octo-arm"
          ></path>
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            class="octo-body"
          ></path>
        </svg>
      </a>
      </div>
    </div>
    <a-tabs defaultActiveKey="1" @change="tabchange">
      <a-tab-pane tab="文件名修改" key="1" forceRender>
        <filename-mod></filename-mod>
      </a-tab-pane>
      <a-tab-pane tab="文件名删减" key="2" forceRender>
        <filename-reduce></filename-reduce>
      </a-tab-pane>
      <a-tab-pane tab="文件名插词" key="3" forceRender>
        <filename-add></filename-add>
      </a-tab-pane>
      <a-tab-pane tab="后缀名修改" key="4">
        <ext-change></ext-change>
      </a-tab-pane>
    </a-tabs>

    <div class="btm">
      <div>
        ©Copyright {{new Date().getFullYear()}} ShenJet 
        <a href="https://github.com/ShenJet/filename.ext" target="_blank" rel="noopener noreferrer">
          作者GitHub
        </a>
      </div>
      <div>
        <a href="/static/apache.html" target="_blank" rel="noopener noreferrer">软件开源协议：Apache Licene 2.0</a>
      </div>
      <div class="dashang">
        <span @click="dashang">>有用，打赏作者<</span>
      </div>
    </div>
    <a-modal
      title="打赏作者"
      :visible="showdashang"
      @ok="showdashang=false"
      @cancel="showdashang=false"
    >
      <div class="imgs">
        <img src="./assets/alipay.jpg" alt="" srcset="">
        <img src="./assets/wxpay.jpg" alt="" srcset="">
      </div>
    </a-modal>
  </div>
</template>

<script>
import ExtChange from "./components/extChange.vue";
import filenameMod from "./components/filenameMod.vue";
import filenameReduce from "./components/filenameReduce.vue";
import filenameAdd from "./components/filenameAdd.vue";
import { setInterval } from 'timers';

export default {
  name: "filename.ext",
  components: {
    ExtChange,
    filenameMod,
    filenameReduce,
    filenameAdd
  },
  data(){
    return {
      showdashang: false,
      time:''
    }
  },
  methods: {
    tabchange() {
      console.log(11);
    },
    tell() {
      this.$message.info("This is a normal message");
    },
    dashang(){
      this.showdashang = true
    },
    dashangcancel(){
      this.showdashang = false
    },
    changeTime(){
      var self = this
      setInterval(function(){
        let newday = new Date()
        let time = newday.toLocaleString()
        let day = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'][newday.getDay()]
        self.time = newday.toLocaleString() + ' ' + day
      },1000)
    }
  },
  created(){
    this.changeTime()
  },
  computed:{
    
  }
};
</script>

<style lang=scss scoped>
/* CSS */
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.github-icon{
  height: 80px;
  .date{
    text-align:left;
    padding: 8px;
  }
}
.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}
@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }
  20%,
  60% {
    transform: rotate(-25deg);
  }
  40%,
  80% {
    transform: rotate(10deg);
  }
}
@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
.btm{
  font-weight: 700;
  width: 100%;
  margin-top: 30px;
  padding: 10px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.158);
  .dashang{
    cursor: pointer;

  }
}
.imgs{
  display: flex;
  justify-content: space-between;
  flex-direction: row;

  img{
    width: 200px;
    height: 250px;
  }
  
}
</style>
