import React, { Component, PropTypes } from 'react';

import styles from '../css/ListStyle.css' ;

//导入微博列表组件
import WeiBoListItem from './WeiBoListItem.js'

//定义一个微博列表组件
export default class WeiBoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //遍历渲染每个条目
    var ItemView = this.props.data.map(function(item,index) {
      return <WeiBoListItem itemData= {item} key = {index}/>
    }) ;

    return(
      <div className={styles.listRootViewStyle}>
       {ItemView}
      </div>
    ) ;
}
}

WeiBoList.propTypes = {
};
