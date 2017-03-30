import React, { Component, PropTypes } from 'react';

import styles from '../css/commentStyle.css';
import CommentReplyList from './CommentReplyList' ;


/**
 * 取得当前时间
 * @return {[type]} [description]
 */
function getCurrentFormatDate() {
    var date = new Date() ;
    var seperator1 = "-" ;
    var seperator2 = ":" ;
    var month = date.getMonth() + 1 ;
    var strDate = date.getDate() ;
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

/**
 * 评论组件
 */
export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      //默认回复内容为空
      replycontents:[],
    }
  }

  render() {
    //遍历评论内容
    var replyContentDatas = this.state.replycontents.map(function(data,index) {
     return(
        <CommentReplyList key={index} reply={data}/>
     );
   });

   return (
      <div className={styles.rootView}>
        <div className={styles.headView}>
          {/* 回复的头像 */}
            <img src={require('../img/qiche.jpg')} className={styles.img} />
          {/* 回复的文本框 */}
            <div className={styles.textareaViewStyle}>
              <textarea cols='4' rows='4' ref="content"/>
              <button className={styles.commentBtnStyle} onClick={this._reply.bind(this)}>评论</button>
            </div>
        </div>
        {/* 回复内容 */}
            {replyContentDatas}
      </div>
     );
  }

  /**
   * 回复评论功能
   */
  _reply(){
      //取得当前时间
      let currentTime = getCurrentFormatDate();
      //取得回复的内容
      let recontent = this.refs.content.value;
      if(recontent.length==0){
        alert('评论内容不能为空！')
        return ;
      }
      let newContent = {
        content:recontent,
        name:'军军',
        time:currentTime,
      }
      //取得老的回复内容
      let oldRepContent = this.state.replycontents,
      //新的回复内容和老的回复内容叠加起来
      newRplContent = oldRepContent.concat(newContent);//数组的叠加
      //
      this.setState({
          replycontents:newRplContent,
      });
      //轻空输入框内容
      this.refs.content.value = "";
  }
}
