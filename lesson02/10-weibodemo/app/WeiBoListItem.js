import React, { Component, PropTypes } from 'react';

import styles from '../css/ListItemStyle.css' ;

/**
 * 微博评论列表组件
 */
export default class WeiBoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //是否点击评论按钮标志
      isComment:false,
      //默认的条目数据
      itemData:this.props.itemData,
      //默认的点赞数
      zanNum:this.props.itemData.NoCollect
    }
  }
  //渲染界面
  render() {

    let data = this.props.itemData ;


    return (
      <div>
          {this._renderHeadView(data)}

          <hr className={styles.hrStyle}/>

          {this._renderFooterView(data)}
          {/* {this.state.isComment?  <CommentForm />:null} */}
        </div>
     );
  }

  /**
   * 渲染顶部View
   */
  _renderHeadView(data){
    return(
      <div className={styles.item}>
        {/* <img src={require('../img/tiger.jpg')} className={styles.imgStyle}></img> */}
        <div className={styles.topRightView}>
          <div className={styles.nickNameAndSendTime}>
            <span>{data.nickName}</span>
            <span>{data.sendTime}</span>
          </div>

          <p>{data.content}</p>

          {/* {data.contentImgUrls?<CommentListImgs imgUrls={data.contentImgUrls}/>:null} */}
        </div>
      </div>
    )
  }

  /**
   * 渲染底部View
   */
   _renderFooterView(data){
       return(
         <div className={styles.commentViewStyle}>
           <ul className={styles.ulStyle}>
             <li className={styles.liStyle} >点赞:{this.state.zanNum}</li><div className={styles.shuxian}></div>
             <li className={styles.liStyle} >评论:{data.NoComment}</li><div className={styles.shuxian}></div>
             <li className={styles.liStyle} >转发:{data.NoPointGreat}</li>
           </ul>
         </div>
       );
   }
 }
