import {Component} from "react";
import {getCategories, getLessons} from "../util/APIUtils";
import React from "react";
import List from "antd/es/list";
import Link from "react-router-dom/es/Link";
import Layout from "antd/es/layout";
import Sider from "antd/es/layout/Sider";
import GetDomains from "./GetDomains";

class Categories extends Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            categoryId: 0,
            displayQuestions: false
        }
    }

    markCategory(categoryId){
        this.setState({categoryId: categoryId, displayQuestions: !this.state.displayQuestions});

    }

    componentWillMount() {
        getCategories()
            .then(response => {
                this.setState({
                    categories : response,
                });
            });

    }

    render() {

        return(

            <Layout>
                <Sider>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.categories}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={<a onClick={() => this.markCategory(item.id)}>{item.name}</a>}
                                />
                            </List.Item>
                        )}
                    />
                </Sider>

                {this.state.displayQuestions ? (
                    <GetDomains categoryId = {this.state.categoryId} />
                ) : (<div>
                    <h3></h3>
                        <GetDomains categoryId = {this.state.categoryId} />
                     </div>
                    )}
            </Layout>);

    }
}

export default Categories;