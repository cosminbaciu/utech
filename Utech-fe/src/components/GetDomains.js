import {Component} from "react";
import {getDomains, getLessons} from "../util/APIUtils";
import {Button, Form, Input} from "antd";
import FormItem from "./AddLessonForm";
import React from "react";
import * as antd from "antd";
import Categories from "./Categories";
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";

const { Card, Icon, Avatar } = antd;

const { Meta } = Card;


class GetDomains extends Component{

    constructor(props){
        super(props);
        this.state = {
            domains: []
        }
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
        return (
            <div>
                <Layout>
                    <ul>

                        {this.state.domains.map(function(domain, index){

                            return(
                                <Card
                                    style={{width: 300}}
                                    cover={<img alt="example"
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwyHi43XgiMlHnEBjLSAolNuLV4_V2EIdieYapr3rmsxEQ6Dz-VA"/>}
                                    actions={[<Icon type="setting"/>, <Icon type="edit"/>, <Icon type="ellipsis"/>]}
                                >
                                    <Meta
                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                        title={domain.name}
                                    />
                                </Card>);
                        })}
                    </ul>
                </Layout>
            </div>

        );
    }

}

export default GetDomains;