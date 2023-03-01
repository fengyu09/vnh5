<template>
  <div>
    <div class="trend-box xintai-zs">
      <table width="100%">
        <thead>
          <tr >
            <th colspan="3" rowspan="2">期号</th>
            <th rowspan="2" width="6%" v-if="xtrankNum[0]<8">第一球</th>
            <th rowspan="2" width="6%" v-if="xtrankNum[0]<=8">第二球</th>
            <th rowspan="2" width="6%">第三球</th>
			<th rowspan="2" width="6%" v-if="xtrankNum[0]>=8">第四球</th>
			<th rowspan="2" width="6%" v-if="xtrankNum[0]>8">第五球</th>
            <th colspan="5">形态</th>
            <th colspan="3">组选类型</th>
          </tr>
          <tr class="twoHead">
            <th>豹子</th>
            <th>顺子</th>
            <th>对子</th>
            <th>半顺</th>
            <th>杂六</th>
            <th>豹子</th>
            <th ref="refhead">组三</th>
            <th>组六</th>
          </tr>
        </thead>
        <tbody v-if="zxload">
          <tr v-for="(item,index) in xtzsdata" :key="index+'z'">
            <td colspan="3">{{item.issue}}</td>
            <td  v-if="xtrankNum[0]<8">{{item.open_code.split(',')[0]}}</td>
            <td v-if="xtrankNum[0]<=8">{{item.open_code.split(',')[1]}}</td>
            <td>{{item.open_code.split(',')[2]}}</td>
            <td  v-if="xtrankNum[0]>=8">{{item.open_code.split(',')[3]}}</td>
            <td  v-if="xtrankNum[0]>8">{{item.open_code.split(',')[4]}}</td>
            <td v-for="(item2,index2) in item.trending" :key="item2" style="position: relative;">
				<span :class="{xtactive:item2==0}">{{item2|xtname(index2)}}</span>
				<v-stage
                v-if="index<configKonva.length&&item2==0"
                :config="configKonva[index]"
                :style="{'position':'absolute','z-index':'98', 'top':'50%','left':configKonva[index].left+'px'}"
              >
                <v-layer>
                  <v-line
                    :config="{ stroke: '#ff513e',strokeWidth: 1.3, points:configKonva[index].points}"
                  ></v-line>
                </v-layer>
              </v-stage>
			</td>
			<td  v-for="(item3,index3) in zxzsdata[index].trending" :key="item3+'s'" style="position: relative;">
				<span :class="{zxactive:item3==0}">{{item3|zxname(index3)}}</span>
				<v-stage
                v-if="index<configKonva2.length&&item3==0"
                :config="configKonva2[index]"
                :style="{'position':'absolute','z-index':'98', 'top':'50%','left':configKonva2[index].left+'px'}"
              >
                <v-layer>
                  <v-line
                    :config="{ stroke: '#1774f2',strokeWidth: 1.3, points:configKonva2[index].points}"
                  ></v-line>
                </v-layer>
              </v-stage>
			</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "xintaiMovement",
  data() {
    return {
	  configKonva: [],
	  configKonva2: [],
    tdHeight: 0,
    tdWidth: 0,
    xtzsdata: [],
    zxzsdata:[],
    zxload:false,
      };
  },
  props: {
    zsid: {
      type: Number,
      default: 1
    },
    dayMode: {
      type: Number,
      default: 0
    },
    xtrankNum: {
      type: Array,
      default: [7,10]
    },
    isload: {
      type: Boolean,
      default: false
	},
	issueNum:{
		type: Number,
		default:10
	}
  },
  filters:{
    // 形态筛选
	  xtname(i,d){
		 if(i!=0){
			return i
		 }else{
			 switch (d) {
				case 0:return '豹子'; break;
				case 1:return '顺子'; break;
				case 2:return '对子'; break;
				case 3:return '半顺'; break;
				case 4:return '杂六'; break;
				 default:'';break;
			 }
		 }
    },
    // 组选筛选
	  zxname(i,d){
		 if(i!=0){
			return i
		 }else{
			 switch (d) {
				case 0:return '豹子'; break;
				case 1:return '组三'; break;
				case 2:return '组六'; break;
				 default:'';break;
			 }
		 }
	  }
  },
  watch: {
		dayMode: function(n) {
			this.getOpenInfo()
		},
		xtrankNum: function(n) {
			this.getOpenInfo()
		},
		zxload:function(n){
			this.$emit('update:isload',!n);
		},
		issueNum:function(){
			this.getOpenInfo()
		}
		},
  mounted() {
    this.tdWidth = this.$refs.refhead.offsetWidth;
    this.tdHeight = this.$refs.refhead.offsetHeight;
	this.getOpenInfo()
  },
  methods: {
    getOpenInfo() {
		this.zxload=false;
      	this.xtrankNum.forEach((i,d)=>{
		this.$http.get("/forum/lottery/trending", {
        params: {
          lottery_id: this.zsid,
          limit: this.issueNum,
          page: 1,
          num:i,
          belong_date:this.getDay(-this.dayMode, "-")
        }
      }).then(res=>{
		  if(res.data.code==1){
			  if(i<=9){
				  this.xtzsdata=res.data.data;
				  this.configKonva.length=0;
				  this.drawLine(res.data.data,this.configKonva)
			  }else{
				  this.zxzsdata=res.data.data;
				  this.configKonva2.length=0;
					this.drawLine(res.data.data,this.configKonva2)
				  this.zxload=true;
			  }
		  }
	  });
	  })
	},
	drawLine(zslist,type){
		let arr=[]
		zslist.forEach((i,d)=>{
			i.trending.forEach((i2,d2)=>{
				if(i2==0){
					arr.push(d2)
				}
			})
		})
		arr.forEach((i, d) => {
      if (d < arr.length - 1) {
        let absNum = Math.abs(arr[d + 1] - arr[d]);
        let lineObj = [];
        if (i > arr[d + 1]) {
          lineObj = [0, this.tdHeight, absNum * this.tdWidth, 0];
          type.push({
            height: this.tdHeight,
            width: absNum * this.tdWidth,
            left: -(absNum * this.tdWidth - this.tdWidth / 2),
            points: lineObj
          });
        } else if (i < arr[d + 1]) {
          lineObj = [0, 0, absNum * this.tdWidth, this.tdHeight];
          type.push({
            height: this.tdHeight,
            width: absNum * this.tdWidth,
            left: this.tdWidth / 2,
            points: lineObj
          });
        } else {
          lineObj = [this.tdWidth / 2, 0, this.tdWidth / 2, this.tdHeight];
          type.push({
            height: this.tdHeight,
            width: this.tdWidth,
            left: 0,
            points: lineObj
          });
        }
      }
	});
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
};
</script>
<style scoped lang="less">
.trend-box {
  table thead th {
    color: #445779;
    background: #f5f7fa;
    height: 0.7rem;
  }

  table td {
    text-align: center;
    height: 0.7rem;
    background: #fff;
  }

  table {
    border-spacing: 1px;
    
    background: #eeeeee;
    table-layout: fixed;
  }

  .color-red {
    color: #ff513e;
    font-size: 0.3rem;
    font-weight: bold;
  }

  table td span {
    display: inline-block;
    width: 0.48rem;
    height: 0.48rem;
    border-radius: 50%;
    line-height: 0.48rem;
  }
  table td .xtactive {
    background: #ff513e;
    color: #fff;
    position: relative;
    z-index: 99;
    display: inline-block;
   	width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    border-radius: 50%;
    transform: scale(0.88);
  }
   table td .zxactive {
    background: #1774f2;
    color: #fff;
    position: relative;
    z-index: 99;
    display: inline-block;
   	width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
    border-radius: 50%;
    transform: scale(0.88);
  }

  .trend-box {
    position: relative;
  }
}
.xintai-zs {
  table {
    tr {
      th {
        font-size: 0.32rem;
      }
      td {
        font-size: 0.32rem;
      }
    }
  }
}
.vux-x-icon {
  fill: #ccc;
}

</style>
