<template>
  <div class="cuo">
    <div class="uo1">我的订单</div>
	<p-order v-bind:ggh="OrderData"></p-order>
<!--    <div class="uo-o">
      <div class="uo-o-t">
      </div>
      <div class="uo-o-b">
        <div class="uo-o-b-t">
          <img src="https://p0.meituan.net/movie/c5975d98fc484027ff55d813ab3b2daa427032.jpg@66w_91h_1e_1c" class="uoimg">
          </img>
          <div class="uo-o-b-t-2">
            <h3 class="uo-o-b-t-2-o">{{movieData.name}}</h3>
            <div class="uo-o-b-t-2-o">{{movieData.position}}</div>
            <div class="uo-o-b-t-2-o">{{movieData.start_time}}</div>
          </div>
          <div class="uo-o-b-t-3">
            ￥28
          </div>
          <div class="uo-o-b-t-4">
            待支付
          </div>
          <div class="uo-o-b-t-5">
            <el-button type="danger" round>去支付</el-button>
          </div>
        </div>
      </div>
    </div> -->
  </div>

</template>

<script>
import Axios from '@/axios'
import pOrder from './Useroneorder.vue'	
	
export default {
  data () { 
    return {
	  OrderData :[{
	  			name: '李仁港',
	  			type: '冒险,动作,爱情',
	  			version: '国语2D',
	  			time: '125分钟',
	  			start_time: '今天 9月26 22:35',
	  			price: '30',
	  			studio: '3号厅',
	  			position: '5号激光厅（冠名招商中） 4排9座',
				status :'',
				pic:'',
	  		},],
    }	
  },
  
  components: {
	pOrder
  },
  
  mounted(){
	Axios.send('/api/selectAllOrder', 'get', {}).then(res => {
		console.log(res);
		let listorder = [];
		let flag='';
		res.data.forEach(function(item) {
			if(item.orderticket_status=='1')
			{
				flag="已支付";
			}
			else if(item.orderticket_status=='0')
			{
				flag="未支付";
			}
			else{
				flag="已取消";
			}
			listorder.push({
				name: item.play.play_name,
				position: item.play.room_name,
				start_time: item.play.plan_startime,
				status: flag,		
				price: item.orderticket_money,
				pic: item.play.play_pic,
				visible:false
			})
		})	
		
		this.OrderData=listorder;
		
			
	}, error => {
	    console.log('displayorderAxiosError', error)
	}).catch(err => {
	    throw err
	})  
  },
  
  
}
</script>

<style scoped>
  .cuo{
    /* height: 796px; */
    width: 940px;
    border: 1px solid rgb(244,243,244);
    display: flex;
    flex-direction: column;
  }

  .uo1{
    font-size: 20px;
    padding: 20px;
    width: 940px;
    text-align: left;
    border-bottom: 1px solid rgb(244,243,244);
  }

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
