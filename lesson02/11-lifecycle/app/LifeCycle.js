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
  /**
   * 在挂载之前调用
   */
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

        <button onClick={this._unmout.bind(this)}>unmout</button><p/>

        <button onClick={this.koukou.bind(this)}>parentChangeProps</button> <p/>

    </div>);
  }
  /**
   * 测试 ComponentWillReceiveProps 方法
   */
  koukou(){
    this.props.testComponentWillReceiveProps() ;
  }

  /**
   * 在挂载之后调用
   */
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

  /**
   * props 改变的时候调用
   */
  componentWillReceiveProps(nextProps){
    console.log("~~ componentWillReceiveProps ~~");
    alert("~~ componentWillReceiveProps ~~") ;
  }
  /**
   * shouldComponentUpdate 返回 true 的时候 将要更新
   */
  componentWillUpdate(nextProps, nextState){
    console.log("componentWillUpdate nextState",nextState);
    console.log(this.state.name);
    console.log("~~ componentWillUpdate ~~");

    alert("~~ componentWillUpdate ~~") ;
  }

  /**
   * 组件已经更新
   */
  componentDidUpdate(){
    console.log("~~ componentDidUpdate ~~");
    alert("~~ componentDidUpdate ~~") ;
  }

  /**
   * 组件将要卸载
   */
  componentWillUnmount(){
    console.log("~~ componentWillUnmount ~~");
    alert("~~ componentWillUnmount ~~") ;
  }

  /**
   * 组件卸载的方法
   */
  _unmout(){
    this.props.umout();
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

  /**
   * 修改 state 方法
   */
  _setState(){
    var that = this ;
    if((that.state.name === "TigerChain1") || (that.state.name="TigerChain")){
      that.setState({
        name:'TigerChainJun'
      });
    }
  }
}
