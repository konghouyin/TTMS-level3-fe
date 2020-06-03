<template>
  <div class="up-out">
    <div class="up-left-image" :style="'background-image: url('+ruleForm.img+');'"></div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item> -->
      <el-form-item label="性别" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
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
        <!-- <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="体育" name="type"></el-checkbox>
          <el-checkbox label="艺术" name="type"></el-checkbox>
          <el-checkbox label="学习" name="type"></el-checkbox>
          <el-checkbox label="音乐" name="type"></el-checkbox>
        </el-checkbox-group> -->
		
		<el-tag
		  :key="tag"
		  v-for="tag in dynamicTags"
		  closable
		  :disable-transitions="false"
		  @close="handleClose(tag)">
		  {{tag}}
		</el-tag>
		<el-input
		  class="input-new-tag"
		  v-if="inputVisible"
		  v-model="inputValue"
		  ref="saveTagInput"
		  size="small"
		  @keyup.enter.native="handleInputConfirm"
		  @blur="handleInputConfirm"
		>
		</el-input>
		<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>										
		
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
		dynamicTags: ['标签一', '标签二', '标签三'],
		inputVisible: false,
		inputValue: '',	
		
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
	
	mounted(){
		var rmidsex;
		Axios.send('/api/userMain', 'get', {}).then(res => {			
			if(res.data.user_sex=='1')
			{
				rmidsex='男';
			}
			else{
				rmidsex='女';
			}					
			console.log(res);	
			console.log(res.data.user_hobby);
			/* this.dynamicTags=res.data.user_hobby; */
			this.dynamicTags =res.data.user_hobby.split(',')			
			
			this.ruleForm.resource=rmidsex;
			this.ruleForm.tel=res.data.user_tel	;	
			this.ruleForm.desc=res.data.user_signal;
		}, error => {
			console.log('displayperinAxiosError', error)
		}).catch(err => {
			throw err
		})
	},		
	
	
  methods: {
    submitForm (formName) {
		var midsex;
		var midhobby;
		if(this.ruleForm.resource=='男')
		{
			midsex='1';
		}
		else{
			midsex='2';
		}
		
		midhobby=this.dynamicTags.join(',');

      this.$refs[formName].validate((valid) => {
        if (valid) {
          Axios.send('/api/userChange', 'post', {		  
            sex: midsex,
			signal: this.ruleForm.desc,
            tel: this.ruleForm.tel,
			hobby: midhobby ,			
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
    },
	
	handleClose(tag) {
	  this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
	},
	
	showInput() {
	  this.inputVisible = true;
	  this.$nextTick(_ => {
	    this.$refs.saveTagInput.$refs.input.focus();
	  });
	},
	
	handleInputConfirm() {
	  let inputValue = this.inputValue;
	  if (inputValue) {
	    this.dynamicTags.push(inputValue);
	  }
	  this.inputVisible = false;
	  this.inputValue = '';
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
  
  /* 动态标签 */
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

