import React, { Component } from "react";
import {
  Typography,
  Input,
  Layout,
  Button,
  Switch,
  Icon,
  Table,
  Badge
} from "antd";
import ProxyFormModal from "./components/ProxyFormModal/index";

import style from "./app.module.css";

const { Header, Content } = Layout;
const { Search } = Input;
const { Title } = Typography;

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "端口",
    dataIndex: "port",
    key: "port"
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "描述",
    dataIndex: "desc",
    key: "desc"
  }
];
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };
    this.editModeOnChange = this.editModeOnChange.bind(this);
    this.addBtnOnClick = this.addBtnOnClick.bind(this);
  }
  editModeOnChange(editMode) {
    this.setState({
      editMode
    });
  }

  addBtnOnClick() {
    this.refs.proxyFormModal.showModal();
  }

  render() {
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: selectedRowKeys => {
        this.setState({ selectedRowKeys });
      }
    };
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
                  onClick={this.addBtnOnClick}
                >
                  新增
                </Button>
                <Badge
                  className={style.contentHeaderButton}
                  count={
                    this.state.selectedRowKeys
                      ? this.state.selectedRowKeys.length
                      : 0
                  }
                >
                  <Button
                    disabled={
                      this.state.selectedRowKeys
                        ? this.state.selectedRowKeys.length === 0
                        : true
                    }
                    type="primary"
                    size="large"
                  >
                    删除
                  </Button>
                </Badge>

                <Button
                  type="primary"
                  className={style.contentHeaderButton}
                  size="large"
                >
                  导入
                </Button>
                <Badge
                  className={style.contentHeaderButton}
                  count={
                    this.state.selectedRowKeys
                      ? this.state.selectedRowKeys.length
                      : 0
                  }
                >
                  <Button type="primary" size="large">
                    导出
                  </Button>
                </Badge>
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
          <div className={style.contentView}>
            <Table
              expandedRowRender={record => <div>{JSON.stringify(record)}</div>}
              rowSelection={this.state.editMode ? rowSelection : null}
              dataSource={dataSource}
              columns={columns}
            />
          </div>
          <Content>
            <ProxyFormModal ref="proxyFormModal" />
          </Content>
        </Content>
      </div>
    );
  }
}

export default App;
