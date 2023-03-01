/**
 * Created by Administrator on 2018/1/3.
 */
let P = {
    isRepeat(arr){
        let hash = {}
        for(let i in arr){
            if(hash[arr[i]])
                return true
            hash[arr[i]] = true
        }
        return false
    },
    isTRepeat(arr){
        let num=0;
        let hash = {}
        for(let i in arr){
            if(hash[arr[i]]){
                num++;
                if(num >= 2){
                    return true;
                }
            }
            hash[arr[i]] = true;
        }
        return false
    },
    getRank:function(arr,num){
        var r=[];
        return function f(t,a,n){
            if(0==n)return r.push(t.join(","));
            for(var i=0,l=a.length;i<=l-n;i++)
                f(t.concat(a[i]),a.slice(i+1),n-1)
        }([],arr,num),r
    },
    getNums(str){
        return str.replace(/[^0-9]/ig,"");
    },
    array_create(a,b){
        var arr = []
        for(var i = a; i <= b; i++) arr.push(i)
        return arr
    },
}
export default P;