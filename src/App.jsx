import React, { Component } from "react";
import { Typography, Input, Layout, Button, Switch, Icon } from "antd";

import style from "./app.module.css";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const { Title } = Typography;
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header>
          <Title className={style.title} style={{ color: "#FFFFFF" }}>
            power proxy
          </Title>
        </Header>
        <Content className={style.content}>
          <div>
            <Search
              size="large"
              placeholder="输入关键词搜索"
              onSearch={value => console.log(value)}
              className={style.search}
              style={{ width: 300 }}
            />
            <div className={style.headerButtonDiv}>
              <Button
                type="primary"
                className={style.headerButton}
                size="large"
              >
                新增
              </Button>
              <Button
                type="primary"
                className={style.headerButton}
                size="large"
              >
                删除
              </Button>
              <Button
                type="primary"
                className={style.headerButton}
                size="large"
              >
                导入
              </Button>
              <Button
                type="primary"
                className={style.headerButton}
                size="large"
              >
                导出
              </Button>
            </div>

            <div className={style.headerRightDiv}>
              <Button size="large" type="link" style={{ paddingRight: 3 }}>
                开启编辑模式
              </Button>
              <Switch
                size="large"
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                defaultChecked
              />
            </div>
          </div>

          <Content>123</Content>
        </Content>
      </div>
    );
  }
}

export default App;
