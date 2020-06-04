<template>
	<el-table :data="tableData" style="width: 100%;" max-height="250" >
		<!-- <el-table-column fixed prop="date" label="日期" width="150">
		</el-table-column> -->
		<el-table-column fixed="left" label="图片" width="150" align="center">
			<template slot-scope="scope">
				<img :src="scope.row.playPic" class="uoimg">
				</img>
			</template>
		</el-table-column>
		<el-table-column prop="name" label="影片" width="120" align="center">
		</el-table-column>
		<el-table-column prop="director" label="导演" width="120" align="center">
		</el-table-column>
		<el-table-column prop="playType" label="类型" width="200" align="center">
		</el-table-column>
		
		<el-table-column prop="language" label="语言" width="150" align="center">
		</el-table-column> -->
		
		<el-table-column fixed="right" label="操作" width="140" align="center">
			<template slot-scope="scope" >
				<div style="display: flex;width: 240px; flex-direction: row; flex-wrap:wrap">
					<el-button @click="certaininformation(scope.row.playId)"  size="mini">详情</el-button>
					<el-button @click="deletlike(scope.row.playId)"  size="mini">删除</el-button>
				</div>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
	import Axios from '@/axios'

	export default {
		methods: {
			deleteRow(index, rows) {
				rows.splice(index, 1);
			}
		},
		data() {
			return {
				tableData: [{
					date: '2016-05-03',
					name: 'Tom',
					director: 'California',
					actor: 'Los Angeles，Jackie Chan',
				}]
			}
		},
		
		mounted() {			
			Axios.send('/api/userwant/getAll', 'post', {}).then(res => {
				console.log(res)
				let list = []
				
				res.data.forEach(function(item) {
					list.push({
						name: item.playName,
						playId: item.playId,
						director:item.playDirector,
						playType:item.playType,
						playPic:item.playPic,
						language:item.playLanguage,
					})
				})
				this.tableData = list
				
			}, error => {
				console.log('displayuserwantgetAllAxiosError', error)
			}).catch(err => {
				throw err
			})
		},
		
		methods:{
			deletlike(playid){
				Axios.send('/api/userwant/del', 'post', {
				    playId: playid,
				}).then(res => {
				  if(res.style=='1')
				  	 location.reload()
				}, error => {
				  console.log('userdeletError', error)
				}).catch(err => {
				  throw err
				})	
			},
			
			certaininformation(playid){
				this.$router.push({
					path:'/film',
					query:{
						id:playid
					}
				})
			}
			
		},
		
		
	}
</script>

<style>
</style>
