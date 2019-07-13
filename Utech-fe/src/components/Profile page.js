import {Component} from "react";
import React from "react";
import "./profile.css";
import {getProfilePicture, getUserPrincipal} from "../util/APIUtils";
import image from "/Users/cobaciu/Projects/utech/Utech-fe/src/cosmic.baciu/profile.jpg";
import Messages from "./StreamComponent";
import {Button, Icon} from "antd";
import Tabs from "antd/es/tabs";
import Graphic from "./HomepageUser";
const { TabPane } = Tabs;


class ProfilePage extends Component {

    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            image: null,
            username: '',
            name: '',
            email: ''
        }
    }

    componentWillMount(){
        this._isMounted = true;
        getProfilePicture()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        image:  response
                    });
                    console.log(response);
                }
            });

        getUserPrincipal()
            .then(response => {
                if (this._isMounted) {

                    this.setState({
                        username: response.username, name: response.name, email: response.email
                    });
                }
                });
    }

    componentWillUnmount() {
        this._isMounted = false;
        console.log(this.state.image);
    }




    render() {
        return (

            <div className="container emp-profile">
                <form method="post">
                    <div className="row">
                        <div className="col-md-4" >
                            <div className="profile-img">
                                <img
                                    src={"http://localhost:5000/api/downloadProfilePicture/" + this.state.username + "/profile.jpg"}
                                    alt="ggg"/>
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" name="file"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                    {this.state.name}
                                </h5>
                                <h6>
                                    Web Developer and Designer
                                </h6>
                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                {/*<ul className="nav nav-tabs" id="myTab" role="tablist">*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"*/}
                                           {/*role="tab" aria-controls="home" aria-selected="true">About</a>*/}
                                    {/*</li>*/}
                                    {/*<li className="nav-item">*/}
                                        {/*<a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"*/}
                                           {/*role="tab" aria-controls="profile" aria-selected="false">Timeline</a>*/}
                                    {/*</li>*/}
                                {/*</ul>*/}
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>Languages</p>
                                <a href="">roumanian</a><br/>
                                <a href="">english</a><br/>
                                <a href="">french</a>
                                <p>SKILLS</p>
                                <a href="">Java</a><br/>
                                <a href="">C++</a><br/>
                                <a href="">Ecommerce</a><br/>
                                <a href="">ReactJS</a><br/>
                                <a href="">HTML, CSS</a><br/>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="About" key="1">

                                    <div className="row">
                                    <div className="col-md-6">
                                    <label>User Id</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.state.username}</p>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-6">
                                    <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.state.name}</p>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-6">
                                    <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.state.email}</p>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-6">
                                    <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>123 456 7890</p>
                                    </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-6">
                                    <label>Profession</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>Web Developer and Designer</p>
                                    </div>
                                    </div>
                                </TabPane>
                                <TabPane tab="Raport" key="2">

                                    <Graphic/>

                                </TabPane>
                                <TabPane tab="Activity" key="3">


                                </TabPane>


                            </Tabs>
                            {/*<div className="tab-content profile-tab" id="myTabContent">*/}
                                {/*<div className="tab-pane fade show active" id="home" role="tabpanel"*/}
                                     {/*aria-labelledby="home-tab">*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>User Id</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>{this.state.username}</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Name</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>{this.state.name}</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Email</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>{this.state.email}</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Phone</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>123 456 7890</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Profession</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>Web Developer and Designer</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="tab-pane fade" id="profile" role="tabpanel"*/}
                                     {/*aria-labelledby="profile-tab">*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Experience</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>Expert</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Hourly Rate</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>10$/hr</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Total Projects</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>230</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>English Level</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>Expert</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<label>Availability</label>*/}
                                        {/*</div>*/}
                                        {/*<div className="col-md-6">*/}
                                            {/*<p>6 months</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-12">*/}
                                            {/*<label>Your Bio</label><br/>*/}
                                            {/*<p>Your detail description</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </form>
            </div>

        )

    }
}
export default ProfilePage;
