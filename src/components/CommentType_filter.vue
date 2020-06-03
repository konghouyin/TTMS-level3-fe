<template>
	<!-- <div>
		<p>举报评论理由</p>
		 <el-radio-group v-model="radio" v-for="(item,index) in typeData">
		    <el-radio :label="index">{{item}}</el-radio>
		  </el-radio-group>
	</div> -->
	<div>
		<!-- <input type="text" v-model="inputValue" v-on:keyup.enter="addTo" /> -->
		<div class="message">举报类型设置</div>
		<div class="wrap">
			<el-button type="primary" plain class="btn" v-for="(item,index) in typeData" @click="deleteTo(item.reporttypeId)">{{item.reporttypeName}}</el-button>
		</div>
		<el-divider></el-divider>
		<el-input
		  placeholder="请输入内容"
		  v-model="input"
		  clearable
		  class="input">
		</el-input>
		  <el-button type="success" v-on:click="addTo">添加</el-button>

	</div>
</template>

<script>
import Axios from '@/axios'
	export default{
		data(){
			return {
				input: '',
				typeData:[]
			}
		},
		mounted() {
			Axios.send('api/reportType/all', 'POST', {
			}).then(res => {
			  console.log(res)
				this.typeData = res.data.filter(item=>{
                    return item.reporttypeStatus==1
                })
			}, error => {
			  alert('查询失败')
			  console.log('commentReportError', error)
			}).catch(err => {
			  throw err
			})
		},
		methods:{
			addTo(event){
				if(this.input==""){
					return
				}
				Axios.send('api/reportType/add', 'post', {
				  reporttypeName:this.input
				}).then(res => {
				  this.input="";
                    Axios.send('api/reportType/all', 'POST', {
                    }).then(res => {
                      console.log(res)
                    	this.typeData = res.data.filter(item=>{
                            return item.reporttypeStatus==1
                        })
                    }, error => {
                      alert('查询失败')
                      console.log('commentReportError', error)
                    }).catch(err => {
                      throw err
                    })
				}, error => {
				  alert('评论添加失败')
				  console.log('commentAddError', error)
				}).catch(err => {
				  throw err
				})
			},
			deleteTo(id){
				Axios.send('api/reportType/del', 'post', {
				  reporttypeId:id
				}).then(res => {
                    Axios.send('api/reportType/all', 'POST', {
                    }).then(res => {
                      console.log(res)
                    	this.typeData = res.data.filter(item=>{
                            return item.reporttypeStatus==1
                        })
                    }, error => {
                      alert('查询失败')
                      console.log('commentReportError', error)
                    }).catch(err => {
                      throw err
                    })
				}, error => {
				  alert('删除失败')
				  console.log('commentAddError', error)
				}).catch(err => {
				  throw err
				})
				this.typeData.splice(index,1);
				console.log(this.typeData)
			}
		}

	}
</script>

<style scoped>
	.wrap{
		width: 700px;
		margin: 0 auto;
		margin-top: 30px;
	}
	.message{
		font-size: 24px;
		margin: 20px;
	}
	.btn{
		margin: 10px 10px;
	}
	.input{
		width:300px;
	}
</style>
