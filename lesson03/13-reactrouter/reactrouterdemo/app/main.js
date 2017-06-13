
import React from 'react' ;
import ReactDOM from 'react-dom' ;


import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Link,
  Switch
} from 'react-router-dom';

/**
 * 定义 Home 组件
 * @type {String}
 */
class Home extends React.Component{
  render(){
    return(<div>
      Home
    </div>) ;
  }
}

/**
 * 定义 About 子页面组件
 * @type {String}
 */
class About extends React.Component{
  render(){
    return(
      <div>About</div>
    ) ;
  }
}

 class App extends React.Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><Link to="/home">首页</Link></li>
          <li><Link to="/about">关于我</Link></li>
          <li><Link to="/haha">haha</Link></li>
        </ul>
      </div>
    );
  }
}

// 在 react-router v4.0 中获取 接收参数使用 this.props.match.params.属性名字
class Haha extends React.Component{
  render(){
    return(
      <div>
      <h3> ID: {this.props.match.params.id}</h3>

      match.url:  {this.props.match.url}

      </div>
    ) ;

  }
}

// 无状态的组件
// const Haha = ({ match }) => (
//   <div>
//     <h3>ID: {match.params.id}</h3>
//   </div>
// )


ReactDOM.render((

        <Router>
            <Switch>
          <div>
            <Route path="/" component={App}/>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />

            <Route path="/:id" component={Haha}/>
          </div>
          </Switch>
        </Router>


), document.getElementById('container'));
