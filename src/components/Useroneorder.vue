<template>
	<div>
		<div class="uo-o" v-for="item in ggh">
		  <div class="uo-o-t">
		  </div>
		  <div class="uo-o-b">
			<div class="uo-o-b-t">
			  <img :src="item.pic" class="uoimg">
			  </img>
			  <div class="uo-o-b-t-2">
				<h3 class="uo-o-b-t-2-o">{{item.name}}</h3>
				<div class="uo-o-b-t-2-o">{{item.position}}</div>				
				<div class="uo-o-b-t-2-o">{{item.start_time}}</div>
			  </div>
			  			    
			  <p-ticket></p-ticket>  
				  
			  
			  <div class="uo-o-b-t-3">
				￥{{item.price}}
			  </div>
			  <div class="uo-o-b-t-4">				
				{{item.status}}
			  </div>
			  <div class="uo-o-b-t-5">
				<el-button type="danger" round>去支付</el-button>
			  </div>
			</div>
		  </div>
		</div>
	</div>
</template>

<script>
  import Axios from '@/axios'
  import pTicket from './UserOneticket.vue'	
	
	
  export default {
    data() {
      return {
		visible: false,
      }
    },
	components: {
		pOrder
	},
	props: {
	  ggh: Array
	},
  }	
</script>

<style>
	.uo-o{
	  width: 920px;
	  margin-top: 40px;
	  height: 170px;
	  border: 1px solid rgb(244,243,244);
	}
	
	.uo-o-t{
	  width: 920px;
	  height: 40px;
	  background-color: rgb(247,247,247);
	}
	
	.uo-o-b{
	  width: 920px;
	  height: 130px;
	}
	
	.uo-o-b-t{
	  width:900px;
	  height:110px;
	  margin-left:20px;
	  margin-top:10px;
	  margin-bottom:10px;
	  display: flex;
	  flex-direction: row;
	}
	
	.uoimg{
	  height: 110px;
	  width:74px;
	  margin-left: 10px;
	  margin-right:10px;
	}
	
	.uo-o-b-t-2{
	  width:240px;
	  height: 110px;
	  display: flex;
	  flex-direction: column;
	}
	
	.uo-o-b-t-2-o{
	  text-align: left;
	}
	
	.uo-o-b-t-3{
	  width: 90px;
	  height: 110px;
	}
	.uo-o-b-t-4{
	  width:110px ;
	  height: 110px;
	}
	.uo-o-b-t-5{
	  width:110px;
	  height: 110px;
	}
	
</style>
