import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../constants";


const API = 'http://localhost:5000';

class NoOfViews extends Component {
    _isMounted = false;


    state = {
        loading: true,
        videos: [],
        listVideos: [],
    };

    componentDidMount() {
        this.getFavouriteVideos();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async fetch(method, endpoint, body) {
        await fetch(`${API}${endpoint}`, {
            method,
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            },

        })
            .then(response => response.json())
            .then(res => {
                if (this._isMounted)

                    this.setState({videos: res});
                console.log(this.state.videos)
            });
        // return await response.json();
        // var data = JSON.parse(JSON.stringify(this.state.videos));
        // console.log(data[0]);

    }

    async getFavouriteVideos() {
        this.setState({loading: false});
        this._isMounted = true;
        await this.fetch('GET', '/favourites/getAllSeenVideos');

        let videos = this.state.videos.map((video) => <li key = {video.title}>{video.title}</li>);
        if (this._isMounted)
            this.setState({listVideos: videos});

    }


    render() {
        return (
            <div>
                <h3> Number of views </h3>
                <ul>{this.state.listVideos}</ul>
            </div>
        );
    }
}

export default NoOfViews;