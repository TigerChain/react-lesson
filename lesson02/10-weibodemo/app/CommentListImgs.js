import React, { Component, PropTypes } from 'react';

/**
 * 导入图片样式
 */
import styles from '../css/commentImgsStyle.css' ;
/**
 * 微博列表中的图片 无状态的组件
 */
export default class CommentListImgs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // 遍历图片并显示
    var imgs = this.props.imgUrls.map(function(imgurl,index) {
    return(<li key={index} className={styles.liStyle}><img src={require('../img/avtova.jpg')} className={styles.imgStyle}></img></li>);
   });
  return(
    <ul className={styles.ulstyle}>
      {imgs}
    </ul>
  ) ;
 }
}
