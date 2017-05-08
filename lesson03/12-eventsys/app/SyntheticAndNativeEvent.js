import React, { Component, PropTypes } from 'react';

/**
 * 合成事件和原生事件
 * @type {Object}
 */
export default class SyntheticAndNativeEvent extends Component {
  constructor(props){
   super(props);

   this.state = {
     show: false //图片默认不显示
   }

   this.handleClick = this.handleClick.bind(this)
   this.handleClickImage = this.handleClickImage.bind(this);
   this.handleClickImageContainer = this.handleClickImageContainer.bind(this);
 }

 handleClick(e){
   console.log('now in button handler')
  this.setState({
    show: true
  })
  e.stopPropagation();
 }

// 组件挂载
 componentDidMount(){
   //调用原生事件
   document.body.addEventListener('click', e=> {
     this.setState({
       show: false
     })
   })
 }

 // 组件将要卸载
 componentWillUnmount(){
   //一定要清除原生事件的注册  如果使用合成事件则不需要清除，系统帮你做了。
   document.body.removeEventListener('click');
 }

 handleClickImage(e){
   console.log(e.target)
   e.stopPropagation();
 }

 handleClickImageContainer(e){
   console.log('now in img container handler')
   e.stopPropagation();
 }

 render(){
   return (
     <div className="container">
       <button onClick={this.handleClick}>打开图片</button>
         <div className="img-container" style={{ display: this.state.show ? 'block': 'none'}} onClick={this.handleClickImageContainer}>
           <img src="http://blog.addthiscdn.com/wp-content/uploads/2014/11/addthis-react-flux-javascript-scaling.png" onClick={this.handleClickImage} />
         </div>
     </div>
   )
 }
}
