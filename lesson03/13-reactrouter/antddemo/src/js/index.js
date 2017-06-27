import React,{Component} from 'react' ;
import ReactDOM from 'react-dom' ;

// 这里我们使用 react-router 2.8.1
import {hashHistory,Router,Route,IndexRoute,Link} from 'react-router' ;

//引入 pc 主界面组件
import PCIndex from './component/pc_index.js' ;

import AntdofReact from './component/antdofreact.js' ;
// 引入快速上手组件
import QuickStart from './component/quick_start.js' ;
//引入项目实践组件
import ProjectPractice from './component/projectpractice.js' ;
//引入在 react 中使用组件
import UseInReact from './component/useinreact.js' ;

//引入自定义主题组件
import CustomTheme from './component/customtheme.js' ;
//引入更新日志组件
import UpDateLog from './component/updatelog.js' ;


class Main extends React.Component {
  render(){
    return(
      // 定义路由
      <Router  history={hashHistory}>
        <Route path="/" component={PCIndex}>
          <IndexRoute  component={AntdofReact}></IndexRoute>
          <Route path="react/getting-started-cn" component={QuickStart}></Route>
          <Route path="react/practical-projects-cn" component={ProjectPractice}></Route>
          <Route path="react/use-with-create-react-app-cn" component={UseInReact}></Route>
          <Route path="react/customize-theme-cn" component={CustomTheme}></Route>
          <Route path="react/changelog-cn" component={UpDateLog}></Route>
        </Route>
      </Router>

    ) ;
  }
}

ReactDOM.render(
  <Main />,document.getElementById('container')
) ;
