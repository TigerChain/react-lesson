import React, { Component, PropTypes } from 'react';

import CommonHead from './commonhead.js' ;

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
    return(
      <section className="toc">
        <ul>
          <li>
            <a href="#特性" title="特性">特性</a>
          </li>
          <li>
            <a href="#支持环境" title="支持环境">支持环境</a>
          </li>
          <li>
            <a href="#版本" title="版本">版本</a>
          </li>
          <li>
            <a href="#安装" title="安装">安装</a>
          </li>
          <li>
            <a href="#示例" title="示例">示例</a>
          </li>
          <li>
            <a href="#链接" title="链接">链接</a>
          </li>
          <li>
            <a href="#谁在使用" title="谁在使用">谁在使用</a>
          </li>
          <li>
            <a href="#如何贡献" title="如何贡献">如何贡献</a>
          </li>
          <li>
            <a href="#社区互助" title="社区互助">社区互助</a>
          </li>
        </ul>
      </section>
    ) ;
  }
}

AntdofReact.propTypes = {
};
