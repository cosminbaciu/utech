import React, { Component } from 'react';
import { API } from "../services/API.js";
const Typeahead = require('react-bootstrap-typeahead').Typeahead;

const noRegions = (
    <div>
        There are no regions in list
    </div>
)

export default class EditRegions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            regionsUl: '',
            skuItemTypes: [],
            name: '',
            description: ''
        }

        this.allRegions = this.props.allRegions.slice();
        this.initialRegions = this.props.allRegions.slice();
        this.deletedRegions = [];
        this.addedRegions = [];
        this.selectedSkuItemType = '';

        this.typeaheadRegions = '';

        this.deleteRegion = this.deleteRegion.bind(this);
        this.renderRegions = this.renderRegions.bind(this);
        this.setSkuItemTypes = this.setSkuItemTypes.bind(this);
        this.selectSkuItemType = this.selectSkuItemType.bind(this);
    }

    componentWillMount() {
        this.renderRegions(this.allRegions);
        API.getSkuItemTypes(this.setSkuItemTypes);
    }

    setSkuItemTypes(json) {
        this.setState({skuItemTypes: json});
    }

    renderRegions(regions) {
        let regionsUl = [];
        let regionLi;

        regions.forEach((region) => {
            regionLi = (<li key={region.id}>
                <b>{region.name}</b> ({region.description}) - SkuItemType "{region.skuItemType.name}"
                <button className="btn btn-danger" onClick={() => this.deleteRegion(region)}><i className="material-icons md-18">close</i></button>
            </li>);
            regionsUl.push(regionLi);
        });
        this.setState({regionsUl});
    }

    deleteRegion(region) {
        let index = this.allRegions.indexOf(region);
        this.allRegions.splice(index, 1);

        index = this.initialRegions.findIndex((r) => { return region.id === r.id });
        if (index !== -1) {
            this.deletedRegions.push(region);
        }

        index = this.addedRegions.findIndex((r) => { return region.id === r.id });
        if (index !== -1) {
            this.addedRegions.splice(index, 1);
        }

        this.renderRegions(this.allRegions);
    }

    addNewRegion() {
        if (this.selectedSkuItem !== '' && this.state.name !== '') {
            const newRegion = {
                id: parseInt(Math.random() * 1000),
                name: this.state.name,
                description: this.state.description,
                skuItemType: this.selectedSkuItemType
            };
            this.allRegions.push(newRegion);
            this.addedRegions.push(newRegion);

            this.renderRegions(this.allRegions);

            this.typeaheadRegions.getInstance().clear();
            this.selectedSkuItemType = '';
            this.setState({ name: '', description: ''});
        }
    }

    selectSkuItemType(json) {
        if (json.length > 0) {
            this.selectedSkuItemType = json[0];
        }
    }

    render() {
        return (
            <div className="regions-container">
                <h3 className="description">Regions <span className="edit-mode">(Edit mode)</span></h3>
                {this.allRegions.length > 0 ?
                    (<ul className="edit-regions">
                        {this.state.regionsUl}
                    </ul>) : noRegions}

                    <div className="form-container">
                        <h3>Add new region</h3>
                        <div className="form-group">
                            <label for="name">Name:</label>
                            <input type="text" className="form-control" id="name" value={this.state.name}
                                   onChange={(value) => this.setState({ name: value.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label for="description">Description:</label>
                            <input type="text" className="form-control" id="description" value={this.state.description}
                                   onChange={(value) => this.setState({ description: value.target.value})} />
                        </div>
                        <div className="form-group">
                            <label>Sku Item Type</label>
                            <Typeahead
                                options={this.state.skuItemTypes}
                                placeholder="Choose skuItemType"
                                maxResults="10"
                                labelKey="name"
                                onChange={this.selectSkuItemType}
                                ref={ref => this.typeaheadRegions = ref}
                            />
                        </div>
                        <div className="add-region-button">
                            <button type="button" className="btn btn-danger" onClick={() => this.addNewRegion()}>Add</button>
                        </div>
                    </div>

                <div className="buttons-container">
                    <button type="button" className="btn btn-lg btn-primary" onClick={this.props.close}>Close</button>
                    <button type="button" className="btn btn-lg btn-primary" onClick={() =>
                        this.props.save(this.addedRegions, this.deletedRegions)}>Save</button>
                </div>
            </div>
        );
    }
}