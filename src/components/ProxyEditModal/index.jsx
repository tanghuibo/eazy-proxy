import React, { Component } from "react";
import { Modal } from "antd";
import ProxyForm from "../ProxyForm/index.jsx";



class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.onCancel = this.onCancel.bind(this);
  }
  showAdd() {
    this.setState({
      visible: true
    });
  }
  onCancel() {
    this.setState({
      visible: false
    });
  }
  render() {
    return (
      <Modal
        destroyOnClose={true}
        visible={this.state.visible}
        onCancel={this.onCancel}
        footer={null}
      >
        <ProxyForm></ProxyForm>
      </Modal>
    );
  }
}
export default EditModal;
