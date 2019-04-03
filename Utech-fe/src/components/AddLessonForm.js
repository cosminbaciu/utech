import React, { Component } from 'react';
import {addLesson, getAllDomains} from '../util/APIUtils';
import {Button, Form, Input, notification, Menu, Dropdown, Icon } from "antd";
import FormItem from "antd/es/form/FormItem";
import {NAME_MAX_LENGTH, NAME_MIN_LENGTH} from "../constants";
import TextArea from "antd/es/input/TextArea";

class AddLessonForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: ''
            },
            description: {
                value: ''
            },
            domainId: {
                value: 0
            },
            price: {
                value: 0.0
            },
            domains:[],
            selectedDomain: 0,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    componentDidMount() {
        getAllDomains()
            // .then((response) => {
            //     return response.json();
            // })
            .then(data => {
                let domainsFromAPI = data.map(domain => { return {value: domain.id, display: domain.name} });
                this.setState({ domains: [{value: '0', display: '(Select your domain)'}].concat(domainsFromAPI) });
            }).catch(error => {
            console.log(error);
        });
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const addLessonRequest = {
            name: this.state.name.value,
            description: this.state.description.value,
            domainId: this.state.selectedDomain,
            price: this.state.price.value
        };
        addLesson(addLessonRequest)
            .then(response => {
                notification.success({
                    message: 'UTech',
                    description: "Thank you! Your lesson was succesfully saved",
                });
            }).catch(error => {
            notification.error({
                message: 'UTech',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success');
    }


    render() {
        return (
            <div className="addLesson-container">
                <h1 className="page-title">Add lesson</h1>
                <div className="addLesson-content">
                    <Form onSubmit={this.handleSubmit} className="addLesson-form">
                        <FormItem
                            label="Lesson name"
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <Input
                                size="large"
                                name="name"
                                autoComplete="off"
                                placeholder="Lesson name"
                                value={this.state.name.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </FormItem>
                        <FormItem
                            label="Description"
                            hasFeedback
                            validateStatus={this.state.name.validateStatus}
                            help={this.state.name.errorMsg}>
                            <TextArea
                                rows={5}
                                name="description"
                                type="description"
                                autoComplete="off"
                                placeholder="Description"
                                value={this.state.description.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </FormItem>

                        <FormItem
                            label = "Price">
                            <Input
                                size="large"
                                name="price"
                                type="price"
                                autoComplete="off"
                                placeholder="Price"
                                value={this.state.price.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)} />
                        </FormItem>

                        <select style={{marginBottom:40}} value={this.state.selectedDomain}
                                onChange={(e) => this.setState({selectedDomain: e.target.options.selectedIndex, validationError: e.target.value === "" ? "You must select your domain" : ""})}>
                            {this.state.domains.map((domain) => <option key={domain.id} value={domain.name}>{domain.display}</option>)}
                        </select>

                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="addLesson-form-button"
                                    disabled={this.isFormInvalid()}>Add lesson</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default  AddLessonForm;