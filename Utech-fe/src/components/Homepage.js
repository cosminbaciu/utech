import React, { Component } from 'react';
import '../app/bootstrap.min.css'; // Tell Webpack that Button.js uses these styles
import './tooplate-style.css';
import './unicons.css'
import './style.css'
import './font-awesome.min.css'
import './imagehover.min.css'
import './style.scss'
import image1 from './images/undraw/undraw_software_engineer_lvl5.svg';

import './home.css';
import './MiApp/css/ionicons.min.css';
import './MiApp/css/magnific-popup.css';
import './MiApp/css/owl.carousel.css';
import './MiApp/css/style.css';
// import './src/components/MiApp/bootstrap/css/bootstrap.css';
// import './src/components/MiApp/bootstrap/css/bootstrap-theme.css';
// import './src/components/MiApp/js/owl.carousel.min.js';


class HomePage extends Component{

    render() {
        return (
            <div>

                        {/* ABOUT */}
                <section className="about full-screen d-lg-flex justify-content-center align-items-center" id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7 col-md-12 col-12 d-flex align-items-center">
                                <div className="about-text">
                                    <small className="small-text">Welcome to <span className="mobile-block">learner community!</span></small>
                                    <h1 className="animated animated-text">
                                        <span className="mr-2">Hey P2P, I'm </span>
                                        <div className="animated-info">
                                            <span className="animated-item">student</span>
                                            <span className="animated-item">prof</span>
                                            <span className="animated-item">mentor</span>

                                        </div>
                                    </h1>
                                    <p>"Share your knowledge.
                                        It’s a way
                                        to achieve immortality."
                                        (Dalai Lama)</p>
                                    <p></p>
                                    <div className="custom-btn-group mt-4">
                                        <a href="/signup" className="btn mr-lg-2 custom-btn"><i className="uil uil-file-alt" /> Sign up</a>
                                        <a href="/login" className="btn custom-btn custom-btn-bg custom-btn-link">Log in</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-12 col-12">
                                <div className="about-image svg">
                                    <img src={image1} className="img-fluid" alt="svg image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* PROJECTS */}
                {/* FEATURES */}

                <section>

                    <div className="box" style={{display: 'flex', justifyContent: 'center', width: '70%'}}>
                        <div className="speech-laptop">
                            <p>Hello!</p>
                        </div>
                        <div className="speech-phone">
                            <p>Hi!</p>
                        </div>
                        <div className="laptop">
                            <div className="top-side">
                                <div className="cam"></div>
                                <div className="screen-laptop">
                                    <div className="person-laptop">
                                        <div className="hair-top"></div>
                                        <div className="hair-bottom"></div>
                                        <div className="face-laptop">
                                            <div className="hair-left"></div>
                                            <div className="hair-right"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-side">
                                <div className="trackpad"></div>
                            </div>
                        </div>
                        <div className="phone">
                            <div className="camera"></div>
                            <div className="screen-phone">
                                <div className="person-phone">
                                    <div className="hair-phone">
                                        <div className="hair-band"></div>
                                    </div>
                                    <div className="face-phone">
                                        <div className="hair-left-phone"></div>
                                        <div className="hair-right-phone"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                <div className="banner" style={{width: "100%"}}>
                    <div className="bg-color">
                        <div className="container">
                            <div className="row">
                                <div className="banner-text text-center">
                                    <div className="text-border">
                                        <h2 className="text-dec">Trust & Quality</h2>
                                    </div>
                                    <div className="intro-para text-center quote">
                                        <p style={{color: 'white'}} className="big-text" >Learning Today . . . Leading Tomorrow.</p>
                                        <p style={{color: 'white'}} className="small-text"> “One of the greatest values of mentors is the ability to see ahead what others cannot see and to help them navigate a course to their destination.” — John C. Maxwell </p>
                                        <a href="#footer" className="btn get-quote">GET A QUOTE</a>
                                    </div>
                                    <a href="#feature" className="mouse-hover">
                                        <div className="mouse"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>


                {/*<section id="feature" className="section-padding">*/}
                    {/*<div className="container">*/}
                        {/*<div className="row">*/}
                            {/*<div className="header-section text-center">*/}
                                {/*<h2>Features</h2>*/}
                                {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem nesciunt*/}
                                    {/*vitae, maiores, magni dolorum aliquam.</p>*/}
                                {/*<hr className="bottom-line"/>*/}
                            {/*</div>*/}
                            {/*<div className="feature-info">*/}
                                {/*<div className="fea">*/}
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="heading pull-right">*/}
                                            {/*<h4>Latest Technologies</h4>*/}
                                            {/*<p>Donec et lectus bibendum dolor dictum auctor in ac erat. Vestibulum*/}
                                                {/*egestas sollicitudin metus non urna in eros tincidunt convallis id id*/}
                                                {/*nisi in interdum.</p>*/}
                                        {/*</div>*/}
                                        {/*<div className="fea-img pull-left">*/}
                                            {/*<i className="fa fa-css3"></i>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="fea">*/}
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="heading pull-right">*/}
                                            {/*<h4>Toons Background</h4>*/}
                                            {/*<p>Donec et lectus bibendum dolor dictum auctor in ac erat. Vestibulum*/}
                                                {/*egestas sollicitudin metus non urna in eros tincidunt convallis id id*/}
                                                {/*nisi in interdum.</p>*/}
                                        {/*</div>*/}
                                        {/*<div className="fea-img pull-left">*/}
                                            {/*<i className="fa fa-drupal"></i>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="fea">*/}
                                    {/*<div className="col-md-4">*/}
                                        {/*<div className="heading pull-right">*/}
                                            {/*<h4>Award Winning Design</h4>*/}
                                            {/*<p>Donec et lectus bibendum dolor dictum auctor in ac erat. Vestibulum*/}
                                                {/*egestas sollicitudin metus non urna in eros tincidunt convallis id id*/}
                                                {/*nisi in interdum.</p>*/}
                                        {/*</div>*/}
                                        {/*<div className="fea-img pull-left">*/}
                                            {/*<i className="fa fa-trophy"></i>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</section>*/}

                {/*<section id="organisations" className="section-padding">*/}
                    {/*<div className="container">*/}
                        {/*<div className="row">*/}
                            {/*<div className="col-md-6">*/}
                                {/*<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">*/}
                                    {/*<div className="orga-stru">*/}
                                        {/*<h3>65%</h3>*/}
                                        {/*<p>Say NO!!</p>*/}
                                        {/*<i className="fa fa-male"></i>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">*/}
                                    {/*<div className="orga-stru">*/}
                                        {/*<h3>20%</h3>*/}
                                        {/*<p>Says Yes!!</p>*/}
                                        {/*<i className="fa fa-male"></i>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">*/}
                                    {/*<div className="orga-stru">*/}
                                        {/*<h3>15%</h3>*/}
                                        {/*<p>Can't Say!!</p>*/}
                                        {/*<i className="fa fa-male"></i>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-md-6">*/}
                                {/*<div className="detail-info">*/}
                                    {/*<hgroup>*/}
                                        {/*<h3 className="det-txt"> Is inclusive quality education affordable?</h3>*/}
                                        {/*<h4 className="sm-txt">(Revised and Updated for 2016)</h4>*/}
                                    {/*</hgroup>*/}
                                    {/*<p className="det-p">Donec et lectus bibendum dolor dictum auctor in ac erat.*/}
                                        {/*Vestibulum egestas sollicitudin metus non urna in eros tincidunt convallis id id*/}
                                        {/*nisi in interdum.</p>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</section>*/}


                {/*<div className="container">*/}
                    {/*<h2>Carousel Example</h2>*/}
                    {/*<div id="myCarousel" className="carousel slide" data-ride="carousel">*/}
                        {/*<ol className="carousel-indicators">*/}
                            {/*<li data-target="#myCarousel" data-slide-to="0" className="active"></li>*/}
                            {/*<li data-target="#myCarousel" data-slide-to="1"></li>*/}
                            {/*<li data-target="#myCarousel" data-slide-to="2"></li>*/}
                        {/*</ol>*/}
                        {/*<div className="carousel-inner">*/}
                            {/*<div className="item active">*/}
                                {/*<img src={image2} alt="Los Angeles" style={{width:"100%"}}/>*/}
                            {/*</div>*/}

                            {/*<div className="item">*/}
                                {/*<img src={image3} alt="Chicago" style={{width:"100%"}}/>*/}
                            {/*</div>*/}

                            {/*<div className="item">*/}
                                {/*<img src={image2} alt="New york" style={{width:"100%"}}/>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        {/*<a className="left carousel-control" href="#myCarousel" data-slide="prev">*/}
                            {/*<span className="glyphicon glyphicon-chevron-left"></span>*/}
                            {/*<span className="sr-only">Previous</span>*/}
                        {/*</a>*/}
                        {/*<a className="right carousel-control" href="#myCarousel" data-slide="next">*/}
                            {/*<span className="glyphicon glyphicon-chevron-right"></span>*/}
                            {/*<span className="sr-only">Next</span>*/}
                        {/*</a>*/}
                    {/*</div>*/}
                {/*</div>*/}

                    {/*<section className="resume py-5 d-lg-flex justify-content-center align-items-center" id="resume">*/}
                    {/*<div className="container">*/}
                        {/*<div className="row">*/}
                            {/*<div className="col-lg-6 col-12">*/}
                                {/*<h2 className="mb-4">Experiences</h2>*/}
                                {/*<div className="timeline">*/}
                                    {/*<div className="timeline-wrapper">*/}
                                        {/*<div className="timeline-yr">*/}
                                            {/*<span>2019</span>*/}
                                        {/*</div>*/}
                                        {/*<div className="timeline-info">*/}
                                            {/*<h3><span>Project Manager</span><small>Best Studio</small></h3>*/}
                                            {/*<p>Proin ornare non purus ut rutrum. Nulla facilisi. Aliquam laoreet libero ac pharetra feugiat. Cras ac fermentum nunc, a faucibus nunc.</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="timeline-wrapper">*/}
                                        {/*<div className="timeline-yr">*/}
                                            {/*<span>2018</span>*/}
                                        {/*</div>*/}
                                        {/*<div className="timeline-info">*/}
                                            {/*<h3><span>UX Designer</span><small>Digital Ace</small></h3>*/}
                                            {/*<p>Fusce rutrum augue id orci rhoncus molestie. Nunc auctor dignissim lacus vel iaculis.</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="timeline-wrapper">*/}
                                        {/*<div className="timeline-yr">*/}
                                            {/*<span>2016</span>*/}
                                        {/*</div>*/}
                                        {/*<div className="timeline-info">*/}
                                            {/*<h3><span>UI Freelancer</span></h3>*/}
                                            {/*<p>Sed fringilla vitae enim sit amet cursus. Sed cursus dictum tortor quis pharetra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="timeline-wrapper">*/}
                                        {/*<div className="timeline-yr">*/}
                                            {/*<span>2014</span>*/}
                                        {/*</div>*/}
                                        {/*<div className="timeline-info">*/}
                                            {/*<h3><span>Junior Designer<small>Crafted Co.</small></span></h3>*/}
                                            {/*<p>Cras scelerisque scelerisque condimentum. Nullam at volutpat mi. Nunc auctor ipsum eget magna consequat viverra.</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-lg-6 col-12">*/}
                                {/*<h2 className="mb-4 mobile-mt-2">Educations</h2>*/}
                                {/*<div className="timeline">*/}
                                    {/*<div className="timeline-wrapper">*/}
                                        {/*<div className="timeline-yr">*/}
                                            {/*<span>2017</span>*/}
                                        {/*</div>*/}
                                        {/*<div className="timeline-info">*/}
                                            {/*<h3><span>Mobile Web</span><small>Master Design</small></h3>*/}
                                            {/*<p>Please tell your friends about Tooplate website. That would be very helpful. We need your support.</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="timeline-wrapper">*/}
                                        {/*<div className="timeline-yr">*/}
                                            {/*<span>2015</span>*/}
                                        {/*</div>*/}
                                        {/*<div className="timeline-info">*/}
                                            {/*<h3><span>User Interfaces</span><small>Creative Agency</small></h3>*/}
                                            {/*<p><a rel="nofollow" href="https://www.facebook.com/tooplate">Tooplate</a> is a great website to download HTML templates without any login or email.</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                    {/*<div className="timeline-wrapper">*/}
                                        {/*<div className="timeline-yr">*/}
                                            {/*<span>2013</span>*/}
                                        {/*</div>*/}
                                        {/*<div className="timeline-info">*/}
                                            {/*<h3><span>Artwork Design</span><small>New Art School</small></h3>*/}
                                            {/*<p>You can freely use Tooplate's templates for your business or personal sites. You cannot redistribute this template without a permission.</p>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</section>*/}
                {/* CONTACT */}

                {/*<section id='screenshots' className='section screenshots-section bg-lightgray'>*/}
                    {/*<div className='container'>*/}
                        {/*<div className='top-section-header'>*/}
                            {/*<h2>Screenshots</h2>*/}
                            {/*<p>Take a look at the app by its screenshots</p>*/}
                        {/*</div>*/}
                        {/*<ul className='screenshots-slider'>*/}
                            {/*<li>*/}
                                {/*<div className='inner'>*/}
                                    {/*<img src={image2} alt style={{width: 0.3, height: 'auto'}}/> */}
                                        {/*<div className='overlay'>*/}
                                            {/*<a href={image2} className='view-btn'>*/}
                                                {/*<i className='ion-ios-plus-empty'></i>*/}
                                            {/*</a>*/}
                                        {/*</div>*/}
                                {/*</div>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                                {/*<div className='inner'>*/}
                                    {/*<img src={image3} alt style={{width: 0.3, height: 'auto'}}/>*/}
                                        {/*<div className='overlay'>*/}
                                            {/*<a href={image3} className='view-btn'>*/}
                                                {/*<i className='ion-ios-plus-empty'></i>*/}
                                            {/*</a>*/}
                                        {/*</div>*/}
                                {/*</div>*/}
                            {/*</li>*/}
                            {/*/!*<li>*!/*/}
                                {/*/!*<div className='inner'>*!/*/}
                                    {/*/!*<img src='img/screens/3.jpg' alt>*!/*/}
                                        {/*/!*<div className='overlay'>*!/*/}
                                            {/*/!*<a href='img/screens/3.jpg' className='view-btn'>*!/*/}
                                                {/*/!*<i className='ion-ios-plus-empty'></i>*!/*/}
                                            {/*/!*</a>*!/*/}
                                        {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}
                            {/*/!*</li>*!/*/}
                            {/*/!*<li>*!/*/}
                                {/*/!*<div className='inner'>*!/*/}
                                    {/*/!*<img src='img/screens/4.jpg' alt>*!/*/}
                                        {/*/!*<div className='overlay'>*!/*/}
                                            {/*/!*<a href='img/screens/4.jpg' className='view-btn'>*!/*/}
                                                {/*/!*<i className='ion-ios-plus-empty'></i>*!/*/}
                                            {/*/!*</a>*!/*/}
                                        {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}
                            {/*/!*</li>*!/*/}
                            {/*/!*<li>*!/*/}
                                {/*/!*<div className='inner'>*!/*/}
                                    {/*/!*<img src='img/screens/5.jpg' alt>*!/*/}
                                        {/*/!*<div className='overlay'>*!/*/}
                                            {/*/!*<a href='img/screens/5.jpg' className='view-btn'>*!/*/}
                                                {/*/!*<i className='ion-ios-plus-empty'></i>*!/*/}
                                            {/*/!*</a>*!/*/}
                                        {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}
                            {/*/!*</li>*!/*/}
                            {/*/!*<li>*!/*/}
                                {/*/!*<div className='inner'>*!/*/}
                                    {/*/!*<img src='img/screens/6.jpg' alt>*!/*/}
                                        {/*/!*<div className='overlay'>*!/*/}
                                            {/*/!*<a href='img/screens/6.jpg' className='view-btn'>*!/*/}
                                                {/*/!*<i className='ion-ios-plus-empty'></i>*!/*/}
                                            {/*/!*</a>*!/*/}
                                        {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}
                            {/*/!*</li>*!/*/}
                            {/*/!*<li>*!/*/}
                                {/*/!*<div className='inner'>*!/*/}
                                    {/*/!*<img src='img/screens/8.jpg' alt>*!/*/}
                                        {/*/!*<div className='overlay'>*!/*/}
                                            {/*/!*<a href='img/screens/8.jpg' className='view-btn'>*!/*/}
                                                {/*/!*<i className='ion-ios-plus-empty'></i>*!/*/}
                                            {/*/!*</a>*!/*/}
                                        {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}
                            {/*/!*</li>*!/*/}
                            {/*/!*<li>*!/*/}
                                {/*/!*<div className='inner'>*!/*/}
                                    {/*/!*<img src='img/screens/9.jpg' alt>*!/*/}
                                        {/*/!*<div className='overlay'>*!/*/}
                                            {/*/!*<a href='img/screens/9.jpg' className='view-btn'>*!/*/}
                                                {/*/!*<i className='ion-ios-plus-empty'></i>*!/*/}
                                            {/*/!*</a>*!/*/}
                                        {/*/!*</div>*!/*/}
                                {/*/!*</div>*!/*/}
                            {/*/!*</li>*!/*/}
                        {/*</ul>*/}
                    {/*</div>*/}
                {/*</section>*/}


                <section id='pricing' className='section pricing-section'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='col-section-header'>
                                    <h2>Choose your plan or get started with free trial</h2>
                                    <p>
                                        As a mentor, you should purchase a plan, monthly on yearly. At least, you can try our app one week by clicking this button.
                                    </p>
                                    <a href='/signup' className='btn-minimal'>
                                        Get Free Trial
                                    </a>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='p-table'>
                                    <div className='header'>
                                        <h4>Basic</h4>
                                        <div className='price'>
                                            <span className='currency'>LEI</span>
                                            <span className='amount'>13</span>
                                            <span className='period'>/mo</span>
                                        </div>
                                    </div>
                                    <ul className='items'>
                                        <li>1eTB Storag</li>
                                        <li>Late Support</li>
                                        <li>2 tutorings /day</li>
                                    </ul>
                                    <a href='/signup' className='btn-minimal'>
                                        Sign Up
                                    </a>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='p-table'>
                                    <div className='header'>
                                        <h4>Pro</h4>
                                        <div className='price'>
                                            <span className='currency'>LEI</span>
                                            <span className='amount'>100</span>
                                            <span className='period'>/yr</span>
                                        </div>
                                    </div>
                                    <ul className='items'>
                                        <li>2TB Storage</li>
                                        <li>Instant Support</li>
                                        <li>Unlimited tutorings</li>
                                    </ul>
                                    <a href='/signup' className='btn-minimal'>
                                        Sign Up
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="footer py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-12">
                                <p className="copyright-text text-center">Copyright © 2019 Company Name . All rights reserved</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        );
    }

}

export default  HomePage;
