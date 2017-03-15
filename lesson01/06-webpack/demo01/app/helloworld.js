module.exports = function insertContent(){
  var hello = document.createElement('div');
  hello.textContent = "Hello Webpack";
  return hello;
}
