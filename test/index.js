var fs = require('fs')
//测试新建字体

var fontCarrier = require('../lib/index.js')
var fontEngine = require('../lib/helper/engine')

var circle = fs.readFileSync('./test/svgs/circle.svg').toString()
var love = fs.readFileSync('./test/svgs/love.svg').toString()
var mail = fs.readFileSync('./test/svgs/mail.svg').toString()
var clock = fs.readFileSync('./test/svgs/clock.svg').toString()
var ttfFont = fs.readFileSync('./test/color-font.ttf')

// ttf 文件转换为其他格式
fontEngine.convert({
  input: ttfFont,
  inputTypes: 'ttf',
  path: './test/color-font-out',
  types: ['woff', 'woff2'],
})

//创建空白字体，使用svg生成字体
var font = fontCarrier.create()

font.setGlyph('爱',{
  svg:love,
  glyphName:'爱'
})

font.setGlyph('钟',{
  svg: clock,
  glyphName: '爱'
})

font.setSvg('&#xe600;',circle)
font.setSvg('&#xe601;',mail)
//console.log(font.toString())

font.output({
  path:'./test/font1'
})

console.log('由于需要读取转换2m的方正字体，所以会很慢。。。')

//测试从其他字体获取字形
var transFont = fontCarrier.transfer('./test/test.ttf')
var a = transFont.getGlyph('&#xFF0C;')

font.setGlyph('哈',a)

console.log('开始解析方正字体。。。')
var transFont2 = fontCarrier.transfer('./test/fz.ttf')
console.log('解析结束，实际使用中一般不会解析这么大的字体库。。。')

//测试对象set
var gs = transFont2.getGlyph('我是方正')
font.setGlyph(gs)

console.log('开始解析苹方字体。。。')
var transFont3 = fontCarrier.transfer('./test/PingFangSC.ttf')

//测试对象set
var gs3 = transFont3.getGlyph('人之初，性本善')
font.setGlyph(gs3)

font.output({
  path:'./test/font2'
})



//测试精简字体
transFont2.min('我是精简后的字体，我可以重复,我的x被覆盖了。')
transFont2.output({
  path:'./test/font3'
})

//直接output
transFont2.output()


//导出字形
//var g = font.getGlyph('我')
//g.toSvg('./test/export.svg')

var path = font.getSvg('我',{
  skipViewport:true
})
fs.writeFileSync('./test/export.svg',path)

var path2 = font.getSvg('爱',{
  skipViewport:true
})
fs.writeFileSync('./test/export2.svg',path2)
