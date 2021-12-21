import React, {Component} from 'react';
import {Button, Col, Form} from "react-bootstrap";
import {withCookies} from "react-cookie";
import FetchFunctions from "./FetchFunctions";
import MessageBar from "./MessageBar";
import GlobalSettings from "./GlobalSettings";

class AddAlbum extends Component {
    constructor(props) {
        super(props);
        this.cookies = props.cookies;

        this.state = {
            albumName: "",
            isPublic: false,
            userId: this.cookies.get('user_id')
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
            name: this.state.albumName,
            public: this.state.isPublic,
            owners: [this.state.userId]
        }
        FetchFunctions.Post("album", body, (response) => MessageBar.ShowMessage('Dodano album.'),
            (response) => response.json().then(json => {
                if(json.name)
                    MessageBar.ShowError(json.name)
                else
                    throw Error
            }))
    }

    render() {
        return (
            <div style={{width: '600px'}}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row className="align-items-center">
                        <Col>
                            <Form.Control onChange={this.handleInputChange} name={'albumName'} placeholder="Nazwa albumu" />
                        </Col>
                        <Col>
                            <Form.Check onChange={this.handleInputChange} inline style={{marginLeft: 10}} label={"Publiczny"} name={'isPublic'} checked={this.state.public} id={0}/>
                        </Col>
                        <Button type={'submit'}>Dodaj album</Button>
                    </Form.Row>
                </Form>
            </div>
        )
    }
}

export default withCookies(AddAlbum);