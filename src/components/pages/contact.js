import React, { Component } from 'react';
import * as emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';

//components  
import NavBar from '../nav-bar/nav-bar';
import { configName } from '../../config';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: '',
            emailValue: '',
            messageValue: '',
            loader: false,
            loaderStyle: ['Bars', 'Ball-Triangle', 'Circles', 'Oval', 'Rings', 'Puff', 'TailSpin']
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentWillReceiveProps() {
        document.title = "Contact - " + configName;
    }

    componentDidMount() {
        document.title = "Contact - " + configName;
    }

    handleChange(key, event) {
        this.setState({ [key]: event.target.value });
    }

    sendMessage(event) {
        event.preventDefault();
        let context = this;
        this.setState({ loader: true });

        emailjs.init("user_dNOyVSSDZr2JNtu7WwefX");
        emailjs.send("gmail", "m-usman", { name: this.state.nameValue, email: this.state.emailValue, message: this.state.messageValue }).then(function (response) {
            context.setState({ loader: false });
            Swal.fire('Thanks ' + context.state.nameValue, 'Hopfuly i will reply ASAP!', 'success')

        }, function (err) {
            context.setState({ loader: false });
            Swal.fire('Oops...', 'Something went wrong!', 'error')
        });;

        //reset form
        this.setState({ nameValue: '' });
        this.setState({ emailValue: '' });
        this.setState({ messageValue: '' });
    }

    render() {
        return (
            <div className="contact-page">
                <NavBar page="contact" />
                <div className="contact-container">
                    <h2>Contact</h2>
                    {this.state.loader ?
                        <div className="loader">
                            <Loader
                                type={this.state.loaderStyle[Math.floor(Math.random() * this.state.loaderStyle.length)]}
                                color="#00BFFF"
                                height="100"
                                width="100"
                            />
                        </div>
                        : <div></div>
                    }
                    <form className="contact-form" onSubmit={this.sendMessage}>
                        <label htmlFor="name">Name</label>
                        <input required type="text" name="name" value={this.state.nameValue} onChange={this.handleChange.bind(this, 'nameValue')} />
                        <label htmlFor="email">Email</label>
                        <input required type="email" name="email" value={this.state.emailValue} onChange={this.handleChange.bind(this, 'emailValue')} />
                        <label htmlFor="message">Message</label>
                        <textarea required name="message" rows="4" value={this.state.messageValue} onChange={this.handleChange.bind(this, 'messageValue')}></textarea>
                        <button type="submit" className="button send">
                            <span className="icon is-small"><i className="fa fa-envelope"></i></span>
                            Send Message
                    </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Contact;