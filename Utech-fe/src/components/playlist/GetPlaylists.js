import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../../constants";


const API = 'http://localhost:5000';

class GetPlaylists extends Component {


    _isMounted = false;
    state = {
        loading: true,
        playlists: []
    };


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
        await this.fetch('GET', '/playlist/getAll');

    }

    render(){

        let playlists = this.state.playlists;
        let optionItems = playlists.map((playlist) => <option key={playlist.id}>{playlist.name}</option>);

        if(this.state.playlists.length !== 0)
            return (
                <div>
                    <select id="selectPlaylist">{optionItems}</select>
                </div>
            );
        else return ( <div> </div>);

    }
}

export default GetPlaylists;