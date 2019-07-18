import {Component} from "react";
import {getCategories, getLessons, getLessonsByKeyword, getLessonsByKeywordSearch} from "../util/APIUtils";
import React from "react";
import List from "antd/es/list";
import Link from "react-router-dom/es/Link";
import GetDomains from "./GetDomains";
import Input from "antd/es/input";
import Search from "antd/es/input/Search";
import {AutoComplete, Button, Icon, Layout} from 'antd';
import GetLessons from "./GetLessons";
const { Option } = AutoComplete;


const { Header, Footer, Sider, Content } = Layout;



class Categories extends Component{

    constructor(props){
        super(props);
        this.state = {
            categories: [],
            categoryId: 0,
            displayQuestions: false,
            dataSourceBool: false,
            dataSource: [],
            lessonSearched: '',
        };
        this.onSelect=this.onSelect.bind(this);

    }

    markCategory(categoryId){
        this.setState({categoryId: categoryId, displayQuestions: !this.state.displayQuestions , dataSourceBool: false});

    }

    onSelect(value) {
        console.log('onSelect', value);

        this.setState({
            dataSourceBool: true,
            lessonSearched: value

        });

        console.log('onSelect', this.state.lessonSearched);
    }

    componentDidMount() {
    }

    componentWillMount() {
        getCategories()
            .then(response => {
                this.setState({
                    categories : response,
                });
            });

    }

    handleSearch = value => {

        getLessonsByKeywordSearch(value)
            .then(response => {

                this.setState({
                    dataSource: response,
                });
            });
        console.log(this.state.dataSource);

    };


    render() {

        return(

            <Layout>
                <Sider style={{margin:40}}>
                    <h3 style={{margin:40}}>Categories</h3>
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

                <Layout>
                <Header style={{margin: 20}}>
                    <AutoComplete
                        dataSource={this.state.dataSource}
                        style={{ width: 400 }}
                        onSelect={this.onSelect}
                        onSearch={this.handleSearch}
                        placeholder="Search by name, category, mentor etc."
                    />
                </Header>


                <Content>
                    {this.state.dataSourceBool ? (<div> <GetLessons name={this.state.lessonSearched}/></div>) :

                        this.state.displayQuestions ? (
                    <GetDomains categoryId = {this.state.categoryId} />
                ) : (<div>
                    <h3></h3>
                        <GetDomains categoryId = {this.state.categoryId} />
                     </div>
                    )}
                </Content>
            </Layout>
            </Layout>);

    }
}

export default Categories;
