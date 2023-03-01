<template>
	<div class="vme">
		<myScroll :bottom="0.8" :top="0">
		<div class="emoji-container">
			<div class="emoji-category" ref="emojiCon" v-show="switchEmoji==1">
				<span v-for="(emoji, i) in emojis" :key="i" v-if="i<24" style="width:1.38rem" :class="_emojiName(emoji)" @click="emojiClick(emoji, i, $event)">
					<img :src="'../static/images/chat/emoji/' + _emojiName(emoji)" />
				</span>
			</div>
			<div v-show="switchEmoji==2" class="emoji-category">
				<div v-for="(item,index) in fhbqList" :key="index" style="width:1.6rem;height:1.2rem;text-align: center" :class="item.imgName" @click="fhemoji(item.flag,item.imgSrc,item.imgName)">
					<img :src="item.imgSrc" alt="" style="width:28px;height: 28px;margin-top:0.2rem">
				</div>
			</div>
			<div v-show="switchEmoji==3" class="emoji-category">
				<div v-for="(item,index) in gzbqList" :key="index" style="width:1.6rem;height:1.2rem;text-align: center" :class="item.imgName" @click="fhemoji(item.flag,item.imgSrc,item.imgName,true)">
					<img :src="item.imgSrc" alt="" style="width:40px;height: 40px;margin-top:0.2rem">
				</div>
			</div>
		</div>
		</myScroll>
		<div class="switch-emoji">
				<div :class="{active:switchEmoji==1}" @click="switchEmoji=1"><img src="../../assets/images/chat/biaoqing-gf.png"
					 alt="" srcset="" style="width: 0.6rem;"></div>
				<div :class="{active:switchEmoji==2}" @click="switchEmoji=2"><img src="../../assets/images/chat/biaoqing-fh.png"
					 alt="" srcset="" style="width: 0.65rem;"></div>
				<div :class="{active:switchEmoji==3}" @click="showGz()" class="gz-icon"><img src="../../assets/images/chat/gz_icon.png"
					 alt="" srcset="" style="width: 0.65rem;"></div>


		</div>
		<!--    <div class="bar-container">-->
		<!--      <div v-for="(item, index) in barControl" :class="{'actived': activedIndex == index}"-->
		<!--           :key="index"-->
		<!--           @click.stop="barClick(item, index)"-->
		<!--      >-->
		<!--        {{item}}-->
		<!--      </div>-->
		<!--    </div>-->
	</div>
</template>

<script>
	import emojiData from './common/emoji-data'
	import fhemojiData from './common/fhemoji'
	import gzemojiData from './common/gzemoji'
	import myScroll from '../../components/myScroll.vue'
	export default {
		props: {
			perPage: {
				default: 8,
				type: Number
			},
			showEmoji:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				activedIndex: 0,
				switchEmoji: 1,
				fhbqList: fhemojiData,
				gzbqList:gzemojiData
			};
		},
		components:{
			myScroll
		},
		watch:{
			showEmoji:function(n){
				if(!n){
					this.switchEmoji=true;
				}
			}
		},
		computed: {
			emojiWidth() {
				const margin = 5;
				const width = (document.body.clientWidth - (this.perPage + 1) * margin) / this.perPage;
				return {
					width: width + 'px'
				};
			},
			emojis() {
				const ret = this.barControl.map(item => {
					return Object.keys(emojiData[item])
				});
				let arr = [];
				ret.map((item, index) => {
					this.rangeKeys[index] = this._emojiName(item[0]);
					item.map((text) => {
						arr.push(text);
					})
				});
				return arr;
			}
		},
		created() {
			this._initUI();
			this.fhbqList.forEach((i,t)=>{
				i.imgSrc=require("../../assets/images/fhemoji/"+i.imgName)
			});
			this.gzbqList.forEach((i,t)=>{
				i.imgSrc=require("../../assets/images/gzemoji/"+i.imgName)
			})
		},
		mounted() {
			this.$nextTick(() => {
				this._caculateRange();
			});
		},
		methods: {
			showGz(){
				if(this.$store.state.userinfo.noble<6){
					return this.$vux.toast.text('需达到公爵后解锁该表情包','middle');
				}
				this.switchEmoji = 3;
			},
			_caculateRange() {
				let arr = [];
				arr = this.rangeKeys.map((item) => {
					if (document.getElementsByClassName(item).length > 0) {
						return document.getElementsByClassName(item)[0].offsetLeft;
					}
				});
				this.widthRange = arr;
				this._listenScroll();

				this.barClick("", 0);
			},
			_listenScroll() {
				// 监听滚动事件
				this.$refs.emojiCon.addEventListener('scroll', () => {
					const scrollLeft = this.$refs.emojiCon.scrollLeft;
					for (var i = 0; i < this.widthRange.length - 1; i++) {
						if (scrollLeft >= this.widthRange[i] && scrollLeft < this.widthRange[i + 1]) {
							this.activedIndex = i;
							break;
						} else if (scrollLeft >= this.widthRange[this.widthRange.length - 1]) {
							this.activedIndex = this.widthRange.length - 1;
							break;
						} else {
							this.activedIndex = 0;
						}
					}
				});
			},
			_emojiName(code) {
				return code.replace(/:/g, '') + ".png";
			},
			_initUI() {
				// 初始化bar control数据
				this.barControl = ['表情', '自然', '物品', '地点', '符号'];
				this.rangeKeys = [];
			},
			barClick(item, index) {
				this.activedIndex = index;
				// console.log(this.widthRange);
				this.$refs.emojiCon.scrollLeft = index === 0 ? 0 : this.widthRange[index];
			},
			emojiClick(emoji, index, e) {
				const dom = document.getElementsByClassName(this._emojiName(emoji))[0];
				dom && dom.setAttribute('selected', 'selected');

				setTimeout(() => {
					dom.removeAttribute('selected');
				}, 200);


				let input = document.getElementById('textInput');
				// input.focus();
				if (window.timer_3) {
					clearTimeout(window.timer_3);
				}
				this.$parent.chatMsgForm.comment_text = this.$parent.chatMsgForm.comment_text + emoji;
				// input.selectionEnd(this.$parent.chatMsgForm.comment_text.length);
				const pngName = this._emojiName(emoji);

				// console.log(pngName);
				// this.$emit('emojiSelected', emoji, require('./common/emoji/' + pngName));
				// console.log(emoji);
			},
			fhemoji(f,i,c){
				this.$parent.chatMsgForm.comment_text = this.$parent.chatMsgForm.comment_text + f;
				const dom = document.getElementsByClassName(c)[0];
				dom && dom.setAttribute('selected', 'selected');

				setTimeout(() => {
					dom.removeAttribute('selected');
				}, 200);
			}
		}
	}
</script>

<style lang="less">
	.vme {
		background: #F2F4F7;
		width: 100%;
		height: 5.2rem;
		position: absolute;
		// z-index: 90;
		z-index: 1001;
		right: 0;
		bottom: 1.01rem;
	}

	.vme .emoji-container {
		width: 100%;
	}

	.vme .emoji-container .emoji-category {
		box-sizing: border-box;
		padding: 5px 5px 0 5px;
		width: 100%;
		overflow: auto;
		/* overflow-y: hidden; */
		display: flex;
		flex-wrap: wrap;
		/* flex-direction: column; */
		height: 100%;
	}

	.vme .emoji-container .emoji-category span {
		border-radius: 5px;
		text-align: center;
		height: 38px;
		line-height: 38px;
	}
	.vme .emoji-container .emoji-category>div[selected]{
		background-color: #d8d8d8;
	}
	.vme .emoji-container .emoji-category span[selected] {
		background-color: #d8d8d8;
	}

	.vme .emoji-container .emoji-category span img {
		margin-top: 5px;
		width: 28px;
		height: 28px;
	}

	.vme .bar-container {
		position: absolute;
		left: 0;
		width: 100%;
		bottom: 0;
		height: 35px;
		border-top: 1px solid #ddd;
		border-bottoM: 1px solid #ccc;
	}

	.vme .bar-container {
		display: flex;
	}

	.vme .bar-container div {
		flex: 1 1;
		text-align: center;
		line-height: 35px;
		height: 35px;
		border-right: 1px solid #ddd;
		font-size: 13px;
		color: #888;
		font-weight: 300;
	}

	.vme .bar-container div:last-child {
		border-right: none;
	}

	.vme .bar-container .actived {
		background: #E0E5EE;
		font-weight: 350;
	}

	.switch-emoji {
		background: #fff;
		display: flex;
		width: 100%;
		position:absolute;
		bottom: 0;
		>div {
			height: 0.8rem;
			width: 1.2rem;
			text-align: center;
			line-height: 0.8rem;
			&.gz-icon{
				img{
					width: .6rem!important;
				}
			}
			img {
				vertical-align: middle;
			}
		}

		.active {
			background: #f5f7fa;
		}
	}
</style>
