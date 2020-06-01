<template>
	<div>
		<div style="width: 240px;">
			<div v-for="item in ggh">
				<el-popover placement="top" width="160" v-model="item.visible">
				  <p>你确定要退票吗?(一经确认无法修改)</p>
				  <div style="text-align: right; margin: 0">
					<el-button size="mini" type="text" @click="item.visible = false">取消</el-button>
					<el-button type="primary" size="mini" @click="item.visible = false">确定</el-button>
				  </div>
				  <el-button slot="reference">{{item.seat_row}}排{{item.seat_col}}座</el-button>
				</el-popover>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
	return {
		
	}
  },

	props: {
	  ggh: Array
	},
}	
</script>

<style>
</style>
