import React, { Component, PropTypes } from 'react';

import CommonHead from './commonhead.js' ;


//模拟数据
const datas = [
  {"name":"特性"},
  {"name":"支持环境"},
  {"name":"版本"},
  {"name":"示例"},
  {"name":"谁在使用"},
  {"name":"如何贡献"},
  {"name":"社区互助"}
];

export default class AntdofReact extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <article className="markdown">
          <CommonHead title="Ant Design of React"/>
          <section className="markdown">
            <p>这里是 Ant Design 的 React 实现，开发和服务于企业级后台产品。</p>
            <div className="pic-plus">
              <img src="https://t.alipayobjects.com/images/rmsweb/T11aVgXc4eXXXXXXXX.svg" width="150"></img>
              <span>+</span>
              <img src="https://t.alipayobjects.com/images/rmsweb/T16xRhXkxbXXXXXXXX.svg" width="160" ></img>
            </div>
          </section>

          {this._renderTocView()}

          <section className="markdown">
            <h2>
              <span>
                特性
              </span>
              <a href="#特性">#</a>
            </h2>
            <ul>
              <li className="liststyle">
                <p>
                  提炼自企业级中后台产品的交互语言和视觉风格。
                </p>
              </li>
              <li className="liststyle">
                <p>
                  开箱即用的高质量 React 组件。
                </p>
              </li>
              <li className="liststyle">
                <p>
                使用 TypeScript 构建，提供完整的类型定义文件。
                </p>
              </li>
              <li className="liststyle">
                <p>
                基于 npm + webpack + babel 的工作流，支持 ES2015 和 TypeScript。
                </p>
              </li>

            </ul>
          </section>

          <section className="markdown">
            <h2>
              <span>
                支持环境
              </span>
              <a href="#支持环境">#</a>
            </h2>
            <ul>
              <li className="liststyle">
                <p>
                现代浏览器和 IE9 及以上<a>（需要 polyfills）</a>。
                </p>
              </li>
              <li className="liststyle">
                <p>
                  支持服务端渲染。
                </p>
              </li>
              <li className="liststyle">
                <p>
                <a>Electron</a>
                </p>
              </li>

            </ul>
          </section>

          <section className="markdown">
            <h2>
              <span>
                开发版
              </span>
              <a href="#开发版本">#</a>
            </h2>
            <ul>
              <li className="liststyle">
                <p>
                稳定版：
                <a href="https://www.npmjs.org/package/antd">
                  <img src="https://img.shields.io/npm/v/antd.svg?style=flat-square" alt="npm package"></img>
                </a>
                </p>
              </li>
              <li className="liststyle">
                <p>
                  开发版：
                  <a href="https://www.npmjs.org/package/antd">
                    <img src="https://cnpmjs.org/badge/v/antd.svg?&tag=beta&subject=npm" alt="npm package"></img>
                  </a>
                </p>
              </li>
              <li >
                <p>
                你可以订阅：<a>https://github.com/ant-design/ant-design/releases.atom </a>来获得稳定版发布的通知。
                </p>
              </li>

            </ul>
          </section>

        </article>

      </div>
    );
  }

/**
 * 渲染 Toc View
 * @return {[type]} [description]
 */
  _renderTocView(){

    let liview = []
    for (var i = 0; i < datas.length; i++) {
      liview.push(
        <li key={i}>
          <a href={"#"+datas[i].name}>{datas[i].name}</a>
        </li>
      )
    }

    return(
      <section className="toc">
        <ul>
          {liview}
        </ul>
      </section>
    ) ;
  }
}

AntdofReact.propTypes = {
};
