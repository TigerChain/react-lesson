import React, { Component, PropTypes } from 'react';

import styles from '../css/ListItemStyle.css' ;

//导入评论组件
import CommentForm from './CommentForm' ;

//导入图片组件
import CommentListImgs from './CommentListImgs.js' ;

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
          {/* 点击评论按钮 则展开评论组件，否则隐藏  新添加的方法*/}
          {this.state.isComment?  <CommentForm />:null}
        </div>
     );
  }

  /**
   * 渲染顶部View
   */
  _renderHeadView(data){
    return(
      <div className={styles.item}>
        <img src={require('../img/tiger.jpg')} className={styles.imgStyle}></img>
        <div className={styles.topRightView}>
          <div className={styles.nickNameAndSendTime}>
            <span>{data.nickName}</span>
            <span>{data.sendTime}</span>
          </div>

          <p>{data.content}</p>

          {data.contentImgUrls?<CommentListImgs imgUrls={data.contentImgUrls}/>:null}
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
             {/* 此处新增方法 */}
             <li className={styles.liStyle} onClick={this._dianzan.bind(this)}>点赞:{this.state.zanNum}</li><div className={styles.shuxian}></div>
             <li className={styles.liStyle} onClick={this._comment.bind(this)}>评论:{data.NoComment}</li><div className={styles.shuxian}></div>
             <li className={styles.liStyle} onClick={this._zhuanFa.bind(this)}>转发:{data.NoPointGreat}</li>
           </ul>
         </div>
       );
   }

   /**
    * 评论方法
    */
   _comment(){
       this.setState({
         isComment:true
       })
     }
     /**
      * 点赞方法
      */
     _dianzan(){
       this.setState({
         isComment:false,
         zanNum:parseInt(this.state.zanNum)+1,
       })
     }
      /**
       * 转发方法
       */
     _zhuanFa(){
       this.setState({
         isComment:false
       })
     }

 }
