<template>
  <div id="app">
    <a-tabs defaultActiveKey="1" @change="tabchange">
      <a-tab-pane tab="后缀名修改" key="1">
        <ext-change></ext-change>
      </a-tab-pane>
      <a-tab-pane tab="Tab 2" key="2" forceRender>
        Content of Tab Pane 2
      </a-tab-pane>
      <a-tab-pane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
  import ExtChange from "./components/extChange.vue";


  export default {
    name: 'filename.ext',
    components: {
      ExtChange
    },
    methods:{
      tabchange() {
        console.log(11);
      },
      tell(){
        this.$message.info('This is a normal message');
      },
    }
  }
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
</style>
