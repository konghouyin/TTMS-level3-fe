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
            Axios.send('/api/userAll', 'get', {}).then(res => {

                let list = []
                res.data.forEach((item) => {
                    list.push({
                        id: item.user_id,
                        name: item.user_name,
                        status: item.user_status,
                        tel: item.user_tel,
                        time: item.user_time
                    })
                })
                this.UserData = list
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
                        changeId: scope.row.id
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
