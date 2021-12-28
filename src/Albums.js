import React, {Component} from 'react';
import {Col, Form} from "react-bootstrap";
import AlbumList from "./AlbumList";
import Translations from "./Translations";

class Albums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameInput: "",
            favourite: false,
            public: false,
            myAlbums: this.props.myAlbums
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.myAlbums !== this.props.myAlbums)
            this.setState({
                myAlbums: this.props.myAlbums
            })
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value
        })
    }

    render() {
        return (
            <div>
                <Form style={{marginBottom: 20}}>
                    <Form.Row className="align-items-center">
                        <Col md={2}>
                            <Form.Control onChange={this.handleInputChange} name={'nameInput'} placeholder={Translations.GetText('albumNameOrPerformer')} />
                        </Col>
                        {sessionStorage.getItem('userLoggedIn') ?
                        <Col md={0.25}>
                            <Form.Check onChange={this.handleInputChange} inline style={{marginLeft: 10}} label={Translations.GetText('favourite')} name={'favourite'} checked={this.state.favourite} id={0}/>
                        </Col>
                            :
                            ''}
                    </Form.Row>
                </Form>
                <AlbumList name={this.state.nameInput} history={this.props.history} favourite={this.state.favourite} myAlbums={this.state.myAlbums}/>
            </div>
        );
    }
}

export default Albums;