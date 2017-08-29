import React, { Component, PropTypes } from 'react';
// export default class CusImg extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div className={this.props.style}>
//         <img src={this.props.imgurl}/>
//         <text className={this.props.textStyle}>{this.props.text}</text>
//     </div>);
//   }
// }



const CusImg = (props)=>(
  <div className={props.style}>
    <img src={props.imgurl}/>
    <text className={props.textStyle}>{props.text}</text>
</div>
);
export default CusImg
