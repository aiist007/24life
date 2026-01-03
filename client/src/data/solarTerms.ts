// 2026年二十四节气养生数据
// 基于倪海厦中西医养生理论

export interface SolarTerm {
  id: number;
  name: string;
  pinyin: string;
  date: string;
  time: string;
  season: "春" | "夏" | "秋" | "冬";
  element: "木" | "火" | "土" | "金" | "水";
  organ: string;
  color: string;
  theme: string;
  description: string;
  foods: string[];
  foodColors: string;
  lifestyle: string;
  exercise: string;
  acupoint: string;
  sixSound: string;
  taboo: string;
  poem: string;
}

export const solarTerms2026: SolarTerm[] = [
  {
    id: 1,
    name: "小寒",
    pinyin: "Xiǎo Hán",
    date: "2026-01-05",
    time: "16:24",
    season: "冬",
    element: "水",
    organ: "肾",
    color: "#1a365d",
    theme: "补气补血、强肾固本",
    description: "小寒是一年中最寒冷的时节之一，此时阳气潜藏，阴气盛极。倪海厦强调冬季养肾，应早睡晚起，待日光而起，保持身体温暖，避免大汗淋漓。",
    foods: ["黑豆", "黑米", "紫菜", "核桃", "羊肉"],
    foodColors: "黑色食物为主，温补肾阳",
    lifestyle: "早睡晚起，泡手脚，保暖颈项腰部",
    exercise: "踮脚尖提肛，搓热腰部命门穴",
    acupoint: "涌泉穴、太溪穴",
    sixSound: "吹",
    taboo: "避免剧烈运动出大汗，忌食生冷",
    poem: "小寒连大吕，欢鹊垒新巢"
  },
  {
    id: 2,
    name: "大寒",
    pinyin: "Dà Hán",
    date: "2026-01-20",
    time: "09:46",
    season: "冬",
    element: "水",
    organ: "肾",
    color: "#1a365d",
    theme: "守阳避寒、静养蓄能",
    description: "大寒是二十四节气中最后一个节气，也是一年中最冷的时期。倪海厦认为此时应收敛神气，无欲无求，为来年春天的生发积蓄能量。",
    foods: ["红豆", "大葱", "马铃薯", "姜", "桂圆"],
    foodColors: "温热食物，补阳固本",
    lifestyle: "早晨温水润喉，固定运动，保持心情平和",
    exercise: "室内轻柔运动，八段锦",
    acupoint: "关元穴、气海穴",
    sixSound: "吹",
    taboo: "避免寒风侵袭，忌过度劳累",
    poem: "大寒须守火，无事莫出门"
  },
  {
    id: 3,
    name: "立春",
    pinyin: "Lì Chūn",
    date: "2026-02-04",
    time: "04:03",
    season: "春",
    element: "木",
    organ: "肝",
    color: "#276749",
    theme: "唤醒阳气、舒展肝气",
    description: "立春是二十四节气之首，标志着春天的开始。倪海厦在《黄帝内经》讲解中强调，春三月此谓发陈，天地俱生，万物以荣，应夜卧早起，广步于庭，披发缓形。",
    foods: ["韭菜", "葱", "香菜", "枸杞", "花生", "菠菜"],
    foodColors: "青色食物为主，疏肝理气",
    lifestyle: "夜卧早起，早起晒太阳，伸展腰背",
    exercise: "拍打肝胆经，深呼吸",
    acupoint: "太冲穴",
    sixSound: "嘘",
    taboo: "勿动怒，生而勿杀，予而勿夺",
    poem: "立春一日，百草回芽"
  },
  {
    id: 4,
    name: "雨水",
    pinyin: "Yǔ Shuǐ",
    date: "2026-02-18",
    time: "23:51",
    season: "春",
    element: "木",
    organ: "肝",
    color: "#276749",
    theme: "养脾祛湿、调气顺体",
    description: "雨水节气，降雨增多，湿气渐重。此时应注意健脾祛湿，保持室内干爽，适度活动促进气血流通。",
    foods: ["红枣", "山药", "百合", "藕", "薏仁"],
    foodColors: "健脾食物，祛湿养气",
    lifestyle: "保持空气干爽，适度活动",
    exercise: "昂头望月式导引",
    acupoint: "足三里、三阴交",
    sixSound: "嘘",
    taboo: "避免久坐湿地，忌过食生冷",
    poem: "好雨知时节，当春乃发生"
  },
  {
    id: 5,
    name: "惊蛰",
    pinyin: "Jīng Zhé",
    date: "2026-03-05",
    time: "21:58",
    season: "春",
    element: "木",
    organ: "肝",
    color: "#276749",
    theme: "提气防病、养肝护阳",
    description: "惊蛰时节，春雷始鸣，万物复苏。此时肝气升发，应注意疏肝理气，防止春困，多食绿色蔬菜助阳气生发。",
    foods: ["菠菜", "莲子", "蜂蜜", "芹菜", "韭菜"],
    foodColors: "绿色蔬菜，疏通肝气",
    lifestyle: "晨起深呼吸，出门防风",
    exercise: "伸展运动，疏通经络",
    acupoint: "太冲穴、期门穴",
    sixSound: "嘘",
    taboo: "避免情绪波动，忌过食酸味",
    poem: "微雨众卉新，一雷惊蛰始"
  },
  {
    id: 6,
    name: "春分",
    pinyin: "Chūn Fēn",
    date: "2026-03-20",
    time: "22:41",
    season: "春",
    element: "木",
    organ: "肝",
    color: "#276749",
    theme: "阴阳平衡、调神养气",
    description: "春分日，昼夜平分，阴阳相半。倪海厦强调此时应调和阴阳，保持情志舒畅，饮食均衡，作息规律。",
    foods: ["香菜", "绿豆芽", "豆腐", "春笋", "荠菜"],
    foodColors: "清淡食物，平衡阴阳",
    lifestyle: "午休，早睡早起，保持心情愉悦",
    exercise: "太极拳，调和阴阳",
    acupoint: "内关穴、神门穴",
    sixSound: "嘘",
    taboo: "避免过劳，忌大喜大悲",
    poem: "春分雨脚落声微，柳岸斜风带客归"
  },
  {
    id: 7,
    name: "清明",
    pinyin: "Qīng Míng",
    date: "2026-04-05",
    time: "02:35",
    season: "春",
    element: "木",
    organ: "肝",
    color: "#276749",
    theme: "祛湿解郁、防过敏",
    description: "清明时节，气温回升，雨水增多。此时肝气旺盛，应注意疏肝解郁，预防过敏，多进行户外活动。",
    foods: ["牛蒡", "姜", "葱", "芹菜", "艾草"],
    foodColors: "辛香食物，疏通肝气",
    lifestyle: "早晨微运动，避免生冷食物",
    exercise: "踏青散步，舒展身心",
    acupoint: "合谷穴、曲池穴",
    sixSound: "嘘",
    taboo: "避免久坐不动，忌过食肥甘",
    poem: "清明时节雨纷纷，路上行人欲断魂"
  },
  {
    id: 8,
    name: "谷雨",
    pinyin: "Gǔ Yǔ",
    date: "2026-04-20",
    time: "09:31",
    season: "春",
    element: "木",
    organ: "肝",
    color: "#276749",
    theme: "补气抗春困、强健脾胃",
    description: "谷雨是春季最后一个节气，雨生百谷。此时湿气较重，应注意健脾化湿，为夏季做好准备。",
    foods: ["香椿", "五谷", "山药", "茯苓", "扁豆"],
    foodColors: "健脾食物，化湿补气",
    lifestyle: "早起晒太阳，固定作息",
    exercise: "慢跑，促进新陈代谢",
    acupoint: "足三里、中脘穴",
    sixSound: "呼",
    taboo: "避免过食寒凉，忌熬夜",
    poem: "谷雨如丝复似尘，煮瓶浮蜡正尝新"
  },
  {
    id: 9,
    name: "立夏",
    pinyin: "Lì Xià",
    date: "2026-05-05",
    time: "19:41",
    season: "夏",
    element: "火",
    organ: "心",
    color: "#c53030",
    theme: "稳定情绪、养心健脾",
    description: "立夏标志着夏季开始，心气渐旺。倪海厦强调夏三月此谓蕃秀，天地气交，万物华实，应夜卧早起，无厌于日，使志无怒。",
    foods: ["番茄", "山楂", "红凤菜", "莲子", "红枣"],
    foodColors: "红色食物为主，养心安神",
    lifestyle: "午后小憩，饭后散步",
    exercise: "静坐调息，双手搓热捂眼",
    acupoint: "劳宫穴、内关穴",
    sixSound: "呵",
    taboo: "避免大怒，忌过食辛辣",
    poem: "四时天气促相催，一夜薰风带暑来"
  },
  {
    id: 10,
    name: "小满",
    pinyin: "Xiǎo Mǎn",
    date: "2026-05-21",
    time: "08:28",
    season: "夏",
    element: "火",
    organ: "心",
    color: "#c53030",
    theme: "清热祛湿、防中暑",
    description: "小满时节，气温升高，雨水增多，湿热交蒸。此时应注意清热祛湿，多喝温水，少食冰品。",
    foods: ["冬瓜", "黄瓜", "绿豆", "苦瓜", "丝瓜"],
    foodColors: "清热利湿食物",
    lifestyle: "多喝温水，少冰品，保持通风",
    exercise: "游泳，消暑健身",
    acupoint: "曲池穴、委中穴",
    sixSound: "呵",
    taboo: "避免贪凉，忌暴饮暴食",
    poem: "小满动三车，忙得不知他"
  },
  {
    id: 11,
    name: "芒种",
    pinyin: "Máng Zhòng",
    date: "2026-06-05",
    time: "23:40",
    season: "夏",
    element: "火",
    organ: "心",
    color: "#c53030",
    theme: "助眠调心、养气安神",
    description: "芒种时节，天气炎热，昼长夜短。此时应注意养心安神，保证充足睡眠，避免过度劳累。",
    foods: ["莲子", "芝麻", "牛奶", "百合", "酸枣仁"],
    foodColors: "养心安神食物",
    lifestyle: "午休20分钟，减少刺激饮食",
    exercise: "瑜伽，放松身心",
    acupoint: "神门穴、心俞穴",
    sixSound: "呵",
    taboo: "避免熬夜，忌过食辛辣",
    poem: "芒种看今日，螳螂应节生"
  },
  {
    id: 12,
    name: "夏至",
    pinyin: "Xià Zhì",
    date: "2026-06-21",
    time: "16:16",
    season: "夏",
    element: "火",
    organ: "心",
    color: "#c53030",
    theme: "养心降火、调气入眠",
    description: "夏至是一年中白昼最长的一天，阳气达到极盛。倪海厦强调此时应清心降火，多食苦味蔬菜，保持心情舒畅。",
    foods: ["荞麦", "茯苓", "黄瓜", "苦瓜", "莲子心"],
    foodColors: "苦味食物，清心降火",
    lifestyle: "清晨散步，心情舒畅，避免正午烈日",
    exercise: "晨练，避开高温时段",
    acupoint: "少府穴、通里穴",
    sixSound: "呵",
    taboo: "避免大汗淋漓，忌贪凉饮冷",
    poem: "夏至一阴生，稍稍夕漏迟"
  },
  {
    id: 13,
    name: "小暑",
    pinyin: "Xiǎo Shǔ",
    date: "2026-07-07",
    time: "09:50",
    season: "夏",
    element: "火",
    organ: "心",
    color: "#c53030",
    theme: "祛湿排毒、防倦怠",
    description: "小暑时节，天气炎热，湿气较重。此时应注意祛湿排毒，保持通风，适当出汗以排除体内湿气。",
    foods: ["薏仁", "鸭肉", "鱼腥草", "绿豆", "冬瓜"],
    foodColors: "清热利湿食物",
    lifestyle: "泡脚排湿，保持通风",
    exercise: "适度运动，微微出汗",
    acupoint: "阴陵泉、丰隆穴",
    sixSound: "呵",
    taboo: "避免久坐空调房，忌过食生冷",
    poem: "倏忽温风至，因循小暑来"
  },
  {
    id: 14,
    name: "大暑",
    pinyin: "Dà Shǔ",
    date: "2026-07-23",
    time: "03:07",
    season: "夏",
    element: "火",
    organ: "心",
    color: "#c53030",
    theme: "清心润肺、补气养阴",
    description: "大暑是一年中最热的时节，此时应注意防暑降温，同时养阴生津，为秋季做好准备。",
    foods: ["白木耳", "玉米", "哈密瓜", "西瓜", "绿豆汤"],
    foodColors: "清热生津食物",
    lifestyle: "午休，早晚温差保暖",
    exercise: "晨练或傍晚运动",
    acupoint: "太渊穴、鱼际穴",
    sixSound: "呬",
    taboo: "避免烈日暴晒，忌过度贪凉",
    poem: "大暑三秋近，林钟九夏移"
  },
  {
    id: 15,
    name: "立秋",
    pinyin: "Lì Qiū",
    date: "2026-08-07",
    time: "19:38",
    season: "秋",
    element: "金",
    organ: "肺",
    color: "#d69e2e",
    theme: "健脾润燥、平衡湿热",
    description: "立秋标志着秋季开始，但暑热未消。倪海厦强调秋三月此谓容平，天气以急，地气以明，应早卧早起，与鸡俱兴，使志安宁。",
    foods: ["莲藕", "龙眼", "金针花", "银耳", "梨"],
    foodColors: "白色食物为主，润肺养阴",
    lifestyle: "早晚保暖，泡脚助眠",
    exercise: "拍打肺经，深呼吸扩胸",
    acupoint: "太渊穴、鱼际穴",
    sixSound: "呬",
    taboo: "避免贪凉，忌过食辛辣",
    poem: "乳鸦啼散玉屏空，一枕新凉一扇风"
  },
  {
    id: 16,
    name: "处暑",
    pinyin: "Chǔ Shǔ",
    date: "2026-08-23",
    time: "10:16",
    season: "秋",
    element: "金",
    organ: "肺",
    color: "#d69e2e",
    theme: "清心润肺、防秋燥",
    description: "处暑意为暑气消退，天气转凉。此时应注意润肺防燥，多食滋阴润燥的食物。",
    foods: ["白木耳", "苹果", "蜂蜜", "梨", "百合"],
    foodColors: "润肺生津食物",
    lifestyle: "中午小憩，减少辛辣",
    exercise: "慢跑，增强肺活量",
    acupoint: "肺俞穴、膏肓穴",
    sixSound: "呬",
    taboo: "避免过食辛辣，忌熬夜",
    poem: "处暑无三日，新凉直万金"
  },
  {
    id: 17,
    name: "白露",
    pinyin: "Bái Lù",
    date: "2026-09-07",
    time: "22:41",
    season: "秋",
    element: "金",
    organ: "肺",
    color: "#d69e2e",
    theme: "润肺安神、防秋乏",
    description: "白露时节，天气转凉，露水增多。此时应注意保暖，润肺安神，预防秋乏。",
    foods: ["秋葵", "杏仁", "海带", "银耳", "蜂蜜"],
    foodColors: "润肺养阴食物",
    lifestyle: "保持睡眠，润肤保湿",
    exercise: "散步，呼吸新鲜空气",
    acupoint: "列缺穴、尺泽穴",
    sixSound: "呬",
    taboo: "避免露脚受寒，忌过食生冷",
    poem: "白露团甘子，清晨散马蹄"
  },
  {
    id: 18,
    name: "秋分",
    pinyin: "Qiū Fēn",
    date: "2026-09-23",
    time: "08:04",
    season: "秋",
    element: "金",
    organ: "肺",
    color: "#d69e2e",
    theme: "阴阳平衡、强身补气",
    description: "秋分日，昼夜平分，阴阳相半。此时应调和阴阳，收敛神气，保持情志平和。",
    foods: ["核桃", "蜂蜜", "乳品", "芝麻", "银耳"],
    foodColors: "滋阴润燥食物",
    lifestyle: "静坐冥想，泡脚助眠",
    exercise: "太极拳，调和阴阳",
    acupoint: "太渊穴、合谷穴",
    sixSound: "呬",
    taboo: "避免情绪波动，忌过食寒凉",
    poem: "金气秋分，风清露冷秋期半"
  },
  {
    id: 19,
    name: "寒露",
    pinyin: "Hán Lù",
    date: "2026-10-08",
    time: "14:31",
    season: "秋",
    element: "金",
    organ: "肺",
    color: "#d69e2e",
    theme: "润燥防寒、提高免疫",
    description: "寒露时节，气温下降明显，露水寒凉。此时应注意保暖，润燥防寒，增强免疫力。",
    foods: ["柿子", "银耳", "苹果", "梨", "蜂蜜"],
    foodColors: "润肺防燥食物",
    lifestyle: "多喝温水，规律运动",
    exercise: "慢跑，增强体质",
    acupoint: "足三里、肺俞穴",
    sixSound: "呬",
    taboo: "避免露脚受寒，忌过食辛辣",
    poem: "袅袅凉风动，凄凄寒露零"
  },
  {
    id: 20,
    name: "霜降",
    pinyin: "Shuāng Jiàng",
    date: "2026-10-23",
    time: "17:38",
    season: "秋",
    element: "金",
    organ: "肺",
    color: "#d69e2e",
    theme: "平补养阴、准备入冬",
    description: "霜降是秋季最后一个节气，天气渐冷，初霜出现。此时应平补养阴，为冬季做好准备。",
    foods: ["山药", "蜂蜜", "洋葱", "萝卜", "柿子"],
    foodColors: "平补养阴食物",
    lifestyle: "睡前泡脚，减冷饮",
    exercise: "室内运动，保持体温",
    acupoint: "关元穴、气海穴",
    sixSound: "呬",
    taboo: "避免受寒，忌过食生冷",
    poem: "霜降水返壑，风落木归山"
  },
  {
    id: 21,
    name: "立冬",
    pinyin: "Lì Dōng",
    date: "2026-11-07",
    time: "17:54",
    season: "冬",
    element: "水",
    organ: "肾",
    color: "#1a365d",
    theme: "补肾护阳、润燥养心",
    description: "立冬标志着冬季开始，万物收藏。倪海厦强调冬三月此谓闭藏，应早卧晚起，必待日光，保持身体温暖，不宜出大汗。",
    foods: ["黑木耳", "芝麻", "豆腐", "红肉", "羊肉"],
    foodColors: "黑色食物为主，温补肾阳",
    lifestyle: "早睡早起，暖足保腰",
    exercise: "踮脚尖提肛，搓热腰部",
    acupoint: "涌泉穴、太溪穴",
    sixSound: "吹",
    taboo: "避免大汗，忌食生冷",
    poem: "冻笔新诗懒写，寒炉美酒时温"
  },
  {
    id: 22,
    name: "小雪",
    pinyin: "Xiǎo Xuě",
    date: "2026-11-22",
    time: "15:24",
    season: "冬",
    element: "水",
    organ: "肾",
    color: "#1a365d",
    theme: "防寒固阳、温补气血",
    description: "小雪时节，天气寒冷，降雪开始。此时应注意防寒保暖，温补气血，增强抵抗力。",
    foods: ["黑芝麻", "核桃", "乌骨鸡", "羊肉", "桂圆"],
    foodColors: "温补食物，固阳养血",
    lifestyle: "泡脚10分钟，保暖颈项",
    exercise: "室内运动，八段锦",
    acupoint: "命门穴、肾俞穴",
    sixSound: "吹",
    taboo: "避免受寒，忌过度劳累",
    poem: "小雪晴沙不作泥，疏帘红日弄朝晖"
  },
  {
    id: 23,
    name: "大雪",
    pinyin: "Dà Xuě",
    date: "2026-12-07",
    time: "10:55",
    season: "冬",
    element: "水",
    organ: "肾",
    color: "#1a365d",
    theme: "进补养精、暖胃安神",
    description: "大雪时节，天气更冷，降雪增多。此时是进补的好时机，应温补肾阳，暖胃安神。",
    foods: ["羊肉", "山药", "姜", "葱", "枸杞"],
    foodColors: "温热食物，进补养精",
    lifestyle: "吃前先暖胃，适度运动",
    exercise: "室内太极，保持活力",
    acupoint: "关元穴、足三里",
    sixSound: "吹",
    taboo: "避免过度进补，忌食生冷",
    poem: "大雪压青松，青松挺且直"
  },
  {
    id: 24,
    name: "冬至",
    pinyin: "Dōng Zhì",
    date: "2026-12-22",
    time: "04:53",
    season: "冬",
    element: "水",
    organ: "肾",
    color: "#1a365d",
    theme: "滋阴补阳、开启新气",
    description: "冬至是一年中白昼最短的一天，阴极阳生。倪海厦强调此时一阳初生，应保护阳气，温补肾阳，为来年积蓄能量。",
    foods: ["汤圆", "桂圆", "酒酿", "羊肉", "饺子"],
    foodColors: "温补食物，滋阴补阳",
    lifestyle: "多晒太阳，与家人共餐",
    exercise: "轻柔运动，保存阳气",
    acupoint: "神阙穴、关元穴",
    sixSound: "吹",
    taboo: "避免剧烈运动，忌食生冷寒凉",
    poem: "冬至阳生春又来，口虽吟咏心中哀"
  }
];

// 五行对应关系
export const fiveElements = {
  wood: {
    name: "木",
    organ: "肝",
    season: "春",
    color: "#276749",
    taste: "酸",
    emotion: "怒",
    direction: "东",
    sound: "嘘"
  },
  fire: {
    name: "火",
    organ: "心",
    season: "夏",
    color: "#c53030",
    taste: "苦",
    emotion: "喜",
    direction: "南",
    sound: "呵"
  },
  earth: {
    name: "土",
    organ: "脾",
    season: "长夏",
    color: "#d69e2e",
    taste: "甘",
    emotion: "思",
    direction: "中",
    sound: "呼"
  },
  metal: {
    name: "金",
    organ: "肺",
    season: "秋",
    color: "#d69e2e",
    taste: "辛",
    emotion: "悲",
    direction: "西",
    sound: "呬"
  },
  water: {
    name: "水",
    organ: "肾",
    season: "冬",
    color: "#1a365d",
    taste: "咸",
    emotion: "恐",
    direction: "北",
    sound: "吹"
  }
};

// 健康标准（倪海厦六大健康标准）
export const healthStandards = [
  { title: "头凉足热", description: "头是纯阳的，脚要温热" },
  { title: "手足温热", description: "心脏动脉喷射到手上，小肠管脚" },
  { title: "食欲正常", description: "胃口好，消化良好" },
  { title: "睡眠安稳", description: "血归肝，魂归肝，人能够安睡" },
  { title: "二便规律", description: "大便通畅，小便正常" },
  { title: "精神饱满", description: "精气神充足" }
];

// 四季作息规律
export const seasonalSleep = {
  spring: { name: "春", pattern: "夜卧早起", description: "晚睡早起，顺应阳气生发" },
  summer: { name: "夏", pattern: "夜卧早起", description: "晚睡早起，适当午休" },
  autumn: { name: "秋", pattern: "早卧早起", description: "早睡早起，与鸡同步" },
  winter: { name: "冬", pattern: "早卧晚起", description: "早睡晚起，待日光而起" }
};

// 获取当前节气
export function getCurrentSolarTerm(): SolarTerm | null {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  
  for (let i = 0; i < solarTerms2026.length; i++) {
    const current = solarTerms2026[i];
    const next = solarTerms2026[i + 1];
    
    if (todayStr >= current.date && (!next || todayStr < next.date)) {
      return current;
    }
  }
  
  return solarTerms2026[0];
}

// 获取季节对应的背景图
export function getSeasonBackground(season: string): string {
  const backgrounds: Record<string, string> = {
    "春": "/images/hero-spring.png",
    "夏": "/images/hero-summer.png",
    "秋": "/images/hero-autumn.png",
    "冬": "/images/hero-winter.png"
  };
  return backgrounds[season] || backgrounds["春"];
}

// 获取季节对应的颜色类
export function getSeasonColorClass(season: string): string {
  const colors: Record<string, string> = {
    "春": "text-wood",
    "夏": "text-fire",
    "秋": "text-earth",
    "冬": "text-water"
  };
  return colors[season] || colors["春"];
}

// 获取季节对应的背景渐变类
export function getSeasonGradientClass(season: string): string {
  const gradients: Record<string, string> = {
    "春": "bg-spring-gradient",
    "夏": "bg-summer-gradient",
    "秋": "bg-autumn-gradient",
    "冬": "bg-winter-gradient"
  };
  return gradients[season] || gradients["春"];
}
