<template>
  <div class="up-out">
    <div class="up-left-image" :style="'background-image: url('+ruleForm.img+');'"></div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item> -->
      <el-form-item label="性别" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="1"></el-radio>
          <el-radio label="2"></el-radio>
        </el-radio-group>
      </el-form-item>
     <!-- <el-form-item label="从事行业" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择职务">
          <el-option label="员工" value="shanghai"></el-option>
          <el-option label="总监" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
	  <!-- 电话号码 -->
	  <el-form-item label="电话号码" prop="tel">
		 <el-input v-model="ruleForm.tel"></el-input>
	  </el-form-item>
      <el-form-item label="生日" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item> -->
      <el-form-item label="兴趣" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="体育" name="type"></el-checkbox>
          <el-checkbox label="艺术" name="type"></el-checkbox>
          <el-checkbox label="学习" name="type"></el-checkbox>
          <el-checkbox label="音乐" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="个性签名" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Axios from '@/axios'
export default {
  data () {
    return {
      ruleForm: {
        img: require('@/assets/avataaars.png'),
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],        
        resource: '',   /* 性别 */
        desc: '',	   /* 个性签名 */
		tel:'',	
		
      },
      rules: {
        name: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
      /*  date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ], */
     /*   type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ], */
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写个性签名', trigger: 'blur' }
        ]
      }
    }
  },
  
/*  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  } */
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          Axios.send('/api/userChange', 'post', {
            sex: this.ruleForm.resource,
			signal: this.ruleForm.desc,
            tel: this.ruleForm.tel,
			hobby: "体育,音乐,美术" ,			
          }).then(res => {
            console.log(res)
            /* this.$router.push('/user') */
          }, error => {
            console.log('conformperinformationAxiosError', error)
          }).catch(err => {
            throw err
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .up-out{
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid rgb(244,243,244);
      width: 945px;
      height: 600px;
      display: flex;
      flex-direction:row;
  }

  .up-left-image{
     width:258px ;
     height:258px;
     background-size: 90%;
     background-repeat: no-repeat;
  }
</style>
