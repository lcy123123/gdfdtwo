<template>
  <div class="sjz-srk-z">
    <!-- 时间轴上面的输入框（选择日期） -->
    <div>
      <div class="sjz-srk" v-show="flagrq">
        <!-- 日期1 -->
        <el-form>
          <el-form-item :label="rq1" class="rq1">
            <el-select
              v-model="value1"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 日期2 -->
          <el-form-item :label="rq2" class="rq2">
            <el-select
              v-model="value2"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <!-- 时间轴上面的 设置 -->
      <div class="sjz-sz" v-show="flagsz">
        <el-form>
          <el-form-item label="速度:">
            <el-select
              v-model="sd"
              placeholder="请选择"
              @change="changeSu($event)"
            >
              <el-option
                v-for="item in sdoption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="间隔:">
            <el-select v-model="jg" placeholder="请选择">
              <el-option
                v-for="item in jgoption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 时间轴 -->
    <div class="sjz-z">
      <div>
        <span @click="selectrq" class="btn-1"
          ><img src="../assets/001.png" alt=""
        /></span>
        <span @click="selectsz" class="btn-2"
          ><img src="../assets/002.png" alt=""
        /></span>
      </div>
      <!-- 中间时间轴 -->
      <div class="sjz-middle">
        <img class="sjz-img" src="../assets/sjz.png" alt="" />
        <el-slider
          v-model="value"
          :marks="marks1"
          :max="max1"
          :min="min1"
          @change="clikeValue"
        ></el-slider>
      </div>
      <div>
        <span class="btn-3" @click="firstImg"
          ><img src="../assets/003.png" alt=""
        /></span>
        <span class="btn-4" @click="beforeImg"
          ><img src="../assets/004.png" alt=""
        /></span>
        <span class="btn-5" @click="changeState"
          ><img src="../assets/ks.png" alt=""
        /></span>
        <span class="btn-6" @click="afterImg"
          ><img src="../assets/006.png" alt=""
        /></span>
        <span class="btn-7" @click="lastImg"
          ><img src="../assets/007.png" alt=""
        /></span>
      </div>
    </div>
  </div>
</template>
<script>
import zt from "../assets/zt.png";
import ks from "../assets/ks.png";
import $ from "jquery";
import bus from "../utils/eventBus";
export default {
  data() {
    return {
      //开始暂停flag值
      ksztFlag: false,
      value: 2010,
      max1: 2019,
      min1: 2010,
      marks1: {
        2010: "2010",
        2011: "2011",
        2012: "2012",
        2013: "2013",
        2014: "2014",
        2015: "2015",
        2016: "2016",
        2017: "2017",
        2018: "2018",
        2019: "2019"
      },
      // yxbg:'',
      value1: 2010,
      options1: [],
      index: 0,
      value2: 2019,
      options2: [],
      flagrq: false,
      flagsz: false,
      sd: 1000,
      jg: 1,
      sdoption: [
        { key: 1, value: 500, label: 500 },
        { key: 2, value: 1000, label: 1000 },
        { key: 3, value: 2000, label: 2000 }
      ],
      jgoption: [
        { key: 1, value: 1, label: 1 },
        { key: 2, value: 2, label: 2 },
        { key: 3, value: 3, label: 3 },
        { key: 4, value: 4, label: 4 },
        { key: 5, value: 5, label: 5 },
      ],
      rq1: "开始年份",
      rq2: "结束年份",
      timer: null,
      sjzFlag: true,
      element: "",
      //卫星数据
      Wx: "",
      //卫星参数数据
      Wxcs: "",
      //数值预报value
      date: "",
      //根据选择的日期1传index
      firstdate: "0",
      //根据选择的日期2传index
      seconddate: "9",
      count:1,
      jgvalue:1,
    };
  },
  methods: {
    Jg(jgvalue){
      if(jgvalue==1){
        this.count=1
        //间隔为2
      }else if(jgvalue==2){
        if(this.index>this.seconddate){
          this.index=this.firstdate
          console.log(this.index)
        }else{
          console.log(this.index)
          this.count=2
        }
        //间隔为3
      }else if(jgvalue==3){
        
        if(this.index>this.seconddate){
          this.index=this.firstdate
        }else{
          this.count=3
        }
        //间隔为4
      }else if(jgvalue==4){
        if(this.index>this.seconddate){
          this.index=this.firstdate
        }else{
          this.count=4
        }
        //间隔为5
      }else if(jgvalue==5){
        if(this.index>this.seconddate){
          this.index=this.firstdate
        }else{
        this.count=5
        }

      }
    },
    //点击轴上的点
    clikeValue(){
      console.log(this.firstdate,'---')
      if(this.value-this.options1[this.firstdate].value>=0){
      this.index=this.value-this.options1[this.firstdate].value
      console.log(this.index,'index1')
      }else{
        this.index=this.value
      }
      bus.$emit(this.element, this.index);
      
      this.zt()


    },
    //点击显示第一张图片
    firstImg() {
      //将index设置为0
      this.index = this.firstdate;
      this.dsq();
      //调用暂停
      this.zt();
    },
    //点击显示最后一张图片
    lastImg() {
      //将index设置
      // this.index = this.options1.length - 1;
      // this.value = this.options1[this.seconddate].value;
      this.zt();
      this.index = this.seconddate;
      this.value = this.max1;
      bus.$emit(this.element, this.index);
  
    },
    //点击前一张图片
    beforeImg() {
      this.zt();
      //判断index的值 后退到0时 设置index为0
      if (this.index <= this.firstdate+1) {
        this.index = this.firstdate;
        this.value = this.min1;
      }else{
        this.index -=1;
        this.value --;
      }
  
      bus.$emit(this.element, this.index);

    },
    //点击后一张图片
    afterImg() {
      this.zt();
      if(this.index <= this.seconddate){
         this.index +=1;
         this.value ++;
         bus.$emit(this.element, this.index);
      }
      // this.play()
    },
    
    //改变速度的值
    changeSu(sd) {
      this.sd = sd;
      this.play();
    },
    //定时器执行的内容
    dsq() {
      
      console.log(this.index,'index2')
      if(this.value-2009>=0){
        this.value = this.options1[this.index].value;
      }else{
        this.value = this.index;
      }
      //发起组件传值（index 默认为0）
      bus.$emit(this.element, this.index,this.value1,this.value2);
      //判断index
      if (this.index >= this.seconddate) {
        this.index = this.firstdate;
      }
      
      else {
        this.index=this.index+this.count;
        // this.value++
      }

    },
    //有效波高传过来的值
    yxbgmethods() {
     
      bus.$on("addyxbgimg", yxbg => {
       bus.$emit('Wx','')
       bus.$emit('Wxcs','')
        //防止上一个执行一半时下一个继续执行
        // this.index = 0;
        this.element = "yxbg";
        //防止点击单张图片时执行之前的图片加载
        this.zt();
        if (
          yxbg == "逐月平均值" ||
          yxbg == "逐月最大值" ||
          yxbg == "逐月最小值"
        ) {
          $(".rq2").css("display", "block");
          this.rq1 = "开始月份";
          this.rq2 = "结束月份";
          //调用暂停方法（暂停方法中有添加定时器以及清除定时器）
          // this.play();
          $(".sjz-srk-z").css("display", "block");
        } else if (
          yxbg == "逐年平均值" ||
          yxbg == "逐年最大值" ||
          yxbg == "逐年最小值"
        ) {

          $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
          //开始方法
          // this.play();
          $(".sjz-srk-z").css("display", "block");
        } else {
          $(".sjz-srk-z").css("display", "none");
        }
        this.yxbgDate();
      });
     
    },
    //（数值预报）根据传递过来的参数 动态换时间轴上面框中的内容
    dongtaidate() {
      bus.$on("addimg", date => {
        this.zt();
        this.date = date;
        this.element = "szyb";
        //组件传过来的值
        if (date === "年平均风速" || date === "年平均风功率密度" || date === "有效风速时数" || date === "风切变系数" || date === "威布尔分布形状参数" || date === "威布尔分布尺度参数") {
          $('.sjz-srk-z').show()
         $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
          
        } else if (date === "月平均风速" || date === "逐小时年平均风速" || date === "月平均风功率密度" || date === "各向风功率密度分布频率" || date === "各区间风速分布频率" || date === "各区间风功率密度分布频率") {
        
          $('.sjz-srk-z').show()
          this.rq1 = "年份";
          this.rq2 = "1";
          $(".rq2").css("display", "none");
        } else if (date === "逐小时月平均风速") {
          $('.sjz-srk-z').show()
          $(".rq2").css("display", "block");
          this.rq1 = "年份";
          this.rq2 = "月份";
        }
        else if(date==='格点风参'){
          $('.sjz-srk-z').hide()
          this.element=''
        }else if(date==='风向分布频率'){
          $('.sjz-srk-z').hide()
           
        }
        
        //调用获取日期以及月份方法
        this.initOption();
      });
    },
    //初始化option
    startOption() {
      let year = new Date().getFullYear();
      for (var m = 2010; m < year; m++) {
        this.options1.push({ label: m, value: m, key: m });
        this.options2.push({ label: m, value: m, key: m });
        this.marks1[m] = "" + m + "";
      }
    },
    //点击选择日期
    selectrq() {
      //让其兄弟隐藏
      $(".sjz-srk").siblings().hide();
      //改变状态值
      this.flagrq = !this.flagrq;
    },
    //点击选择速度方法
    selectsz() {
      // $('.sjz-sz').show()
      $(".sjz-sz").siblings().hide();
      this.flagsz = !this.flagsz;
    },

    //根据卫星以及卫星参数判断前端输入数据方法
    wxAndWxcs() {
      //防止继续接着上一个index执行
      // this.index=this.firstdate
      if (this.Wxcs === "月平均风速" || this.Wxcs === "月平均风功率密度") {
        if (
          this.Wx === "ASCAT" ||
          this.Wx === "WindSat" ||
          this.Wx === "HY-2B" ||
          this.Wx === "CFOSAT"
        ) {
          // console.log("2019年的");
          this.rq1 = "年份";
          this.value1 = 2019;
          this.options1 = [];
            if(this.Wx=='HY-2B'||this.Wx=='CFOSAT'){
              for(let i=2019;i<=2020;i++){
                this.options1.push({ value: i, key: i, label: i });
              }
             }else{
               for(let i=2010;i<=2019;i++){
                 this.options1.push({ value: i, key: i, label: i });
                 }
             }
          this.min1 =this.firstdate= 1;
          this.max1 =this.seconddate= 12;
          this.index=1
          this.marks1 = {};
          for (let i = 1; i <= 12; i++) {
            this.marks1[i] = "" + i + "";
          }
          $(".rq2").css("display", "none");
          $(".rq1").css("margin-top", "20px");
        } else {
          // console.log("2017年的");
          this.rq1 = "年份";
          this.value1 = 2017;
          this.options1 = [];
          for(let i=2012;i<=2017;i++){
          this.options1.push({ value: i, key: i, label: i });
          }
          this.max1 = 12;
          this.min1 = 1;
          this.marks1 = {};
          for (let i = this.min1; i <= this.max1; i++) {
            this.marks1[i] = "" + i + "";
          }
          $(".rq2").css("display", "none");
          $(".rq1").css("margin-top", "20px");
        }
        this.firstdate=1
        this.seconddate=12
      } else if (
        this.Wxcs === "年平均风速" ||
        this.Wxcs === "年平均风功率密度"
      ) {
        if (this.Wx === "ASCAT" || this.Wx == "WindSat") {
          // console.log("2010-2019年的");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
          this.options1 = [];
          this.options2 = [];
          this.value1 = this.min1= 2010;
          this.value2 =this.max1= 2019;
          this.firstdate=0;
          this.seconddate=9
          this.marks1 = {};
          let startYear = new Date().getFullYear();
          for (var f = 2010; f < startYear; f++) {
            this.options1.push({ label: f, value: f, key: f });
            this.options2.push({ label: f, value: f, key: f });
            this.marks1[f] = "" + f + "";
          }
          $(".rq2").css("display", "block");
          $(".rq1").css("margin-top", "0px");
        } else if (this.Wx === "HY-2A") {
          // console.log("2012-2018年的");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
          this.options1 = [];
          this.options2 = [];
          this.value1 =this.min1= 2012;
          this.value2 =this.max1= 2018;
          this.firstdate=0
          this.seconddate=6
          this.marks1 = {};
          let startYear = new Date().getFullYear() - 1;
          for (let f = 2012; f < startYear; f++) {
            this.options1.push({ label: f, value: f, key: f });
            this.options2.push({ label: f, value: f, key: f });
            this.marks1[f] = "" + f + "";
          }
          $(".rq2").css("display", "block");
          $(".rq1").css("margin-top", "0px");
        } else {
          // console.log("2019-2020年的");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
          this.options1 = [];
          this.options2 = [];
          this.value1 = this.min1=2019;
          this.value2 = this.max1=2020;
          this.firstdate=0
          this.seconddate=1
          
          this.marks1 = {};
          let startYear = new Date().getFullYear();
          for (let f = 2019; f <= startYear; f++) {
            this.options1.push({ label: f, value: f, key: f });
            this.options2.push({ label: f, value: f, key: f });
            this.marks1[f] = "" + f + "";
          }
          $(".rq2").css("display", "block");
          $(".rq1").css("margin-top", "0px");
        }
      }
    },
    //向cesium传参
    addWxImg(){
        if(this.$route.path!='/pgbj'){
      
      bus.$emit('yggc',this.Wx,this.Wxcs)
        }
    },


    //根据有效波高渲染日期
    yxbgDate() {
      this.options1 = [];
      this.options2 = [];
      this.marks1 = {};
      if (this.rq1 === "开始年份" && this.rq2 === "结束年份") {
        $(".rq1").css("margin-top", "0px");

        this.value=2009
        this.value1 = this.min1 = 2009;
        this.value2 = this.max1 = 2018;
        this.firstdate = 0;
        this.seconddate = 9;
        let startYear = new Date().getFullYear() - 1;
        for (var f = this.min1; f < startYear; f++) {
          this.options1.push({ label: f, value: f, key: f });
          this.options2.push({ label: f, value: f, key: f });
          this.marks1[f] = "" + f + "";
        }
      } else if (this.rq1 == "开始月份" && this.rq2 == "结束月份") {
        $(".rq1").css("margin-top", "0px");
        this.value = 1;
        this.value1 = this.min1 = this.firstdate = 1;
        this.value2 = this.max1 = this.seconddate = 12;

        let startMounth = new Date().getMonth() + 3;
        for (var d =  this.min1 ; d < startMounth; d++) {
          this.options1.push({ label: d, value: d, key: d });
          this.options2.push({ label: d, value: d, key: d });
          this.marks1[d] = "" + d + "";

        }
      }
      this.index = this.firstdate ; 
      
      this.play()
    },
    //数值预报 动态填充option的值
    initOption() {
      this.marks1 = {};
      this.options1 = [];
      this.options2 = [];
      //第一种情况 开始年份 结束年份
      if (this.rq1 === "开始年份" && this.rq2 === "结束年份") {
        $(".rq1").css("margin-top", "0px");
        this.value1=this.min1=2010
        this.value2 =this.max1=2019;
        this.firstdate = 0;
        this.seconddate = 9;
        let startYear = new Date().getFullYear();
        //根据传过来的参数判断时间轴下面的文字
          for (let i = this.min1; i < startYear; i++) {
            this.marks1[i] = "" + i + "";
          }
        //填充options
        for (var i = this.min1; i < startYear; i++) {
          this.options1.push({ label: i, value: i, key: i });
          this.options2.push({ label: i, value: i, key: i });
        }
        //第二种情况 年份 月份
      } else if (this.rq1 === "年份" && this.rq2 === "月份") {
        
        $(".rq1").css("margin-top", "0px");
      
        this.value2 = 1;
        let startYear = new Date().getFullYear();
        let startMounth = new Date().getMonth() + 2;
        if (this.date === "逐小时月平均风速") {
          // this.value = 0;
          this.min1 = this.firstdate = 0;
          this.max1 = this.seconddate = 23;
          for (let i = 0; i < 24; i++) {
            this.marks1[i] = "" + i + "";
          }
        }
        //填充options
        for (var k = 2010; k < startYear; k++) {
          this.options1.push({ label: k, value: k, key: k });
        }
        for (var n = 1; n < startMounth; n++) {
          this.options2.push({ label: n, value: n, key: n });
          this.marks1[n] = "" + n + "";
        }
        // $(".rq1").css("margin-top",'20px')
        //第三种情况 年份 （第二个框隐藏了）
      } else if (this.rq1 === "年份" && this.rq2 == "1") {
      
        $(".rq1").css("margin-top", "25px");
    
        let startYear = new Date().getFullYear();
        // let startMonth = new Date().getMonth() + 2;
        //根据传过来的参数判断时间轴下面的文字
        if (this.date === "月平均风速" || this.date === "月平均风功率密度") {
          this.min1 =this.firstdate= 1;
          this.max1 =this.seconddate= 12;
          // this.firstdate = "0";
          // this.seconddate = "11";
          for (let i = 1; i <= 12; i++) {
            this.marks1[i] = "" + i + "";
          }
          // this.value=1
          
        } else if (this.date === "逐小时年平均风速") {
          this.min1 = this.firstdate=0;
          this.max1 = this.seconddate=23;
          for (let j = 0; j < 24; j++) {
            this.marks1[j] = "" + j + "";
          }
        } else if (
          this.date === "各区间风速分布频率" ||
          this.date === "各区间风功率密度分布频率"
        ) {
          this.min1 = this.firstdate=1;
          this.max1 = this.seconddate=30;
          for (let i = 1; i <= 30; i++) {
            this.marks1[i] = "" + i + "";
          }
        }
        //填充options
        for (var j = 2010; j < startYear; j++) {
          this.options1.push({ label: j, value: j, key: j });
        }
      }
      this.index = this.firstdate;
      this.value = this.min1;
      this.play();
    },
    //点击暂停方法
    zt() {
      $(".btn-5>img").attr("src", ks);
      // console.log($(".btn-5>img"),'-------')
      if (this.timer != null) {
        clearInterval(this.timer);
      }
      this.ksztFlag = 0;
    },
    play() {
      $(".btn-5>img").attr("src", zt);
      if (this.timer != null) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(this.dsq, this.sd);
      this.ksztFlag = 1;
    },

    changeState() {
      // ksztFlag为false 代表暂停 还没开始滑动
      if (this.ksztFlag) {
        this.zt();
      } else {
        //ksztFlag为true 代表开始滑动
        this.play();
      }
    },
    getWx(){
      
        bus.$on("Wx", Wx => {
          if(Wx=='' || Wx==null){
            this.zt();
            }
          else{
      // 储存参数
      this.Wx = Wx;
      //调用填充options方法
      this.wxAndWxcs();
      this.addWxImg()
      }
    });
    //接收卫星参数
      bus.$on("Wxcs", Wxcs => {
        if(Wxcs=='' || Wxcs==null){
          this.zt()
          }
        else{
        //储存参数
        this.Wxcs = Wxcs;
        //调用填充options方法
        this.wxAndWxcs();
        this.addWxImg()
        this.play()
        }
      });
        
        //  this.element='yggc1'
        
    }
  },
  created() {
    //调用初始化option
    this.startOption();
    this.zt()
    if(this.$route.path == '/szyb'){
      this.element='szyb'

    //根据选择不同框显示的不同
    this.dongtaidate();
    } else if(this.$route.path == '/yxbg'){
      this.element='yxbg'
    //调用有效波高方法
    this.yxbgmethods();
    }else if(this.$route.path=='/yggc'){
         this.element='yggc1'
        //接收参数
         this.getWx()
    }
     //当选中（台风频次）的时候隐藏时间轴
    bus.$on("addzhtqimg", zhtq => {
      if (zhtq === "台风频次") {
        $(".sjz-srk-z").css("display", "none");
      }
    });

  },

  watch:{
    value1(value){
      if ((this.rq1 === "开始年份" && this.rq2 === "结束年份") ) {
        this.min1 = this.value = value; //给轴赋值
        this.index = this.firstdate = value-this.options1[0].value;
        console.log(this.firstdate,'=-1=1=1=1=1')
      }else if(this.rq1 === "开始月份" && this.rq2 === "结束月份"){
        this.min1 = this.value = value; //给轴赋值
        this.index = this.firstdate = value-this.options1[0].value+1;
      }
    },
    value2(value){
      if (this.date !== "逐小时月平均风速") {
        this.max1 = value; //给轴最大值赋值
        this.seconddate=value-this.options1[0].value;
        if(this.rq1 === "开始月份" && this.rq2 === "结束月份"){
        this.seconddate += 1;
        }
      }
    },
    value(){
      //调用间隔方法
      this.Jg(this.jgvalue)
    },
    //监听间隔的变化 
    jg(jgvalue){
      //储存间隔
    this.jgvalue=jgvalue
    // this.index=this.firstdate
    this.Jg()
    }
  },

  
}
</script>
<style>
.sjz-srk-z {
  position: relative;
  bottom: 240px;
  left: 200px;
  display: block;
}
.sjz-srk {
  border: 1px solid rgb(0, 140, 255);
  height: 90px;
  width: 150px;
  margin-left: 120px;
  position: absolute;
  bottom: -82px;
  left: 42px;
}
.sjz-sz {
  border: 2px solid rgb(0, 140, 255);
  height: 90px;
  width: 130px;
  margin-left: 120px;
  position: absolute;
  bottom: -82px;
  left: 50px;
}
.sjz-z {
  width: 610px;
  height: 50px;
  position: absolute;
  bottom: -140px;
  left: 12%;
  border: 1px solid #091673;
  border-radius: 30px;
}
.sjz-middle {
  position: absolute;
  left: 70px;
  top: 10px;
  width: 400px;
  height: 100%;
}
.sjz-img {
  width: 400px;
  height: 17px;
  float: left;
  margin: 0 auto;
}
.btn-1 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 10px;
  top: 18px;
}
.btn-2 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 36px;
  top: 18px;
  cursor: pointer;
}
.btn-3 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 115px;
  top: 15px;
}
.btn-4 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 90px;
  top: 15px;
}
.btn-5 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 65px;
  top: 15px;
}
.btn-6 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 40px;
  top: 15px;
}
.btn-7 > img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 15px;
}
.el-form-item__label {
  margin: 0px 0px 7px 2px;
}
.el-select .el-input__inner {
  width: 78px;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-slider__marks-text {
  margin-top: 6px;
  color: #4faaac;
  font-size: 12px;
}
.el-form-item__label {
  color: white;
}
</style>