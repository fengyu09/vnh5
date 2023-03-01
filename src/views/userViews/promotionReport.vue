<template>
  <div class="promotionReport">
      <div class="img"><img src="../../assets/images/extend/codeLogo.png" alt=""></div>
      <div class="btn" @click="save()">立即保存</div>
  </div>
</template>

<script>
export default {
  name: "promotionReport",
  data() {
    return {
      
    };
  },
  methods:{
    save(successCB,errorCB,fileName,imgID,overwrite,format,quality,clip){
        errorCB     =  errorCB   || function(){};
        fileName    =  fileName  || Date.parse( new Date());
        imgID       =  imgID     || String(Date.parse( new Date()));
        overwrite   =  overwrite || true;
        format      =  format    || 'png';
        quality     =  quality   || 50;
        clip        =  clip      || {top:'0px',left:'0px',width:'100%',height:'100%'};

        var self = plus.webview.currentWebview();
        var bitmap = new plus.nativeObj.Bitmap(imgID);

        //绘制截图
        self.draw(bitmap,function(){
         // 保存Bitmap图片
         bitmap.save('_doc/'+fileName+'.'+format, {overwrite: overwrite,format:format,quality:quality,clip:clip}
            , function(i) {
                        //保存到系统相册
                        plus.gallery.save(i.target,function(d){
                                //销毁Bitmap图片
                                bitmap.clear();
                                successCB({success:'success',details:d});
                        }, function(e){
                                //销毁Bitmap图片
                                bitmap.clear();
                                errorCB({error:'图片保存至相册失败',details:e});
                        });
                }, function(e) {
                        bitmap.clear();
                        errorCB({error:'图片保存失败',details:e});
                }
            );

        },function(e){
                errorCB({error:'截屏绘制失败',details:e});
        });

    }

  }
  

 
  

};
</script>

<style scoped lang="less">
  .rem(@name,@px){
      @{name}:unit(@px/75,rem)
  }
.promotionReport{
  .img{
    width: 80%;
    margin: 1rem auto;
  }
  .btn{
    width: 80%;
    margin: 0 auto;
    height: 0.8rem;
    line-height: 0.8rem;
    background:linear-gradient(90deg,rgba(255,49,49,1) 0%,rgba(255,128,103,1) 100%);
    text-align: center;
    border-radius: 100px;
    color: #fff;
  }
}





</style>
