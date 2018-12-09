import React, { Component } from 'react';
import { API } from "../services/API.js";
const Typeahead = require('react-bootstrap-typeahead').Typeahead;
import DatePicker from 'react-datepicker';
import moment from 'moment';

const CODE_LENGTH = 6;

export default class AddVoucher extends Component {

    constructor (props) {
        super(props)

        this.state = {
            code: '',
            value: '',
            count: '',
            startDate: null,
            toDate: null,
            prefix: '',
            voucherTypes: []
        };

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleToDate = this.handleToDate.bind(this);
        this.addNewVoucher = this.addNewVoucher.bind(this);
        this.generateCodeWithPrefix = this.generateCodeWithPrefix.bind(this);
        this.setVoucherTypes = this.setVoucherTypes.bind(this);
        this.selectVoucherType = this.selectVoucherType.bind(this);
        this.addVoucherCallback = this.addVoucherCallback.bind(this);

        this.startDate = '';
        this.endDate = '';
        this.selectedVoucherType = '';

        this.typeaheadVouchers = '';
    }

    componentWillMount() {
        API.getVoucherTypes(this.setVoucherTypes);
    }

    setVoucherTypes(json) {
        this.setState({ voucherTypes: json });
    }

    handleStartDate(date) {
        this.startDate = date.valueOf();

        let list = date.format("YYYY/MM/DD").split("/");
        let startYear = parseInt(list[0]);
        let startMonth = parseInt(list[1]);
        let startDay = parseInt(list[2]);

        let toDate = moment([startYear, startMonth - 1, startDay]).add(1, "days");
        this.endDate = toDate.valueOf();

        this.setState({
            startDate: date,
            toDate: toDate
        });
    }

    handleToDate(date) {
        this.endDate = date.valueOf();

        this.setState({
            toDate: date
        });
    }

    addNewVoucher() {
        const bodyObj = {
            code: this.state.code,
            value: this.state.value,
            count: this.state.count,
            voucherTypeId: this.selectedVoucherType.id,
            velocityCode: this.state.velocityCode,
            startDate: this.startDate,
            endDate: this.endDate
        }

        API.addVoucher(this.addVoucherCallback, bodyObj);
    }

    addVoucherCallback(json) {
        console.log("Add voucher callback");

        this.typeaheadVouchers.getInstance().clear();
        this.setState({
            code: '',
            value: '',
            count: '',
            velocityCode: '',
            startDate: null,
            toDate: null,
            prefix: ''
        })
    }

    generateCodeWithPrefix() {
        let code = this.state.prefix;
        code = code.concat(Math.random().toString(36).substr(2, CODE_LENGTH));

        this.setState({ code });
    }

    selectVoucherType(json) {
        if (json.length > 0) {
            this.selectedVoucherType = json[0];
        }
    }

    render() {
        return (
            <div className="regions-container">
                <h3 className="description">Add new voucher</h3>
                <div className="form-group">
                    <label for="code">Code:</label>
                    <input type="text" className="form-control" id="code" value={this.state.code}
                           onChange={(value) => this.setState({ code: value.target.value})}/>
                    <button type="button" disabled={this.state.prefix === ''} onClick={() => this.generateCodeWithPrefix() }>Generate code with prefix</button>
                    <input type="text" placeholder="Prefix" size="10" value={this.state.prefix}
                           onChange={(value) => this.setState({ prefix: value.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Voucher Type</label>
                    <Typeahead
                        options={this.state.voucherTypes}
                        placeholder="Choose voucher type"
                        maxResults="10"
                        labelKey="name"
                        onChange={this.selectVoucherType}
                        ref={ref => this.typeaheadVouchers = ref}
                    />
                </div>
                <div className="form-group">
                    <label for="value">Value:</label>
                    <input type="text" className="form-control" id="value" value={this.state.value}
                           onChange={(value) => this.setState({ value: value.target.value})}/>
                </div>
                <div className="form-group">
                    <label for="count">Count:</label>
                    <input type="number" className="form-control" id="count" value={this.state.count}
                           onChange={(value) => this.setState({ count: value.target.value})}/>
                </div>
                <div className="form-group">
                    <label for="velocityCode">Velocity code:</label>
                    <input type="text" className="form-control" id="velocityCode" value={this.state.velocityCode}
                           onChange={(value) => this.setState({ velocityCode: value.target.value})}/>
                </div>
                <div className="date-container form-group">
                    <label for="description">Start Date:</label>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleStartDate}
                        minDate={moment()}
                        dateFormat="DD/MM/YYYY"
                        placeholderText="Select start date"
                    />
                </div>
                <div className="date-container form-group">
                    <label for="description">End Date:</label>
                    <DatePicker
                        selected={this.state.toDate}
                        onChange={this.handleToDate}
                        minDate={this.state.toDate}
                        placeholderText="Select end date"
                        dateFormat="DD/MM/YYYY"
                        disabled={this.state.startDate === null}
                    />
                </div>
                <div className="add-region-button">
                    <button type="button" className="btn btn-danger" onClick={() => this.addNewVoucher()}>Add</button>
                </div>
            </div>
        );
    }
}