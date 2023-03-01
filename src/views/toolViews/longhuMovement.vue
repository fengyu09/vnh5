<template>
	<div>
		<!-- 龙虎走势 -->
		<div class="trend-box longhu-zs">
			<table width="100%">
				<thead>
					<tr>
						<th width="25%">期号</th>
						<th>开奖号码</th>
						<th>龙</th>
						<th ref="refhead">虎</th>
						<th>和</th>
					</tr>
				</thead>
				<tbody v-if="zxload">
					<tr v-for="(item,index) in zsdata" :key="index+'i'">
						<td>{{item.issue}}</td>
						<td>
							<span v-for="(item2,index2) in item.open_code.split(',')" :key="index2+'k'" :style="{color:index2==0||index2==4?'#ff513e':''}">
								{{item2}}
							</span>
						</td>
						<td v-for="(item3,index3) in item.trending" :key="index3+'t'" style="position: relative">
							<span :class="{lhactive:item3==0}">{{item3|lhname(index3)}}</span>
							<v-stage v-if="index<configKonva.length&&item3==0"  :config="configKonva[index]" :style="{'position':'absolute','z-index':'98', 'top':'50%','left':configKonva[index].left+'px'}">
								<v-layer>
									<v-line :config="{ stroke: '#ff513e',strokeWidth: 1.3, points:configKonva[index].points}" ></v-line>
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
    name: 'longhuMovement',
	data(){
		return{
			configKonva:[],
			tdHeight: 0,
			tdWidth: 0,
			zsdata:[],
			zxload:false,
		}
	},
	props:{
		 zsid: {
      type: Number,
      default: 1
    },
    dayMode: {
      type: Number,
      default: 0
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
		// 龙虎筛选
		lhname(i,d){
		 if(i!=0){
			return i
		 }else{
			 switch (d) {
				case 0:return '龙'; break;
				case 1:return '虎'; break;
				case 2:return '和'; break;
				 default:'';break;
			 }
		 }
	  }
	},
	 watch: {
		dayMode: function(n) {
			this.getOpenInfo()
		},
		zxload:function(n){
			this.$emit('update:isload',!n);
		},
		issueNum:function(){
			this.getOpenInfo()
		}
		},
	mounted(){
		this.tdWidth=this.$refs.refhead.offsetWidth;
		this.tdHeight=this.$refs.refhead.offsetHeight;
		this.getOpenInfo()
	},
	methods:{
		 getOpenInfo() {
		this.zxload=false;
		this.$http.get("/forum/lottery/trending", {
        params: {
          lottery_id: this.zsid,
          limit: this.issueNum,
          page: 1,
          num:6,
          belong_date:this.getDay(-this.dayMode, "-")
        }
      }).then(res=>{
		  if(res.data.code==1){
			this.zsdata=res.data.data;
			this.configKonva.length=0;
			this.drawLine()
			this.zxload=true;
		  }
	  });
	 
	},
	drawLine(){
		let arr=[]
		this.zsdata.forEach((i,d)=>{
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
          this.configKonva.push({
            height: this.tdHeight,
            width: absNum * this.tdWidth,
            left: -(absNum * this.tdWidth - this.tdWidth / 2),
            points: lineObj
          });
        } else if (i < arr[d + 1]) {
          lineObj = [0, 0, absNum * this.tdWidth, this.tdHeight];
           this.configKonva.push({
            height: this.tdHeight,
            width: absNum * this.tdWidth,
            left: this.tdWidth / 2,
            points: lineObj
          });
        } else {
          lineObj = [this.tdWidth / 2, 0, this.tdWidth / 2, this.tdHeight];
           this.configKonva.push({
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
}
</script>
<style scoped lang="less">
	.trend-box {
		table thead th {
			color: #445779;
			background: #f5f7fa;
			height: 0.7rem
		}

		table td {
			text-align: center;
			height: 0.7rem;
			background: #fff;
		}

		table {
			border-spacing: 1px;
			
			background: #eeeeee;
			table-layout: fixed
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
			line-height: 0.48rem
		}
		table td .lhactive{
			background: #ff513e;
			color: #fff;
			position: relative;
			z-index: 99;
			display: inline-block;
			width: 0.5rem;
			height: 0.5rem;
			line-height: 0.5rem;
			border-radius: 50%;
		}
		table td .hotSpan {
			background: #ff513e;
			color: #fff;
			position: relative;
			z-index: 99;
		}

		.trend-box {
			position: relative;
		}

		.line-box {
			position: absolute;
			top: 0.75rem;
			left: 2.34rem;
			width: 20rem;
			width: 7.62rem;
		}
	}
	.longhu-zs{
		table{
			tr{
				td{
					span{
						width: 0.26rem;
					}
				}
			}
		}
	}
	.vux-x-icon {
		fill: #ccc;
	}

</style>
