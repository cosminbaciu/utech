'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LocalityRegions from './pages/LocalityRegions.js';
import Regions from './pages/Regions.js';
import Vouchers from './pages/Vouchers.js';
import { NO_EDIT, EDIT_REGIONS, EDIT_LOCALITIES_REGIONS, ADD_VOUCHERS } from './constants/EditModes';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: NO_EDIT
        }

        this.renderContent = this.renderContent.bind(this);
    }

    renderContent() {
        let content = '';
        switch(this.state.editMode) {
            case EDIT_LOCALITIES_REGIONS:
                content = (
                    <div>
                        <LocalityRegions back={() => this.setState({ editMode: NO_EDIT })} />
                    </div>
                );
                break;
            case EDIT_REGIONS:
                content = (
                    <div>
                        <Regions back={() => this.setState({ editMode: NO_EDIT })} />
                    </div>
                );
                break;
            case ADD_VOUCHERS:
                content = (
                    <div>
                        <Vouchers back={() => this.setState({ editMode: NO_EDIT })} />
                    </div>
                );
                break;
            case NO_EDIT:
                content = (
                    <div className="main-page-container">
                        <h3>Backoffice pages</h3>
                        <i className="material-icons md-18">build</i><a onClick = {() => this.setState({ editMode: EDIT_LOCALITIES_REGIONS })}>Edit localities' regions</a><br/>
                        <i className="material-icons md-18">build</i><a onClick = {() => this.setState({ editMode: EDIT_REGIONS })}>Edit regions</a><br/>
                        <i className="material-icons md-18">build</i><a onClick = {() => this.setState({ editMode: ADD_VOUCHERS })}>Add vouchers</a>
                    </div>
                );
                break;
            default:
                content = (
                    <div>
                        Error happened
                    </div>
                )
        }
        return content;
    }

    render() {
        return (
        <div>
            { this.renderContent() }
        </div>
    )
        ;
    }
}

ReactDOM.render(
<App />,
    document.getElementById('react')
)

