/**
 * 一、let 和 const
 * let 和 const 都是声明变量的，和 var 类似，但是也有区别
 *
 * 使用 var 定义的变量，被修改之后，就会变成修改后的值了，我们看下面代码
 *
 * 
 */
var a = 100

while (true) {
  var a = 200 ;
  console.log("循环体中使用 var 再次声明 a = "+a);
  break ;
}

console.log("最后在方法之外打印 a = "+a);



console.log("==============================");

// 以上代码使用 let 修改


let b = 100

while (true) {
  let b = 200 ;
  console.log("循环体中使用 let 再次声明 b = "+b);
  break ;
}

console.log("最后在方法之外打印 b = "+b);
