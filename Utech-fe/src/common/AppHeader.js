import React, { Component } from 'react';
import {    
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import {getLessonsByDomain, getNextLessons} from "../util/APIUtils";
const Header = Layout.Header;
    
class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessonSchedulers: []
        }
        this.handleMenuClick = this.handleMenuClick.bind(this);   
    }

    handleMenuClick({ key }) {
      if(key === "logout") {
        this.props.onLogout();
      }
    }

    // componentDidMount() {
    //
    //     var now = new Date();
    //     var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 49, 0, 0) - now;
    //     if (millisTill10 < 0) {
    //         millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    //     }
    //     setTimeout(function(){
    //         window.alert("It's 10am!")}, millisTill10);
    // }

    componentWillMount() {
        getNextLessons()
            .then(response => {
                this.setState({
                    lessonSchedulers : response
                });
            });

        console.log(this.state.lessonSchedulers);
        if(this.state.lessonSchedulers.length > 0)
            for(var i=0; i< this.state.lessonSchedulers.length; i++)
                window.alert("Peste o ora aveti o lectie");
    }

    // componentDidMount(){
    //     getNextLessons()
    //         .then(response => {
    //             this.setState({
    //                 lessons : response
    //             });
    //         });
    //
    //     console.log(this.state.lessons);
    //     if(this.state.lessons.length > 0)
    //         for(var i=0; i< this.state.lessons.length; i++)
    //             window.alert("Peste o ora aveti o lectie");
    //
    // }



    render() {
        let menuItems;
        if(this.props.currentUser) {
          menuItems = [
            <Menu.Item key="/">
              <Link to="/profilePage">
                <Icon type="home" className="nav-icon" />
              </Link>
            </Menu.Item>,
          <Menu.Item key="/getCategories">
              <Link to="/getCategories">
                  <Icon type="search" className="nav-icon" />
              </Link>
          </Menu.Item>,
          <Menu.Item key="/getMessages">
              <Link to="/getMessages">
                  <Icon type="mail" className="nav-icon" />
              </Link>
          </Menu.Item>,
          <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu 
                  currentUser={this.props.currentUser} 
                  handleMenuClick={this.handleMenuClick}/>
            </Menu.Item>
          ]; 
        } else {
          menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>  ,
              /*<Menu.Item key="/stream">
                  <Link to="/stream">Stream</Link>
              </Menu.Item>*/

          ];
        }

        return (
            <Header className="app-header">
            <div className="container">
              <div className="app-title" >
                <Link to="/profilePage">UTech</Link>
              </div>
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[this.props.location.pathname]}
                style={{ lineHeight: '64px' }} >
                  {menuItems}
              </Menu>
            </div>
          </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
  const dropdownMenu = (
    <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
      <Menu.Item key="user-info" className="dropdown-item" disabled>
        <div className="user-full-name-info">
          {props.currentUser.name}
        </div>
        <div className="username-info">
          @{props.currentUser.username}
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="profile" className="dropdown-item">
        <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
      </Menu.Item>
        <Menu.Item key="/addLesson">
            <Link to="/addLesson">
                Add lesson
            </Link>
        </Menu.Item>
        {/*<Menu.Item key="my lessons" className="dropdown-item">*/}
            {/*My lessons*/}

            {/*/!*<Link to={`/users/${props.currentUser.username}`}>Profile</Link>*!/*/}
        {/*</Menu.Item>*/}
        <Menu.Item key="my lessons" className="dropdown-item">
            <Link to ="/scheduled">
                My scheduled lessons
            </Link>
            {/*<Link to={`/users/${props.currentUser.username}`}>Profile</Link>*/}
        </Menu.Item>
        <Menu.Item key="my lessons" className="dropdown-item">
            <Link to ="/history">
            History
            </Link>
            {/*<Link to={`/users/${props.currentUser.username}`}>Profile</Link>*/}
        </Menu.Item>


      <Menu.Item key="logout" className="dropdown-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown 
      overlay={dropdownMenu} 
      trigger={['click']}
      getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}>
      <a className="ant-dropdown-link">
         <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
      </a>
    </Dropdown>
  );
}


export default withRouter(AppHeader);
