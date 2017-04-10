import React, { Component, PropTypes } from 'react';

/**
 * 定义一个生命周期的组件
 */

export default class LifeCycle extends Component {

  constructor(props) {
    super(props);

    console.log("~~ Initial render ~~");
    console.log("~~ constructor ~~");

    alert("~~ Initial render ~~") ;
    alert("~~ constructor ~~") ;
    this.state = {
      name:'TigerChain'
    }
  }

  componentWillMount(){
    console.log("~~ componentWillMout ~~");

    alert("~~ componentWillMout ~~") ;
  }

  render() {
    console.log("~~ render ~~");
    alert("~~ render ~~") ;
    return (
      <div>
        LifeCycle Demo <p/>
        <button onClick={this._changeProps.bind(this)}>changeProps</button><p/>

        <button onClick={this._setState.bind(this)}>setState</button><p/>


        <button onClick={this._forceWithUpdate.bind(this)}>forceWithUpdate</button><p/>
        {this.state.name}
    </div>);
  }

  componentDidMount(){
    console.log("~~ componentDidMout ~~");
    alert("~~ componentDidMout ~~") ;
  }

  /**
   * 组件挂载之后 当调用 setState() 的时候  如果此方法返回 true ，则会重新渲染，否则不会
   */
  shouldComponentUpdate(nextProps, nextState){
      console.log("~~ shouldComponentUpdate ~~");
      console.log("shouldComponentUpdate nextState",nextState);
      alert("~~ shouldComponentUpdate ~~"+nextState) ;
      return true ;
  }

  componentWillUpdate(nextProps, nextState){
    console.log("componentWillUpdate nextState",nextState);
    console.log(this.state.name);
    console.log("~~ componentWillUpdate ~~");

    alert("~~ componentWillUpdate ~~") ;
  }


  componentDidUpdate(){
    console.log("~~ componentDidUpdate ~~");
    alert("~~ componentDidUpdate ~~") ;
  }

  componentWillUnmount(){
    console.log("~~ componentWillUnmount ~~");
    alert("~~ componentWillUnmount ~~") ;
  }

  _forceWithUpdate(){
    this.forceUpdate();
  }
  /**
   * 修改属性
   */
  _changeProps(){
    this.setState({
      name:'TigerChain1'
    })
  }

  _setState(){
    var that = this ;
    if((that.state.name === "TigerChain1") || (that.state.name="TigerChain")){
      that.setState({
        name:'TigerChainJun'
      });
    }
  }
}

LifeCycle.propTypes = {
};
