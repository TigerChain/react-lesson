import React, { Component, PropTypes } from 'react';

// 尾部组件
export default class PCFooter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <footer id="footer">
      <ul>
        <li>
          <h2>
            <i className="anticon anticon-github">
            </i>
            <span>GitHub</span>
          </h2>
        <div>
          <a target="_blank" href="https://github.com/ant-design/ant-design">
            <span>源码仓库</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://ant.design/docs/react/customize-theme">
            <span>定制主题</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/websemantics/awesome-ant-design">
            <span>Awesome Ant Design</span>
          </a>
        </div>
        </li>

        <li>
          <h2>
            <i className="anticon anticon-link">
            </i>
            <span>相关站点</span>
          </h2>
          <div>
            <a href="https://design.alipay.com/">
              <span>蚂蚁金融设计平台</span>
            </a>
          </div>
          <div>
            <a href="http://mobile.ant.design">
              Ant Design Mobile
            </a>
              <span>-</span>
              <span> 移动版</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              Scaffolds
            </a>
              <span>-</span>
              <span> 脚手架市场</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              dva
            </a>
              <span>-</span>
              <span> 应用框架</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              dva-cli
            </a>
              <span>-</span>
              <span> 开发工具</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              Egg
            </a>
              <span>-</span>
              <span> 企业级 Node 开发框架</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              AntV
            </a>
              <span>-</span>
              <span> 数据可视化</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              Ant Motion
            </a>
              <span>-</span>
              <span> 设计动效</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              AntD Library
            </a>
              <span>-</span>
              <span> Axure 部件库</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              dva-cli
            </a>
              <span>-</span>
              <span>开发工具</span>
          </div>
          <div>
            <a href="http://scaffold.ant.design">
              Ant UX
            </a>
              <span>-</span>
              <span> 页面逻辑素材</span>
          </div>
        </li>

        <li>
          <h2>
            <i className="anticon anticon-customer-service">
            </i>
            <span>社区</span>
          </h2>
        <div>
          <a target="_blank" href="https://github.com/ant-design/ant-design">
            <span>更新记录</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://ant.design/docs/react/customize-theme">
            <span>常见问题</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/websemantics/awesome-ant-design">
            <span>在结讨论(中文)</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/websemantics/awesome-ant-design">
            <span>在结讨论(EngLish)</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/websemantics/awesome-ant-design">
            <span>报告 Bug</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/websemantics/awesome-ant-design">
            <span>讨论列表</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/websemantics/awesome-ant-design">
            <span>StackOverflow</span>
          </a>
        </div>
        <div>
          <a target="_blank" href="https://github.com/websemantics/awesome-ant-design">
            <span>SegmentFault</span>
          </a>
        </div>
        </li>

        <li>
          <h2>
            Copyright  &copy; 2017
          </h2>
          <div>
            <span>
              蚂蚁金服体验技术部出品 @ AFUX
            </span>
          </div>
          <div>
            Built with&nbsp;
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/benjycui/bisheng">BiSheng</a>
          </div>
        </li>
      </ul>

    </footer>
  );
  }
}

PCFooter.propTypes = {
};
