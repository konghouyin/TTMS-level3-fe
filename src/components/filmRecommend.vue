<template>
	<div>
		<div style="margin-left: 20px;margin-top: 20px; width: 106px; height: 203.4px; float: left;" v-for="item in ggh">
			<el-image :src="item.img"  style="width: 110px; height: 154px;"></el-image>
			<div class="title1">{{item.name}}</div>
		<!-- 	<div class="title1" style="color: #ffb400;">{{rate}}</div> -->
		</div>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        imgsrc: 'https://p1.meituan.net/movie/4c9a63220cd6de2664c2415c2de72a1b4867422.jpg@106w_145h_1e_1c',
        name:'一百零八',
        rate:'9.2'
      }
    },
	props: {
	  ggh: Array
	},
  }
</script>

<style>
  .title1 {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    color: #333;
    margin-top: 10px;
    font-family: "微软雅黑";
  }

  .title2 {}
</style>
