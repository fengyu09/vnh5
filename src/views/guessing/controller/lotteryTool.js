/**
 * Created by Administrator on 2018/1/3.
 */
let C = {
    dwn: function(a){document.writeln(a.toString()+"<br />")},
    format: function(a){
        var tmp = []
        for(var k in a){
            tmp.push(a[k].toString().replace(/(^\()|(\)$)/g, "").split(','))
        }
        return tmp
    },
    Cartesian: function(a,b){
        var ret=[];
        for(var i=0;i<a.length;i++){
            for(var j=0;j<b.length;j++){
                ret.push(this.ft(a[i],b[j]));
            }
        }
        return ret;
    },
    ft: function(a,b){
        if(!(a instanceof Array)) a = [a];
        var ret = Array.call(null,a);
        ret.push(b);
        return ret;
    },
    //多个一起做笛卡尔积
    multiCartesian: function(data){
        var len = data.length;
        if(len == 0)
            return [];
        else if(len == 1)
            return data[0];
        else{
            var r=data[0];
            for(var i=1;i<len;i++){
                r=this.Cartesian(r,data[i]);
            }
            return r;
        }
    },
    do: function(data){
        var d = this.multiCartesian(data)
        var a = this.format(d)
        return a
    }
}
export default C;