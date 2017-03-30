import React, { Component, PropTypes } from 'react';

import styles from '../css/commentStyle.css';

/**
 * 评论列表组件
 */
export default class CommentReplyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 回复列表
      data:this.props.reply
    }
  }

  render() {

    let replyContent = this.state.data ;

    return (
      <div className={styles.commentListStyle}>
        <img src={require('../img/avtova.jpg')} className={styles.img} />
            <div className={styles.commentContentStyle}>
              <div className={styles.nickNameStyle}>
                <span>{replyContent.name}</span>
                <span>{replyContent.content}</span>
              </div>
              <span className={styles.timeSize}>{replyContent.time}</span>
            </div>
      </div>
    );
  }
}
