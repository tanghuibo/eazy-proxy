import React, { Component } from "react";
import { Form, Input, InputNumber } from "antd";


class ProxyForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 }
    };
    return (
      <Form layout="horizontal">
        <Form.Item label="名称" {...formItemLayout}>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入名称" }]
          })(<Input placeholder="名称" />)}
        </Form.Item>
        <Form.Item label="描述" {...formItemLayout}>
          {getFieldDecorator("desc", {})(<Input.TextArea placeholder="描述" />)}
        </Form.Item>
        <Form.Item label="端口号" {...formItemLayout}>
          {getFieldDecorator("port", {
            rules: [{ required: true, message: "请输入端口号" }]
          })(<InputNumber placeholder="端口号" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default Form.create({ name: "normal_login" })(ProxyForm);
