import React,{Component} from 'react' ;
import ReactDOM from 'react-dom' ;
import {hashHistory,Router,Route,IndexRoute,Link} from 'react-router' ;

import PCIndex from './component/pc_index.js' ;

import AntdofReact from './component/antdofreact.js' ;
import QuickStart from './component/quick_start.js' ;
import ProjectPractice from './component/projectpractice.js' ;
import UseInReact from './component/useinreact.js' ;
import CustomTheme from './component/customtheme.js' ;
import UpDateLog from './component/updatelog.js' ;


class Main extends React.Component {
  render(){
    return(
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
