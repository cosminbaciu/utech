'use strict';

import React, { Component } from 'react';
const ReactDOM = require('react-dom');
import AddVoucher from "../components/AddVoucher.js";

export default class Vouchers extends Component {

    render() {
        console.log(this.state);
        return (
            <div>
                <AddVoucher />
                <div className="input-container">
                    <button type="button" className="btn btn-primary" onClick={this.props.back}>Back</button>
                </div>
            </div>
        );
    }

}