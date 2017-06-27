import React, { Component, PropTypes } from 'react';

// 导入头部组件
import PCHeader from './pc_header.js' ;
//导入主体内容组件
import PCMAIN from './pc_main.js' ;
//导入底部组件
import PCFooter from './pc_footer.js' ;

//首页 包含公共的头部和底部
export default class PCIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //取得 PCIndex中的子组件  下句就相当于 const children = this.props.children
    const {children} = this.props
    return (
      <div>
        <PCHeader />
        <PCMAIN maincontent={children}/>
        <PCFooter />
      </div>
    );
  }
}

PCIndex.propTypes = {
};
