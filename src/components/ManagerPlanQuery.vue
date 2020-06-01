<template>
    <el-container style="max-height: 670px;">
        <el-main style="overflow: auto; padding: 0;">
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column prop="play_name" label="影片名称" >
                </el-table-column>
                <el-table-column prop="room_name" label="影厅名称" >
                </el-table-column>
                <el-table-column prop="plan_startime" label="开始时间" sortable>
                </el-table-column>
                <el-table-column prop="plan_money" label="金额" sortable width="75" align="center">
                </el-table-column>
                <el-table-column align="right" style="padding: 0;" width="180">
                    <div slot="header" slot-scope="scope" style="width: 100%; height: 100%; margin: 0; padding: 0; display: flex;align-items:center">
                        <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div slot-scope="scope" style="display: flex;align-items:center;justify-content:center;">
                        <el-button size="small" type="primary" icon="el-icon-edit" circle disabled @click="handleEdit(scope.$index, scope.row)"></el-button>
                        <el-button size="small" type="danger" icon="el-icon-delete" circle disabled @click="handleDelete(scope.$index, scope.row)"></el-button>
                    </div>
                </el-table-column>
            </el-table>
        </el-main>
    </el-container>
</template>

<script>
    import Axios from '@/axios'
    export default {
        data() {
            return {
                tableData: [],
                search: '',
                value1: ''
            }
        },
        watch: {
            'value1': {
                handler: function(val, oldVal) {
                    let time = new Date(val)
                    let y = time.getFullYear();
                    let m = time.getMonth() + 1;
                    let d = time.getDate();
                    console.log(y+'-'+m+'-'+d)
                    Axios.send('/api/planGet', 'get', {
                        time: y+'-'+m+'-'+d
                    }).then(res => {
                        this.tableData = res.data
                    }, error => {
                        console.log('displayAxiosError', error)
                    }).catch(err => {
                        throw err
                    })
                },
                deep: true
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style>

</style>
