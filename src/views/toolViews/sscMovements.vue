<template>
	<div>
		<div class="trend-box">
			<table width="100%">
				<thead>
					<tr >
						<th width="20%">期号</th>
						<th width="8%" ref="refnum">号码</th>
						<th  v-for="index in 10" :ref="'refth'+index" :key="index+'x'">{{index-1}}</th>
					</tr>
				</thead>
				<tbody v-if="!isload2">
					<tr v-for="(item,index) in openInfo" :key="index">
						<td>{{item.issue.length>10?item.issue.substring(2,11):item.issue}}</td>
						<td class="color-red" style="position: relative;">
							<span >{{item.trending.findIndex(i=>i==0)}}</span>
						</td>
						<td style="position: relative;" v-for="(item2,index2) in item.trending" :key="index2"><span :class="item2==0?'hotSpan':0">
								<span>{{item2==0?index2:item2}}</span>
							</span>
							<v-stage v-if="item2==0&&index<openInfo.length-1" :config="configKonva[index]" :style="{'position':'absolute','z-index':'98', 'top':'50%','left':configKonva[index].left+'px'}">
								<v-layer>
									<v-line :config="{ stroke: '#ff513e',strokeWidth: 1.3, points:configKonva[index].points}" ref="line"></v-line>
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
	import {
		XButton,
		InlineLoading
	} from 'vux'
	export default {
		name: 'sscMovements',
		components: {
			XButton,
			InlineLoading
		},
		data() {
			return {
				configKonva: [],
				tdHeight: 0,
				tdWidth: 0,
				num: [],
				lineConfig: {
					points: [0, 0, 50, 50],
					stroke: '#000',
					strokeWidth: 1.3,
				},
				date: "",
				numlist: [
					[]
				],
				pickershow1: false,
				openInfo: [],
				isload2:false,
				oneWidth:''
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
			issueNum:{
				type:Number,
				default:10
			}
		},
		watch: {
			dayMode: function(n) {
				this.getOpenInfo(this.rankNum,this.getDay(-n,'-'))
			},
			rankNum: function(n) {
				this.getOpenInfo(n,this.getDay(-this.dayMode,'-'))
			},
			isload2:function(n){
				this.$emit('update:isload',n);
			},
			issueNum:function(n){
				this.getOpenInfo()
			}
		},
		created() {
			let time = new Date();
			let y = time.getFullYear();
			let m = time.getMonth() + 1;
			let d = time.getDate();
			m = m >= 10 ? m : "0" + m;
			d = d >= 10 ? d : "0" + d;
			this.date = y + "-" + m + "-" + d;
		},
		mounted() {
			this.tdWidth= this.$refs.refth8[0].offsetWidth
			this.tdHeight = this.$refs.refth8[0].offsetHeight
			this.getOpenInfo(this.rankNum,this.getDay(-this.dayMode,'-'))
		},
		methods: {
			drawLine(n = 10) {
			setTimeout(() => {
				this.tdWidth = this.$refs.refth8[0].offsetWidth
        this.tdHeight = this.$refs.refth8[0].offsetHeight;
			this.num=[]
				this.openInfo.forEach((i, dex) => {
					i.trending.forEach((t, dex2) => {
						if (t == 0) {
							this.num.push(dex2);
						}
					})
				})
				this.configKonva.length = 0;
				this.num.forEach((item, index) => {
					if (index < this.num.length - 1) {
						let absNum = Math.abs(this.num[index + 1] - this.num[index])
						let lineObj = []
						if (item > this.num[index + 1]) {
							lineObj = [0, this.tdHeight, absNum * this.tdWidth, 0]
							this.configKonva.push({
								height: this.tdHeight,
								width: absNum * this.tdWidth,
								left: -(absNum * this.tdWidth - this.tdWidth / 2),
								points: lineObj
							})
						} else if (item < this.num[index + 1]) {
							lineObj = [0, 0, absNum * this.tdWidth, this.tdHeight]
							this.configKonva.push({
								height: this.tdHeight,
								width: absNum * this.tdWidth,
								left: this.tdWidth / 2,
								points: lineObj
							})
						} else {
							lineObj = [this.tdWidth / 2, 0, this.tdWidth / 2, this.tdHeight]
							this.configKonva.push({
								height: this.tdHeight,
								width: this.tdWidth,
								left: 0,
								points: lineObj
							})
						}
					}
        })
        this.isload2=false;
      }, 100);
			},
			getOpenInfo(num=1,date=''){
				this.isload2=true;
				this.$http.get("/forum/lottery/trending", {
					params: {
						lottery_id:this.zsid,
						limit:this.issueNum||10,
						page: 1,
						num: num||this.rankNum,
						belong_date:date||this.getDay(-this.dayMode,'-')
					}
				}).then(res => {
          if(res.data.code==1){
          this.openInfo = res.data.data;
					this.drawLine()
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
		
		},
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

	.luzhu-box {
		width: 100%;
		overflow-y: hidden;
		overflow-x: auto;

		table {
			height: 4rem;
			border-spacing: 0px;
			border: 1px solid #e5e5e5;
		}

		td {
			min-width: 20px;
			vertical-align: top;
			text-align: center;
			background: #f5f5f5;
			border-left: 1px solid #e5e5e5;

			p {
				margin: 0.1rem 0;
			}

			.red {
				color: red;
			}

			.active {
				font-weight: bold;
				font-size: 14px;
				animation: 3s myfirst;
				animation-iteration-count: 3;
				animation-direction: alternate;
			}
		}

		td:nth-child(odd) {
			background: #fff;
		}

		td:nth-child(1) {
			border: none;
		}
	}

	.vux-x-icon {
		fill: #ccc;
	}

</style>
