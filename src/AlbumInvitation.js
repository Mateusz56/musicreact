import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import FetchFunctions from "./FetchFunctions";
import Translations from "./Translations";

class AlbumInvitation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            errorMessage: '',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault()

        let body = {
            username: this.state.username,
            album: this.props.albumId
        }
        FetchFunctions.Post('album_invitation', body,
            () => this.setState({
                errorMessage: '',
                successMessage: `${Translations.GetText('inviteSent')}.`
            }),
            (response) => {
                response.json().then((json) => this.setState(
                    {
                        errorMessage: json,
                        successMessage: ''
                    }
                ))
            })
    }

    render() {
        return (
            <div>
                <h4>{Translations.GetText('invites')}</h4>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row className="align-items-center">
                        <Col>
                            <Form.Control onChange={this.handleInputChange} name={'username'} placeholder={Translations.GetText('username')} />
                        </Col>
                        <Button type={'submit'}>{Translations.GetText('invite')}</Button>
                    </Form.Row>
                </Form>
                <br/>
                <label style={{color: 'red'}}>{this.state.errorMessage}</label>
                <label style={{color: 'green'}}>{this.state.successMessage}</label>
            </div>
        )
    }
}

export default AlbumInvitation;