import React, {Component} from 'react';
import {Envelope} from "react-bootstrap-icons";
import {Button, Col, Form} from "react-bootstrap";

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

        fetch("http://localhost:8000/album_invitation/", {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                username: this.state.username,
                album: this.props.albumId
            })
        }).then((response) => {
            if(response.status === 201)
                this.setState({
                    errorMessage: '',
                    successMessage: 'Wysłano zaproszenie.'
                })
            else if(response.status === 406 || response.status === 404)
                response.json().then(json => this.setState(
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
                <h4>Zaproś do albumu</h4>
                <br/>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row className="align-items-center">
                        <Col>
                            <Form.Control onChange={this.handleInputChange} name={'username'} placeholder="Nazwa użytkownika" />
                        </Col>
                        <Button type={'submit'}>Zaproś</Button>
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