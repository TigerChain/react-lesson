import React, { Component, PropTypes } from 'react';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

import {Link} from 'react-router' ;

const MenuItemGroup = Menu.ItemGroup;

export default class PCMain extends Component {
  constructor(props) {
    super(props);
  }


  render() {
     const children = this.props.maincontent;
    return (
       <main className="main">

         <div className="menu">
             <Menu mode="inline"
               style={{width: "240px"}}
               defaultOpenKeys={['sub1']}
                >
               <Menu.Item key="1"> <Link to="/">Ant Design of React</Link></Menu.Item>
               <Menu.Item key="2"> <Link to="/react/getting-started-cn"> 快速上手</Link></Menu.Item>
               <Menu.Item key="3"> <Link to="/react/practical-projects-cn">项目实践</Link></Menu.Item>
               <Menu.Item key="4"> <Link to="/react/use-with-create-react-app-cn">在 create-react-app 中使用</Link></Menu.Item>
               <Menu.Item key="5"> <Link to="/react/customize-theme-cn">定制主题</Link></Menu.Item>

               <Menu.Item key="6"> <Link to="/react/changelog-cn">更新日志</Link></Menu.Item>
               <Menu.Item key="7">社区精选组件</Menu.Item>
               <Menu.Item key="8">国际化</Menu.Item>
               <SubMenu key="sub1" title={<span><span> Components </span></span>}>
                 <MenuItemGroup key="g1" title="General">
                   <Menu.Item key="9">Button 按钮</Menu.Item>
                   <Menu.Item key="10">Icon 图标</Menu.Item>
                 </MenuItemGroup>
                 <MenuItemGroup key="g2" title="Layout">
                   <Menu.Item key="11">Giid 栅格</Menu.Item>
                   <Menu.Item key="12">Layout 布局</Menu.Item>
                 </MenuItemGroup>

                 <MenuItemGroup key="g3" title="Affix 固钉">
                   <Menu.Item key="13">Breadcrumb 面包屑</Menu.Item>
                   <Menu.Item key="14">BackTop 回到顶部</Menu.Item>
                   <Menu.Item key="15">Dropdown 下拉菜单</Menu.Item>
                   <Menu.Item key="16">Menu 导航菜单</Menu.Item>
                   <Menu.Item key="17">Pagination 分页</Menu.Item>
                   <Menu.Item key="18">Steps 步骤条</Menu.Item>
                   <Menu.Item key="11">Tabs 标签页</Menu.Item>
                 </MenuItemGroup>
                 <MenuItemGroup key="g4" title="Data Entry">
                   <Menu.Item key="19">AutoComplete 自动完成</Menu.Item>
                   <Menu.Item key="20">Cascader 级联选择</Menu.Item>
                   <Menu.Item key="21">Checkbox 多选框</Menu.Item>
                   <Menu.Item key="22">DatePicker 日期选择框</Menu.Item>
                   <Menu.Item key="23">Form 表单</Menu.Item>
                   <Menu.Item key="24">InputNumber 数字输入框</Menu.Item>
                   <Menu.Item key="25">Input 输入框</Menu.Item>
                 </MenuItemGroup>
               </SubMenu>
             </Menu>
           </div>

           <div className="content">
             {children}

           </div>

    </main>);
  }
}

PCMain.propTypes = {
};
