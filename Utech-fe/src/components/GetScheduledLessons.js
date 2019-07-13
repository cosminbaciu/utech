import {Component} from "react";
import {getDomains, getLessons, getScheduledLessons} from "../util/APIUtils";
import {Button, Form, Input} from "antd";
import FormItem from "./AddLessonForm";
import React from "react";
import * as antd from "antd";
import Categories from "./Categories";
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";
import GetLessons from "./GetLessons";

const { Card, Icon, Avatar } = antd;

const { Meta } = Card;


class GetScheduledLessons extends Component{

    constructor(props){
        super(props);
        this.state = {
            scheduledLessons: [],
            displayQuestions: false
        }
    }

    markDomain(){
        this.setState({ displayQuestions: !this.state.displayQuestions});

    }

    componentWillMount() {

        getScheduledLessons()
            .then(response => {
                this.setState({
                    scheduledLessons : response
                });
            });

        var date = new Date();
        date.setMinutes(date.getMinutes() + 30);

        console.log(date);
        console.log(new Date());
        console.log(Math.round((((date - new Date())) % 86400000) % 3600000) / 60000)
    }


    render() {
        const self = this;
        return (
            <div>
                <Layout>

                    <ul>

                        {this.state.scheduledLessons.map(function(scheduledLesson, index){

                            return(
                                <div style={{margin:40}}>
                                    { Math.round((((new Date(scheduledLesson.scheduletAt).getMinutes() - new Date().getMinutes())) % 86400000) % 3600000) / 60000 <60 && new Date(scheduledLesson.scheduletAt)> new Date() ? (

                                    <Card
                                        style={{width: 300}}
                                        cover={<img alt="example"
                                                    src="https://giordanos.com/wp-content/uploads/coming-soon-v2.png"/>}
                                        actions={[ <a  href={'/stream'}><Icon type="caret-right"  /> </a> , <Icon type="edit"/>, <Icon type="heart" theme="twoTone" />]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={scheduledLesson.name}
                                            description={(new Date(scheduledLesson.scheduletAt)).toLocaleString()}
                                        />
                                    </Card>)
                                        :
                                        (<Card
                                            style={{width: 300}}
                                            cover={<img alt="example"
                                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyHi43XgiMlHnEBjLSAolNuLV4_V2EIdieYapr3rmsxEQ6Dz-VA"/>}
                                            actions={[ <Icon type="plus" />, <Icon type="edit"/>, <Icon type="heart" theme="twoTone" />]}
                                        >
                                            <Meta
                                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                                title={scheduledLesson.name}
                                                description={(new Date(scheduledLesson.scheduletAt)).toLocaleString()}
                                            />
                                        </Card>) }
                                </div>);
                        })}
                    </ul>
                </Layout>
            </div>

        );
    }

}

export default GetScheduledLessons;
