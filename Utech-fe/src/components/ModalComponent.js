import {Component} from "react";
import * as antd from "antd";
import React from "react";
const { Modal} = antd;

class ModalComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.showModal();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                </Modal>
            </div>
        );
    }
}

export default ModalComponent;
