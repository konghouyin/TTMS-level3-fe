<template>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
        <el-table-column label="剧目ID" prop="id" width="100">
        </el-table-column>
        <el-table-column label="影片" prop="name" width="200">
        </el-table-column>

        <el-table-column label="视频资源" prop="video" width="200" >
            <template  slot-scope="scope">
                <el-input size="medium" placeholder="请输入链接" v-model="scope.row.video" clearable >
                 </el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <div slot-scope="scope" style="display: flex;align-items:center;justify-content:space-around;">
                <el-button type="danger" @click="open('操作成功',scope.row)" >确定</el-button>
            </div>
        </el-table-column>
    </el-table>
</template>

<script>
    import Axios from '@/axios'
    export default {
        data() {
            return {
                tableData: [{
                    id: '',
                    name: '',
                    input: '',
                    video:'',
                }],
                search: '',
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            open(title,tableData) {
                const h = this.$createElement;
                this.$notify({
                  title: title,
                  duration:1500
                });
            	if(title == '操作成功'){
            		Axios.send('/api/recommend/add', 'post', {
                      playId:tableData.id,
            		  playLink:tableData.video,
                      playName:tableData.name,
                      type:2
            		}).then(res => {
            		}, error => {
            		  alert('查无剧目id')
            		  console.log('commentAddError', error)
            		}).catch(err => {
            		  throw err
            		})
            	}

              }
        },
        mounted() {
            Axios.send('/api/link/get', 'get', {}).then(res => {
                let list = []
                res.data.forEach((item) => {
                    list.push({
                        id: item.playId,
                        name: item.playName,
                        video:item.playLink
                    })
                })
                console.log(res)
                this.tableData = list
            }, error => {
                console.log('displayAxiosError', error)
            }).catch(err => {
                throw err
            })
        },
    }
</script>
<style>
</style>
