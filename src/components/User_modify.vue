<template>
    <div class="modify_body" style="overflow: hidden;">
        <div style="overflow: hidden;margin-top: 20px;">
            <el-input placeholder="请输入人员编号" v-model="input3" class="input-with-select" style="width: 190px;float: left; margin-left: 40px;">
            </el-input>
            <el-button type="primary" round style="float: right; margin-right: 40px;" @click="red()">重新选择</el-button>
        </div>
        <div class="body_top">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="phemail">
                    <el-input type="text" v-model="ruleForm.phemail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="系统权限" prop="status">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="用户"></el-checkbox>
                        <el-checkbox label="剧院管理"></el-checkbox>
                        <el-checkbox label="推荐流管理"></el-checkbox>
                        <el-checkbox label="销售"></el-checkbox>
                        <el-checkbox label="财务模块"></el-checkbox>
                        <el-checkbox label="用户管理"></el-checkbox>
                        <el-checkbox label="评论管理"></el-checkbox>
                        <el-checkbox label="推送系统"></el-checkbox>
                        <el-checkbox label="微信小程序"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="open('修改成功',checkList,ruleForm.pass,input3,ruleForm.phemail)">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Axios from '@/axios'
    export default {
        data() {
            var checkemail = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入邮箱或手机号码'))
                } else {
                    // if (this.ruleForm.checkPass !== '') {
                    //   this.$refs.ruleForm.validateField('checkPass');
                    // }
                    callback()
                }
            }
            return {
                input3: '',
                ruleForm: {
                    pass: '',
                    phemail: '',
                },
                checkList: [""],
                rules: {
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    pass: [{
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],

                    phemail: [{
                        validator: checkemail,
                        trigger: 'blur'
                    }]
                }
            }
        },
        mounted() {
            this.input3 = this.$router.history.current.query.changeId
            Axios.send('/api/userAll', 'get', {}).then(res => {
                console.log(res)
                let statusarr = []
                let charr = []
                res.data.forEach((item) => {
                    if (item.user_id == this.input3) {
                        charr = []
                        this.ruleForm.phemail = item.user_tel
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
                    }
                })
                this.checkList = charr;
            }, error => {
                console.log('displayAxiosError', error)
            }).catch(err => {
                throw err
            })
        },
        methods: {
            red() {
                window.location = '#/manager/user/show'
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            /* open(title,checkList,ruleForm.pass,input3,phone) {
                const h = this.$createElement;
                this.$notify({
                  title: title,
                  duration:1500
                });
            	if(title == '修改成功'){
            		Axios.send('/api/userEdit', 'post', {
                      user_id:input3,
                      user_status:2,
            		  user_tel:phone,
                      user_password:
                      user_passwordchange:
            		}).then(res => {
                        console.log(res)
            		}, error => {
            		  alert('没有查询到要修改的id')
            		  console.log('commentAddError', error)
            		}).catch(err => {
            		  throw err
            		})
            	}

              } */
            /* 
                let statusarr = []
                let charr = []
                checkList.forEach((item) => {
                    if (item == "用户") {
                        charr.push("1")
                    } else if (item == "剧院管理") {
                        charr.push("2")
                    } else if (item == "推荐流管理") {
                        charr.push("3")
                    } else if (item == "销售") {
                        charr.push("4")
                    } else if (item == "财务模块") {
                        charr.push("5")
                    } else if (item == "用户管理") {
                        charr.push("6")
                    } else if (item == "评论管理") {
                        charr.push("7")
                    } else if (item == "推送系统") {
                        charr.push("8")
                    } else if (item == "微信小程序") {
                        charr.push("9")
                    }
                }),
            		Axios.send('/api/userEdit', 'post', {
                      playId:this.input3
            		  password:ruleForm.pass
            		  tel:ruleForm.phemail,
                      status:
            		}).then(res => {
            		  console.log(res)

            		}, error => {
            		  alert('评论添加失败')
            		  console.log('commentAddError', error)
            		}).catch(err => {
            		  throw err
            		})
               */
        },
    }
</script>

<style scoped="scoped">
    element.style {
        height: 45px;
    }

    .body_top {
        margin-top: 20px;
    }

    .modify_body {
        width: 100%;
    }
</style>
