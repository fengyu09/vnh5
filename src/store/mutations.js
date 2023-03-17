// import { import } from "mathjs";

import { setToken } from '../store/cookie';
const mutations = {
    //设置用户信息
    SETUSERINFO(state,data){
        state.userinfo = data;
        try {
            if(window.localStorage)
                localStorage.setItem('userinfo',JSON.stringify(data));
            else
                localStorage.setItem('userinfo',"");

        } catch (e) {
          if(data){
            setToken('userinfo',JSON.stringify(data))  
        } else{
          setToken('userinfo',"");
        }
      }
    },
    
    //设置
    SETWEBDATA(state,data){
        state.webInitData = data;
        try {
            if(data&&window.localStorage)
                localStorage.setItem('webInitData',JSON.stringify(data));
            else
                localStorage.setItem('webInitData',"");
        } catch (e) {
          alert(data)
          if(data)
          setToken('webInitData',JSON.stringify(data));
          else
          setToken('webInitData',"");
          
        }
    },
    SETSKINLIST(state,data){
      state.skinListStore = data;
      try {
          if(window.localStorage)
              localStorage.setItem('skinListStore',JSON.stringify(data));
          else
              localStorage.setItem('skinListStore',"");

      } catch (e) {
        if(data){
          setToken('skinListStore',JSON.stringify(data))  
      } else{
        setToken('skinListStore',"");
      }
    }
    },
  //设置所有消息
  SETALLNOTICES(state,data){
    state.AllNotices = data;
    try {
      if(data)
        localStorage.setItem('AllNotices',JSON.stringify(data));
      else
        localStorage.setItem('AllNotices',"");

    } catch (e) {}
  },
  //设置互动消息内容 hdnoticesContent
  SETHDNOTICESCONTENT(state,data){
    state.hdnoticesContent = data;
    try {
      if(data)
        localStorage.setItem('hdnoticesContent',JSON.stringify(data));
      else
        localStorage.setItem('hdnoticesContent',"");

    } catch (e) {}
  },
    //设置用户名
    SETUSERNAME (state,data) {
        state.username = data
        try {
            localStorage.setItem('username',data)
        } catch (e) {}
    },
  //设置消息数量
    SETUSERNOTICE (state,data) {
      state.noticeNum = data
      try {
        localStorage.setItem('noticeNum',data)
      } catch (e) {}
    },
    //设置用户vip
    SETUSERVIP(state,data){
        state.vip = data;
        try {
            localStorage.setItem('vip',data)
        } catch (e){
          setToken('vip',data);
        }
    },
    //设置用户头像
    SETPIC (state,data) {
     state.avatar = data
    try {
      localStorage.setItem('avatar',data)
    } catch (e) {
      setToken('avatar',"");
    }
  },
    //设置用户token
    SETUSERTOKEN (state,data) {
        state.codeToken = data
        try {
            localStorage.setItem('codeToken',data)
        } catch (e) {
          setToken('codeToken',data)
        }
    },

    //设置用户user_id

    SETUSERUSERID(state,data){
        state.UserId = data;
        try {
            localStorage.setItem('UserId',data)
        } catch (e) {
          setToken('UserId',data)
        }
    },

    ROOTBOX(state,data){
       state.rootbox=data;
    },

  //是否设置取款密码
    SETSAFEPWD (state,data) {
      state.safePwd = data
      try {
        localStorage.setItem('safePwd',data)
      } catch (e) {
        setToken('safePwd',data)
      }
    },



   
    //设置banner
    SETBANNER_S(state,data){
        state.banners = data
        // try {
        //     localStorage.setItem('banners',JSON.stringify(data));
        // } catch (e) {
        //     localStorage.setItem('banners','');
        // }
    },
      //设置hotGame
      SETHOTGAME(state,data){
        state.hotGame = data
        try {
            localStorage.setItem('hotGame',JSON.stringify(data));
        } catch (e) {
          if(data){
            setToken('hotGame',JSON.stringify(data))  
          } else{
            setToken('hotGame',"");
          }
        }
    },
    //设置公告
    SETNOTICE_S(state,data){
        state.notices = data
        try {
            localStorage.setItem('notices',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('notices','');
        }
    },
    //设置热门彩种
    SETGAME_S(state,data){
        state.games = data
        try {
            localStorage.setItem('games',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('games','');
        }
    },
    //设置广告图
    SETAD_S(state,data){
        state.ad = data
        try {
            localStorage.setItem('ad',JSON.stringify(data));
        } catch (e) {
            localStorage.setItem('ad','');
        }
    },

    //设置用户类型
    SETUSER_TYPE(state,data){
    state.userType = data
    try {
      localStorage.setItem('userType',data)
    } catch (e) {
      setToken('userType',data)
    }
  },

   //设置互动消息
   SETHDNOTICES (state,data) {
      state.hdnotice = data
      try {
        localStorage.setItem('hdnotice',data)
      } catch (e) {
        setToken('hdnotice',data)
      }
    },
  //设置官方活动
  SETGFNOTICES (state,data) {
    state.gfnotice = data
    try {
      localStorage.setItem('gfnotice',data)
    } catch (e) {
      setToken('gfnotice',data)
    }
  },
  //设置系统消息
  SETXTNOTICES (state,data) {
    state.xtnotice = data
    try {
      localStorage.setItem('xtnotice',data)
    } catch (e) {}
  },
// 设置系统消息列表
SETSYSTEMDATA (state,data) {
  state.systemData = data
  try {
    localStorage.setItem('systemData',data)
  } catch (e) {}
},
// 设置活动消息列表
SETAUTHORTYDATA (state,data) {
  state.authortyData = data
  try {
    localStorage.setItem('authortyData',data)
  } catch (e) {}
},

// 设置互动消息列表
SETINTRACTDATA (state,data) {
  state.interactdata = data
  try {
    localStorage.setItem('interactdata',data)
  } catch (e) {}
},
// 设置皮肤列表
SETSKINDATA (state,data) {
  // console.log(33333,data)
  state.skin = data
  try {
    localStorage.setItem('skin',data)
  } catch (e) {
    setToken('skin',data)
  }
},

// 设置首页皮肤版本
SETVERSION (state,data) {
  // console.log(33333,data)
  state.currversion = data
  try {
    localStorage.setItem('currversion',data)
  } catch (e) {
    setToken('currversion',data)
  }
},
// 设置皮肤标识
SETSKINBS (state,data) {
  state.skinBs = data
  try {
    localStorage.setItem('skinBs',data)
  } catch (e) {
    setToken('skinBs',data)
  }
},

// 设置悬浮显隐
SETSUSPENSION  (state,data) {
  state.suspension = data
  try {
    localStorage.setItem('sus',data)
  } catch (e) {
    setToken('sus',data)
  }
},
// 设置公告
SETISNOTICE  (state,data) {
  state.isNotice = data
  try {
    localStorage.setItem('isNotice',data)
  } catch (e) {}
},
//设置秘钥
SETISDECIPHER (state,data) {
  state.decipher_str = data
  try {
    localStorage.setItem('decipher_str',data)
  } catch (e) {
    setToken('decipher_str',data)
  }
},
SETISMUSIC(state,data){
  state.musicState = data
  try {
    localStorage.setItem('musicState',data)
  } catch (e) {}
},
SETISDOT(state,data){
  state.jptjDot = data
  try {
    localStorage.setItem('jptjDot',data)
  } catch (e) {}
},
SETISAPPARR(state,data){
  state.tuiJianArr = data
  try {
    localStorage.setItem('tuiJianArr',data)
  } catch (e) {}
},
//设置钻石余额diamond
SETDIAMOND(state,data){
  state.diamond = data
  try {
    localStorage.setItem('diamond',data)
  } catch (e) {
    setToken('diamond',data);
  }
},
//投注记录 余额/钻石
SETISTYPE(state,data){
  state.isType = data
  try {
    localStorage.setItem('isType',data)
  } catch (e) {
    setToken('isType',data)
  }
},
//是否屏蔽特效
SPECIAL(state,data){
  state.special = data
  try {
    localStorage.setItem('special',data)
  } catch (e) {}
},
//投注货币 = 余额 / 钻石
GETISYUE(state,data){
  state.isYue = data
  try {
    localStorage.setItem('isYue',data)
  } catch (e) {
    setToken('isYue',data)
  }
},
//设置是否纯净版
SETPURE(state,data){
        state.isPure = data
        try {
            localStorage.setItem('isPure',data)
        } catch (e) {
          setToken('isPure',data)
        }
    },
SETISBB(state,data){
  state.isBb = data
  try {
      localStorage.setItem('isBb',data)
  } catch (e) {
    setToken('isBb',data)
  }
},
//纯净版悬浮开关
SETOPENPURE(state,data){
    state.openPure = data
    try {
        localStorage.setItem('openPure',data)
    } catch (e) {
      setToken('openPure',data)
    }
},
//悬浮开发
SETOPENPURE2(state,data){
    state.openPure2 = data
    try {
        localStorage.setItem('openPure2',data)
    } catch (e) {
      setToken('openPure2',data)
    }
},

//在线人数
SETONLINENUMBER(state,data){
    state.onlinenumber = data
    try {
        localStorage.setItem('onlinenumber',data)
    } catch (e) {}
},
SETOPENZDZZ(state,data){
  state.openZdzz = data
  try {
      localStorage.setItem('openZdzz',data)
  } catch (e) {}
},
SETRAIN(state,data){
        state.isClickRain = data
        try {
            localStorage.setItem('isClickRain',data)
        } catch (e) {
          setToken('isClickRain',data)
        }
    },
SETTASK(state,data){
        state.isTask = data
        try {
            localStorage.setItem('isTask',data)
        } catch (e) {}
},
// closeData
//设置封盘彩种
SETCLOSEDATA(state,data){
    state.closeData = data;
    try {
        if(data)
            localStorage.setItem('closeData',JSON.stringify(data));
        else
            localStorage.setItem('closeData',"");

    } catch (e) {}
},
 //设置首页导航
 SETHOMENAV(state,data){
  state.homeTabNav = data;
  try {
      if(data)
          localStorage.setItem('homeTabNav',JSON.stringify(data));
      else
          localStorage.setItem('homeTabNav',"");
  } catch (e) {}
},
pushToken: (state, src) => {
  state.cancelTokenArr.push(src.cancelToken)
},
clearToken: ({cancelTokenArr}) => {
  cancelTokenArr.forEach(item => {
    item('路由跳转取消请求')
  })
  cancelTokenArr = [] 
},
//  //注册红包显示
SETZCGIF (state,data) {
  state.zcGifShow = data
  try {
    localStorage.setItem('zcGifShow',data)
  } catch (e) {
    setToken('zcGifShow',data)
  }
},
SETZJArr (state,data) {
  state.zjArr = data
},
//设置位置
SETPOSITIONY(state,data){
  state.scrollYPosition[data.name] = data.y
  if(data.curr)state.scrollYPosition['curr'] = data.curr;
},
SETHCDATA(state,data){
  state.hcData[data.name] = data.data
},
SETCLDATA (state,data) {
  state.clData = data
},
// 彩种id
SETCZID (state,data) {
  state.czID = data
  try {
    localStorage.setItem('czID',data)
  } catch (e) {
    setToken('czID',data)
  }
},
//设置用户信息收货地址
SETADDRESSINFOR(state,data){
  state.addressInfor = data;
  try {
      if(data)
          localStorage.setItem('addressInfor',JSON.stringify(data));
      else
          localStorage.setItem('addressInfor',"");

  } catch (e) {}
},
//设置记住密码
SETREMPSW(state,data){
  state.remPSW = data;
  try {
      if(data)
          localStorage.setItem('remPSW',JSON.stringify(data));
      else
          localStorage.setItem('remPSW',"");

  } catch (e) {}
},
SETHISTORYGAME(state,data){
  state.historyGame = data;
  try {
      if(data)
          localStorage.setItem('historyGame',JSON.stringify(data));
      else
          localStorage.setItem('historyGame',"");

  } catch (e) {}
},
SETSEARCHLIST(state,data,flag){
  console.log(data.flag)
  if(data.flag=='del'){
    state.searchList=[];
  }else{
    if(state.searchList.length>9){
      state.searchList.pop()
    }
    state.searchList.unshift(data.text)
  }
 
  localStorage.setItem('searchList',JSON.stringify(state.searchList));
},
SETCHAT(state,data){
  state.chatShow = data;
},
SETNEWSHOW(state,data){
  state.homeNewShow = data;
},
SETISSF(state,data){
  state.isSf = data;
  try {
    localStorage.setItem('isSf',data)

  } catch (e) {}
},

SETCARDLIST (state,data) {
  state.cardListStore = data
},
SETUSDTLIST (state,data) {
  // if(Object.prototype.toString.call(data) === '[object Object]'){
  //   state.usdtList.unshift(data);
  // }else{
  //   state.usdtList = data
  // }
  
  state.usdtList = data
  // console.log(state.usdtList)
  
},
SETUSDTADRESS(state,data){
  state.usdtAdress = data;
},
SETYHDATA(state,data){
  state.yhList = data;
},
SETCZTYPE(state,data){
  state.czTypeArr = data;
},
SETSDTYPE(state,data){
  state.sdSelectType = data;
},
SETSDADR(state,data){
  state.sdSelectAdr = data;
},
SETSKINDATA1(state,data){
  state.skinData = data;
},
SETCZNDATA(state,data){
  state.czListData = data;
},
SETMONEYNDATA(state,data){
  state.moneyData = data;
},
SETGAMEDATA(state,data){
  state.gameData = data;
},
SETGAMESTATUS(state,data){
  // console.log(data)
  state.gamestatus[data.key] = data.val;
},
SETMESSSTATUS(state,data){
  // console.log(data)
  state.messStatus[data.key] = data.val;
},
SETGAMECENTER(state,data){
  state.gameCenter = data;
},
SETGAMECENTERLGCP(state,data){
  state.gameCenterLgcp = data;
},
SETGAMECENTERLGQP(state,data){
  state.gameCenterLgQp = data;
},
SETHOTLIVEDATA(state,data){
  // console.log(898989,data);
  state.hotLive = data;
  try{
    localStorage.setItem('liveData',JSON.stringify(data));
  }catch(e){

  }
  
},
SETDOWNLOAD(state,data){
  state.isDownLoad = data
  try {
      localStorage.setItem('isDownLoad',data)
  } catch (e) {
    setToken('isDownLoad',data)
  }},
SETHOMEGAME(state,data){
  state.homeGame = data;
},
SETSERVE_1(state,data){
  state.serve1 = data;
},
SETSERVE_2(state,data){
  state.serve2 = data;
},
SETSERVE_3(state,data){
  state.serve3 = data;
},
SETSERVE_4(state,data){
  state.serve4 = data;
},

SETHOTMATCH(state,data){
  state.hotMatch = data;
},
SETENCRYPT(state,data){
  state.isEncrypt = data;
  try {
      localStorage.setItem('isEncrypt',data)
  } catch (e){
    setToken('isEncrypt',data);
  }
},


SETLOTTERY(state,data){
  state.allLotteryGame = data;
},
SETYNLOTTERY(state,data){
  state.allYnCp = data;
},
SETHOMENEWDATA(state,data){
  state.homeNewData = data;
},
SETMSGPOINT(state,data){
  state.msgPoint = data;
},


SETUSERIP(state,data){
  state.userIp = data;
  try {
      localStorage.setItem('userIp',data)
  } catch (e){
    setToken('userIp',data);
  }
},
SETUSERGG(state,data){
  state.userGG = data;
  try {
      localStorage.setItem('userGG',data)
  } catch (e){
    setToken('userGG',data);
  }
},
SETLANDCODE(state,data){
  state.lanCode = data;
  try {
      localStorage.setItem('lanCode',data)
  } catch (e){
    setToken('lanCode',data);
  }
},
SETDEFAULTLAN(state,data){
  state.defalutLan = data;
  try {
      localStorage.setItem('defalutLan',data)
  } catch (e){
    setToken('defalutLan',data);
  }
},
SETLANLIST(state,data){
  state.lanList = data;
  try {
    localStorage.setItem('lanList',JSON.stringify(data));
  } catch (e) {}
},
SETNOTICEDATA(state,data){
  state.noticeData = data;
  // try{
  //   localStorage.setItem('noticeData',JSON.stringify(data));
  // }catch(e){

  // }
  
},
SETSJB(state,data){
  state.showSjb = data;
  try {
      localStorage.setItem('showSjb',data)
  } catch (e){
    setToken('showSjb',data);
  }
},
SETOFTENNAME(state,data){
  state.oftenName = data;
  try {
      if(data)
          localStorage.setItem('oftenName',JSON.stringify(data));
      else
          localStorage.setItem('oftenName',"");

  } catch (e) {}
},
SETOFTENCARD(state,data){
  state.oftenCard = data;
  try {
      if(data)
          localStorage.setItem('oftenCard',JSON.stringify(data));
      else
          localStorage.setItem('oftenCard',"");

  } catch (e) {}
},
  SETTYURL(state,data){
  state.tygameUrl=data;
},
SETTYSHOW(state,data){
  state.showtyUrl=data;
},
SETIFRAMELOAD(state,data){
  state.showiframeLoad=data;
},
SETTYTYPE(state,data){
  state.tyType=data;
},
}



export default mutations    

