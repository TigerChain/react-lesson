import React from 'react' ;
//通过import来引进样式
import styles from './style.css' ;

//定义登录组件
class Login extends React.Component{

  /**
   * 构造方法
   */
  constructor(props) {
    super(props);
    //状态 讲到这一节再 说，先这样使用
    this.state = {
      name:''
    };
  }

  render(){
    return (
      <div className={styles.root}>
        <h2>用户登录</h2>
         <form ref='addForm' action="#">
            <p>
                <label htmlFor="name">姓名:</label><input type="text" id="name" ref="name" placeholder="请输入用户名"/>
            </p>
            <p>
               <label htmlFor="pass"> 密码:</label><input type="password" id="pass" ref="pass" placeholder="请输入用户名"/>
            </p>

            <input type="submit" value="登录" onClick={this._login.bind(this)} className={styles.button}/>

            <input type="reset" value="清空" className={styles.button}/>
            <div>
                {this.state.name?"欢迎"+this.state.name+"登录！！！":null}
            </div>
         </form>

      </div>
    ) ;
  }

 //登录方法
  _login(){
      let name = this.refs.name.value; //取得用户名
      let pass = this.refs.pass.value ; //取得用户密码
      if(name.length==0 ||pass.length==0){
          alert('用户名或密码不能为空')
      }else{
        this.setState({
            name:name
        })
      }
  }
}

module.exports =  Login
