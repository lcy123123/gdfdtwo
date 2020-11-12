<template>
  <div class="sjz-srk-z">
    <!-- 时间轴上面的输入框（选择日期） -->
    <div>
      <div class="sjz-srk" v-show="flagrq">
        <!-- 日期1 -->
        <el-form>
          <el-form-item :label="rq1" class="rq1">
            <el-select v-model="value1" placeholder="请选择">
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
            <el-select v-model="value2" placeholder="请选择">
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
            <el-select v-model="sd" placeholder="请选择">
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
    <div class="sjz-z" v-if="this.$route.path != '/tb' ? true : false">
      <div>
        <span @click="selectrq" class="btn-1"><img src="../assets/001.png" alt=""/></span>
        <span @click="selectsz" class="btn-2"><img src="../assets/002.png" alt=""/></span>
      </div>
      <!-- 中间时间轴 -->
      <div class="sjz-middle">
        <img class="sjz-img" src="../assets/sjz.png" alt="" />
        <el-slider v-model="value"></el-slider>
        <span class="sjz-bottom-text1">时间</span>
        <span class="sjz-bottom-text2">时间</span>
        <span class="sjz-bottom-text3">时间</span>
      </div>
      <div>
        <span class="btn-3"><img src="../assets/003.png" alt=""/></span>
        <span class="btn-4"><img src="../assets/004.png" alt=""/></span>
        <span class="btn-5" @click="zt"><img src="../assets/005.png" alt=""/></span>
        <span class="btn-6"><img src="../assets/006.png" alt=""/></span>
        <span class="btn-7"><img src="../assets/007.png" alt=""/></span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import bus from "../utils/eventBus";
export default {
  data() {
    return {
      value:10,
      value1: 2010,
      options1: [],
      value2: 2019,
      options2: [],
      flagrq: false,
      flagsz: false,
      sd: 500,
      jg: 5,
      sdoption: [
        { key: 1, value: 100, label: 100 },
        { key: 2, value: 200, label: 200 }
      ],
      jgoption: [
        { key: 1, value: 5, label: 5 },
        { key: 2, value: 10, label: 10 }
      ],
      rq1: "开始年份",
      rq2: "结束年份",
      date: ""
    };
  },
  methods: {
    //根据传递过来的参数 动态换时间轴上面框中的内容
    dongtaidate() {
      bus.$on("addimg", date => {
        //将传过来的值储存一下（目前并没有用到）
        this.date = date;

        //组件传过来的值
        if (date === "年平均风速") {
          $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
        } else if (date === "月平均风速") {
          this.rq1 = "年份";
          $(".rq2").css("display", "none");
        } else if (date === "逐小时年平均风速") {
          this.rq1 = "年份";
          $(".rq2").css("display", "none");
        } else if (date === "逐小时月平均风速") {
          $(".rq2").css("display", "block");
          this.rq1 = "年份";
          this.rq2 = "月份";
        } else if (date === "年平均风功率密度") {
          $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
        } else if (date === "月平均风功率密度") {
          this.rq1 = "年份";
          $(".rq2").css("display", "none");
        } else if (date === "有效风速时数") {
          $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
        } else if (date === "风切变系数") {
          $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
        } else if (date === "威布尔分布形状参数") {
          $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
        } else if (date === "威布尔分布尺度参数") {
          $(".rq2").css("display", "block");
          this.rq1 = "开始年份";
          this.rq2 = "结束年份";
        } else if (date === "风向分布频率") {
          this.rq1 = "年份";
          $(".rq2").css("display", "none");
        } else if (date === "各向风功率密度分布频率") {
          this.rq1 = "年份";
          $(".rq2").css("display", "none");
        } else if (date === "各区间风速分布频率") {
          this.rq1 = "年份";
          $(".rq2").css("display", "none");
        } else if (date === "各区间风功率密度分布频率") {
          this.rq1 = "年份";
          $(".rq2").css("display", "none");
        }
        //调用获取日期以及月份方法
        this.initOption();
      });
    },
    //初始化option
    startOption() {
      let year = new Date().getFullYear();
      console.log(year);
      for (var m = 2010; m < year; m++) {
        this.options1.push({ label: m, value: m, key: m });
        this.options2.push({ label: m, value: m, key: m });
      }
    },
    //点击选择日期
    selectrq() {
      //让其兄弟隐藏
      $(".sjz-srk")
        .siblings()
        .hide();
      //改变状态值
      this.flagrq = !this.flagrq;
    },
    selectsz() {
      $(".sjz-sz")
        .siblings()
        .hide();
      this.flagsz = !this.flagsz;
    },
    //动态填充option的值
    initOption() {
      //第一种情况 开始年份 结束年份
      if (this.rq1 === "开始年份" && this.rq2 == "结束年份") {
        this.options1 = [];
        this.options2 = [];
        this.value2 = 2019;
        let startYear = new Date().getFullYear();
        for (var i = 2010; i < startYear; i++) {
          this.options1.push({ label: i, value: i, key: i });
          this.options2.push({ label: i, value: i, key: i });
        }
        //第二种情况 年份 月份
      } else if (this.rq1 === "年份" && this.rq2 === "月份") {
        this.options1 = [];
        this.options2 = [];
        this.value2 = 1;
        let startYear = new Date().getFullYear();
        let startMounth = new Date().getMonth() + 2;
        for (var k = 2010; k < startYear; k++) {
          this.options1.push({ label: k, value: k, key: k });
        }
        for (var n = 1; n <= startMounth; n++) {
          this.options2.push({ label: n, value: n, key: n });
        }
        //第三种情况 年份 （第二个框隐藏了）
      } else if (this.rq1 === "年份") {
        this.options1 = [];
        this.options2 = [];
        let startYear = new Date().getFullYear();
        for (var j = 2010; j < startYear; j++) {
          this.options1.push({ label: j, value: j, key: j });
        }
      }
    },
    //点击暂停方法
    zt(){
      console.log('点击了暂停')
    }
  },
  mounted() {
    // this.initOption()
    //根据选择不同框显示的不同
    this.dongtaidate();
    this.startOption()
  }
};
</script>
<style>
.sjz-bottom-text1,.sjz-bottom-text2,.sjz-bottom-text3{
  color: white;
  font-size: 12px;
  position: absolute;
  top:20px;
  left:20px
}
.sjz-bottom-text2{
  position: absolute;
  top:20px;
  left:140px
}
.sjz-bottom-text3{
  position: absolute;
  top:20px;
  left:280px
}
.sjz-srk-z {
  position: relative;
  bottom: 240px;
  left: 200px;
  display: block;
}
.sjz-srk {
  border: 2px solid rgb(0, 140, 255);
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
</style>