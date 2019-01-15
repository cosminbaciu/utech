import React, {Component} from 'react';
import {ACCESS_TOKEN} from "../constants";


const API = 'http://localhost:5000';

class FavouriteVideos extends Component {


   _isMounted = false;
    state = {
        loading: true,
        videos: [],
        listVideos:[],
    };


    async componentDidMount() {

        await this.getFavouriteVideos();

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
                this.setState({videos: res}); console.log(this.state.videos)});
        // return await response.json();
        // var data = JSON.parse(JSON.stringify(this.state.videos));
        // console.log(data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async getFavouriteVideos() {
        this._isMounted = true;
        this.setState({loading: false});
        await this.fetch('GET', '/favourites/getAllFavouriteVideos');

        if(this._isMounted)
          this.setState({listVideos : this.state.videos.map((video) => <li key={video.title}>{video.title}</li>)});
    }


    render(){

        const{videos} = this.state;

        if(videos.length !== 0)
        return (
            <div>
              <h3> Favourite videos </h3>
                <ul>{this.state.listVideos}</ul>
            </div>
        );
        else return ( <div> Loading</div>);

    }
}

export default FavouriteVideos;