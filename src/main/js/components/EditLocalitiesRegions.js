import React, { Component } from 'react';
const Typeahead = require('react-bootstrap-typeahead').Typeahead;

const noRegions = (
    <div>
        This locality is not linked to any region
    </div>
)

export default class EditLocalitiesRegions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            regionsUl: '',
            regionsOptions: ''
        }

        this.typeaheadRegions = '';

        this.regions = this.props.selectedLocality.regionDTOS.slice();
        this.allRegions = this.props.allRegions.slice();

        this.deleteRegion = this.deleteRegion.bind(this);
        this.renderRegions = this.renderRegions.bind(this);
        this.addNewRegion = this.addNewRegion.bind(this);
        this.selectRegion = this.selectRegion.bind(this);
        this.updateRegionsOptions = this.updateRegionsOptions.bind(this);

        this.selectedRegion = '';
        this.deletedRegions = [];
        this.addedRegions = [];
        this.initialRegions = [];
    }

    componentWillMount() {
        this.renderRegions(this.regions);
        this.setInitialRegions();
        this.updateRegionsOptions();

    }

    setInitialRegions() {
        this.regions.forEach((region) => {
           this.initialRegions.push(region.id);
        });
    }

    deleteRegion(region) {
        if (this.initialRegions.indexOf(region.id) !== -1) {
            this.deletedRegions.push(region);
        }

        let index = this.regions.indexOf(region);
        this.regions.splice(index, 1);

        this.updateRegionsOptions();

        this.renderRegions(this.regions);
    }

    addNewRegion() {
        if (this.selectedRegion !== '') {
            this.regions.push(this.selectedRegion);
            this.renderRegions(this.regions);

            let index = this.deletedRegions.findIndex((r) => { return this.selectedRegion.id === r.id });
            if (index !== -1) {
                this.deletedRegions.splice(index, 1);
            }


            if (this.initialRegions.indexOf(this.selectedRegion.id) === -1) {
                this.addedRegions.push(this.selectedRegion);
            }

            this.updateRegionsOptions();

            this.typeaheadRegions.getInstance().clear();
            this.selectedRegion = '';
        }
    }

    selectRegion(json) {
        if (json.length > 0) {
            this.selectedRegion = json[0];
        }
    }

    renderRegions(regions) {
        let regionsUl = [];
        let regionLi;

        regions.forEach((region) => {
            regionLi = (<li key={region.id}>
                {region.name}
                <button className="btn btn-danger" onClick={() => this.deleteRegion(region)}><i className="material-icons md-18">close</i></button>
            </li>);
            regionsUl.push(regionLi);
        });
        this.setState({regionsUl});
    }

    updateRegionsOptions() {
        const regionsOptions = [];
        let index;

        this.allRegions.forEach((region) => {
            index = this.regions.findIndex((r) => { return region.id === r.id });
            if (index === -1) {
                regionsOptions.push(region);
            }
        });

        this.setState({ regionsOptions });
    }

    render() {
        return (
            <div className="regions-container">
                <h3 className="description">Regions for <span className="selected-locality">{this.props.selectedLocality.name}</span>
                    <span className="edit-mode">(Edit mode)</span></h3>
                {this.regions.length > 0 ?
                    (<ul className="edit-regions">
                        {this.state.regionsUl}
                    </ul>) : noRegions}
                <div className="add-region-container">
                    <div className="add-region-input">
                        <Typeahead
                            options={this.state.regionsOptions}
                            placeholder="Select region to add"
                            maxResults="15"
                            labelKey="name"
                            onChange={this.selectRegion}
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
                        this.props.save(this.props.selectedLocality, this.addedRegions, this.deletedRegions)}>Save</button>
                </div>
            </div>
        );
    }
}