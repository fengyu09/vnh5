<template>
  <div>
     <div v-for="(item1,index1) in luzhuList" v-if="item1.length" v-show="rankNumShow.indexOf(index1+1)!=-1" :key="index1+'v'">
                <div class="clearfix pearl-day">
                  <span class="fl " :class="[{'pearl-day-bd-dw':isNew == 2},{'pearl-day-bd':isNew == 0 || isNew == 1 ||isNew == 2},
                  {'pearl-day-bd-gq':isNew == 4},
                  {'pearl-day-bd-sdj':isNew == 5},
                  {'pearl-day-bd-ox':isNew == 6},
                  {'pearl-day-bd-uefa':isNew == 7}
                  ]" v-if="lzType=='bose'||lzType=='weishu'||lzType=='heshu'">累计：</span>
                   <span class="fl " :class="[{'pearl-day-bd-dw':isNew == 2},
                   {'pearl-day-bd':isNew == 0 || isNew == 1 ||isNew == 2},
                   {'pearl-day-bd-gq':isNew == 4},{'pearl-day-bd-sdj':isNew == 5},
                   {'pearl-day-bd-ox':isNew == 6},
                    {'pearl-day-bd-uefa':isNew == 7}
                   ]" v-else>今年：</span>
                 <span v-if="lzType=='daxiao'||lzType=='weishu'">
                  <span class="fl">大</span>
                  <span class="fl">( {{!statistics[index1].da?0:statistics[index1].da}} )</span>
                  <span class="fl">小</span>
                  <span class="fl">( {{!statistics[index1].xiao?0:statistics[index1].xiao}} )</span>
                 </span>
                  <span v-if="lzType=='bose'">
                  <span class="fl">红</span>
                  <span class="fl">( {{!statistics[index1].hong?0:statistics[index1].hong}} )</span>
                  <span class="fl">绿</span>
                  <span class="fl">( {{!statistics[index1].lv?0:statistics[index1].lv}} )</span>
                  <span class="fl">蓝</span>
                  <span class="fl">( {{!statistics[index1].lan?0:statistics[index1].lan}} )</span>
                 </span>
                  <span v-if="lzType=='danshuang'||lzType=='heshu'">
                  <span class="fl">单</span>
                  <span class="fl">( {{!statistics[index1].dan?0:statistics[index1].dan}} )</span>
                  <span class="fl">双</span>
                  <span class="fl">( {{!statistics[index1].shuang?0:statistics[index1].shuang}} )</span>
                 </span>
                  <span v-if="lzType=='longhu'">
                  <span class="fl">龙</span>
                  <span class="fl">( {{statistics[index1].long}} )</span>
                  <span class="fl">虎</span>
                  <span class="fl">( {{statistics[index1].hu}} )</span>
                 </span>
                  <span v-if="lzType=='qianhou'">
                  <span class="fl">前</span>
                  <span class="fl">( {{statistics[index1].qian}} )</span>
                  <span class="fl">后</span>
                  <span class="fl">( {{statistics[index1].hou}} )</span>
                 </span>
                  <span v-if="lzType=='num'">
                  <span class="fl">总来</span>
                  <span class="fl">( {{statistics[index1]._1}} )</span>
                  <span class="fl">没来</span>
                  <span class="fl">( {{statistics[index1]._0}} )</span>
                 </span>
                  <span v-if="lzType=='gy'||lzType=='zonghe'">
                 <span v-if="index1==0">
                  <span class="fl">大</span>
                  <span class="fl">( {{!statistics[index1].da?0:statistics[index1].da}} )</span>
                  <span class="fl">小</span>
                  <span class="fl">( {{!statistics[index1].xiao?0:statistics[index1].xiao}} )</span>
                 </span>
                  <span v-else>
                  <span class="fl">单</span>
                  <span class="fl">( {{statistics[index1].dan}} )</span>
                  <span class="fl">双</span>
                  <span class="fl">( {{statistics[index1].shuang}} )</span>
                 </span>
                 </span>
                  <span class="fr" v-if="lzType=='gy'">冠亚和</span>
                  <span class="fr" v-if="rankNum!=0&&lzType!='gy'&&lzType!='zonghe'&&lzType!='num'&&lzType!='qianhou'">
					<span v-if="[1,8,10].find(res=>res==zsid)">
						<span v-if="zsid==8">
              {{index1==6?'特码':'正码'+(index1+1)}}
            </span>
            <span v-else>{{'第'+(index1+1)+'球'}}</span>
					</span>
					<span v-else>
						{{index1==0?'冠军':'第'+(index1+1)+'名'}}
					</span>
                  </span>
                   <span class="fr" v-if="lzType=='zonghe'">
                    总和
                  </span>
                   <span class="fr" v-if="lzType=='num'">
                   {{'号码'+index1}}
                  </span>
				  <span class="fr" v-if="lzType=='qianhou'">
				   {{'号码'+(index1+1)}}
				  </span>
                </div>
                <myScrollX ref="scrollWrapper" style="overflow: hidden;">
                  <div class="pearl-list" ref="pearlList" :style="{width:item1[0].length*0.6+'rem','float':item1[0].length<17?'right':''}">
                    <table width="100%" cellspacing="0">
                      <tbody>
                       <tr v-for="(item,index) in item1" :key="index">
					    	      <td v-for="item2 in item" >
							          <span v-if="lzType!='num'&&lzType!='bose'">{{item2!=''?item2.substring(item2.length-1,item2.length):''}}</span>
                        <span v-else>
                           <img src="../../assets/images/hmlz-icon2.png" v-if="item2.substring(item2.length-1,item2.length)=='0'" style="width:0.30rem"/>
                            <img src="../../assets/images/hmlz-icon1.png" v-if="item2.substring(item2.length-1,item2.length)=='1'" style="width:0.32rem" />
                          </span>
                        <span v-if="lzType=='bose'" :class="{hongbo:item2.substring(item2.length-1,item2.length)=='红',lanbo:item2.substring(item2.length-1,item2.length)=='蓝',lvbo:item2.substring(item2.length-1,item2.length)=='绿'}">
                          {{item2!=''?item2.substring(item2.length-1,item2.length):''}}
                        </span>
						        </td>
					      </tr>
                      </tbody>
                    </table>
                  </div>
                </myScrollX>
              </div>

              <div class="zwsj" v-if="luzhuList.length<=0">暂无数据</div>
  </div>
</template>

<script>
import myScrollX from "../../components/myScrollX.vue"; //横向滚动
import { mapState } from "vuex";
export default {
  name: 'lhcluzhu',
  components:{myScrollX},
  data(){
    return{
      luzhuList:[],
      statistics:[],
      isload2:false,
      isNew:0
    }
  },
  props: {
			zsid: {
				type: Number,
				default: 7
			},
			dayMode: {
				type: Number,
				default: 0
			},
			rankNum: {
				type: Number,
				default: 1
			},
			isload:{
				type:Boolean,
				default:false
      },
      lzType:{
        type:String,
        default:'daxiao'
      },
	  rankNumShow:{
		  type:Array,
		  default:[]
	  }
		},
  computed: {
    ...mapState(["skin"])
  },
  created() {
    this.isNew = this.skin
  },
  mounted(){
     this.showLuzhu()
  },
  watch:{
    lzType:function(){
      this.showLuzhu()
    },
    dayMode: function(n) {
				this.showLuzhu()
			},
		rankNum: function(n) {
				this.showLuzhu()
    },
    isload2:function(n){
				this.$emit('update:isload',n);
			}
  },
  methods:{
    showLuzhu(){
      this.isload2=true;
      this.$http.get("/forum/lottery/dewdrop", {
				params: {
					lottery_id:this.zsid,
          rows:20,
					num:0,
					type:this.lzType,
					belong_date:this.getDay(-this.dayMode,'-')||''
				}
			}).then(res=>{
		if(res.data.code==1){
			this.luzhuList.length=0;
			 this.statistics.length=0;
			if(typeof res.data.data[0][0]!='string'){
			  this.luzhuList=res.data.data;
			  if(res.data.total.length){
			    this.statistics=res.data.total
			  }else{
			     this.statistics.push(res.data.total)
			  }
			  
			}else{
			   this.luzhuList.push(res.data.data);
			   this.statistics.push(res.data.total)
			}
			  this.$nextTick(()=>{
			   this.luzhuList.forEach((item,index)=>{
			     let scrollWidth=this.$refs.pearlList[index].offsetWidth-window.innerWidth;
			      if(scrollWidth>0){
			     setTimeout(() => {
			      this.$refs.scrollWrapper[index].scrollTo(scrollWidth)
			   }, 200);
			  }
			   })
			 })
			 this.isload2=false;
		}
    
      })
    },
    getDay(num, str) {
			    let today = new Date();
			    let nowTime = today.getTime();
			    let ms = 24*3600*1000*num;
			    today.setTime(parseInt(nowTime + ms));
			    let oYear = today.getFullYear();
			    let oMoth = (today.getMonth() + 1).toString();
			    if (oMoth.length <= 1) oMoth = '0' + oMoth;
			    let oDay = today.getDate().toString();
			    if (oDay.length <= 1) oDay = '0' + oDay;
			    return oYear + str + oMoth + str + oDay;
      },
  }
}

</script>

<style scoped lang="less">
.pearl-day {
      font-size: 0.36rem;
      width: 92%;
      margin: 0 auto;
      font-weight: bold;
      padding-bottom: 0.4rem;
      margin-top: 0.4rem;
      .pearl-day-bd,.pearl-day-bd-dw,.pearl-day-bd-gq,.pearl-day-bd-sdj,.pearl-day-bd-ox,.pearl-day-bd-uefa {
        margin-left: 4.1%;
        position: relative;
        &:before {
          content: "";
          position: absolute;
          top: 10%;
          left: -35%;
          width: 4px;
          height: 0.4rem;
          // background: #ff513e;
          background: #1486FF;
          border-radius: 15px;
        }
      }
      .pearl-day-bd-dw{
        &:before{
           background: #8EB917!important;
        }
        
      }
      .pearl-day-bd-gq{
        &:before{
           background: #ef7e11!important;
        }
        
      }
      .pearl-day-bd-sdj{
        &:before{
           background: #aceefa!important;
        }
        
      }
      .pearl-day-bd-ox{
        &:before{
           background: #ee3c1a!important;
        }
        
      }
      .pearl-day-bd-uefa{
        &:before{
           background: #5284FF!important;
        }
        
      }
    }
    .pearl-list {
      min-height: 5rem!important;
      > ul {
        overflow: hidden;
        height: 3.578rem;
        > li {
          width: 0.8rem;
          height: 3.578rem;
          background-color: #fff;
          text-align: center;
          border: 1px solid #dddddd;
          color: #999999;
          border-right: none;
          &:nth-last-child(1) {
            border-right: 1px solid rgba(221, 221, 221, 1);
          }
          &.da {
            background: #f5f7fa;
          }
          &.xiao {
            background: #fff;
            color: #ff513e;
          }
        }
      }
      table{
        border-top: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        display: inline-table;
        min-height: 5rem;
        tr{
          &:first-child{
            td{
              &:last-child{
                border-top: 1px solid #ff513e;
              }
            }
          }
           &:last-child{
            td{
              &:last-child{
                border-bottom: 1px solid #ff513e;
              }
            }
          }
          td{
            border-left: 1px solid #dddddd;
            padding: 0.12rem 0;
            text-align: center;
            color: #9b9b9b;
            &:nth-child(even){
              color: #ff513e;
            }
             &:nth-child(odd){
              background: #f5f7fa;
            }
            &:last-child{
              border-right: 1px solid #ff513e;
               border-left: 1px solid #ff513e;
               background: #ffece8;
            }
          }
          .hongbo{color: #FF513E}
          .lanbo{color: #0E56FF}
          .lvbo{color:#02D164}
        }
      }
      }
      .zwsj{
  width: 100%;
  text-align: center;
  line-height: 2rem;
}
</style>
