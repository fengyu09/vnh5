import {getToken} from '../store/cookie'
// 用户用户token
let codeToken = ''
try {
    if (localStorage.getItem('codeToken')) {
        codeToken = localStorage.getItem('codeToken')
    }
} catch (e) {
  codeToken = getToken('codeToken');

}
//通知消息
let noticeNum = '';
try {
  if (localStorage.getItem('noticeNum')) {
    noticeNum = localStorage.getItem('noticeNum')
  }
} catch (e) {
}
//用户vip等级
let vip = '';
try {
    if (localStorage.getItem('vip')) {
        vip = localStorage.getItem('vip')
    }
} catch (e) {
}

//用户id
let UserId  = ''
try {
    if (localStorage.getItem('UserId')) {
        UserId = localStorage.getItem('UserId')
    }
} catch (e) {
}


// 用户名
let username = ''
try {
    if (localStorage.getItem('username')) {
        username = localStorage.getItem('username')
    }else{
    }
} catch (e) {
}

//safePwd
let safePwd = ''
try {
  if (localStorage.getItem('safePwd')) {
    safePwd = localStorage.getItem('safePwd')
  }else{
  }
} catch (e) {
}

// 用户头像
let avatar = ''
try {
  if (localStorage.getItem('avatar')) {
    avatar = localStorage.getItem('avatar')
  }else{
  }
} catch (e) {
}

//用户信息
let userinfo = {};
try {
    if (localStorage.getItem('userinfo')) {
        userinfo = JSON.parse(localStorage.getItem('userinfo'));
    } else {
        userinfo = {};
    }
} catch (e) {
  if (getToken('userinfo')) {
    userinfo = JSON.parse(getToken('userinfo'));
} else {
    userinfo = {};
}
}
//网站初始化数据
let webInitData = {};
try {
    if (localStorage.getItem('webInitData')) {
        webInitData = JSON.parse(localStorage.getItem('webInitData'));
    } else {
        webInitData = {};
    }
} catch (e) {
  if (getToken('webInitData')) {
    webInitData = JSON.parse(getToken('webInitData'));
} else {
    webInitData = {};
}
}

// AllNotices
//所有消息
let AllNotices = {};
try {
  if (localStorage.getItem('AllNotices')) {
    AllNotices = JSON.parse(localStorage.getItem('AllNotices'));
  } else {
    AllNotices = {};
  }
} catch (e) {
}





let isEncrypt ;
try {
    if (localStorage.getItem('isEncrypt')) {
      isEncrypt = localStorage.getItem('isEncrypt');
    } else {
      
    }
} catch (e) {
  isEncrypt = getToken('isEncrypt');
}




//banners
let banners = [];


// hotGame 热门游戏
let hotGame = [];
try {
    if (localStorage.getItem('hotGame')) {
      hotGame = JSON.parse(localStorage.getItem('hotGame'));
    } else {
      hotGame = [];
    }
} catch (e) {
  if (getToken('hotGame')) {
    hotGame = JSON.parse(getToken('hotGame'));
  } else {
    hotGame = [];
  }
}


//banners
let notices = [];
try {
    if (localStorage.getItem('notices')) {
        notices = JSON.parse(localStorage.getItem('notices'));
    } else {
        notices = [];
    }
} catch (e) {
}
// games
let games = [];
try {
    if (localStorage.getItem('games')) {
        games = JSON.parse(localStorage.getItem('games'));
    } else {
        games = [];
    }
} catch (e) {
}
//ad
let ad = [];
try {
    if (localStorage.getItem('ad')) {
        ad = JSON.parse(localStorage.getItem('ad'));
    } else {
        ad = [];
    }
} catch (e) {
}

let rootbox = {
  open: false
}

let userType = '';
try {
  if (localStorage.getItem('userType')) {
    userType = JSON.parse(localStorage.getItem('userType'));
  } else {
    userType = [];
  }
} catch (e) {
}
//互动消息数量
let hdnotice = '';
try {
  if (localStorage.getItem('hdnotice')) {
    hdnotice = localStorage.getItem('hdnotice')
  }else{
  }
} catch (e) {
}
//互助消息内容
let hdnoticesContent = [];
try {
  if (localStorage.getItem('hdnoticesContent')) {
    hdnoticesContent = JSON.parse(localStorage.getItem('hdnoticesContent'));
  } else {
    hdnoticesContent = [];
  }
} catch (e) {
}


//系统消息
let xtnotice = '';
try {
  if (localStorage.getItem('xtnotice')) {
    xtnotice = localStorage.getItem('xtnotice')
  }else{
  }
} catch (e) {
}

//官方消息
let gfnotice = '';
try {
  if (localStorage.getItem('gfnotice')) {
    gfnotice = localStorage.getItem('gfnotice')
  }else{
  }
} catch (e) {
}
//系统消息列表
let systemData = '';
try {
  if (localStorage.getItem('systemData')) {
    systemData = localStorage.getItem('systemData')
  }else{
  }
} catch (e) {
}

//系统消息列表
let authortyData = '';
try {
  if (localStorage.getItem('authortyData')) {
    authortyData = localStorage.getItem('authortyData')
  }else{
  }
} catch (e) {
}


//互动消息列表
let interactdata = '';
try {
  if (localStorage.getItem('interactdata')) {
    interactdata = localStorage.getItem('interactdata')
  }else{
  }
} catch (e) {
}


//皮肤状态
let skin = '';
try {
  if (localStorage.getItem('skin')) {
    skin = localStorage.getItem('skin')
  }else{
  }
} catch (e) {
  skin = getToken('skin')
}

//首页版本
let currversion = '';
try {
  if (localStorage.getItem('currversion')) {
    currversion = localStorage.getItem('currversion')
  }else{
  }
} catch (e) {
  currversion = getToken('currversion')
}

//皮肤标识
let skinBs = 0;
try {
  if (localStorage.getItem('skinBs')) {
    skinBs = localStorage.getItem('skinBs')
  }else{
  }
} catch (e) {
  skinBs = getToken('skinBs')
}

// 直播间悬浮显隐
let suspension = '';
try {
  if (localStorage.getItem('sus')) {
    suspension = localStorage.getItem('sus')
  }else{
  }
} catch (e) {
}
let isNotice = 'no';
try {
  if (localStorage.getItem('isNotice')) {
    suspension = localStorage.getItem('isNotice')
  }else{
  }
} catch (e) {
}
let decipher_str=''
try {
  if (localStorage.getItem('decipher_str')) {
    decipher_str = localStorage.getItem('decipher_str')
  }
} catch (error) {
  
}
let musicState=true
try {
  if (localStorage.getItem('musicState')) {
    musicState = localStorage.getItem('musicState')
  }
} catch (error) {
  
}
let jptjDot=1
try {
  if (localStorage.getItem('jptjDot')) {
    jptjDot = localStorage.getItem('jptjDot')
  }
} catch (error) {
  
}
let tuiJianArr=[]
try {
  if (localStorage.getItem('tuiJianArr')) {
    tuiJianArr = localStorage.getItem('tuiJianArr')
  }
} catch (error) {
  
}

//钻石余额
let diamond = '';
try {
  if (localStorage.getItem('diamond')) {
    diamond = localStorage.getItem('diamond')
  }else{
  }
} catch (e) {
}
//投注记录
let isType = '';
try {
  if (localStorage.getItem('isType')) {
    isType = localStorage.getItem('isType')
  }else{
  }
} catch (e) {
}
//屏蔽特效
let special = '';
try {
  if (localStorage.getItem('special')) {
    special = localStorage.getItem('special')
  }else{
  }
} catch (e) {
}
//余额投注
let isYue = '';
try {
  if (localStorage.getItem('isYue')) {
    isYue = localStorage.getItem('isYue')
  }else{
  }
} catch (e) {
}

//是否纯净版
let isPure = '';
try {
    if (localStorage.getItem('isPure')) {
        isPure = localStorage.getItem('isPure')
    }else{
    }
} catch (e) {
}
let isBb = true;
try {
  if (localStorage.getItem('isBb')) {
    isBb = localStorage.getItem('isBb')
  }else{
  }
} catch (e) {
}
let openPure = '';
try {
    if (localStorage.getItem('openPure')) {
        openPure = localStorage.getItem('openPure')
    }else{
    }
} catch (e) {
}
let openPure2 = '';
try {
    if (localStorage.getItem('openPure2')) {
        openPure2 = localStorage.getItem('openPure2')
    }else{
    }
} catch (e) {
}



let onlinenumber = '';
try {
    if (localStorage.getItem('onlinenumber')) {
        onlinenumber = localStorage.getItem('onlinenumber')
    }else{
    }
} catch (e) {
}
// 自动转账
let openZdzz = false;
try {
    if (localStorage.getItem('openZdzz')) {
      openZdzz = JSON.parse(localStorage.getItem('openZdzz'))
    }else{
    }
} catch (e) {
}
//是否点击过红包雨
let isClickRain= false;
try {
    if (localStorage.getItem('isClickRain')) {
        isClickRain = JSON.parse(localStorage.getItem('isClickRain'))
    }else{
    }
} catch (e) {
}

//是否点击过新手任务
let isTask= false;
try {
    if (localStorage.getItem('isTask')) {
        isTask = JSON.parse(localStorage.getItem('isTask'))
    }else{
    }
} catch (e) {
}
//所有消息
let closeData = [];
try {
    if (localStorage.getItem('closeData')) {
        closeData = JSON.parse(localStorage.getItem('closeData'));
    } else {
        closeData = {};
    }
} catch (e) {
}

let homeTabNav=[];
try {
  if (localStorage.getItem('homeTabNav')) {
    homeTabNav = JSON.parse(localStorage.getItem('homeTabNav'));
  } else {
    homeTabNav =[];
  }
} catch (e) {
}

let zcGifShow=0;
try {
  if (localStorage.getItem('zcGifShow')) {
    zcGifShow = localStorage.getItem('zcGifShow');
  } else {
  }
} catch (e) {
  zcGifShow = getToken('zcGifShow');
}
let zjArr = [];

let scrollYPosition = {};
let hcData={};
let clData = [];

let czID='';
try {
  if (localStorage.getItem('czID')) {
    czID = localStorage.getItem('czID');
  } else {
  }
} catch (e) {
  zcGifShow = getToken('czID');
}
let cancelTokenArr = [];


//设置用户信息收货地址
let addressInfor = {};
try {
    if (localStorage.getItem('addressInfor')) {
      addressInfor = JSON.parse(localStorage.getItem('addressInfor'));
    } else {
      addressInfor = {};
    }
} catch (e) {
}
//设置记住密码
let remPSW = {};
try {
    if (localStorage.getItem('remPSW')) {
      remPSW = JSON.parse(localStorage.getItem('remPSW'));
    } else {
      remPSW = {};
    }
} catch (e) {
}

//是否跳转过三方
let isSf = {};
try {
    if (localStorage.getItem('isSf')) {
      isSf = JSON.parse(localStorage.getItem('isSf'));
    } else {
      isSf = {};
    }
} catch (e) {
}
//是否关闭下载
let isDownLoad= true;
try {
    if (localStorage.getItem('isDownLoad')) {
      isDownLoad = JSON.parse(localStorage.getItem('isDownLoad'))
    }else{
    }
} catch (e) {
}
let historyGame= {};
try {
    if (localStorage.getItem('historyGame')) {
      historyGame = JSON.parse(localStorage.getItem('historyGame'))
    }else{
    }
} catch (e) {
}
let chatShow= false;
let homeNewShow=0// 首页显示控制-1

//3.3.3首页
let homeGame=[];

let cardListStore = [];
let usdtList = [];
let usdtAdress = '';
let yhList = {};
let czTypeArr = [];
let sdSelectType = '';
let sdSelectAdr = '';
let skinData = [];
let czListData = [];
let moneyData = [];
let gameData = [];
let gamestatus={} ;
let messStatus = {};
let hotLive = {};
let gameCenter = [];
let serve1=[];
let serve2=[];
let serve3=[];
let serve4=[];
let gameCenterLgcp = [];
let gameCenterLgQp =[];
let allLotteryGame = [];
let homeNewData = [];
let msgPoint=true

let skinListStore = []
  try {
    if (localStorage.getItem('skinListStore')) {
      skinListStore = JSON.parse(localStorage.getItem('skinListStore'));
    } else {
      skinListStore = [];
    }
} catch (e) {
  if (getToken('skinListStore')) {
    skinListStore = JSON.parse(getToken('skinListStore'));
} else {
  skinListStore = [];
}
}


try {
  if (localStorage.getItem('liveData')) {
    hotLive= JSON.parse(localStorage.getItem('liveData'));
  } else {
    hotLive = {};
  }
} catch (e) {
}

let defalutLan = '';
try {
  if (localStorage.getItem('defalutLan')) {
    defalutLan = localStorage.getItem('defalutLan')
  }else{
  }
} catch (e) {
}

let lanCode = '';
try {
  if (localStorage.getItem('lanCode')) {
    lanCode = localStorage.getItem('lanCode')
  }else{
  }
} catch (e) {
}

let userIp = '';
try {
  if (localStorage.getItem('userIp')) {
    userIp = localStorage.getItem('userIp')
  }else{
  }
} catch (e) {
}
let userGG = '';
try {
  if (localStorage.getItem('userGG')) {
    userGG = localStorage.getItem('userGG')
  }else{
  }
} catch (e) {
}
let lanList=[];
try {
  if (localStorage.getItem('lanList')) {
    lanList = JSON.parse(localStorage.getItem('lanList'));
  } else {
    lanList =[];
  }
} catch (e) {
}
let searchList=[];
try {
  if (localStorage.getItem('searchList')) {
    searchList = JSON.parse(localStorage.getItem('searchList'));
  } else {
    searchList =[];
  }
} catch (e) {
}
let pageBanner = {};
let hotMatch =false;
let allYnCp = [];

let noticeData = [];

// try {
//   if (localStorage.getItem('noticeData')) {
//     noticeData= JSON.parse(localStorage.getItem('noticeData'));
//   } else {
//     noticeData = {};
//   }
// } catch (e) {
// }
let showSjb = true;
try {
  if (localStorage.getItem('showSjb')) {
    showSjb = localStorage.getItem('showSjb')
  }else{
  }
} catch (e) {
}
let oftenName=[]
try {
  if (localStorage.getItem('oftenName')) {
    oftenName = JSON.parse(localStorage.getItem('oftenName'));
  } else {
    oftenName =[];
  }
} catch (e) {
}
let oftenCard=[]
try {
  if (localStorage.getItem('oftenCard')) {
    oftenCard = JSON.parse(localStorage.getItem('oftenCard'));
  } else {
    oftenCard =[];
  }
} catch (e) {
}
let tygameUrl=''
let showtyUrl=false;
let showiframeLoad=false;
let tyType='';
const state = {
    suspension,//直播间悬浮显隐
    interactdata,//h互动消息列表
    authortyData,//活动消息列表
    systemData,//系统消息列表
    hdnotice,//互动消息
    hdnoticesContent,//互动消息内容
    xtnotice,//系统消息
    gfnotice,//官方消息
    AllNotices,//所有消息
    noticeNum,//消息总数量
    userType,//用户类型
    safePwd,//是否设置取款密码
    avatar,
    rootbox,
    codeToken,// token
    userinfo,//用户信息
    UserId,//用户ID
    vip,//用户vip
    username,//用户名
    banners,//banners
    notices,//公告
    games,//热门彩种
    ad,//广告图
    skin,//皮肤状态
    currversion,//首页版本
    isNotice,//公告,
    decipher_str,//秘钥,
    musicState,
    jptjDot,
    tuiJianArr,
    openZdzz,//自动转账
    isClickRain,//是否点击过红包雨
    webInitData,//网站初始化数据
    closeData,//封盘消息
    hotGame,//热门游戏
    zcGifShow,//注册红包显示
    skinBs,//皮肤标识
    zjArr,//中奖数据
    scrollYPosition,//滚动位置
    hcData,//缓存数据
    clData,//长龙下注数据
    czID,//彩种id
    addressInfor,//设置用户信息收货地址
    cardListStore,//银行卡列表
    usdtList,//usdt地址列表
    usdtAdress,//用户输入的usdt货币地址
    yhList,//优惠活动
    czTypeArr,//充值列表
    sdSelectType,//选择手动充值协议类型
    sdSelectAdr,//选择手动充值常用地址返回
    remPSW,//记住密码
    skinData,//皮肤数据
    czListData,//彩种列表
    moneyData,//钱列表
    gameData,//游戏中心数据
    isSf,//是否跳转过三方
    gamestatus,//记录首页游戏类型
    messStatus,//消息类型记录
    hotLive,//热门直播页面的内容
    pageBanner,//每个页面的banner
    gameCenter,
    gameCenterLgcp,
    gameCenterLgQp,
    isDownLoad,//头部下载
    homeGame,
    serve1,
    serve2,
    serve3,
    serve4,
    hotMatch,//是否显示热门弹框
    isBb,//是否显示切换版本按钮
    isEncrypt,//是否加密
    skinListStore,//皮肤
    allLotteryGame,
    historyGame,
    chatShow,
    allYnCp,
    homeNewShow,
    homeNewData,
    msgPoint,
    userIp,//用户ip
    userGG,//网站维护提示文本
    defalutLan,
    lanCode,
    lanList,//多语言列表
    searchList,//搜索列表
    noticeData,//弹窗公告
	showSjb,//世界杯图标
  oftenName,//充值常用名字
  oftenCard,//充值常用卡号
  tygameUrl,//游戏网址
  showtyUrl,
  showiframeLoad,
  tyType//体育种类
}

export default state
