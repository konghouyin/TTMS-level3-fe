<template>
	<div style="height: 380px; width: 300px; display: flex; flex-direction: row; flex-wrap: wrap;align-content: flex-start;">
		<div v-for="item in formdata" style="margin-right: 10px;">
			<a :href="item.link" style="width: 140px; height:100px ;position: relative;text-decoration:none;">
			  <img :src="item.src" style="width: 140px; height:100px" />
			  <em style="width: 140px;"></em>
			  <div style="width: 140px;height:20px; color: #2C3E50;">{{item.mname}}</div>
			</a>
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
	  	Axios.send('/api/recommend/get', 'get', {}).then(res => {
			/* console.log("测试")
			console.log(res) */
	  		let list = []
	  		if (res.data.length > 6) {
	  			for (var i = 0; i < 6; i++) {
	  				list.push({
	  					mname: res.data[i].playName,
						src: res.data[i].playPic,
	  					link: res.data[i].playRecommend,
	  				})
	  			}
	  		} else {
	  			res.data.forEach(function(item) {
	  				list.push({
	  					mname: item.playName,
	  					src: item.playPic,
	  					link: item.playRecommend,
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
  
	  components: {
	  },
	  props: {
	
	  },
	}
</script>

<style>
</style>
