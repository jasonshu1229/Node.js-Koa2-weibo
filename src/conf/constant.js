/**
 * @description 常量集合
 */

module.exports = {
  DEFAULT_PICTURE:'https://raw.githubusercontent.com/jasonshu1229/PicGo-Images/master/img/20200325183745.png',
  PAGE_SIZE: 5,

  // 正则表达式，匹配 '@昵称 - userName
  // . 匹配任意字符  +： 匹配多个  ？：贪婪匹配。匹配完立马结束  \s 遇到空格 立马结束
  REG_FOR_AT_WHO: /@(.+?)\s-\s(\w+?)\b/g
} 