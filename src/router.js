
import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

const originalPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

// import {getToken} from './store/cookie'
import store from './store/index';

/************************************************ 路由引入 **************************************************/

//  const yhDetail=r => require.ensure([], () => r(require('./views/subpages/yhDetail.vue')), 'yhDetail');
import Home from './views/home.vue'
//首页
import wallet from './views/subpages/wallet.vue';
import newHome from './views/home/newHome.vue';
import plusHome from './views/home/plusHome.vue';

// 6-7
// const Home = () => import(/* webpackChunkName: 'ImportFuncDemo6' */ './views/home.vue');
const Live = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/live.vue');
//客服
const Service = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/service.vue');
const moreWt = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/moreWt.vue');
//优惠活动
const Activities = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/activity.vue');
//新版我的页面
const Mine = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/mine.vue');
 const yhDetail = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/subpages/yhDetail.vue');
 const ToGame = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/game/toGame.vue');
 const mgdz = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/home/mgdz.vue');

//登录
const Login = () => import(/* webpackChunkName: 'ImportFuncDemo6' */ './views/userViews/login.vue');




const Register = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/userViews/register.vue');
const RegisterDl = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/userViews/registerDl.vue');
// 用户协议
const userAgreement = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/toolViews/userAgreement.vue');
 // 登录确认
 const loginConfirm = () => import(/* webpackChunkName: 'ImportFuncDemo7' */ './views/userViews/loginConfirm.vue');


//影视更多
const videoMore = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/video/videoMore.vue');
//影视区播放页
const videoPlay = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/video/videoPlay.vue');
//影视搜索页面
const searchVideo = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/video/searchVideo.vue');
const myVideo = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/userViews/myVideo.vue');
const search = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/subpages/search.vue');
const xz = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/guessing/xz.vue');
//游戏&彩票选择
const lgLottery = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/game/gameSelect.vue');
const LotteryResults = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/guessing/LotteryResults.vue');
const gameplay = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/game/gameplay.vue');
const gameRule = () => import(/* webpackChunkName: 'ImportFuncDemo5' */ './views/guessing/gameRule.vue');

// 3-1
const vipRanking = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/vipRanking.vue');
const vipDetails = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/vipDetails.vue');
//会员礼包
const memberPackage = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/memberPackage.vue');
//忘记密码  手机找回密码
const FPwdTel = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/findPwd/FPwdTel.vue');
//更改个人资料
const UpdateInforNew = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/updateInforNew.vue');
//打赏记录
const ERecord = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/eRecord.vue');
const Feedback = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/feedback.vue');
//修改密码
const changePwd = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/changePwd/changePwd.vue');
//充值教程
const rechargeTtorial = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/rechargeTtorial/rechargeTtorial.vue');
const setting = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/setting.vue');
const setPayPwd = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/setPayPwd.vue');
const changePayPwd = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/changePayPwd.vue');
const messageCenter = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/messageCenter.vue');
//消息内容
const msgDetail = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/subpages/msgDetail.vue');
//皮肤设置
const themeSkin = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/themeSkin.vue');
//游戏报表
const gameReport = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/gameReport.vue');
const gameCount = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/subpages/gameCount.vue');
const gameCountDetail = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/subpages/gameCountDetail.vue');
//彩票游戏
const CPGame = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/subpages/CPGame.vue');
//彩票注单详情
const zdDetails = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/subpages/zdDetails.vue');


//团队统计
const team = () => import(/* webpackChunkName: 'ImportFuncDemo2' */ './views/subpages/team.vue');
//会员报表
const memberReport = () => import(/* webpackChunkName: 'ImportFuncDemo2' */ './views/subpages/memberReport.vue');
//邀请
const invite = () => import(/* webpackChunkName: 'ImportFuncDemo2' */ './views/subpages/invite.vue');
//下级报表
const nextReport = () => import(/* webpackChunkName: 'ImportFuncDemo2' */ './views/subpages/nextReport.vue');
//注册人数
const regMember = () => import(/* webpackChunkName: 'ImportFuncDemo2' */ './views/subpages/regMember.vue');
//邀请码
const inviteCode = () => import(/* webpackChunkName: 'ImportFuncDemo2' */ './views/subpages/inviteCode.vue');
//id搜索
const searchReport = () => import(/* webpackChunkName: 'ImportFuncDemo2' */ './views/subpages/searchReport.vue');



//充值页面
const recharge = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/rechargeNew.vue');
const tx = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/tx.vue');
 //usdt人工充值表单提交
 const addUsdt = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/usdt/addUsdt.vue');
 const usdtForm = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/usdt/usdtForm.vue');
//银行卡充值常用卡号
const bankCardList = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/bankTranfer/bankCardList.vue');
//添加银行卡充值常用卡号
const addBankCard = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/bankTranfer/addBankCard.vue');
// 银行卡充值
const cardRecharge = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/cardRecharge.vue');
// 添加银行卡
const addCard = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/addCard.vue');
// 银行卡列表
const cardList = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/userViews/cardList.vue');
// 访问限制
const fwxz = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/subpages/RO-visit.vue');
// 全站维护
const qzwh = () => import(/* webpackChunkName: 'ImportFuncDemo1' */ './views/subpages/QZmaintain.vue');





// headerType
// 1 首页  2.只有标题  3.标题+返回按钮  4.标题+返回按钮+日历
// 5、标题+返回按钮+搜索 6、直播间头部 7、没有头部
// 8、首页搜索 9、只有返回按钮 10、推广搜索 11标题+返回按钮+右边问号

//requireAuth  用户权限 是否登录
//requirePure 纯净版、
// requireVirtural 用户权限 是否试玩
//isClude 是否需要路由动画
const router = new vueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'plusHome',
            component: plusHome,
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '乐购',
                headerType:1
            },

        },
        {
            path: '/',
            name: 'plusHome',
            meta: {
                requireAuth: false,
                requirePure:true,
                requireVirtural:false,
                title: '乐购',
                headerType:1
            },
            redirect: '/',
        },
        {
            name: 'oldHome',
            path: '/oldHome',
            meta: {
                requireAuth: false,
                requirePure:true,
                requireVirtural:false,
                title: '乐购',
                headerType:8
            },
            component: Home
        },
        {
            name: 'plusHome',
            path: '/plusHome',
            meta: {
                requireAuth: false,
                requirePure:true,
                requireVirtural:false,
                title: '乐购',
                headerType:8
            },
            component: plusHome
        },
        {
            name: 'search',
            path: '/search',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:true,
                title: '搜索',
                headerType:8
            },
            component: search
        },
        
        {
            name: 'member',
            path: '/member',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '我的',
                headerType:2
            },
            component: Mine
        },
        {
            name: 'Activities',
            path: '/Activities',
            meta: {
                requireAuth: false,
                requireVirtural:false,
                requirePure:false,
                title: '优惠活动',
                headerType:3
            },
            component: Activities
        },
        {
            name: 'yhDetail',
            path: '/yhDetail',
            meta: {
                requireAuth: false,
                requireVirtural:false,
                requirePure:false,
                title: '优惠活动',
                headerType:3
            },
            component: yhDetail
        },
        
        {
            name: 'service',
            path: '/service',
            meta: {
                requireAuth: false,
                requireVirtural:false,
                requirePure:false,
                title: '客服',
                headerType:3
            },
            component: Service
        },
        {
            name: 'Live',
            path: '/Live',
            meta: {
                requireAuth: false,
                requireVirtural:false,
                requirePure:false,
                title: '直播',
                headerType:3
            },
            component: Live
        },
       
        {
            name: 'login',
            path: '/login',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '登录',
                headerType:7
            },
            component: Login
        },
        {
            name: 'register',
            path: '/register',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '注册',
                headerType:7
            },
            component: Register
        },
        {
            name: 'RegisterDl',
            path: '/RegisterDl',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '注册',
                headerType:7
            },
            component: RegisterDl
        },
       
        {
            name: 'fPwdTel',
            path: '/fPwdTel',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:true,
                title: '找回密码',
                headerType:7
            },
            component: FPwdTel
        },
        
        {
            name: 'vipRanking',
            path: '/vipRanking',
            meta: { 
                requireAuth: true,
                requirePure:false,
                 title: 'vip排行榜' ,
                 requireVirtural:true,
                 headerType:3
                },
            component: vipRanking
        },
        {
            name: 'vipDetails',
            path: '/vip',
            meta: { 
                requireAuth: true,
                requirePure:false,
                requireVirtural:false,
                 title: 'Đặc quyền VIP' ,
                 headerType:3
                },
            component: vipDetails
        },
        
        {
            name: 'UpdateInforNew',
            path: '/UpdateInforNew',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '修改资料',
                headerType:3
            },
            component: UpdateInforNew
        },
        {
            name: 'recharge',
            path: '/recharge',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '充值页面',
                headerType:3
            },
            component: recharge
        },
        {
            name: 'tx',
            path: '/tx',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '提现',
                headerType:3
            },
            component: tx
        },
        
        {
            name: 'rechargeTtorial',
            path: '/rechargeTtorial',
            meta: {
                requireAuth: false,
                requirePure: false,
                title: '充值教程',
            },
            component: rechargeTtorial
        },
        
        {
            name: 'cardRecharge',
            path: '/cardRecharge',
            meta: {
                requireAuth: true,
                requirePure:false,
                title: '银行卡充值',
                requireVirtural:true,
                headerType:3
            },
            component: cardRecharge
        },
        
        {
            name: 'loginConfirm',
            path: '/loginConfirm',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '登录确定',
                headerType:3
            },
            component: loginConfirm
        },
        {
            name: 'msgDetail',
            path: '/msgDetail',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '内容',
                headerType:3
            },
            component: msgDetail
        },
       
        {
            name: 'addCard',
            path: '/addCard',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '添加银行卡',
                headerType:3
            },
            component: addCard
        },
        {
            name: 'cardList',
            path: '/cardList',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '银行卡列表',
                headerType:3
            },
            component: cardList
        },
        {
            name: 'qzwh',
            path: '/qzwh',
            meta: {
                 requireAuth: false,
                requireVirtural:false,
                requirePure:true,
                title: '全站维护',
                headerType:3
            },
            component: qzwh
        },
        {
            name: 'fwxz',
            path: '/fwxz',
            meta: {
                 requireAuth: false,
                requireVirtural:false,
                requirePure:true,
                title: '访问限制',
                headerType:3
            },
            component: fwxz
        },
      
        {
            name: 'feedback',
            path: '/feedback',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '意见反馈',
                headerType:3
            },
            component: Feedback
        },
        {
            name: 'eRecord',
            path: '/eRecord',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '我的账单',
                headerType:3
            },
            component: ERecord
        },
      

        {
            name: 'changePwd',
            path: '/changePwd',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '修改密码',
                headerType:3
            },
            component: changePwd
        },

       
        {
            path: '*',
            name: 'Home',
            meta: {
                requireAuth: false,
                requireVirtural:false,
                requirePure:false,
                title: '404',
                headerType:7
            },
            component: plusHome
        },
        {
            name: 'setting',
            path: '/setting',
            meta: {
                requireAuth: true,
                requireVirtural:false,
                requirePure:false,
                title: '设置',
                headerType:3
            },
            component: setting
        },

        {
            name: 'setPayPwd',
            path: '/setPayPwd',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '支付密码设置',
                headerType:3
            },
            component: setPayPwd
        },
        {
            name: 'changePayPwd',
            path: '/changePayPwd',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '支付密码修改',
                headerType:3
            },
            component: changePayPwd
        },
       
        {
            name: 'messageCenter',
            path: '/messageCenter',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                title: '消息中心',
                requirePure:false,
                headerType:3
            },
            component: messageCenter
        }, 
        
        {
            name: 'userAgreement',
            path: '/userAgreement',
            meta: {
                requireAuth: false,
                requireVirtural:false,
                requirePure:false,
                title: '用户协议',
                headerType:3
            },
            component: userAgreement
        }, 

        {
            name: 'themeSkin',
            path: '/themeSkin',
            meta: {
                requireAuth: false,
                requireVirtural:false,
                requirePure:true,
                title: '主题皮肤',
                headerType:3
            },
            component: themeSkin
        },
        
        {
            name: 'gameReport',
            path: '/gameReport',
            meta: {
                requireAuth: true,
                title: 'Báo cáo trò chơi',
                active:'游戏报表',
                requireVirtural:true,
                requirePure:false,
                headerType:3
            },
            component: gameReport
        },
        {
            name: 'team',
            path: '/team',
            meta: {
                requireAuth: true,
                title: 'Thống kê đội', //团队统计
                requirePure:false,
                requireVirtural:true,
                headerType:5
            },
            component: team
        },
        {
            name: 'memberReport',
            path: '/memberReport',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: 'Báo cáo thành viên', //会员报表
                headerType:5
            },
            component: memberReport
        },
        {
            name: 'regMember',
            path: '/regMember',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                title: 'Số người đăng ký',
                titles:'注册人数',
                headerType:3
            },
            component: regMember
        },
        {
            name: 'nextReport',
            path: '/nextReport',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: 'Báo cáo phụ',  //下级报表
                headerType:5
            },
            component: nextReport
        },
        {
            name: 'invite',
            path: '/invite',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                title: 'Mời gọi',  //邀请
                headerType:3
            },
            component: invite
        },
        {
            name: 'inviteCode',
            path: '/inviteCode',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                title: '推广邀请',
                headerType:9
            },
            component: inviteCode
        },
        {
            name: 'searchReport',
            path: '/searchReport',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                title: '推广搜索',
                headerType:10
            },
            component: searchReport
        },
        {
            name: 'CPGame',
            path: '/CPGame',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                title: 'LG',
                headerType:4
            },
            component: CPGame
        },
       
        {
            name: 'gameCount',
            path: '/gameCount',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                title: 'Báo cáo trò chơi',
                headerType:4
            },
            component: gameCount
        },
        {
            name: 'gameCountDetail',
            path: '/gameCountDetail',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                title: 'Báo cáo trò chơi',
                headerType:4
            },
            component: gameCountDetail
        },
        
       
        {
            name: 'zdDetails',
            path: '/zdDetails/:id/:type',
            meta: {
                requireAuth: true,
                requireVirtural:true,
                requirePure:false,
                name: '注单详情',
                title:'Chi tiết đặt cược',
                headerType:4
            },
            component: zdDetails
        },
        
       
        {
            name: 'videoPlay',
            path: '/videoPlay/:id',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '',
                headerType: 9
            },
            component: videoPlay
        },
        
       
        {
            name: 'videoMore',
            path: '/videoMore/:typeId/:cid',
            meta: {
                requireAuth: true,
                requirePure:false,
                title: '更多视频',
                requireVirtural:true,
                headerType:11
            },  
            component: videoMore
        },
        {
            name: 'searchVideo',
            path: '/searchVideo',
            meta: {
                requireAuth: true,
                requireVirtural:false,
                requirePure:true,
                title: '',
                headerType:11
            },
            component: searchVideo
        },
       
    
      
        {
            name: 'xz',
            path: '/xz/:id',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '',
                headerType:11
            },
            component: xz
        }, 
        {
            name: 'gameRule',
            path: '/gameRule/:id',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '',
                headerType:11
            },
            component: gameRule
        }, 
        {
            name: 'LotteryResults',
            path: '/LotteryResults',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:false,
                title: '',
                headerType:11
            },
            component: LotteryResults
        },
      
        {
            name: 'wallet',
            path: '/wallet',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '',
                headerType:11
            },
            component: wallet
        },
        {
            name: 'toGame',
            path: '/toGame/:type/:id/:code',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '',
                headerType:11
            },
            component: ToGame
        },
       
        {
            name: 'bankCardList',
            path: '/bankCardList',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '',
                headerType:12
            },
            component: bankCardList

        },
        {
            name: 'myVideo',
            path: '/myVideo',
            meta: {
                requireAuth: true,
                requirePure:false,
                title: '我的观影',
                requireVirtural:true,
                headerType:12
            },
            component: myVideo

        },
        {
            name: 'addBankCard',
            path: '/addBankCard',
            meta: {
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                title: '',
                headerType:12
            },
            component: addBankCard

        },
       
        
        {
            name: 'memberPackage',
            path: '/memberPackage',
            meta: { 
                requireAuth: true,
                requirePure:false,
                requireVirtural:true,
                //  title: 'VIP详情页' ,
                 title: 'Quà hội viên' ,
                 
                 headerType:3
                },
            component: memberPackage
        },
       
        {
            name: 'addUsdt',
            path: '/addUsdt',
            meta: {
                 requireAuth: true,
                requirePure:false,
                title: 'Địa chỉ thường dùng',
                requireVirtural:true,
                headerType:3
             }, 
            component: addUsdt
        },
        {
            name: 'usdtForm',
            path: '/usdtForm',
            meta: {
                 requireAuth: true,
                requirePure:false,
                title: 'Địa chỉ thường dùng',
                requireVirtural:true,
                headerType:3
             }, 
            component: usdtForm
        },
        
       
        {
            name: 'mgdz',
            path: '/mgdz',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:true,
                title: 'MG',
                headerType:3
            },
            component: mgdz
        },
        {
            name: 'lgLottery',
            path: '/lgLottery',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:true,
                title: '乐购彩票',
                headerType:3
            },
            component: lgLottery
        },
        {
            name: 'moreWt',
            path: '/moreWt',
            meta: {
                requireAuth: false,
                requirePure:false,
                requireVirtural:true,
                title: '常见问题',
                headerType:3
            },
            component: moreWt
        },
       
        
        {
            name: 'gameplay',
            path: '/gameplay',
            meta: {
                requireAuth: true,
                requireVirtural: true,
                title: '选择玩法',
                requirePure: false,
                headerType: 3
            },
            component: gameplay
        },

    ]
})
function bodyScroll(event){
    event.preventDefault();
}
router.beforeEach((to, from, next) => {
    console.log(to.name)
    if(to.name=='oldHome'||to.name=='toGame'){
        document.body.removeEventListener('touchmove',bodyScroll,false);
    }else{
        document.body.addEventListener("touchmove", bodyScroll,false);
    }
       let token = store.state.codeToken;
    // requireAuth 耦控制是否可以登录就进入  是否是试玩
    if (to.meta.requireAuth) {
        //是否登录
        if (token) {
            // requireVirtural
            if (to.meta.requireVirtural&&store.state.userinfo.user_id<0) {
                if(store.state.lanCode==1){
                    Vue.prototype.$swBox({
                        title: "Nhắc nhở",
                        content: "Hiện nay hệ thống chỉ mở chơi thử trò chơi sổ xố, nếu có yêu cầu khác mời quý khách đăng nhập tài khoản chính thức",
                        leftBtn: "Đăng nhập",
                        rightBtn:'Đăng ký',
                        clickL: () => {
                            store.commit('SETUSERTOKEN') ;
                            router.push('/login');
                        },
                        clickR: () => {
                            store.commit('SETUSERTOKEN') ;
                            if(Vue.prototype.noticeType==1){
                                
                                router.push('/register');
                                
                            }else{
                                router.push('/RegisterDl');
                                
                            }
                           
                        }
                    });
                }else  if(store.state.lanCode==2||store.state.lanCode==5){
                    Vue.prototype.$swBox({
                        title: "Title",
                        content: "The current system is only open for trial lottery games, if you have other needs, please log in to the official account",
                        leftBtn: "Login",
                        rightBtn:'Register',
                        clickL: () => {
                            store.commit('SETUSERTOKEN') ;
                            router.push('/login');
                        },
                        clickR: () => {
                            store.commit('SETUSERTOKEN') ;
                            if(Vue.prototype.noticeType==1){
                                
                                router.push('/register');
                                
                            }else{
                                router.push('/RegisterDl');
                                
                            }
                           
                        }
                    });
                }
               
               
                return;
            } else {
                next();
            }
          


        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }

    } else {
        if (token) {
            if (to.name=='login'||to.name=='register'||to.name=='RegisterDl'||to.name=='fPwdTel'||to.name=='userAgreement'||to.name=='userAgreement2') {
                next({
                    path: '/',
                    query: {
                        redirect: to.fullPath
                    }
                })
            } else {
                next();
            }
        }else{
            next();
        }


       
    }

});

router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    if (isChunkLoadFailed) {
        // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
        location.reload();
        // const targetPath = $router.history.pending.fullPath;
        // $router.replace(targetPath);
    }
});

export default router;

