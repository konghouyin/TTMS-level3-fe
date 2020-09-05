<template>
  <div class="add_body" style="overflow: hidden;">
    <div class="body_top">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phemail">
          <el-input type="text" v-model="ruleForm.phemail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="系统权限" prop="status">
          <el-checkbox-group v-model="ruleForm.status">
            <el-checkbox v-for="item in ruleForm.list" :label="item" name="status"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var checkemail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱或手机号码'));
        } else {
          // if (this.ruleForm.checkPass !== '') {
          //   this.$refs.ruleForm.validateField('checkPass');
          // }
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          pass: '',
          phemail: '',
          list: ['剧院管理', '用户管理','评论管理'],
          status: []
        },
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
              max: 15,
              message: '长度在 3 到 15 个字符',
              trigger: 'blur'
            }
          ],
          status: [{
            type: 'array',
            required: true,
            message: '请选择权限,至少一个',
            trigger: 'change'
          }],
          phemail: [{
            validator: checkemail,
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
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
            	console.log('用户添加失败', error)
            }).catch(err => {
            	throw err
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped="scoped">
  element.style {
    height: 45px;
  }

  .body_top {
    margin-top: 20px;
  }

  .add_body {
    width: 100%
  }
</style>
