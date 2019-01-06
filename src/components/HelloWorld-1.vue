<template>
  <div class="hello">
    <!-- 搜索框 -->
    <div>
      <el-container style="margin-bottom:2.33333%">
        <el-input placeholder="搜索" clearable class="search" v-model="searchVal">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button type="primary" style="padding: 12px 5px" v-on:click="searchClick">搜索</el-button>
        <!-- <el-button type="primary" icon="el-icon-tickets" class="btn_icon btn_padding"></el-button> -->
        <el-button type="primary" :class="icon_style" @click="change_display_mode">
          <i :class="[isActive ? imgStyle:listStyle]"></i>
        </el-button>
      </el-container>
    </div>
    <!-- 图片展示模式 -->
    <el-row v-if="grid" id="test" >  
      <el-col v-for="eachmessage in valResult" :key="eachmessage.index"  class="colMargin">
          <el-card>
            <div v-for="(imglink,index) in eachmessage.goodlink" :key="imglink.index" class="image">
              <viewer>
                <img  v-if="index===0" v-lazy="imglink.thumbSrc" class="image"> 
              </viewer>
            </div>
            <div  v-if="eachmessage.goodlink.length===0"><viewer><img  src="../../static/imgs/no-img.png" class="image"></viewer></div>                        
            <div class="grid_product_message">
                <span>产品名称：{{eachmessage.goodName}}</span><br>
                <span>产品单号：{{eachmessage.goodNum}}</span><br>
                <span>产品克重：{{eachmessage.goodWeight==''?'暂无':eachmessage.goodWeight+'g'}}</span>
            </div>
          </el-card>
      </el-col>
    </el-row>
    <!-- 列表展示模式 -->
    <el-row v-if="list" style="margin-left: 1.33333%;margin-right: 1.33333%;">
      <el-col :span="24"  v-for="eachmessage in valResult" :key="eachmessage.index" class="list_col">
          <el-card class="grid-content bg-purple-dark" style="width:45%;display: inline-block;float:left">
             <div v-for="(imglink,index) in eachmessage.goodlink" :key="imglink.index" class="image">
              <viewer>
                <img  v-lazy="imglink.thumbSrc"  v-if="index===0"  class="image">
              </viewer>
            </div>
            <div v-if="eachmessage.goodlink.length===0"><viewer><img  src="../../static/imgs/no-img.png" class="image"></viewer></div>  
          </el-card>
          <div class="list_product_massage">
              <span>产品名称：{{eachmessage.goodName}}</span><br>
              <span>产品单号：{{eachmessage.goodNum}}</span><br>
              <span>产品克重：{{eachmessage.goodWeight==''?'暂无':eachmessage.goodWeight+'g'}}</span>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
        grid:true,
        list:false,
        allMessage:[],
        icon_style:{
          btn_icon:true,
          search_img_btn:true,
          btn_padding:true,
          icon_bgd:false,
        },
        imgStyle:'el-icon-menu',
        listStyle:'el-icon-tickets',
        isActive:true,
        valResult:[],
        searchVal:'',
       
    }
  },
  mounted(){
      this.$axios.get("../../static/jewal.json")
      .then(response=>{
          this.finalImg(response)
          // console.log(1,response)
          // console.log(2,response.data)// 将接收到的数据传递到data的数据中
          
      }) 
      .catch(error=>{
          console.log(error)// 将接收到的数据传递到data的数据中
      }) 
  },
  methods:{
    finalImg(data) {   //获得json数据的处理
      var message=[]
      for(var i=0;i<data.data.length;i++){
          var messageObj={
            goodName:data.data[i].product_name,
            goodNum:data.data[i].product_code,
            goodWeight:data.data[i].pw,
            goodlink:data.data[i].thumbSrc
          }
          message.push(messageObj)
      };
      this.allMessage=message
      this.valResult=message
      // console.log(4,this.allMessage)     
    },
    //改变图片、列表展示时候的不同状态的标签
    change_display_mode:function(){
      this.grid=!this.grid
      this.list=!this.list
      this.icon_style.icon_bgd=!this.icon_style.icon_bgd
      this.isActive=!this.isActive
    },
    searchClick:function(){
      var showMessage = []
			for(var i=0;i<this.allMessage.length;i++){
        if(this.allMessage[i].goodName.search(this.searchVal)!=-1){
          showMessage.push(this.allMessage[i])
        }
      }
      this.valResult=showMessage;
      console.log(this.valResult)
    },
  }
}
</script> 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* 卡片样式 element.ui*/
  .time {font-size: 13px;color: #999;}   
  .bottom {margin-top: 13px;line-height: 12px;}
  .button {padding: 0;float: right;}
  .image {width: 100%;display: block;height: 120px;}
  .clearfix:before,.clearfix:after {display: table;content: "";}
  .clearfix:after {clear: both}
  /* 头部搜索框 */
  .search{margin-left: 1.33333%}
  .btn_padding{padding: 12px 8px}
  .search_img_btn{margin-right: 1.33333%}
  .icon_bgd{background-color:#a5cef9}
  /* 图片模式 */
  .grid_product_message{padding: 10px;height: 110px;}
  .colMargin{margin-left: 1.33333%;margin-right: 1.33333%;width: 47.33333%;height: 270px;}
  .el-col .el-card__body{padding: 0px}
  /* 列表模式 */
  .list_image{float:left;margin-top:5%;margin-bottom:5%}
  .list_product_massage{margin-right: 3.33333%;margin-top: 5.33333%}
  .list_col{border-bottom: 1px solid rgba(24, 23, 23, 0.21);height:140px}

</style>
<style>
  .el-card__body{padding: 0px;}
</style>

