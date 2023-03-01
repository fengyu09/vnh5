<template>
	<div>
		<x-header
		  style="background-color:transparent;z-index: 1001;color:#000"
		  :left-options="{showBack: false}"
		>
		  <span>评论</span>
		  <i class="black-back"></i>
		  <div style="position:absolute;width:42px;height:42px;top:0;left:0; z-index: 10000001;" @click="$router.go(-1)"></div>
		</x-header>
		<div>
			
		</div>
	</div>
</template>
<script>
	export default {
		name:"discuss"
	}
</script>
<style lang="less">
	.vux-header .vux-header-title{color: #000}
	.black-back{display: block;width: 12px;height: 20px; position: absolute;background: #ccc;top: 12px;left: 12px;background: url('../../assets/images/withdrawals/fanhui.png') no-repeat;background-size: 100% 100%}
</style>