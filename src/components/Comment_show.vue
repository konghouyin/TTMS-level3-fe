<template>
    <div class="Cshow_body" style="width:100%;margin-top: 20px;">
        <div class="block">
            <el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
                start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
            </el-date-picker>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span style="color: #409EFF; display: flex; align-items: center;">该评论由用户
                        <el-tag effect="light" type="info" style="display: flex; align-items: center;margin: 0 10px;">
                            {{props.row.user}}
                        </el-tag>
                        发表，所评论影片为
                        <el-tag effect="light" type="info" style="display: flex; align-items: center;margin: 0 10px;">
                            {{props.row.film}}
                        </el-tag>
                    </span>
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="showList_title">
                            <el-form-item label="详细内容">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                        </div>
                    </el-form>
                    <span style="color: #409EFF; display: flex; align-items: center;">该评论由
                        <el-tag effect="light" type="info" style="display: flex; align-items: center;margin: 0 10px;">
                            {{props.row.userName}}
                        </el-tag>
                        用户举报，举报时间是
                        <el-tag effect="light" type="info" style="display: flex; align-items: center;margin: 0 10px;">
                            {{props.row.reportTime}}
                        </el-tag>
                    </span>
                    <el-form label-position="left" inline class="demo-table-expand">
                        <div class="showList_title">
                            <el-form-item label="举报理由">
                                <span>{{ props.row.reportText }}</span>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div class="coList_btn" >
                        <el-button size="mini" @click="handleEdit(props.row.commentId)">驳回</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(props.row.commentId)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评论时间" sortable prop="date">
            </el-table-column>
            <el-table-column label="内容" prop="comm">
            </el-table-column>
            <el-table-column label="影片名" prop="film" column-key="film" :filters="fnamecomputed" :filter-method="filterHandler">
            </el-table-column>
            <el-table-column label="举报类型" prop="ftype" :filters="ftypecomputed" :filter-method="filterHandler">
                <template slot-scope="scope">
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium" class="card">{{scope.row.ftype}}</el-tag>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import Axios from '@/axios'
    export default {
        data() {

            return {
                tableData: [],
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }]
                },
                value1: '',
                value2: ''
            }
        },
        mounted() {
            
            Axios.send('api/comment/report', 'get', {

            }).then(res => {
                console.log(res)
                var list = []
                res.data.forEach(function(item) {
                    if(item.commentText.length<=10){
                        let time = new Date(item.commentTime)
                        let time1 = new Date(item.reportTime)
                        let y = time.getFullYear();
                        let m = time.getMonth() + 1;
                        let d = time.getDate();
                        let h = time.getHours();
                        let mm = time.getMinutes();
                        let s = time.getSeconds();
                        let y1 = time1.getFullYear();
                        let m1 = time1.getMonth() + 1;
                        let d1 = time1.getDate();
                        let h1 = time1.getHours();
                        let mm1 = time1.getMinutes();
                        let s1 = time1.getSeconds();
                        list.push({
                            date: y+'-'+m+'-'+d+' '+h+':'+mm+':'+s,
                            name: item.commentText,
                            comm: item.commentText,
                            user: item.targetUserName,
                            film: item.playName,
                            ftype: item.reportType,
                            commentId:item.commentId,
                            reportText:item.reportText,
                            userName:item.userName,
                            reportTime:y1+'-'+m1+'-'+d1+' '+h1+':'+mm1+':'+s1
                        })
                    }else{
                        list.push({
                            date: y+'-'+m+'-'+d+' '+h+':'+mm+':'+s,
                            name: item.commentText,
                            comm: item.commentText.substr(0, 10) + '........',
                            user: item.targetUserName,
                            film: item.playName,
                            ftype: item.reportType,
                            commentId:item.commentId,
                            reportText:item.reportText,
                            userName:item.userName,
                            reportTime:y1+'-'+m1+'-'+d1+' '+h1+':'+mm1+':'+s1
                        })
                    }
                })
                this.tableData = list

            }, error => {
                alert('*****添加失败')
                console.log('commentReportError', error)
            }).catch(err => {
                throw err
            })
        },
        methods: {
            handleEdit(id) {
                console.log(id)
                Axios.send('api/comment/reject', 'post', {
                    commentId:id
                }).then(res => {
                    Axios.send('api/comment/report', 'get', {
                    
                    }).then(res => {
                        console.log(res)
                        var list = []
                        res.data.forEach(function(item) {
                            if(item.commentText.length<=10){
                                let time = new Date(item.commentTime)
                                let time1 = new Date(item.reportTime)
                                let y = time.getFullYear();
                                let m = time.getMonth() + 1;
                                let d = time.getDate();
                                let h = time.getHours();
                                let mm = time.getMinutes();
                                let s = time.getSeconds();
                                let y1 = time1.getFullYear();
                                let m1 = time1.getMonth() + 1;
                                let d1 = time1.getDate();
                                let h1 = time1.getHours();
                                let mm1 = time1.getMinutes();
                                let s1 = time1.getSeconds();
                                list.push({
                                    date: y+'-'+m+'-'+d+' '+h+':'+mm+':'+s,
                                    name: item.commentText,
                                    comm: item.commentText,
                                    user: item.targetUserName,
                                    film: item.playName,
                                    ftype: item.reportType,
                                    commentId:item.commentId,
                                    reportText:item.reportText,
                                    userName:item.userName,
                                    reportTime:y1+'-'+m1+'-'+d1+' '+h1+':'+mm1+':'+s1
                                })
                            }else{
                                list.push({
                                    date: y+'-'+m+'-'+d+' '+h+':'+mm+':'+s,
                                    name: item.commentText,
                                    comm: item.commentText.substr(0, 10) + '........',
                                    user: item.targetUserName,
                                    film: item.playName,
                                    ftype: item.reportType,
                                    commentId:item.commentId,
                                    reportText:item.reportText,
                                    userName:item.userName,
                                    reportTime:y1+'-'+m1+'-'+d1+' '+h1+':'+mm1+':'+s1
                                })
                            }
                        })
                        this.tableData = list
                    
                    }, error => {
                        alert('*****添加失败')
                        console.log('commentReportError', error)
                    }).catch(err => {
                        throw err
                    })
                    alert('驳回成功')
                }, error => {
                    alert('驳回失败')
                    console.log('commentReportError', error)
                }).catch(err => {
                    throw err
                })
            },
            handleDelete(id) {
                console.log(id)
                Axios.send('api/comment/del', 'post', {
                    commentId:id
                }).then(res => {
                    Axios.send('api/comment/report', 'get', {
                    
                    }).then(res => {
                        console.log(res)
                        var list = []
                        res.data.forEach(function(item) {
                            if(item.commentText.length<=10){
                                let time = new Date(item.commentTime)
                                let time1 = new Date(item.reportTime)
                                let y = time.getFullYear();
                                let m = time.getMonth() + 1;
                                let d = time.getDate();
                                let h = time.getHours();
                                let mm = time.getMinutes();
                                let s = time.getSeconds();
                                let y1 = time1.getFullYear();
                                let m1 = time1.getMonth() + 1;
                                let d1 = time1.getDate();
                                let h1 = time1.getHours();
                                let mm1 = time1.getMinutes();
                                let s1 = time1.getSeconds();
                                list.push({
                                    date: y+'-'+m+'-'+d+' '+h+':'+mm+':'+s,
                                    name: item.commentText,
                                    comm: item.commentText,
                                    user: item.targetUserName,
                                    film: item.playName,
                                    ftype: item.reportType,
                                    commentId:item.commentId,
                                    reportText:item.reportText,
                                    userName:item.userName,
                                    reportTime:y1+'-'+m1+'-'+d1+' '+h1+':'+mm1+':'+s1
                                })
                            }else{
                                list.push({
                                    date: y+'-'+m+'-'+d+' '+h+':'+mm+':'+s,
                                    name: item.commentText,
                                    comm: item.commentText.substr(0, 10) + '........',
                                    user: item.targetUserName,
                                    film: item.playName,
                                    ftype: item.reportType,
                                    commentId:item.commentId,
                                    reportText:item.reportText,
                                    userName:item.userName,
                                    reportTime:y1+'-'+m1+'-'+d1+' '+h1+':'+mm1+':'+s1
                                })
                            }
                        })
                        this.tableData = list
                    
                    }, error => {
                        alert('*****添加失败')
                        console.log('commentReportError', error)
                    }).catch(err => {
                        throw err
                    })
                    alert('删除成功')
                }, error => {
                    alert('删除失败')
                    console.log('commentReportError', error)
                }).catch(err => {
                    throw err
                })
            },
            filterHandler(value, row, column) {
                const property = column['property']
                return row[property] === value
            }
        },
        computed: {
            fnamecomputed() {
                let back = []
                let set = new Set()
                this.tableData.forEach((item) => {
                    set.add(item.film)
                })
                set = [...set]
                set.forEach((item) => {
                    back.push({
                        text: item,
                        value: item
                    })
                })
                return back
            },
            ftypecomputed() {
                let back = []
                let set = new Set()
                this.tableData.forEach((item) => {
                    set.add(item.ftype)
                })
                set = [...set]
                set.forEach((item) => {
                    back.push({
                        text: item,
                        value: item
                    })
                })
                return back
            }
        }
    }
</script>

<style scoped="scoped">
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .showList_title {
        text-align: center;
    }

    .Cshow_body_top {
        margin-top: 30px;
    }

    .coList_btn {
        float: right;
    }

    span {
        height: 28px;
    }
</style>
