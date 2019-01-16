import React, { Component, Fragment } from 'react';
import Button from "@material-ui/core/Button/Button";
import {TextField, Typography} from "@material-ui/core";
import Video from './Video';
import '../common/SearchPage.css';


import {ACCESS_TOKEN} from "../constants";
import {MuiThemeProviderOld} from "@material-ui/core/es/styles/MuiThemeProvider";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import CardActions from "@material-ui/core/CardActions/CardActions";
import AddToFavourite from "./FavouriteVideos/AddToFavourite";
import FavouriteVideos from "./FavouriteVideos/FavouriteVideos";
import AddView from "./FavouriteVideos/AddView";
import NoOfViews from "./FavouriteVideos/NoOfViews";
import AddPlaylist from "./playlist/AddPlaylist";
import GetPlaylists from "./playlist/GetPlaylists";
import AddToPlaylist from "./playlist/AddToPlaylist";
import Playlist from "./playlist/Playlist";

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

const API = 'http://localhost:5000';

class Search extends Component{

    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    state = {
        loading: true,
        videos: [],
        keyword: '',
    };



    async fetch(method, endpoint, body) {
        // try {
            await fetch(`${API}${endpoint}`, {
                method,
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                    'Authorization' : 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                },
                // body: JSON.stringify({
                //         keyword: this.state.keyword
                // }),

            })
                .then(response => response.json())
                .then(res => {this.setState({videos: res}); console.log(this.state.videos)});
            // return await response.json();
            // var data = JSON.parse(JSON.stringify(this.state.videos));
            // console.log(data[0]);
        // } catch (error) {
        //     console.error(error);
        // }
    }

    async getVideos() {
        this.setState({loading: false});
        await this.fetch('GET', '/youtube/search/' + this.state.keyword.toString())
    }

    handleChange(event) {
        this.setState({keyword: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.keyword);
        event.preventDefault();
    }

    render() {

        const videoList = [];
        this.state.videos.forEach((video, index) => {
            videoList.push(<Video
                title= {video.id}

                />

            )
        });
        return (

            <Fragment>

                <div id = "searchbar">

                    <TextField
                        id="standard-search"
                        value={this.state.keyword}
                        label="Search field"
                        type="search"
                        margin="normal"
                        onChange={this.handleChange}
                    />
                    <p></p><Button onClick={this.getVideos.bind(this)}  variant="contained" color="primary">Search </Button>

                </div>

                <div id = "bar">

                    <Card id = "favVideos">
                        <FavouriteVideos/>
                    </Card>
                    <Card id="seen">
                        <NoOfViews/>
                    </Card>

                    <div id = "playlist">
                        <Playlist/>
                    </div>

                    <div id = "play">
                        <AddPlaylist/>
                    </div>
                </div>
                {/*{this.state.videos.length > 0 ? (*/}
                    {/*<Typography variant="subheading">{JSON.stringify(this.state.videos[0].id.videoId)}</Typography>*/}


                {/*) : (*/}
                    {/*!this.state.loading && <Typography variant="subheading">{this.state.loading.toString()}</Typography>*/}
                {/*)}*/}

              <div id = "results">
                    {this.state.videos.length > 0 ? (
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2"> {this.state.videos[0].snippet.title}
                                </Typography>

                                <iframe width="420" height="315"
                                        src={"https://www.youtube.com/embed/" + this.state.videos[0].id.videoId} >
                                </iframe>

                            </CardContent>
                            <CardActions>
                                <AddToFavourite
                                    title = {this.state.videos[0].snippet.title}
                                    videoId = {this.state.videos[0].id.videoId}
                                    thumbnailURL = {this.state.videos[0].snippet.thumbnailURL}
                                    />

                                <AddView
                                    title = {this.state.videos[0].snippet.title}
                                    videoId = {this.state.videos[0].id.videoId}
                                    thumbnailURL = {this.state.videos[0].snippet.thumbnailURL}
                                />
                                <GetPlaylists/>

                                <AddToPlaylist

                                    videoId = {this.state.videos[0].id.videoId}
                                    playlistId = {1}
                                    />

                            </CardActions>

                        </Card>



                    ) : (
                        !this.state.loading && <Typography variant="subheading"></Typography>
                    )}


                    {this.state.videos.length > 0 ? (
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2"> {this.state.videos[1].snippet.title}
                                </Typography>

                                <iframe width="420" height="315"
                                        src={"https://www.youtube.com/embed/" + this.state.videos[1].id.videoId}>
                                </iframe>

                            </CardContent>
                            <CardActions>
                                <AddToFavourite
                                    title = {this.state.videos[1].snippet.title}
                                    videoId = {this.state.videos[1].id.videoId}
                                    thumbnailURL = {this.state.videos[1].snippet.thumbnailURL}
                                />
                                <AddView
                                    title = {this.state.videos[1].snippet.title}
                                    videoId = {this.state.videos[1].id.videoId}
                                    thumbnailURL = {this.state.videos[1].snippet.thumbnailURL}
                                />
                                <GetPlaylists/>
                                <AddToPlaylist

                                    videoId = {this.state.videos[1].id.videoId}
                                    playlistId = {1}
                                />
                            </CardActions>
                        </Card>



                    ) : (
                        !this.state.loading && <Typography variant="subheading"></Typography>
                    )}

                    {this.state.videos.length > 0 ? (
                        <Card >
                            <CardContent>

                                <Typography variant="h5" component="h2"> {this.state.videos[2].snippet.title}
                                </Typography>

                                <iframe width="420" height="315"
                                        src={"https://www.youtube.com/embed/" + this.state.videos[2].id.videoId}>
                                </iframe>

                            </CardContent>

                            <CardActions>
                                <AddToFavourite
                                    title = {this.state.videos[2].snippet.title}
                                    videoId = {this.state.videos[2].id.videoId}
                                    thumbnailURL = {this.state.videos[2].snippet.thumbnailURL}
                                />
                                <AddView
                                    title = {this.state.videos[2].snippet.title}
                                    videoId = {this.state.videos[2].id.videoId}
                                    thumbnailURL = {this.state.videos[2].snippet.thumbnailURL}
                                />
                                <GetPlaylists/>
                                <AddToPlaylist

                                    videoId = {this.state.videos[2].id.videoId}
                                    playlistId = {1}
                                />
                            </CardActions>
                        </Card>



                    ) : (
                        !this.state.loading && <Typography variant="subheading"></Typography>
                    )}

                    {this.state.videos.length > 0 ? (
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2"> {this.state.videos[3].snippet.title}
                                </Typography>

                                <iframe width="420" height="315"
                                        src={"https://www.youtube.com/embed/" + this.state.videos[3].id.videoId}>
                                </iframe>

                            </CardContent>
                            <CardActions>
                                <AddToFavourite
                                    title = {this.state.videos[3].snippet.title}
                                    videoId = {this.state.videos[3].id.videoId}
                                    thumbnailURL = {this.state.videos[3].snippet.thumbnailURL}
                                />
                                <AddView
                                    title = {this.state.videos[3].snippet.title}
                                    videoId = {this.state.videos[3].id.videoId}
                                    thumbnailURL = {this.state.videos[3].snippet.thumbnailURL}
                                />
                                <GetPlaylists/>
                                <AddToPlaylist

                                    videoId = {this.state.videos[3].id.videoId}
                                    playlistId = {1}
                                />
                            </CardActions>
                        </Card>



                    ) : (
                        !this.state.loading && <Typography variant="subheading"></Typography>
                    )}

                    {this.state.videos.length > 0 ? (
                        <Card >
                            <CardContent>
                                <Typography variant="h5" component="h2"> {this.state.videos[4].snippet.title}
                                </Typography>

                                <iframe width="420" height="315"
                                        src={"https://www.youtube.com/embed/" + this.state.videos[4].id.videoId}>
                                </iframe>

                            </CardContent>
                            <CardActions>
                                <AddToFavourite
                                    title = {this.state.videos[4].snippet.title}
                                    videoId = {this.state.videos[4].id.videoId}
                                    thumbnailURL = {this.state.videos[4].snippet.thumbnailURL}
                                />
                                <AddView
                                    title = {this.state.videos[4].snippet.title}
                                    videoId = {this.state.videos[4].id.videoId}
                                    thumbnailURL = {this.state.videos[4].snippet.thumbnailURL}
                                />
                                <GetPlaylists/>
                                <AddToPlaylist

                                    videoId = {this.state.videos[4].id.videoId}
                                    playlistId = {1}
                                />
                            </CardActions>
                        </Card>



                    ) : (
                        !this.state.loading && <Typography variant="subheading"></Typography>
                    )}
                </div>


            </Fragment>
        );
    }
}

export default Search;