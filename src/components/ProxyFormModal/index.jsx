import "codemirror/lib/codemirror.css";

// language js
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/eclipse.css";
import React, { Component } from "react";
import { Form, Input, InputNumber, Modal, Button, message } from "antd";
import style from "./index.module.css";
const CodeMirror = require("react-codemirror");

const ProxyForm = Form.create({ name: "normal_login" })(
  class extends Component {
    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      };
      return (
        <Modal
          maskClosable={false}
          onCancel={this.props.onCancel}
          width="40vw"
          visible={this.props.visible}
          title="创建"
          okText="确认"
          cancelText="取消"
          footer={this.props.footer}
        >
          <Form>
            <Form.Item label="名称" {...formItemLayout}>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "请输入名称" }]
              })(<Input placeholder="名称" />)}
            </Form.Item>
            <Form.Item label="描述" {...formItemLayout}>
              {getFieldDecorator(
                "desc",
                {}
              )(<Input.TextArea placeholder="描述" />)}
            </Form.Item>
            <Form.Item label="端口号" {...formItemLayout}>
              {getFieldDecorator("port", {
                rules: [{ required: true, message: "请输入端口号" }]
              })(<InputNumber placeholder="端口号" />)}
            </Form.Item>
            <Form.Item wrapperCol={{ span: 18, offset: 4 }}>
              {getFieldDecorator("code", {
                rules: [{ required: true, message: "请输入code" }]
              })(
                <CodeMirror
                  className={style.codeMirror}
                  options={{
                    tabSize: 4,
                    mode: "text/javascript",
                    theme: "eclipse",
                    lineNumbers: true,
                    lineWrapping: true,
                    line: true
                  }}
                />
              )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);

class ProxyFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      loading: false
    };

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  showModal() {
    this.setState({ visible: true });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleData(value) {
    console.log(value);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(1);
      }, 3000);
    });
  }

  handleOk() {
    const { form } = this.formRef.props;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      this.setState({ loading: true });
      try {
        await this.handleData(values);
        this.setState({
          visible: false
        });
        message.success("添加成功");
      } catch (error) {
        this.setState({
          loading: false
        });
        message.error("添加失败");
        throw error;
      }
    });
  }

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <ProxyForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              确认
            </Button>
          ]}
        />
      </div>
    );
  }
}

export default ProxyFormModal;
