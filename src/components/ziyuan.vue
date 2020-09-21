<template>
    <div>
        <div class="zy-b">
            <div class="tu">图例</div>
            <div><img class="i1" src="../assets/lv.png" alt=""><span class="s1">可规划</span></div>
            <div><img class="i1" src="../assets/lan.png" alt=""><span class="s1">未规划</span></div>
        </div>
        <div class="tc"><img class="tc" src="../assets/tc.png" alt=""></div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            
        }
    },
    methods: {
        a:function(){

        }
    }
}
// function load(){

// }
// window.onload=load()

</script>
<style>
.zy-b{
    width: 120px;
    height: 100px;
    position: absolute;
    bottom: 50px;
    left: 30px;
    color: blanchedalmond;
    border: 1px solid #01CAEB;
    padding: 10px;
    /* padding-top: 10px; */
}
.i1{
       vertical-align :middle;
       margin-right: 20px;
}
.s1{
     vertical-align :middle;
}
.tu{
    margin: 10px 0;
}
.tc{
    width: 100px;
    height: 30px;
    position: absolute;
    right: 10px;
    top:10px
}
</style>