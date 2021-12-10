import React, {Component} from 'react';
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";
import {Button, Form} from "react-bootstrap";
import Modal from "./Modal";
import ConfirmPassword from "./ConfirmPassword";

class UserPanel extends Component {
    constructor(props) {
        super(props);

        this.cancelFlag = null
        this.state = {
            first_name_placeholder: '',
            last_name_placeholder: '',
            email_placeholder: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.cancelFlag = FetchFunctions.Get('user_info', null,
            (json) => {
                this.setState({
                    first_name_placeholder: json.first_name,
                    last_name_placeholder: json.last_name,
                    email_placeholder: json.email
                })
                this.cancelFlag = null
            })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmitPassword(event) {
        event.preventDefault()

        if (!this.state.newPassword || this.state.newPassword !== this.state.newPasswordConfirm) {
            MessageBar.ShowError('Hasła różnią się.')
            return
        }

        let body = {
            password: this.state.newPassword,
        }

        this.setState({
            passwordCallback: (body) => FetchFunctions.Put('user_detail', body,
                (response) => this.successCallback('Zmieniono hasło.'),
                this.failCallback),
            showModal: true,
            body: body
        })
    }

    handleSubmitNames(event) {
        event.preventDefault()

        let body = {
            first_name: this.state.first_name,
            last_name: this.state.last_name
        }

        this.setState({
            passwordCallback: (body) => FetchFunctions.Put('user_detail', body,
                (response) => this.successCallback('Zmieniono dane.'),
                this.failCallback),
            showModal: true,
            body: body
        })
    }

    handleSubmitEmail(event) {
        event.preventDefault()

        let body = {
            email: this.state.email,
        }

        this.setState({
            passwordCallback: (body) => FetchFunctions.Put('user_detail', body,
                (response) => this.successCallback('Zmieniono adres e-mail.'),
                this.failCallback),
            showModal: true,
            body: body
        })
    }

    successCallback(message) {
        MessageBar.ShowMessage(message)
        this.setState({
            showModal: false
        })
    }

    failCallback(response) {
        if(response.status == 403) {
            MessageBar.ShowError('Podano błędne hasło.')
        } else if (response.status == 400) {
            response.json().then(json => {
                let errorMessage = json.password || json.first_name || json.last_name || json.email
                if(errorMessage)
                    MessageBar.ShowError(errorMessage)
                else
                    throw Error
            })
        }
    }

    marginLeft10px = {
        marginLeft: '10px'
    }

    render() {
        return (
            <div style={{marginTop: '30px'}}>
                <h3>Zmień hasło</h3>
                <Form onSubmit={this.handleSubmitPassword.bind(this)}>
                    <Form.Label>
                        Nowe hasło:
                        <Form.Control
                            name="newPassword"
                            type="password"
                            onChange={this.handleInputChange}/>
                    </Form.Label>
                    <Form.Label style={this.marginLeft10px}>
                        Powtórz nowe hasło:
                        <Form.Control
                            name="newPasswordConfirm"
                            type="password"
                            onChange={this.handleInputChange}/>
                    </Form.Label>
                    <Button type={'submit'} style={{...this.marginLeft10px, marginBottom: '7px'}}>Zmień</Button>
                </Form>
                <br/>
                <br/>
                <h3>Zmień dane</h3>
                <Form onSubmit={this.handleSubmitNames.bind(this)}>
                    <Form.Label>
                        Imię:
                        <Form.Control
                            placeholder={this.state.first_name_placeholder}
                            name="first_name"
                            type="text"
                            onChange={this.handleInputChange}/>
                    </Form.Label>
                    <Form.Label style={this.marginLeft10px}>
                        Nazwisko:
                        <Form.Control
                            placeholder={this.state.last_name_placeholder}
                            name="last_name"
                            type="text"
                            onChange={this.handleInputChange}/>
                    </Form.Label>
                    <Button type={'submit'} style={{...this.marginLeft10px, marginBottom: '7px'}}>Zmień</Button>
                </Form>
                <br/>
                <br/>
                <h3>Zmień adres e-mail</h3>
                <Form onSubmit={this.handleSubmitEmail.bind(this)}>
                    <Form.Label>
                        E-mail:
                        <Form.Control
                            placeholder={this.state.email_placeholder}
                            name="email"
                            type="text"
                            onChange={this.handleInputChange}/>
                    </Form.Label>
                    <Button type={'submit'} style={{...this.marginLeft10px, marginBottom: '7px'}}>Zmień</Button>
                </Form>

                <Modal enabled={this.state.showModal} hideModal={() => this.setState({showModal: false})}>
                    <ConfirmPassword callback={this.state.passwordCallback} callbackParam={this.state.body}/>
                </Modal>
            </div>
        );
    }
}

export default UserPanel;