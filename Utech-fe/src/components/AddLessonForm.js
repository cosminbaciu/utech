import React, { Component } from 'react';
import {addLesson, addLessonPhoto, getAllDomains} from '../util/APIUtils';
import {Button, Form, Input, notification, Menu, Dropdown, Icon } from "antd";
import FormItem from "antd/es/form/FormItem";
import {NAME_MAX_LENGTH, NAME_MIN_LENGTH} from "../constants";
import TextArea from "antd/es/input/TextArea";
import FileUpload from "./FileUpload";
import Upload from "antd/es/upload";

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
            fileList: [],
            uploading: false,
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
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files', file);
            formData.append('name', this.state.name.value);
        });

        this.setState({
            uploading: true,
        });

        addLessonPhoto(formData)
            .then(response => {
                console.log(response);
        });
    }

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success');
    }


    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: file => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };
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
                                onChange={(event) => this.handleInputChange(event, this.validatePrice)} />
                        </FormItem>

                        <select style={{marginBottom:40}} value={this.state.selectedDomain}
                                onChange={(e) => this.setState({selectedDomain: e.target.selectedIndex, validationError: e.target.value === "" ? "You must select your domain" : ""})}>
                            {this.state.domains.map((domain) => <option value={domain.id}>{domain.display}</option>)}
                        </select>

                        <FormItem>
                            <Upload {...props}>
                                <Button>
                                    <Icon type="upload" /> Select File
                                </Button>
                            </Upload>
                        </FormItem>

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

    validatePrice = (value) => {
        if (!isNaN(value) && value.toString().indexOf('.') !== -1) {
            console.log()
            return {
                validateStatus: 'error',
                errorMsg: `Please type a price (only digits).)`
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
