import React, {Component} from 'react';
import {Button, notification, Rate} from "antd";
import TextArea from "antd/es/input/TextArea";
import image from '/Users/cobaciu/Projects/utech/Utech-fe/src/congratulations-png-8.png';
import {addLesson, addReview} from "../util/APIUtils";

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class ReviewComponent extends Component {


    constructor(props){
        super(props);
        this.state = {
            value: 3,
            text : '',

        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = value => {
        this.setState({ value });
    };

    handleChange1 = text => {
        this.setState({ text });
    };

    handleSubmit(){

        const review = {
            note: this.state.value,
            // text: this.state.text,
            reviewedId: this.state.otherId,

        };

        addReview(review)
            .then(response => {
                notification.success({
                    message: 'UTech',
                    description: "Thank you! Your review was succesfully saved",
                });
            }).catch(error => {
            notification.error({
                message: 'UTech',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }




    render() {
        const { value } = this.state;
        return (
            <div>
                <img style={{display: 'flex', justifyContent: 'center', width: '100%'}} src={image}></img>
                <h4 style={{display: 'flex', justifyContent: 'center'}}> Please rate your meeting!</h4>
                <p></p>
            <span>
        <Rate style={{display: 'flex', justifyContent: 'center'}} tooltips={desc} onChange={this.handleChange} value={value} />
                {value ? <span style={{display: 'flex', justifyContent: 'center'}} className="ant-rate-text">{desc[value - 1]}</span> : ''}
      </span>

                <TextArea  onChange={this.handleChange1} rows={4} />
                <p></p>
                <Button onClick={this.handleSubmit} style={{display: 'flex', justifyContent: 'center'}} type="primary">Rate</Button>
                <p></p>
            </div>

        )

    }
}
export default ReviewComponent;
