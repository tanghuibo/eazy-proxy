import React, { Component } from "react";
import { Typography, Input, Layout, Button, Switch, Icon } from "antd";

import style from "./app.module.css";

const { Header, Content } = Layout;
const { Search } = Input;
const { Title } = Typography;
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };
    this.editModeOnChange = this.editModeOnChange.bind(this);
  }
  editModeOnChange(editMode) {
    this.setState({
      editMode
    });
  }

  render() {
    return (
      <div className="App">
        <Header>
          <Title className={style.header}>
            <span className={style.headerTitle}>Power Proxy</span>
          </Title>
        </Header>
        <Content className={style.content}>
          <div className={style.contentHeader}>
            <Search
              size="large"
              placeholder="输入关键词搜索"
              onSearch={value => console.log(value)}
              className={style.search}
              style={{ width: 300 }}
            />
            {this.state.editMode ? (
              <div className={style.contentHeaderButtonDiv}>
                <Button
                  type="primary"
                  className={style.contentHeaderButton}
                  size="large"
                >
                  新增
                </Button>
                <Button
                  type="primary"
                  className={style.contentHeaderButton}
                  size="large"
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  className={style.contentHeaderButton}
                  size="large"
                >
                  导入
                </Button>
                <Button
                  type="primary"
                  className={style.contentHeaderButton}
                  size="large"
                >
                  导出
                </Button>
              </div>
            ) : null}

            <div className={style.contentHeaderRightDiv}>
              <Button
                size="large"
                type="link"
                onClick={() => this.editModeOnChange(!this.state.editMode)}
                style={{ paddingRight: 3 }}
              >
                {this.state.editMode ? "关闭编辑模式" : "开启编辑模式"}
              </Button>
              <Switch
                size="large"
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onChange={this.editModeOnChange}
                checked={this.state.editMode}
              />
            </div>
          </div>

          <Content></Content>
        </Content>
      </div>
    );
  }
}

export default App;
