/**
 * Created by Administrator on 2018/1/3.
 */
let Iint={
    //测试数据 注数计算测试
    conf:{
        ///////////////////////////ssc///////////////////////////////
        //五星
        1:"C-1",//直选复式
        2:"M-5",//组选120
        3:"M-1-3",//组选60
        4:"M-2-1",//组选30
        5:"M-1-2",//组选20
        6:"M-1-1",//组选10
        7:"M-1-1",//组选5
        8:"N", //一帆风顺
        9:"N",//好事成双
        10:"N",//三星报喜
        11:"N",//四季发财
        142:"X-1-5-15-35-70-126-210-330-495-715-996-1340-1745-2205-2710-3246-3795-4335-4840-5280-5631-5875-6000-6000-5875-5631-5280-4840-4335-3795-3246-2710-2205-1745-1340-996-715-495-330-210-126-70-35-15-5-1",//直选和值
        //四星
        12:"C-1",//直选复式
        13:"M-4",//组选24
        14:"M-1-2",//组选12
        15:"M-2",//组选6
        16:"M-1-1",//组选4
        //前三
        17:"C-1",//直选复式
        18:"X-1-3-6-10-15-21-28-36-45-55-63-69-73-75-75-73-69-63-55-45-36-28-21-15-10-6-3-1",//直选和值
        19:"X-10-54-96-126-144-150-144-126-96-54",//直选跨度
        20:"M-2|x2",//组三复式
        21:"M-3",//组六复式
        22:"N",//和值尾数
        23:"N",//特殊号
        //中三
        24:"C-1",//直选复式
        25:"X-1-3-6-10-15-21-28-36-45-55-63-69-73-75-75-73-69-63-55-45-36-28-21-15-10-6-3-1",//直选和值
        26:"X-10-54-96-126-144-150-144-126-96-54",//直选跨度
        27:"M-2|x2",//组三复式
        28:"M-3",//组六复式
        28:"N",//和值尾数
        30:"N",//特殊号
        //后三
        31:"C-1",//直选复式
        32:"X-1-3-6-10-15-21-28-36-45-55-63-69-73-75-75-73-69-63-55-45-36-28-21-15-10-6-3-1",//直选和值
        33:"X-10-54-96-126-144-150-144-126-96-54",//直选跨度
        34:"M-2|x2",//组三复式
        35:"M-3",//组六复式
        36:"N",//和值尾数
        37:"N",//特殊号
        //前二
        38:"C-1",//直选复式
        39:"X-1-2-3-4-5-6-7-8-9-10-9-8-7-6-5-4-3-2-1",//直选和值
        40:"X-10-18-16-14-12-10-8-6-4-2",//直选跨度
        41:"M-2",//组选复式
        42:"N|x9|onlyone ",//组选包胆
        143:"X-1-1-2-2-3-3-4-4-5-4-4-3-3-2-2-1-1",//组选和值
        //后二
        43:"C-1",//直选复式
        44:"X-1-2-3-4-5-6-7-8-9-10-9-8-7-6-5-4-3-2-1",//直选和值
        45:"X-10-18-16-14-12-10-8-6-4-2",//直选跨度
        46:"M-2",//组选复式
        47:"N|x9|onlyone ",//组选包胆
        144:"X-1-1-2-2-3-3-4-4-5-4-4-3-3-2-2-1-1",//组选和值
        //定位胆
        48:"N",//定位胆
        //不定位
        49:"N",//后三一码
        50:"N",//前三一码
        51:"M-2",//后三二码
        52:"M-2",//前三二码
        53:"N",//四星一码
        54:"M-2",//四星二码
        55:"M-2",//五星二码
        56:"M-3",//五星三码
        //大小单双
        57:"C-1",//前二
        58:"C-1",//后二
        59:"C-1",//前三
        59:"C-1",//后三
        //任选二
        60:"R-2",//直选复式
        61:"X-1-3-6-10-15-21-28-36-45-55-63-69-73-75-75-73-69-63-55-45-36-28-21-15-10-6-3-1|renxuan3",//直选和值
        62:"M-2|renxuan2",//组选复式
        //任选三
        63:"R-3",//直选复式
        64:"X-1-3-6-10-15-21-28-36-45-55-63-69-73-75-75-73-69-63-55-45-36-28-21-15-10-6-3-1|renxuan3",//直选和值
        65:"M-2|renxuan3",//组三复式
        66:"M-3|renxuan3",//组六复式
        //任选四
        67:"R-4",//直选复式
        68:"M-4|renxuan4",//组选24
        69:"M-1-2|renxuan4 ",//组选12
        70:"M-2|renxuan4",//组选6
        71:"M-1-1|renxuan4",//组选4
        //////////////////////////////////////////////////////////////////pk10
        //定位胆
        72:"N",//定位胆
        //前三
        73:"C-1|notrepeat|notips",//直选复式
        //前二
        74:"C-1|notrepeat|notips",//直选复式
        //前一
        75:"N",//直选复式
        //前四
        145:"C-1|notrepeat|notips",//直选复式
        //前五
        146:"C-1|notrepeat|notips",//直选复式
        //亚冠和
        147:"X-2-2-4-4-6-6-8-8-10-8-8-6-6-4-4-2-2",
        //龙虎
        148:"N",
        //大小单双
        149:"N",
        //
        150:"C-1|notrepeat|notips",

        //////////////////////////////////////////////////////////////////////////////必赢3D
        //三星
        76:"C-1",//直选复式
        77:"X-1-3-6-10-15-21-28-36-45-55-63-69-73-75-75-73-69-63-55-45-36-28-21-15-10-6-3-1",//直选和值
        78:"M-2|x2",//组三复式
        79:"M-3",//组六复式
        80:"X-1-2-2-4-5-6-8-10-11-13-14-14-15-15-14-14-13-11-10-8-6-5-4-2-2-1",//组选和值
        //二星
        81:"C-1",//(前二)直选复式
        82:"C-1",//(后二)直选复式
        83:"M-2",//(前二)组选复式
        84:"M-2",//(后二)组选复式
        //定位胆
        85:"N",//定位胆
        //不定位
        86:"N", //一码
        87:"M-2",//二码
        //大小单双
        88:"C-1",//前二
        89:"C-1",//后二
        ////////////////////////////////////////////////////////////////////////////快三
        //三同号
        90:"N",//单选
        91:"N",//通选
        //三不同号
        92:"M-3|most4",//标准
        //二同号
        93:"N",//复选
        //二不同号
        94:"M-2",//标准
        //和值
        95:"N",//大小单双
        96:"N",//和值3-18
        97:"N",//和值4-17
        98:"N",//和值5-16
        99:"N",//和值6-15
        100:"N",//和值7-14
        101:"N",//和值8-13
        102:"N",//和值9-12
        103:"N",//和值10-11

        ///////////////////////////////////////////////////////////////////////////////////快10
        //任选
        104:"M-1",//一中一
        105:"M-2",//二中二
        106:"M-3",//三中三
        107:"M-4",//四中四
        108:"M-5",//五中五
        //定位胆
        109:"N",//定位胆
        //大小单双
        110:"N",//大小单双
        //五行
        "111":"N",//五行
        //四季方位
        "112":"N",//四季方位
        ///////////////////////////////////////////////////////////////////////////////////////// 十一选五
        //三星
        113:"C-1|notrepeat|notips",//直选复式
        114:"M-3",//组选复式
        //二星
        115:"C-1|notrepeat|notips",//直选复式
        116:"M-2",//组选复式
        //不定位
        117:"N",//前三
        118:"N",//中三
        119:"N",//后三
        //定位胆
        120:"N",//定位胆
        150:"N",//定单双
        151:"N",//猜中位
        //任选复式
        121:"M-1",//一中一
        122:"M-2",//二中二
        123:"M-3",//三中三
        124:"M-4",//四中四
        125:"M-5",//五中五
        126:"M-6",//六中五
        127:"M-7",//七中五
        128:"M-8",//八中五
        //任选胆拖
        129:"M-1-1",//二中二
        130:"M-1-2",//三中三
        131:"M-1-3",///四中四
        132:"M-1-4",//五中五
        133:"M-1-5",//六中五
        134:"M-1-6",//七中五
        135:"M-1-7",//八中五
        ///////////////////////快乐8
        //趣味型
        136:"N",//和值
        //任选型
        137:"M-1|together",//任选一
        138:"M-2|together",//二中二
        139:"M-3|together",// 三中三
        140:"M-4|together",//四中四
        141:"M-5|together",//五中五

        //////////////////////////////////////////////////////////////////////////////////六合彩
        //特码
        200:'N',//六合彩特码直选
        201:'N',//六合彩特码生肖
        202:'N',//六合彩特码尾数
        203:'N',//六合彩特码色波
        204:'N',//六合彩特码大小单双
        //正码
        205:'N',//六合彩正码一直选
        206:'N',//六合彩正码二直选
        207:'N',//六合彩正码三直选
        208:'N',//六合彩正码四直选
        209:'N',//六合彩正码五直选
        210:'N',//六合彩正码六直选

        211:'N',//六合彩正码任选

        //正特一肖
        212:'N',//六合彩正特一肖
        //正特尾数
        213:'N',//六合彩正特尾数
        //连肖
        214:'S-2',//六合彩二连肖
        215:'S-3',//六合彩三连肖
        216:'S-4',//六合彩四连肖
        //连码
        217:'S-4',//六合彩连码四中二
        218:'S-4',//六合彩连码四中三
        219:'S-4',//六合彩连码四中四
        220:'S-2',//六合彩连码二中二
        221:'S-3',//六合彩连码三中二
        222:'S-3',//六合彩连码三中三
        //正特一码
        223:'N',//六合彩正特一码
        //正特和值大小单双
        224:'N',//正特和值大小单双

        //////////////////////////////////////////////////////////////////////////////////键盘输入时时彩
        160:"I-5",//五星直选单式
        161:"I-4",//四星直选单式
        162:"I-3",//三星直选单式
        163:"I-2",//二星直选单式
        164:"I-3|notTrepeat",//三星混合组选
        165:"I-2|notrepeat",//二星组选单式
        //////////////////////////////////////////////////////////////////////////////////键盘输入pk10
        166:"I-2",//猜前二直选单式
        167:"I-3",//猜前三直选单式
        168:"I-4",//猜前四直选单式
        169:"I-5",//猜前五直选单式
        //////////////////////////////////////////////////////////////////////////////////键盘输入11选5
        170:"I-3",//前三直选单式
        171:"I-3|notrepeat",//前三组选单式
        172:"I-2",//前二直选单式
        173:"I-2|notrepeat",//前二组选单式
        ///////////////////////////////////////////////////////////////////////幸运28（pc28）

    },
    play:{
        "ballData":[
            {
                "cid": "5578",
                "conf": "C-1|notrepeat|notips",
                "ctype": "前二",
                "fid": "81",
                "id": "181",
                "info_case": "投注方案：1 2<br>开奖号码：1 2*，即中精确前二。",
                "info_rule": "从各名次中选择1个不重复的号码组成一注，所选号码与当期名次全部一致，即为中奖。",
                "info_text": "从各名次中各选择1个不重复的号码组成一注。",
                "max_odds": "87",
                "min_odds": "75",
                "mode": "1",
                "name": "直选复式",
                "play_ball": "01|02|03|04|05|06|07|08|09|10",
                "play_fast": "a|l|s|o|e|c",
                "play_name": "冠军|亚军",
                "ptype": "前二",
                "rebate": "13",
                "sort": "0",
                "state": "1"
            }
        ],
        "navData":[
            {
                "id": 1,
                "fid": 1,
                "mode": 0,
                "name": "五星",
                "sort": 999,
                "stype": "五星直选|五星组选|五星特殊|五星其他"
            },
            {
                "id": 2,
                "fid": 1,
                "mode": 0,
                "name": "四星",
                "sort": 998,
                "stype": "四星直选|四星组选"
            },
            {
                "id": 3,
                "fid": 1,
                "mode": 0,
                "name": "后三",
                "sort": 997,
                "stype": "后三直选|后三组选|后三其它"
            },
            {
                "id": 4,
                "fid": 1,
                "mode": 0,
                "name": "中三",
                "sort": 996,
                "stype": "中三直选|中三组选|中三其它"
            },
            {
                "id": 5,
                "fid": 1,
                "mode": 0,
                "name": "前三",
                "sort": 995,
                "stype": "前三直选|前三组选|前三其它"
            },
            {
                "id": 6,
                "fid": 1,
                "mode": 0,
                "name": "后二",
                "sort": 994,
                "stype": "后二直选|后二组选"
            },
            {
                "id": 7,
                "fid": 1,
                "mode": 0,
                "name": "前二",
                "sort": 993,
                "stype": "前二直选|前二组选"
            },
            {
                "id": 8,
                "fid": 1,
                "mode": 0,
                "name": "定位胆",
                "sort": 0,
                "stype": "定位胆"
            },
            {
                "id": 9,
                "fid": 1,
                "mode": 0,
                "name": "不定位",
                "sort": 0,
                "stype": "三星|四星|五星"
            },
            {
                "id": 10,
                "fid": 1,
                "mode": 0,
                "name": "大小单双",
                "sort": 0,
                "stype": "大小单双"
            },
            {
                "id": 11,
                "fid": 1,
                "mode": 1,
                "name": "任选二",
                "sort": 0,
                "stype": "任二直选|任二组选"
            },
            {
                "id": 12,
                "fid": 1,
                "mode": 1,
                "name": "任选三",
                "sort": 0,
                "stype": "任三直选|任三组选"
            },
            {
                "id": 13,
                "fid": 1,
                "mode": 1,
                "name": "任选四",
                "sort": 0,
                "stype": "任四直选|任四组选"
            }
        ],
    },
    //获取菜单
    menu_type: function () {
        var obj = {
            //'hot': ['热门彩', ''],
            'e11': ['11选5', 'icon/11x5.png'],
            'ssc': ['时时彩', 'icon/ssc.png'],
            'k3': ['快三', 'icon/k3.png'],
            'Pk10': ['PK 10', 'icon/k3.png'],
            'Pc28': ['PC 28', 'icon/k3.png'],
            'lhc': ['六合彩', 'icon/k3.png'],
            'ggl': ['刮刮乐', 'icon/k3.png'],
            //'k10': ['快乐十分', 'icon/kl10.png'],
            //'fd': ['一般彩种', 'icon/3d.png'],
            //'klc': ['快乐彩', 'icon/luck.png'],
            //'pk10': ['幸运赛车', 'icon/pk10.png'],
            //'xyc': ['幸运彩', 'icon/luck28.png'],
        }
        return obj;
    },
    //最新开奖
    lastBall:[
        {
            period:"第14131541521期",
            ball:"2,5,5,9,6"
        },
        {
            period:"第14131541521期",
            ball:"2,5,5,9,6"
        },
        {
            period:"第14131541521期",
            ball:"2,5,5,9,6"
        }
    ]
    //我的投注
    //我的追号
}
export default Iint;
