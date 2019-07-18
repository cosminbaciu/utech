import {Component} from "react";
import {getDomains, getLessons} from "../util/APIUtils";
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


class GetDomains extends Component{

    constructor(props){
        super(props);
        this.state = {
            domains: [],
            domainId: 0,
            displayQuestions: false
        }
    }

    markDomain(domainId){
        this.setState({domainId: domainId, displayQuestions: !this.state.displayQuestions});

    }

    componentWillMount() {

        var categoryId = this.props.categoryId;

        getDomains(categoryId)
            .then(response => {
                this.setState({
                    domains : response
                });
            });
    }


    render() {
        const self = this;
        return (
            <div>
                <Layout>
                    {/*<Sider style={{margin:40}}>*/}
                        {/*<h3 style={{margin:20}}>Categories</h3>*/}
                        {/*<Categories />*/}
                    {/*</Sider>*/}

                    <ul>

                        {!this.state.displayQuestions ? (this.state.domains.map(function(domain, index){

                            return(
                                <div style={{margin:40}}>
                                    <Card
                                        style={{width: 300}}
                                        cover={<img alt="example"
                                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyHi43XgiMlHnEBjLSAolNuLV4_V2EIdieYapr3rmsxEQ6Dz-VA"/>}
                                        actions={[<a onClick={() => self.markDomain(domain.id)}> <Icon type="plus" /></a>, <Icon type="edit"/>, <Icon type="heart" theme="twoTone" />]}
                                    >
                                        <Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={domain.name}
                                        />
                                    </Card>
                                </div>);
                        })): (<GetLessons domain = {this.state.domainId} name={""}/>)}
                    </ul>
                </Layout>
            </div>

        );
    }

}

export default GetDomains;
