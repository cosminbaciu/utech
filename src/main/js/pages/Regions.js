'use strict';

import React, { Component } from 'react';
const ReactDOM = require('react-dom');
const Typeahead = require('react-bootstrap-typeahead').Typeahead;
import { API } from "../services/API.js";
import EditRegions from '../components/EditRegions.js';

export default class Regions extends Component {

    constructor(props) {
        super(props);

        this.allRegions = '';
        this.editRegionsComponent = '';

        this.renderRegions = this.renderRegions.bind(this);
        this.editRegions = this.editRegions.bind(this);
        this.setRegions = this.setRegions.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);

        this.state = {
            regionsUl: '',
            editMode: false,
            isLoading: false
        }
    }

    componentWillMount() {
        API.getRegions(this.setRegions);
    }

    setRegions(json) {
        this.allRegions = json;
        this.setState({ isLoading: false, editMode: false });
        this.renderRegions(json);
    }

    renderRegions(regions) {
        let regionsUl = [];
        let regionLi;

        regions.forEach((item) => {
            regionLi = (<li key={item.id}>{item.name}</li>);
            regionsUl.push(regionLi);
        });

        this.setState({regionsUl});
    }

    editRegions() {
        this.setState({editMode: true});

        this.editRegionsComponent = (
            <EditRegions allRegions={this.allRegions} close={this.close} save={this.save}/>
        );
    }

    close() {
        this.setState({ editMode: false });
    }

    save(addedRegions, deletedRegions) {

        let bodyObj = {
            regionDTOS: deletedRegions
        }

        API.deleteRegions(this.deleteRegionsCallback, bodyObj);

        bodyObj = {
            regionDTOS: addedRegions
        }

        API.addRegions(this.addRegionsCallback, bodyObj);

        this.setState({ isLoading: true });
        setTimeout(() => { API.getRegions(this.setRegions); }, 1000);
    }

    deleteRegionsCallback() {
        console.log("Delete regions callback");
    }

    addRegionsCallback() {
        console.log("Delete regions callback");
    }

    render() {
        return (
          <div>
              {this.state.editMode === false ?
                  (<div className="regions-container">
                      <h3>Regions</h3>
                      <ul>
                          {this.state.regionsUl}
                      </ul>
                      <button type="button" className="btn btn-danger" onClick={this.editRegions}>Edit</button>
                  </div>) : this.editRegionsComponent}

              <div className="input-container">
                  <button type="button" disabled={this.state.editMode} className="btn btn-primary" onClick={this.props.back}>Back</button>
              </div>
              {this.state.isLoading ?
                  (<div className="lockall"></div>) : ''}
          </div>
        );
    }
}