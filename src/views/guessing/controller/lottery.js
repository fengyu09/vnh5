import C from "./lotteryTool.js";
import P from "./lottery_public.js";
import Init from "./lottery_init.js";
let  L = {
    order_process(Tra){
        let mode = Tra.tabIndex;//也说要修改的地方 下注模式 有3种
        let conf = 'C-1';/////主要是改这个地方
        let order = {};
        if(!conf) return alert('No configuration');
        this.compute(conf,Tra);
        if(!Tra.bnum) return;
        order['pid'] = 1;
        order['tid'] = 10;
        order['cid'] = 20;
        //order['play'] = "五星";
        //order['type'] = "直选复试";
        // order['name'] = "[五星_直选_复试]";
        order['bnum'] = Tra.bnum;
        order['yjfl'] = Tra.yjfl;
        order['mult'] = Tra.mult;//倍数
        order['bsum'] = Tra.bnum*Tra.bone*Tra.mult/order['yjfl'];//总数
        order['scale'] = "0.5";//赔率
        //order['rball'] = Tra.rselect.toString();
        order['content'] = this.contentM(mode);
        // console.log(order);
        return order;
    },

    Cartesian(Tra){
        var a = this.eachone(Tra);
        if(a.length != document.querySelectorAll(".cm-list").length) return 0;
        a = C.do(a);
        // 去重
        if(window.notrepeat){
            let tmp = [];
            for(var k in a){
                if(!P.isRepeat(a[k])) tmp.push(a[k])
            }
            tmp.shift();
            a = tmp;
        }
        return a.length-1;
    },
    howmany(i,vue){
        if(isNaN(i) || window.C_TOGETHER){
            return document.querySelectorAll(".list-content>span.active").length;
        }else{
            let p = document.querySelectorAll(".cm-list")[i];
            let b = p.children[1].children[1].children;
            let n =0;
            for(let i = 0,len = b.length;i<len;i++){
                if(b[i].className.indexOf('active') > -1){
                    n++;
                }
            }
            return n;
        }
    },
    contentM(mode){
        var s = '';
        var sname = '';
        let obj = {};
        let arr = [];
        if(mode == 'duplex'){
            let allBoxes = document.querySelectorAll(".cm-list .list-content");
            for(let i=0,len=allBoxes.length;i<len;i++){
                let allItems = allBoxes[i].children;
                for(let k=0,lenk=allItems.length;k<lenk;k++){
                    if(allItems[k].className.includes('active')){
                        let v = allItems[k].dataset.ball;
                        let vname = allItems[k].dataset.ballxs;
                        v = isNaN(v) ? v : parseInt(v);
                        s += v + ',';
                        arr.push(v)
                        sname += vname+',';
                    }
                }
                s = s.replace(/,*$/,'') + '|';
                sname = sname.replace(/,*$/,'') + '|';
                obj.ball = s;
                obj.name = sname;
                obj.arr = arr;
            }
        }else if(mode == 1){
            //输入号码
            // s = $('textarea').val();
            // s = s.replace(/\s/g,',');
        }
        //s = s.replace(/,*$/,'');
        return obj;
    },
    eachone(vue){
        let a = [];
        // let allBoxes = $(".one-lottery .num-box");
        let allBoxes = document.querySelectorAll(".cm-list .list-content");
        for(let i=0,len=allBoxes.length;i<len;i++){
            // let allItems = $(allBoxes[i]).find("span");
            // let allItems = document.querySelectorAll(allBoxes[i]+'span');
            let allItems = allBoxes[i].children;
            
            let aa = [];
            for(let j = 0,lens = allItems.length;j<lens;j++){
                if(allItems[j].className.indexOf('active') > -1){
                    let v = allItems[j].dataset.ball;
                    aa.push(v);
                }
            }
            if(aa.length) a.push(aa)
        }
        ////////////////////显示下注内容 待优化
        let ss = "";
        for(let ii =0,alen = a.length;ii<alen;ii++){
            ss += a[ii]+"|";
        }
        return a;
    },
    compute(conf,Tra){
        var CE = conf.split('|');
        var CV = CE.splice(0, 1)[0].split('-');
        var CT = CV.splice(0, 1)[0];
        // console.log('9999999999999999999999999999',CT)

        //console.log('=== CE ===')
        //console.log(CE)
        //console.log('=== CV ===')
        //console.log(CV)
        //console.log('=== CT ===')
        //console.log(CT)

        let M = 1;
        // window.C_MOST = 0;
        // window.C_TOGETHER = false;
        // window.onlyone = false;
        // window.notrepeat = false;
        // window.notTrepeat = false;
        // window.notips = false;
        // for(var k in CE){
        //     var v = CE[k];
        //     if(/^x\d+$/.test(v)){
        //         M = parseInt(P.getNums(v))
        //     }
        //     if(/^renxuan\d+$/.test(v)){
        //         M = Tra.rscheme
        //     }
        //     if(/^most\d+$/.test(v)){
        //         window.C_MOST = parseInt(P.getNums(v));
        //     }
        //     if(v == 'together'){
        //         window.C_TOGETHER = true;
        //     }
        //     if(v == 'onlyone'){
        //         window.onlyone = true;
        //     }
        //     if(v == 'notrepeat'){
        //         window.notrepeat = true;
        //     }
        //     if(v == 'notTrepeat'){
        //         window.notTrepeat = true;
        //     }
        //     if(v == 'notips'){
        //         window.notips = true;
        //     }
        // }
       // for(var k in CV) CV[k] = parseInt(CV[k])

       if(CT == 'C'){
            Tra.bnum = this.Cartesian(Tra) * CV[0];
        }

        // if(CT == 'N'){
        //     Tra.bnum = this.howmany();
        // }
        // else if(CT == 'C'){
        //     Tra.bnum = this.Cartesian(Tra) * CV[0];
        // }else if(CT == 'M'){
        //     let n = 1;
        //     for(let i = 0; i < CV.length; i++){
        //         n *= P.getRank(new Array(this.howmany(i,Tra)), CV[i]).length;
        //     }
        //     Tra.bnum = n;
        // }else if(CT == 'X'){
        //     var n = 0;
        //     let allItems = document.querySelectorAll(".num-box>span");
        //     for(let i=0,len=allItems.length;i<len;i++){
        //         if(allItems[i].className.indexOf('active') > -1) n += CV[i];
        //     }
        //     Tra.bnum = n;
        // }else if(CT == 'R'){
        //     let a = this.eachone(Tra);
        //     let n = 0;
        //     let ai = P.array_create(0, a.length-1);
        //     let ar = P.getRank(ai, CV[0]);
        //     for(var k in ar){
        //         let aa = ar[k].split(',')
        //         let nn = 1;
        //         for(var kk in aa){
        //             nn *= this.howmany(parseInt(aa[kk]),Tra);
        //         }
        //         n += nn;
        //     }
        //     Tra.bnum = n;
        // }else if(CT == 'I'){
        //     let warr = Tra.write.split(/\D/);
        //     //二星组选单式去重 待优化
        //     if(window.notrepeat){
        //         let tmp = [];
        //         for(let k=0,lenk=warr.length;k<lenk;k++){
        //             if(!P.isRepeat(warr[k])) tmp.push(warr[k])
        //         }
        //         if(warr.length != tmp.length){
        //             warr = tmp;
        //             Tra.write = warr.join(",");
        //         }
        //     }
        //     //三星混合组选   不能三个号码相同 可以号码相同   待优化
        //     if(window.notTrepeat){
        //         let tmp = [];
        //         for(let k=0,lenk=warr.length;k<lenk;k++){
        //             if(!P.isTRepeat(warr[k])) tmp.push(warr[k])
        //         }
        //         if(warr.length != tmp.length){
        //             warr = tmp;
        //             Tra.write = warr.join(",");
        //         }
        //     }

        //     //所有单式去重  待优化
        //     let res = [];
        //     let json = {};
        //     for(let j = 0,len=warr.length;j<len;j++){
        //         if(!json[warr[j]]){
        //             res.push(warr[j]);
        //             json[warr[j]] = 1;
        //         }
        //     }
        //     if(warr.length != res.length){
        //         warr = res;
        //         Tra.write = warr.join(",");
        //     }

        //     //核心计算代码
        //     for(let i = 0, l = warr.length; i < l; i++){
        //         let v = warr[i];
        //         if(!v){
        //             delete warr[i];
        //             warr.length--;
        //             continue;
        //         }
        //         if(v.length != CV[0] || isNaN(v-0)) return Tra.bnum = 0;
        //     }
        //     Tra.bnum = warr.length;
        // }else if(CT == 'S'){//连肖 连码
        //     let n = document.querySelectorAll(".num-box>span.active").length || 0;
        //     if(CV[0] == 2){
        //         Tra.bnum = n*(n-1)/2;
        //     }else if(CV[0] == 3){
        //         Tra.bnum = (n-2)*(n-2+1)*(n-2+2)/6;
        //     }else if(CV[0] == 4){
        //         Tra.bnum = Math.ceil((1/24)*n*(n-1)*(n-2)*(n-3));
        //     }
        // }
        Tra.bnum *= M;
    },
    bonus_format(v){
        var n = ''
        for(var i = 0, j = 0, s = v+''; i < s.length; i++){
            var c = s.charAt(i)
            if(isNaN(c)) n += c
            else n += j++ < 3 ? c : '0'
        }
        return parseFloat(n).toFixed(3)
    },
    returnTime(s,h,f){
        let time = this.stime(s,h,f);
        let arr = time.split('');
        return arr;
    },
    //传入秒数，返回00：00：00格式的时间
    stime(s,h,f){
        s = parseInt(s);
        f = f ? f : ':';
        let r = {'d':0,'h':0,'m':0,'s':0};
        r.s = s;
        if(s > 60){
            let second = parseInt(s) % 60;
            let min = parseInt(s / 60);
            r.m = min;r.s = second;
            if( min > 60 ){
                min = parseInt(s / 60) % 60;
                let hour = parseInt( parseInt(s / 60) /60 );
                r.h = hour;r.m = min;r.s = second;
            }
        }
        if(h){
            var html = '';
            if(r.d) html += r.d + ':';
            if(r.h > 99) r.h = 99; // 限制长度 适用彩票
            html += (r.h ? r.h < 10 ? '0' + r.h : r.h : '00') + ':';
            html += (r.m ? r.m < 10 ? '0' + r.m : r.m : '00') + ':';
            html += r.s < 10 ? '0' + r.s : r.s;
            return html.replace(/:/ig,f);
        }else{
            return r;
        }
    },
}
export default L;

Array.prototype.un = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}