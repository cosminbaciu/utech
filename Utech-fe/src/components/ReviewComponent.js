import React, {Component} from 'react';
import {Button, Rate} from "antd";
import TextArea from "antd/es/input/TextArea";
import image from '/Users/cobaciu/Projects/utech/Utech-fe/src/app/images/congratulations-png-8.png';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

class ReviewComponent extends Component {

    state = {
        value: 3,
    };

    handleChange = value => {
        this.setState({ value });
    };


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

                <TextArea rows={4} />
                <p></p>
                <Button style={{display: 'flex', justifyContent: 'center'}} type="primary">Rate</Button>
                <p></p>
            </div>

        )

    }
}
export default ReviewComponent;
