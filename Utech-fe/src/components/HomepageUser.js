import React, {Component} from 'react';
import Graphic from "./Graphic";
import PageHeader from "ant-design-pro/lib/PageHeader";



class HomepageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: ''
        }
    }






    render() {

        return (

            <div>
                <PageHeader onBack={() => null} title="Home" subTitle="See your results and stats" />,

                <Graphic/>

            </div>
            );

    }
}
export default HomepageUser;
