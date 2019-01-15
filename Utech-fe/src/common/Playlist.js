import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../constants";


const API = 'http://localhost:5000';

class Playlist extends Component {


    _isMounted = false;
    state = {
        loading: true,
        playlists: []
    };

    value = 1;


    async componentDidMount() {

        await this.getPlaylists();

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async fetch(method, endpoint, body) {
        try {
            await fetch(`${API}${endpoint}`, {
                method,
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                },

            })
                .then(response => response.json())
                .then(res => {
                    if(this._isMounted)
                        this.setState({playlists: res}); console.log(this.state.playlists)});
            // return await response.json();
            // var data = JSON.parse(JSON.stringify(this.state.videos));
            // console.log(data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async getPlaylists() {
        this._isMounted = true;
        this.setState({loading: false});
        await this.fetch('GET', '/playlist/getPlaylistByPlaylistId/' + + this.value);

    }

    render(){

        var url = 'https://www.youtube.com/embed/' + this.state.playlists[0] +  '?playlist=';

        for(var i=1; i< this.state.playlists.length-1; i++)
            url +=this.state.playlists[i] + ",";

        url+= this.state.playlists[this.state.playlists.length-1];

        if(this.state.playlists.length !== 0)
            return (
                <div>
                    <h3> Playlist curent </h3>
                    <iframe width="360" height="200"
                            src={url} frameBorder="0"
                            allowFullScreen/>
                </div>
            );
        else return ( <div> Loading</div>);

    }
}

export default Playlist;