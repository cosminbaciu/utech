import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {ACCESS_TOKEN} from "../constants";


const API = 'http://localhost:5000';

class AddFavourite extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    state = {
        loading: true,
        id: null,
        title: '',
        videoId: '',
        thumbnailURL: '',
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
                    title: this.props.title,
                    videoId: this.props.videoId,
                    thumbnailURL: this.props.thumbnailURL
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

    async addToFavourite() {
        this.setState({loading: false});
        await this.fetch('POST', '/favourites/addToFavourites')
    }

    handleChange(event) {
    }

    handleSubmit(event) {
        event.preventDefault();
    }



    render() {
        return (

            <Button onClick = {this.addToFavourite.bind(this)}> Add to favourites </Button>
        );
    }
}

export default AddFavourite;