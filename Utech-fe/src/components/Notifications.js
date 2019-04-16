import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Tooltip, List, notification} from 'antd';
import moment from 'moment';
import Layout from "./Categories";
import * as antd from "antd";
import {addLesson, getLessonsByDomain, getMessages, scheduleLesson} from "../util/APIUtils";


const { Comment} = antd;

class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    componentDidMount(){
        getMessages()
            .then(response => {
                this.setState({
                    messages : response
                });
            });
    }

    handleOk = (e) => {
        var lessonScheduler = {
            lessonRequestId: e.lessonRequestId,
            scheduledAt: e.date,

        }
        scheduleLesson(lessonScheduler)
            .then(response => {
                notification.success({
                    message: 'UTech',
                    description: "Thank you! Your lesson was succesfully scheduled",
                });
            }).catch(error => {
            notification.error({
                message: 'UTech',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }



    render() {

        var self = this;
        return (

            <List
                className="comment-list"
                // header={`${this.data.length} replies`}
                itemLayout="horizontal"
                dataSource={this.state.messages}
                renderItem={item => (
                    <Comment
                        actions={([<span onClick={() => self.handleOk(item)}>Accept</span>, <span>Decline</span>])}
                        author={item.senderName}
                        avatar={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                        content={(<div dangerouslySetInnerHTML={{ __html: item.message }} />)}
                        datetime={(new Date(item.createdAt)).toLocaleString()}
                    />
                )}
            />);

    }
}
export default Notifications;