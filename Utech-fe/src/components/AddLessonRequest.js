import React, { Component } from 'react';
import {addLesson, getAllDomains} from '../util/APIUtils';
import {Button, Form, Input, notification, Menu, Dropdown, Icon } from "antd";
import * as APIUtils from "../util/APIUtils";

class AddLessonRequest extends Component{
    constructor(props){
        super(props);
        this.state = {
            lessonId: {
                value: 0
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.handleSubmit();
    }


    handleSubmit(event) {
        event.preventDefault();

        const addLessonRequest = {
            lessonId: this.props.lessonId
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
        });
    }

    render() {
        return ( <p>Cosmin</p>);
    }


}

export default  AddLessonRequest;