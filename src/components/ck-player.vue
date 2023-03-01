<template>
    <div class="video" style="width: 1000px;height: 600px;"></div>
</template>

<script>
    import  '../../static/ckplayer/ckplayer'
    export default {
        name: "ck-player",
        data:function () {
            return{
            }
        },
        props:{
            src:String,
        },
        mounted(){
            var videoObject = {
                container: '.video', //“#”代表容器的ID，“.”或“”代表容器的class
                variable: 'player', //该属性必需设置，值等于下面的new chplayer()的对象
                poster: 'sampleX/pic/wdm.jpg', //封面图片
                duration:244,
                video: 'http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4' //视频地址
            };
            var player = new ckplayer(videoObject);
        },
        methods:{

        }
    }
</script>

<style scoped>

</style>