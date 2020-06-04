<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-top: 20px;">
        <el-form-item label="影片名称" prop="name" style="display: inline-block;">
            <el-select v-model="ruleForm.name" filterable placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="影厅名称" prop="room" style="display: inline-block;">
            <el-select v-model="ruleForm.room" filterable placeholder="请选择">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="语言" prop="language" style="display: inline-block;">
            <el-select v-model="ruleForm.language" filterable placeholder="请选择">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="money" style="display: inline-block;">
            <el-input-number v-model="ruleForm.money" :precision="1" :step="0.1" :max="99"></el-input-number>
        </el-form-item>
        <el-form-item label="开始时间" required prop="date">
            <el-date-picker style="width:540px" v-model="ruleForm.date" type="datetime" placeholder="选择日期时间">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="排片次数" style="display: inline-block; float: left">
            <el-input-number v-model="ruleForm.num" controls-position="right" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="排片间隔(min)" style="display: inline-block;">
            <el-input-number v-model="ruleForm.long" controls-position="right" :min="10"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import Axios from '@/axios'
    export default {
        data() {
            return {
                options: [{
                    value: '',
                    label: ''
                }],
                options2: [{
                    value: '',
                    label: ''
                }],
                options3: [{
                    value: '',
                    label: ''
                }],
                value: '',
                ruleForm: {
                    num: '',
                    long: '',
                    name: '',
                    room: '',
                    date: '',
                    language: '',
                    money: '',
                    play_length: ''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请选择影片名称',
                        trigger: 'change'
                    }],
                    room: [{
                        required: true,
                        message: '请选择影厅名称',
                        trigger: 'change'
                    }],
                    language: [{
                        required: true,
                        message: '请选择语言',
                        trigger: 'change'
                    }],
                    date: [{
                        type: 'date',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }]
                }
            };
        },
        mounted() {
            Axios.send('/api/playAll', 'get', {}).then(res => {
                let list = []
                res.data.forEach((item) => {
                    list.push({
                        value: item.play_id,
                        label: item.play_name,
                    })
                })
                this.options = list
            }, error => {
                console.log('displayAxiosError', error)
            }).catch(err => {
                throw err
            })
            Axios.send('/api/roomAll', 'get', {}).then(res => {
                let list1 = []
                res.data.forEach((item) => {
                    list1.push({
                        value: item.room_id,
                        label: item.room_name
                    })
                })
                this.options2 = list1
            }, error => {
                console.log('cinemaQueryAxiosError', error)
            }).catch(err => {
                throw err
            })
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let planarr = []
                        let time = new Date(this.ruleForm.date)
                        time = new Date(time.getTime() + 1000 * 60 * (this.ruleForm.long + this.ruleForm.play_length))
                        for (let i = 0; i < this.ruleForm.num; i++) {
                            let y = time.getFullYear();
                            let m = time.getMonth() + 1;
                            let d = time.getDate();
                            let h = time.getHours();
                            let mm = time.getMinutes();
                            let s = time.getSeconds();
                            planarr.push({
                                room: this.ruleForm.room,
                                play: this.ruleForm.name,
                                language: this.ruleForm.language,
                                startime:y+'-'+m+'-'+d+' '+h+':'+mm+':'+s,
                                money:this.ruleForm.money
                            })
                            time = new Date(time.getTime() + 1000 * 60 * (this.ruleForm.long + this.ruleForm.play_length))
                        }
                       Axios.send('/api/planAdd', 'POST', {
                            plan: planarr
                        }).then(res => {
                            alert("添加成功")
                        }, error => {
                            console.log('displayoneAxiosError', error)
                        }).catch(err => {
                            throw err
                        })
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        watch: {
            'ruleForm.name': {
                handler: function(val, oldVal) {
                    Axios.send('/api/playMain', 'get', {
                        id: val
                    }).then(res => {
                        let msg = res.data
                        let list = msg.play_language.split('/')
                        let list1 = []
                        this.ruleForm.play_length = parseInt(msg.play_length)
                        console.log(this.ruleForm.play_length)
                        list.forEach((item) => {
                            list1.push({
                                value: item,
                                label: item,
                            })
                        })
                        this.options3 = list1
                    }, error => {
                        console.log('displayoneAxiosError', error)
                    }).catch(err => {
                        throw err
                    })
                },
                deep: true
            }
        }
    }
</script>

<style>

</style>
