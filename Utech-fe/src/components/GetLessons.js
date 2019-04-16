import {Component} from "react";
import {getLessons, getLessonsByDomain} from "../util/APIUtils";
import {Button, DatePicker, Form, Input, notification} from "antd";
import FormItem from "./AddLessonForm";
import React from "react";
import * as antd from "antd";
import Categories from "./Categories";
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";
import ModalComponent from "./ModalComponent";
import Modal from "antd/es/modal";
import AddLessonRequest from "./AddLessonRequest";
import * as APIUtils from "../util/APIUtils";
import TimePicker from "antd/es/time-picker";
import Collapse from "antd/es/collapse";

const Panel = Collapse.Panel;

const { Card, Icon, Avatar } = antd;

const { Meta } = Card;


class GetLessons extends Component{

    constructor(props){
        super(props);
        this.state = {
            lessons: [],
            visible: false,
            lessonId: 0,
            time: new Date(),
            date: new Date()
        }
    }

    onChangeDate = (date, dateString)=> {
        this.setState({
            date: new Date(date),
        });
        console.log(this.state.date);
    }

    onChangeTime = (time, timeString) =>{
        this.setState({
            time: new Date(time),
        });
        console.log(this.state.time);
    }

    componentWillMount() {
        getLessonsByDomain(this.props.domain)
            .then(response => {
                this.setState({
                    lessons : response
                });
            });
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

    handleSubmit(lesson) {

        var scheduled = new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate(),
            this.state.time.getHours(), this.state.time.getMinutes(), this.state.time.getSeconds());

        console.log(scheduled);

        const addLessonRequest = {
            lessonId: lesson,
            date: new Date(scheduled)
        };
        APIUtils.addLessonRequest(addLessonRequest)
            .then(response => {
                notification.success({
                    message: 'UTech',
                    description: "Thank you! Your lesson request was succesfully saved",
                });
            }).catch(error => {
            notification.error({
                message: 'UTech',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        })

        this.handleCancel();
    }

    callback(key) {
        console.log(key);
    }

    render() {
        const self = this;
        return (
            <div>
                <Layout>
                    <ul>

                        {this.state.lessons.map(function(lesson, index){

                        return(
                            <div style={{margin:30}}>
                                <Card
                                    style={{width: 300}}
                                    cover={<img alt="example"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyHi43XgiMlHnEBjLSAolNuLV4_V2EIdieYapr3rmsxEQ6Dz-VA"/>}
                                    actions={[<a onClick={self.showModal}> <Icon type="check"/></a>, <Icon type="edit"/>, <Icon type="heart" />]}
                                >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={lesson.name}
                                    description={lesson.description}
                                    />

                                    <Modal
                                        title={lesson.name}
                                        visible={self.state.visible}
                                        onOk={self.handleOk}
                                        onApply={self.handleOk}
                                        onCancel={self.handleCancel}
                                        footer={[
                                            <Button key="back" onClick={self.handleCancel}>Return</Button>,
                                            <Button key="apply" type="primary"  onClick={() => self.handleSubmit(lesson.id)}>
                                                Submit
                                            </Button>,
                                        ]}
                                    >
                                        <p>{lesson.description} </p>

                                        <Collapse onChange={self.callback}>
                                            <Panel header={<Button>Apply</Button>} key="1">
                                                <p></p>
                                                <p>Please propose a date and time for the meeting</p>
                                                <p></p>
                                                <p>
                                                    <DatePicker onChange={self.onChangeDate} />
                                                </p>
                                                <p>
                                                    <TimePicker onChange={self.onChangeTime} />,
                                                </p>
                                            </Panel>
                                        </Collapse>

                                    </Modal>
                                 </Card>
                            </div>);
                        })}
                    </ul>
                </Layout>
            </div>

        );
    }

}

export default GetLessons;