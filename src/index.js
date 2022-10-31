// 1. 使用 ES6 导入 jQuery
import $ from 'jquery'

// 引入 css 样式, 在 webpack 中一切皆模块, 都可以通过 ES6 的语法进行导入
import '@/css/index.css'
import '@/css/index.less'

// 导入图片并且使用当前图片
import ai from './images/ai.png'
$('.box').attr('src', ai);

// 2. 定义 jQuery 的入口函数
$(function () {
    // 3.实现奇偶行变色
    $('li:odd').css('background-color', 'red');
    $('li:even').css('background-color', 'green');
})

// 高级 js 语句的使用, 定义一个装饰器
function info(target) {
    target.info = 'Person Info';
}

// 定义一个普通的类, 并使用装饰器 info
@info
class Person { }

console.info(Person.info);