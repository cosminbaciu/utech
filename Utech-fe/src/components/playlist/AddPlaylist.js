import React, { Component } from 'react';
import {Button, TextField} from '@material-ui/core';
import {ACCESS_TOKEN} from "../../constants";


const API = 'http://localhost:5000';

class AddPlaylist extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    state = {
        loading: true,
        name: ''
    };

    async fetch(method, endpoint, body) {
        try {
            await fetch(`${API}${endpoint}`, {
                method,
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                },
                body: JSON.stringify({
                    name: this.state.name
                }),

            })
            //     .then(response => response.json())
            //     .then(res => {this.setState({videos: res}); console.log(this.state.videos)});
            // // return await response.json();
            // // var data = JSON.parse(JSON.stringify(this.state.videos));
            // // console.log(data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async addPlaylist() {
        this.setState({loading: false});
        await this.fetch('POST', '/playlist/create')
    }

    handleChange(event) {
        this.setState({name: event.target.value});

    }

    handleSubmit(event) {
        event.preventDefault();
    }



    render() {



        return (

            <div>
                <TextField
                    id="addCategory"
                    value={this.state.name}
                    label="Add Playlist"
                    type="search"
                    margin="normal"
                    onChange={this.handleChange}
                />
                <p></p><Button onClick={this.addPlaylist.bind(this)}  variant="contained" color="primary">Add </Button>

            </div>

    );
    }
}

export default AddPlaylist;