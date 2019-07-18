import {Component} from "react";
import {
    getLessonPicture,
    getLessons,
    getLessonsByDomain, getLessonsByKeyword,
    getLessonsByKeywordSearch,
    getProfilePicture,
    getUsers
} from "../util/APIUtils";
import {Button, DatePicker, Form, Input, notification} from "antd";
import FormItem from "./AddLessonForm";
import React from "react";
import * as antd from "antd";
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";
import ModalComponent from "./ModalComponent";
import Modal from "antd/es/modal";
import AddLessonRequest from "./AddLessonRequest";
import * as APIUtils from "../util/APIUtils";
import TimePicker from "antd/es/time-picker";
import Collapse from "antd/es/collapse";
import Popover from "antd/es/popover";
import ExternalProfilePage from "./ExternalProfilePage";

const Panel = Collapse.Panel;

const { Card, Icon, Avatar } = antd;

const { Meta } = Card;


class GetLessons extends Component{

    constructor(props){
        super(props);
        this.state = {
            lessons: [],
            visible: false,
            visible1: false,
            lessonId: 0,
            time: new Date(),
            date: new Date(),
            image: null,
            images:[],
            users: [],
        };
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

    componentDidMount() {

        if(this.props.name !== '')
            getLessonsByKeyword(this.props.name)
                .then(response => {
                    this.setState({
                        lessons : response
                    });
                });
        else
            getLessonsByDomain(this.props.domain)
            .then(response => {
                this.setState({
                    lessons : response
                });
            });






        // let i;
        // let imagess;
        //
        // console.log(this.state.lessons.length);
        //
        // for(i=0; i<this.state.lessons.length; i++) {
        //     console.log("aaa");
        //
        // }

    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getPhoto(name){

        let image;

        getLessonPicture(name)
            .then(response  => {
                this.setState({
                    image: response,
                });;

            });

        await this.sleep(2000);

        return this.image;
        // return image;
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    showModal1 = () => {
        this.setState({
            visible1: true,
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

    handleOk1 = (e) => {
        console.log(e);
        this.setState({
            visible1: false,
        });
    }

    handleCancel1 = (e) => {
        console.log(e);
        this.setState({
            visible1: false,
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
                                                src={"http://localhost:5000/api/downloadLessonPhoto/" + lesson.lesson.name}/>}
                                    actions={[<a onClick={self.showModal}> <Icon type="check"/></a>, <Icon type="edit"/>, <Icon type="heart" />]}
                                >
                                <Meta
                                    avatar={<Avatar src={"http://localhost:5000/api/downloadProfilePicture/" + lesson.user.username + "/profile.jpg" }/>}
                                    title={lesson.lesson.name + " - " + lesson.lesson.price + " LEI"}
                                    description={
                                        <a onClick={self.showModal1}> {lesson.user.username}</a>
                                    }
                                    />

                                    <Modal
                                        visible={self.state.visible1}
                                        onOk={self.handleOk1}
                                        onApply={self.handleOk1}
                                        onCancel={self.handleCancel1} >

                                        <ExternalProfilePage username={lesson.user.username} />

                                        />
                                    </Modal>

                                    <Modal
                                        title={lesson.lesson.name + " - " + lesson.lesson.price}
                                        visible={self.state.visible}
                                        onOk={self.handleOk}
                                        onApply={self.handleOk}
                                        onCancel={self.handleCancel}
                                        footer={[
                                            <Button key="back" onClick={self.handleCancel}>Return</Button>,
                                            <Button key="apply" type="primary"  onClick={() => self.handleSubmit(lesson.lesson.id)}>
                                                Submit
                                            </Button>,
                                        ]}
                                    >
                                        <p>{lesson.lesson.description} </p>

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
