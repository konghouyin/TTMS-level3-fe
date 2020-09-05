<template>
	<div style="width: 100%;">
		<div class="show_top">
			<div class="show_top_left">
				<router-link to="/manager/user/modify">
					<el-button type="success" size="small" round>
						修改用户
					</el-button>
				</router-link>
			</div>
		</div>
		<div class="show_body">
			<el-main style="width: 100%; height: 476px;">
				<el-table :data="UserData">
					<el-table-column prop="id" label="用户名id">
					</el-table-column>
					<el-table-column prop="name" label="用户名">
					</el-table-column>

					<el-table-column prop="power" label="权限">
						<template slot-scope="scope">
							<div slot="reference" class="name-wrapper">
								<el-tag size="medium" v-for="item in scope.row.power" class="card">{{ item }}</el-tag>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="email" label="邮箱/电话">
					</el-table-column>
					<el-table-column label="操作">
						<router-link to="/manager/user/modify">
							<el-button type="primary" icon="el-icon-edit" size="small" circle>
							</el-button>
						</router-link>
						<el-button type="danger" icon="el-icon-delete" size="small" circle disabled @click="del() "></el-button>
					</el-table-column>
				</el-table>
			</el-main>
		</div>
	</div>
</template>

<script>
	import Axios from '@/axios'
	export default {
		data() {
			return {
				UserData: [
					/* {
										name: '狼',
										
										power: ["票务经理" , "asd","asd"],
										email: '123@mail.com'
									},{
										name: '狼',
										
										power: ["票理" , "assssd","asssd"],
										email: '123@mail.com',
									} */
				]
			}
		},
		components: {

		},
		mounted() {
			Axios.send('/api/userAll', 'get', {}).then(res => {
				let list = []
				res.data.forEach((item) => {
					list.push({
						id: item.user_id,
						name: item.user_name,
						email: item.user_tel,
						power: item.user_status.split(",").filter(item => {
							return item == "1" || item == "2" || item == "6" || item == "7"
						}).map(item => {
							if (item == "1") return "用户"
							if (item == "2") return "剧院管理"
							if (item == "6") return "用户管理"
							if (item == "7") return "评论管理"
						})
					})
					
				})
				this.UserData = list
			}, error => {
				console.log('用户查询错误', error)
			}).catch(err => {
				throw err
			})
		},
		methods: {
			del: function() {
				
				
			}
		},
		computed: {

		}
	}
</script>

<style scoped>
	.show_top_left {
		margin-top: 15px;
		float: right;
	}

	#add_style {
		color: #FFFFFF;
		text-decoration: none;
	}

	.card {
		display: table;
	}
</style>
