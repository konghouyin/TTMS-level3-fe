<template>
    <div class="u-pic-cc">
      <div class="block">
        <el-carousel height="370px">
          <el-carousel-item v-for="item in formdata">
            <img :src="item.link" style="height: 370px;" />
            <h3 class="small"></h3>
          </el-carousel-item>
        </el-carousel>
      </div>

    </div>
</template>

<script>
  import Axios from '@/axios'
  export default {
    data() {
      return{
        formdata:[]
      }
    },

    mounted() {
    	Axios.send('/api/link/get', 'post', {}).then(res => {
			console.log(res)
    		let list = []
    		if (res.data.length > 4) {
    			for (var i = 0; i < 4; i++) {
    				list.push({
    					link: res.data[i].playRecommend,
    				})
    			}
    		} else {
    			res.data.forEach(function(item) {
    				list.push({
    					link: item.playLink,
    				})
    			})
    		}
    		this.formdata = list
    	}, error => {
    		console.log('displayTrailerAxiosError', error)
    	}).catch(err => {
    		throw err
    	})
    },


  }
</script>

<style scoped>

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

  /* .u-pic-cc{
    margin-top:81px;
  } */
</style>