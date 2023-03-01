/**
 * Created by Owner on 2019/12/17.
 */
import Vue from 'vue'

/**
 * 清除所有的active
 * @param allA 数组
 */
export const removeAllactive = (allA,name) => {
  for (let i = 0, len = allA.length; i < len; i++) {
    if(name){
      allA[i].classList.remove(name);
    }else{
      allA[i].classList.remove('active');
      allA[i].classList.remove('uefa-active');
      allA[i].classList.remove('sdj-active');
    }
   
  }
};
/**
 * 选择所有的兄弟元素
 * @param elm 当前元素
 * @returns {Array} 返回一个数组
 */
export const getSiblings = (elm) => {
  var a = [];
  var p = elm.parentNode.children;
  for (var i = 0, pl = p.length; i < pl; i++) {
    if (p[i] !== elm) a.push(p[i]);
  }
  return a;
};


export const num_zh=(n)=>{
  let zarr = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
  return isNaN(n) ? zarr.indexOf(n)+1 : zarr[n-1];
};
export const getNumZh = (str)=>{
  return str.replace(/[^一二三四五六七八九十]/ig,"");
};
export const getRank=(arr,num)=>{
  var r=[];
  return function f(t,a,n){
    if(0==n)return r.push(t.join(","));
    for(var i=0,l=a.length;i<=l-n;i++)
      f(t.concat(a[i]),a.slice(i+1),n-1)
  }([],arr,num),r
};


export const getClickTimes = (type) => {
  // Vue.prototype.$http.get( Vue.prototype.versionLive2+"Counts/navCount/",{params:{type:type}}).then(res=>{
  //   // console.log(res)
  // })
};

export const fun_date = (num) =>{
  let date1 = new Date();
  //今天时间
  let time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate()
  let date2 = new Date(date1);
  date2.setDate(date1.getDate() + num);
  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
  let m = (date2.getMonth() + 1)>=10?(date2.getMonth() + 1):'0'+(date2.getMonth() + 1);
  let d = date2.getDate()>=10?date2.getDate():'0'+date2.getDate();
  let time2 = date2.getFullYear() + "-" +m  + "-" + d;
  return time2;
}