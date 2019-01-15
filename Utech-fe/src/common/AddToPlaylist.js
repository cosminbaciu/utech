import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {ACCESS_TOKEN} from "../constants";


const API = 'http://localhost:5000';

class AddToPlaylist extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    state = {
        loading: true,
        id: null,
        videoId: '',
        playlistId: null,
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
                // body: JSON.stringify({
                //     videoId: this.props.videoId,
                //     playlistId: this.props.playlistId
                // }),

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

    async addToPlaylist() {
        this.setState({loading: false});
        await this.fetch('POST', '/playlist/addVideo/' +  this.props.playlistId + "/" + this.props.videoId.toString())
    }

    handleChange(event) {
    }

    handleSubmit(event) {
        event.preventDefault();
    }



    render() {
        return (

            <Button onClick = {this.addToPlaylist.bind(this)}> Add to playlist </Button>
        );
    }
}

export default AddToPlaylist;