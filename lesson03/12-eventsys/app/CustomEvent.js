import React, { Component, PropTypes } from 'react';

/**
 * 自定义事件 调用原生事件
 */
export default class CustomEvent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    window.addEventListener("click", this._customAlert);
  }

  componentWillUnmount(){
    window.removeEventListener("click",this._customAlert) ;
  }
  render() {
    return (
      <div>
      <button>自定义事件</button>
    </div>);
  }

  _customAlert(e){
    alert("custom event") ;
  }
}
