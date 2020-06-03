<template>
	<div>
		<div style="display: flex;width: 240px; flex-direction: row; flex-wrap:wrap" >
			<div v-for="item in ggh">
				
				<div v-if="item.orderticket_status=='1'">
					
					<div v-if="item.ticket_status=='0'">
						<el-button disabled="disabled" slot="reference" size="medium" style="margin-right: 30px;margin-bottom: 20px; background-color: #99A9BF;">{{item.seat_row}}排{{item.seat_col}}座</el-button>	
					</div>					
					<div v-else>
						<el-popover placement="top" width="160"  v-model="item.visible">
							<p>你确定要退票吗?(一经确认无法修改)</p>
							<div style="text-align: right; margin: 0">
								<el-button size="mini" type="text" @click="item.visible = false">取消</el-button>
								<el-button type="primary" size="mini" @click="()=>{item.visible = false;deletticket(item.t_id)}">确定</el-button>
							</div>						
							<el-button slot="reference" size="medium" style="margin-right: 30px;margin-bottom: 20px;">{{item.seat_row}}排{{item.seat_col}}座</el-button>						
						</el-popover>
					</div>
				</div>
				
				<div v-if="item.orderticket_status=='0'">
					<el-button disabled="disabled" slot="reference" size="medium" style="margin-right: 30px;margin-bottom: 20px;">{{item.seat_row}}排{{item.seat_col}}座</el-button>
				</div>
				
				<div v-if="item.orderticket_status=='-1'">
					<el-button disabled="disabled" slot="reference" size="medium" style="margin-right: 30px;margin-bottom: 20px;">{{item.seat_row}}排{{item.seat_col}}座</el-button>
				</div>
							
			</div>
		</div>
	</div>
</template>

<!-- disabled="disabled" -->

<script>
	import Axios from '@/axios'
	export default {
		data() {
			return {

			}
		},

		props: {
			ggh: Array
		},

		methods: {
			deletticket(formName) {
				Axios.send('/api/cancelSale', 'post', {
					id: formName
				}).then(res => {
					/* console.log(res) */															
					this.$router.push('cpn')
				}, error => {
					console.log('deletticketAxiosError', error)
				}).catch(err => {
					throw err
				})
			}
		},
	}
</script>

<style>
</style>
