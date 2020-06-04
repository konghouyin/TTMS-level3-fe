<template>
    <div style="width: 100%;">
        <div class="show_body">
            <el-main style="width: 100%; height: 476px;">
                <el-table :data="UserData">
                    <el-table-column prop="id" label="用户ID">
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
                    <el-table-column prop="tel" label="电话">
                    </el-table-column>
                    <el-table-column prop="time" label="注册时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" style="display: flex;align-items:center;justify-content:space-around;">
                            <el-button size="small" type="primary" icon="el-icon-edit" circle @click="handleEdit(scope)"></el-button>
                            <el-button size="small" type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </el-main>
        </div>
    </div>
</template>

<script>
    import Axios from '@/axios'
    var k;
    export default {
        data() {
            return {
                UserData: [],
            }
        },
        components: {

        },
        mounted() {
            var status;
            Axios.send('/api/userAll', 'get', {}).then(res => {
                console.log(res)
                let statusarr = []
                let charr = []
                let list = []
                res.data.forEach((item) => {
                    list.push({
                        id: item.user_id,
                        name: item.user_name,
                        tel: item.user_tel,
                        time: item.user_time
                    });
                        charr = []
                        statusarr = item.user_status.split(',')
                        statusarr.forEach((item) => {
                            if (item == "1") {
                                charr.push("用户")
                            } else if (item == "2") {
                                charr.push("剧院管理")
                            } else if (item == "3") {
                                charr.push("推荐流管理")
                            } else if (item == "4") {
                                charr.push("销售")
                            } else if (item == "5") {
                                charr.push("财务模块")
                            } else if (item == "6") {
                                charr.push("用户管理")
                            } else if (item == "7") {
                                charr.push("评论管理")
                            } else if (item == "8") {
                                charr.push("推送系统")
                            } else if (item == "9") {
                                charr.push("微信小程序")
                            }
                        })
                })
                console.log(charr)
                this.UserData = list
                this.power=charr;

            }, error => {
                console.log('displayAxiosError', error)
            }).catch(err => {
                throw err
            })
        },
        methods: {
            handleEdit(scope) {
                console.log(scope.row.id);
                this.$router.push({
                    path: '/manager/user/modify',
                    query: {
                        changeId: scope.row.id,
                        changetel:scope.row.tel,
                        changestatus: scope.row.status,
                    }
                })
            },
            handleDelete: function() {},
            show(k) {
                console.log(k);
                k.isShow = !k.isShow;
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
