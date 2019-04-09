<template>
  <div class="main">
    <div class="info">
      <a-tooltip placement="bottom" >
        <template slot="title">
            <span>本工具用于批量修改文件后缀名，例如：xxx.avi -> 考研资料.mp4</span>
        </template>
        <a-icon type="info-circle" />
      </a-tooltip>
    </div>
    <div id="holder" @drop="filedrop($event)" @dragover="filedragover($event)">
      <div>
        <i data-v-6e19165e class="anticon anticon-inbox">
          <svg
            data-v-6e19165e
            viewBox="0 0 1024 1024"
            data-icon="inbox"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
            class
          >
            <path
              d="M885.2 446.3l-.2-.8-112.2-285.1c-5-16.1-19.9-27.2-36.8-27.2H281.2c-17 0-32.1 11.3-36.9 27.6L139.4 443l-.3.7-.2.8c-1.3 4.9-1.7 9.9-1 14.8-.1 1.6-.2 3.2-.2 4.8V830a60.9 60.9 0 0 0 60.8 60.8h627.2c33.5 0 60.8-27.3 60.9-60.8V464.1c0-1.3 0-2.6-.1-3.7.4-4.9 0-9.6-1.3-14.1zm-295.8-43l-.3 15.7c-.8 44.9-31.8 75.1-77.1 75.1-22.1 0-41.1-7.1-54.8-20.6S436 441.2 435.6 419l-.3-15.7H229.5L309 210h399.2l81.7 193.3H589.4zm-375 76.8h157.3c24.3 57.1 76 90.8 140.4 90.8 33.7 0 65-9.4 90.3-27.2 22.2-15.6 39.5-37.4 50.7-63.6h156.5V814H214.4V480.1z"
            ></path>
          </svg>
        </i>
      </div>
      <p class="desc0">将文件拖到此处后松开鼠标</p>
      <p class="desc1">*本软件不会将您的任何文件或信息向外网发送，尽可放心使用。</p>
    </div>
    <div class="ext">
      <a-input-search
      placeholder="png | docx | avi | txt..."
      @input="extInput"
      @search="confirmModify"
      v-model='newext'
      enterButton='确定修改'
    />
    </div>
    <div class="list">
      <p class="head" ><a-icon type="bars" />待修改文件列表</p>
      <a-list itemLayout="horizontal" :dataSource="fileList">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
          <!-- description="Ant Design, a design language for background applications, is refined by Ant UED Team" -->
            <p slot="title">{{index}}.{{item.name}} <span class="gap"> 
              <a-icon type="double-right" />
              修改为
              <a-icon type="double-right" /> 
              </span> {{item.nameBeforeExt}}
              <span style="color:deeppink">.{{newext}}</span>
              <span>
                <!-- <p>old:{{item.path}}</p> -->
                <p>new:{{item.pathBeforeExt}}</p>
              </span>
            </p>
            
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </div>
    <div>
      <a-modal
        title="Warning!!!"
        v-model="modalVisible"
        @ok="modify"
        style="width:400px;"
        :width='400'
      >
        <p>确定将所有文件后缀名改为{{newext}}?</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import path from 'path'
import fs from 'fs'
import { setTimeout } from 'timers';
export default {
  name: "ExtChange",
  data() {
    return {
      msg: "",
      newext:'newExtension',
      fileList: {}, //{}
      modalVisible: false
    };
  },
  methods: {
    filedrop(e) {
      var self = this
      e.preventDefault();
      e.stopPropagation();
      console.log(e.dataTransfer.files);
      this.fileList = e.dataTransfer.files
      // for (let f of e.dataTransfer.files) {
      //   console.log("File(s) you dragged here: ", f.path);
      //   self.fileList.push(f)
      // }
      // this.$nextTick(function () {
        this.preview()
      // })
    },
    preview(){
      for (let f of this.fileList) {
        console.log("File path:", f.path);
                
        let ext = path.extname(f.path)
        let filepath = f.path
        let filename = f.name
        // console.log('path:',filepath)
        // console.log('ext:',ext)
        f.ext = ext
        var newpath = ''
        var newname = ''
        var  pathBeforeExt = ''
        var  nameBeforeExt = ''
        if(!ext && filepath.substr(-1) === '.'){
          newpath = `${f.path}${this.newext}`
          newname = `${f.name}${this.newext}`
          pathBeforeExt = filepath.replace( /\.$/, '')
          nameBeforeExt = filename.replace( /\.$/, '')
        }else if(!ext && filepath.substr(-1) !== '.'){
          newpath = `${f.path}.${this.newext}`
          newname = `${f.name}.${this.newext}`
          pathBeforeExt = filepath
          nameBeforeExt = filename
        }else{
          let exp = new RegExp( `${ext}$`);
          // console.log(exp);
          let temppath = f.path.replace( exp, '')
          let tempname = f.name.replace( exp, '')
          // console.log('去除后缀的文件名：', temppath);
          newpath = `${temppath}.${this.newext}`
          newname = `${tempname}.${this.newext}`
          // console.log('新路径：', newpath);
          // console.log('新文件名：', newname);
          pathBeforeExt = temppath
          nameBeforeExt = tempname
        }
        // f.newpath = newpath
        // f.newname = newname
        // f.pathBeforeExt = pathBeforeExt
        // f.nameBeforeExt = nameBeforeExt
        console.log('Befo path:', pathBeforeExt);
        
        this.$set(f, 'newpath', newpath)
        this.$set(f, 'newname', newname)
        this.$set(f, 'pathBeforeExt', pathBeforeExt)
        this.$set(f, 'nameBeforeExt', nameBeforeExt)
      }
      
      // for (const key in this.fileList) {
      //   console.log('循环中。。。，key:',key);
        
      //   if (this.fileList.hasOwnProperty(key)) {
      //     const f = this.fileList[key];
      //     console.log("File path:", f.path);
                  
      //     let ext = path.extname(f.path)
      //     let filepath = f.path
      //     let filename = f.name
      //     // console.log('path:',filepath)
      //     // console.log('ext:',ext)
      //     f.ext = ext
      //     var newpath = ''
      //     var newname = ''
      //     var  pathBeforeExt = ''
      //     var  nameBeforeExt = ''
      //     if(!ext && filepath.substr(-1) === '.'){
      //       newpath = `${f.path}${this.newext}`
      //       newname = `${f.name}${this.newext}`
      //       pathBeforeExt = filepath.replace( /\.$/, '')
      //       nameBeforeExt = filename.replace( /\.$/, '')
      //     }else if(!ext && filepath.substr(-1) !== '.'){
      //       newpath = `${f.path}.${this.newext}`
      //       newname = `${f.name}.${this.newext}`
      //       pathBeforeExt = filepath
      //       nameBeforeExt = filename
      //     }else{
      //       let exp = new RegExp( `${ext}$`);
      //       // console.log(exp);
      //       let temppath = f.path.replace( exp, '')
      //       let tempname = f.name.replace( exp, '')
      //       // console.log('去除后缀的文件名：', temppath);
      //       newpath = `${temppath}.${this.newext}`
      //       newname = `${tempname}.${this.newext}`
      //       // console.log('新路径：', newpath);
      //       // console.log('新文件名：', newname);
      //       pathBeforeExt = temppath
      //       nameBeforeExt = tempname
      //     }
      //     // f.newpath = newpath
      //     // f.newname = newname
      //     // f.pathBeforeExt = pathBeforeExt
      //     // f.nameBeforeExt = nameBeforeExt
      //     console.log('Befo path:', pathBeforeExt);
          
      //     this.$set(f, 'newpath', newpath)
      //     this.$set(f, 'newname', newname)
      //     this.$set(f, 'pathBeforeExt', pathBeforeExt)
      //     this.$set(f, 'nameBeforeExt', nameBeforeExt)
      //   }
      // }
      console.log(this.fileList);
    },
    filedragover(e) {
      e.preventDefault();
      e.stopPropagation();
      // this.mouseon
    },
    extInput(){
      console.log(this.newext);
      // this.preview()
      console.log(this.fileList);
    },
    confirmModify(){
      if(Object.keys(this.fileList).length < 1){
        return this.$message.error('文件列表为空！')

      }
      this.modalVisible = true
    },
    modify(){
      for (let f of this.fileList) {
        console.log('------开始修改------');
        let newpath = f.pathBeforeExt+'.'+this.newext
        console.log(f.path);
        console.log(newpath);
        fs.rename(f.path, newpath, function(){
          console.log('------修改结束------');
        })
      }
      this.modalVisible = false
      this.$message.success('后缀名已修改')
    }
  }
};
</script>

<style lang='scss' scoped>
$theme : #1890ff;
.dragger {
  width: 300px;
  margin: 0 auto;
}
.info{
  i{
    color: $theme;
    font-size: 20px;
    margin-bottom: 20px; 
    font-weight: 700;
  }
}
#holder {
  width: 250px;
  height: 150px;
  margin: 0 auto;
  border: 1px dashed #d9d9d9;
  -webkit-transition: border-color 0.3s;
  transition: border-color 0.3s;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  position: relative;
  background: #fafafa;
  i {
    font-size: 48px;
    color: #40a9ff;
  }
  .desc0 {
    font-weight: 700;
    color: #000;
  }
  .desc1 {
    color: rgba(0, 0, 0, 0.466);
  }
}
.gap{
  display: inline-block;
  width: 80px;
  // color: deeppink;
  color: #1890ff;
  font-weight: 700;
}
.ext{
  width: 250px;
  margin: 20px auto;
}
.list{
  min-width: 500px;
  margin: 0 auto;
  .head{
    // text-align: left;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
    // border-bottom: 2px solid;
  }
}

// 
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
