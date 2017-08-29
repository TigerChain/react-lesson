import React, { Component, PropTypes } from 'react';

import styles from '../css/app.css'
import CusImg from './cusimg'

export default class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className={styles.haha}>

         {/* {CusImg({
           style:styles.root ,
           textStyle:styles.textStyle,
           imgurl:require('../imgs/qcord.png'),
           text:"二维码"
         })} */}
        <CusImg
          style={styles.root}
          textStyle={styles.textStyle}
          imgurl={require('../imgs/qcord.png')}
          text="二维码" />

      </div>
  );
  }
}

App.propTypes = {
};
