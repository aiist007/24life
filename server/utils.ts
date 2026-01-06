
/**
 * Utility functions for time, location and solar terms.
 */

// 24 Solar Terms in Chinese
const SOLAR_TERMS = [
  "小寒", "大寒", "立春", "雨水", "惊蛰", "春分",
  "清明", "谷雨", "立夏", "小满", "芒种", "夏至",
  "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
  "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"
];

// Solar terms calculation offsets (base year 1900)
// This is a simplified version of the solar term algorithm
const TERM_INFO = [
  0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693,
  263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758
];

/**
 * Get the solar term of a specific date
 * @param date Date object
 * @returns string - Name of the solar term or the most recent one
 */
export function getSolarTerm(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Calculate the index of the solar term
  // There are two solar terms in each month
  const baseDate = new Date(1900, 0, 6, 2, 5); // Base: 1900-01-06 02:05 (Xiao Han)
  
  const getTermDate = (y: number, n: number) => {
    const ms = 31556925974.7 * (y - 1900) + TERM_INFO[n] * 60000;
    return new Date(baseDate.getTime() + ms);
  };

  // Find the current solar term
  // Check the two terms in the current month
  let termIndex = month * 2;
  let termDate1 = getTermDate(year, termIndex);
  let termDate2 = getTermDate(year, termIndex + 1);

  if (day >= termDate2.getDate() && month === termDate2.getMonth()) {
    return SOLAR_TERMS[termIndex + 1];
  } else if (day >= termDate1.getDate() && month === termDate1.getMonth()) {
    return SOLAR_TERMS[termIndex];
  } else {
    // Return the previous term
    const prevIndex = (termIndex - 1 + 24) % 24;
    return SOLAR_TERMS[prevIndex];
  }
}

/**
 * Format date to a readable Chinese string
 */
export function formatChineseDate(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const weekDays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  const dayOfWeek = weekDays[date.getDay()];
  return `${y}年${m}月${d}日 ${dayOfWeek}`;
}

/**
 * Check if the query is time-sensitive (related to food, recipes, what to eat, etc.)
 */
export function isTimeSensitive(query: string): boolean {
  const keywords = ["吃什么", "推荐", "菜谱", "食谱", "今天", "现在", "时令", "节气", "养生", "早餐", "午餐", "晚餐", "夜宵", "水果"];
  return keywords.some(k => query.includes(k));
}

/**
 * Simple location extractor from message
 */
export function extractLocation(message: string, defaultLocation: string = "北京"): string {
  const cities = ["北京", "上海", "广州", "深圳", "杭州", "南京", "成都", "重庆", "武汉", "西安", "长沙", "苏州", "天津", "郑州", "济南", "青岛", "大连", "沈阳", "昆明", "南宁", "海口", "拉萨", "乌鲁木齐", "呼和浩特", "银川", "西宁", "兰州", "哈尔滨", "长春", "石家庄", "太原", "合肥", "福州", "南昌", "贵阳", "台北", "香港", "澳门"];
  for (const city of cities) {
    if (message.includes(city)) return city;
  }
  return defaultLocation;
}
