<template>
  <div>
      <div  style="height: 387px;">
         <div style="margin: 0 auto;height: 387px;width:1050px;" >
           <div style="width:1050px;height: 80px;border-bottom:1px solid rgb(229,229,229) ;display: flex; align-items: center;">
              <h2 style="width:200px;text-align: left;">{{movieData.name}}</h2>
           </div>
           <div  style="width:1050px;height: 380px;display: flex; flex-direction: row;">
             <img :src="movieData.src" style="width:210px;height: 280px;margin-top:10px;">
             </img>
             <div class="dmtxt" >
                <div class="dmtxt1">
                  导演：{{movieData.dirctor}}
                </div>
                <div class="dmtxt2">
                  主演：{{movieData.actor}}
                </div>
                <div class="dmtxt3">
                  类型：{{movieData.type}}
                </div>
                <div class="dmtxt4">
                  制片国家/地区：{{movieData.area}}
                </div>
                <div class="dmtxt5">
                  片长：{{movieData.time}}
                </div>
                <div class="dmtxt6">
                  剧情介绍：{{movieData.neirong}}
                </div>
              </div>
              <div class="uftime">
                <div class="uftime-1">
                  上映时间：{{movieData.start_time}}
                </div>
                <img class="uftime-img" src="https://img.alicdn.com/bao/uploaded/i2/TB1RstSXmSD3KVjSZFKXXb10VXa_.jpg_160x160.jpg"></img>
                <img class="uftime-img" src="https://img.alicdn.com/bao/uploaded/i2/TB1RstSXmSD3KVjSZFKXXb10VXa_.jpg_160x160.jpg"></img>
              </div>
           </div>

         </div>
      </div>

      <div style="margin: 0 auto;height: 50px;width:1050px; border-bottom:1px solid rgb(229,229,229) ;">
         <div style="float: left; height:20px; width:100px; margin-top:25px;margin-left: -15px;">
            选座购票
         </div>
      </div>



	<div style="margin: 0 auto; width:1050px;margin-top: 30px;">
		<el-table :data="tableData" stripe style="width: 1050px " class="tex">
			<el-table-column prop="start_time" label="放映时间" width="180">
			</el-table-column>
			<el-table-column prop="lauguage" label="语言版本" width="180">
			</el-table-column>
			<el-table-column prop="studio" label="放映厅">
			</el-table-column>
			<el-table-column prop="address" label="座位情况">
			</el-table-column>
			<el-table-column prop="price" label="现价/影院价（元）">
			</el-table-column>
			<el-table-column label="选座购票">
				<el-button type="danger">
					<router-link :to="{path:'/user/seat',query: {id: prop="plan_id"}}" style="color:white;text-decoration: none;">
						选座购票</router-link>
				</el-button>
			</el-table-column>
		</el-table>	
	</div>
  </div>
</template>

<script>
    import Axios from '@/axios'
    export default {
        data() {
            return {
                tableData: [{
					plan_id:'',
                    start_time: '2016-05-02',
                    lauguage: '王小虎',
                    studio: '上海市普陀区金沙江路 1518 弄',
					price:'',
                }, {
                    start_time: '2016-05-02',
                    lauguage: '王小虎',
                    studio: '上海市普陀区金沙江路 1518 弄',
                    price:'',
                }, {
                    start_time: '2016-05-02',
                    lauguage: '王小虎',
                    studio: '上海市普陀区金沙江路 1518 弄',
                    price:'',
				}, {
                    start_time: '2016-05-02',
                    lauguage: '王小虎',
                    studio: '上海市普陀区金沙江路 1518 弄',
                    price:'',
                }],

                movieData: {
                    dirctor: '李仁港',
                    actor: '吴京,章子怡,张译,井柏然,胡歌,王景春,何琳,陈龙,刘小锋,曲尼次仁,拉旺罗布,多布杰',
                    type: '冒险,动作,爱情',
                    area: '冒险,动作,爱情',
                    time: '125分钟',
                    neirong: '1960 年，中国登山队向珠峰发起冲刺，完成了世界首次北坡登顶这一不可能的任务。15 年后，方五洲和 曲松林在气象学家徐缨的帮助下，带领李国梁、杨光等年轻队员再次挑战世界之巅。迎接他们的将是更加 严酷的现实，也是生与死的挑战......',
                    start_time: '上映时间：2019-09-30 08:00',
                    src:'',
                    name:'',
                    /* dsrc1:'',
                    dsrc2:'', */
                }
            }
        },

        mounted() {
            Axios.send('/api/playMain', 'get', {
                id: this.$router.history.current.query.id,
            }).then(res => {
				var jmessage=JSON.parse(res.data.play_message);

				this.movieData.src = jmessage.index.base.img;
				this.movieData.dirctor=jmessage.index.base.director[0].name;
				this.movieData.type=jmessage.index.base.type;
				this.movieData.area=jmessage.index.base.place;
				this.movieData.time =jmessage.index.base.runtime;
				this.movieData.neirong=jmessage.index.synopsis;	
				this.movieData.start_time=jmessage.index.base.time;
				this.movieData.name=jmessage.index.base.name;
                /* this.movieData.actor =res.obj.play_performer; */
               /* this.movieData.type =res.obj.play_type;
                this.movieData.time =res.obj.play_length;
                this.movieData.name =res.obj.play_name;
                this.movieData.start_time=JSON.parse(res.obj.play_message).index.base.time

                this.movieData.neirong = JSON.parse(res.obj.play_message).index.synopsis;
                if(res.obj.play_performer.length>80)
                {
                    this.movieData.actor=res.obj.play_performer.substr(0,80)+"......";
                }

                /* this.movieData.dsrc1=JSON.parse(res.obj.play_message).index.person[0].img;
                this.movieData.dsrc2=JSON.parse(res.obj.play_message).index.person[1].img; */
                /* this.name = res.obj.play_name;
                this.type = res.obj.play_type;
                this.length = res.obj.play_length;
                this.local = res.obj.play_country; */

                /* this.movieData = list */
                console.log(res)
            }, error => {
                console.log('displayoneAxiosError', error)
            }).catch(err => {
                throw err
            })
			
			
			
			Axios.send('/api/planList', 'get', {
			    id: this.$router.history.current.query.id,
			}).then(res => {
			    console.log(res)
				let listplan;
				res.data.forEach(function(item) {
					listplan.push({
						plan_id:item.plan_id,
						start_time: item.plan_startime,
						lauguage : item.plan_language,
						studio: item.room_name,
						price: item.plan_money,
					})
				})			
				this.tableData=listplan;
				
			}, error => {
			    console.log('displayoneAxiosError', error)
			}).catch(err => {
			    throw err
			})
        }
    }
</script>

<style scoped>
  .total-xy{
  	width: 1050px;
  }

  tex.{
    margin: 0 auto;
  }

  .dmtxt{
    height: 280px;width:600px;margin-left:20px;margin-top:10px;
  }

  .dmtxt1{
    width: 590px;height: 30px;margin-bottom:10px;text-align: left;
  }

  .dmtxt2{
    width: 590px;height: 41px;margin-bottom:10px;text-align: left;
  }

  .dmtxt3{
    width: 590px;height: 30px;margin-bottom:10px;text-align: left;
  }

  .dmtxt4{
    width: 590px;height: 30px;margin-bottom:10px;text-align: left;
  }

  .dmtxt5{
    width: 590px;height: 20px;margin-bottom:10px;text-align: left;
  }

  .dmtxt6{
    width: 590px;height: 90px;margin-bottom:10px;text-align: left;
  }

  .uftime{
    margin-top: 10px;
    width: 200px;
    height: 280px;
  }

  .uftime-1{
    width: 200px;
    height: 50px;
  }

  .uftime-img{
    width: 160px;
    height: 107px;
    margin-bottom: 5px;
  }


</style>
