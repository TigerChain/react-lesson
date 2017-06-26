import React, { Component, PropTypes } from 'react';

import {
  Menu,
  Icon,
  Input,
  Dropdown,
  Button
} from 'antd';

import ReactSVG from 'react-svg'


// 头部组件
export default class PCHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current:'home',
      lanauage:'EN'
    }
  }

  // handleClick = (e) => {
  //   console.log('click ', e);
  //   this.setState({
  //     current: e.key,
  //   });
  // }


  render() {

    const menu = (
      <Menu>
        <Menu.Item key="1">0.9x</Menu.Item>
        <Menu.Item key="2">0.10x</Menu.Item>
        <Menu.Item key="3">0.11x</Menu.Item>
      </Menu>
    );
    return (
      <header className="header">
            <div className="headerLogo">
            <a href='/' className='logo'>
              <img
                src="./src/imgs/logo.png">
              </img>
              <span>ANT DESIGN</span>
            </a>
            <span className="shuxian">|</span>
            <Input placeholder="搜索组件..." style={{ width: 200 }} id="searchstyle"/>
            </div>

            <div className="navright">
              <Menu
                mode="horizontal"
                 selectedKeys={[this.state.current]}
                 onClick={this.handleClick.bind(this)}
              >
               <Menu.Item key="home" >
                 首页
               </Menu.Item>
               <Menu.Item key="zhiying" >
                 指引
               </Menu.Item>
               <Menu.Item key="component" >
                 组件
               </Menu.Item>
               <Menu.Item key="modal" >
                 模式
               </Menu.Item>
               <Menu.Item key="ziyuan" >
                 资源
               </Menu.Item>

             </Menu>

             <Dropdown overlay={menu}>
               <Button style={{ marginLeft: 8 }}>
                 2.11.0 <Icon type="down" />
               </Button>
             </Dropdown>
            <Button className="slectLangueButton" onClick={()=>{
              alert(this.state.lanauage=='EN')
              if(this.state.lanauage=='EN'){
                this.setState({
                  lanauage:'中文'
                })
              }else{
                this.setState({
                  lanauage:'EN'
                })
              }

            }}>{this.state.lanauage}</Button>
            </div>
      </header>
    );
  }

  handleClick(e){
    console.log('click ', e);
   this.setState({
     current: e.key,
   });
  }
}

PCHeader.propTypes = {
};
