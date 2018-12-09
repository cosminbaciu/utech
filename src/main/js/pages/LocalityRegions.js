'use strict';

import React, { Component } from 'react';
const ReactDOM = require('react-dom');
const Typeahead = require('react-bootstrap-typeahead').Typeahead;
import { API } from "../services/API.js";
import EditLocalitiesRegions from '../components/EditLocalitiesRegions.js';


export default class LocalityRegions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            subdivisions: [],
            localities: [],
            selectedLocality: '',
            regions: '',
            inputsDisabled: false,
            isLoading: false
        }


        this.typeaheadLocalities = '';
        this.editRegionsComponent = '';

        this.allRegions = '';

        this.setSubdivisions = this.setSubdivisions.bind(this);
        this.setRegions = this.setRegions.bind(this);
        this.selectSubdivision = this.selectSubdivision.bind(this);
        this.setLocalities = this.setLocalities.bind(this);
        this.selectLocality = this.selectLocality.bind(this);
        this.editRegions = this.editRegions.bind(this);
        this.close = this.close.bind(this);
        this.save = this.save.bind(this);
        this.getLocalityCallback = this.getLocalityCallback.bind(this);
    }

    componentWillMount() {
        API.getSubdivisions(this.setSubdivisions);
        API.getRegions(this.setRegions);
    }

    setSubdivisions(json) {
        this.setState({subdivisions: json});
    }

    setRegions(json) {
        this.allRegions = json;
    }

    selectSubdivision(json) {
        this.setState({localities: []});
        this.typeaheadLocalities.getInstance().clear();

        const subdivision = json[0];
        API.getSubdivisionLocalities(this.setLocalities, {"isoCode": subdivision.isoCode});
    }

    setLocalities(json) {
        console.log(json);
        this.setState({localities: json});
    }

    renderRegions(list) {
        let regions = [];
        let region;
        list.forEach((item) => {
            region = (<li>{item.name}</li>);
            regions.push(region);
        });
        this.setState({regions});
    }

    selectLocality(json) {
        const locality = json[0];

        if (locality !== undefined) {
            this.setState({selectedLocality: locality});
            this.renderRegions(locality.regionDTOS);
        }
    }

    editRegions() {
        this.setState({inputsDisabled: true});

        this.editRegionsComponent = (
            <EditLocalitiesRegions selectedLocality={this.state.selectedLocality} allRegions={this.allRegions}
                close={this.close} save={this.save} localityId={this.selectLocality.id} />
        );
    }

    close() {
        this.setState({ inputsDisabled: false });
    }

    save(locality, addedRegionsIds, deletedRegionsIds) {

        const bodyObjDel = {
            locality: locality,
            regionsList: deletedRegionsIds
        }

        API.deleteRegionsFromLocality(this.deleteRegionsCallback, bodyObjDel);

        const bodyObjAdd = {
            locality: locality,
            regionsList: addedRegionsIds
        }

        API.addRegionsToLocality(this.addRegionsCallback, bodyObjAdd);

        this.setState({ isLoading: true });
        setTimeout(() => { API.getLocality(this.getLocalityCallback, {id: locality.id}); }, 1000);
    }

    deleteRegionsCallback() {
        console.log("Delete regions callback");
    }

    addRegionsCallback() {
        console.log("Delete regions callback");
    }

    getLocalityCallback(json) {
        console.log("GET LOCALITY");
        console.log(json);

        this.renderRegions(json.regionDTOS);
        this.setState({ selectedLocality: json, inputsDisabled: false, isLoading: false });
    }

    render() {
        return (
            <div>
                <div className="input-container">
                    <h3>Subdivisions</h3>
                    <Typeahead
                        options={this.state.subdivisions}
                        placeholder="Choose subdivision"
                        maxResults="15"
                        labelKey="name"
                        onChange={this.selectSubdivision}
                        disabled={this.state.inputsDisabled}
                    />
                </div>
                <div className="input-container">
                    <h3>Localities</h3>
                    <Typeahead
                        options={this.state.localities}
                        placeholder="Choose locality"
                        maxResults="15"
                        labelKey="name"
                        onChange={this.selectLocality}
                        disabled={this.state.inputsDisabled}
                        ref={ref => this.typeaheadLocalities = ref}
                    />
                </div>
                {(this.state.selectedLocality === '') || (this.state.selectedLocality === undefined) ? '' :
                    (<div>
                        {this.state.inputsDisabled === false ?
                            (<div className="regions-container">
                                <h3>Regions for <span className="text-bold">{this.state.selectedLocality.name}</span> </h3>
                                <ul>
                                    {this.state.regions}
                                </ul>
                                <button type="button" className="btn btn-danger" onClick={this.editRegions}>Edit</button>
                            </div>) : (this.editRegionsComponent)
                        }
                    </div>)
                }

                <div className="input-container">
                    <button type="button" disabled={this.state.inputsDisabled} className="btn btn-primary" onClick={this.props.back}>Back</button>
                </div>

                {this.state.isLoading ?
                    (<div className="lockall"></div>) : ''}
            </div>
        )
    }
}
