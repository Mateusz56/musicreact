import React, {Component} from 'react';
import {Col, Dropdown, Form} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import AlbumList from "./AlbumList";

class Albums extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Form style={{marginBottom: 20}}>
                    <Form.Row className="align-items-center">
                        <Col md={2}>
                            <Form.Control onChange={this.handleInputChange} name={'nameInput'} placeholder="Nazwa albumu" />
                        </Col>
                    </Form.Row>
                </Form>
                <AlbumList name={this.state.name} history={this.props.history}/>
            </div>
        );
    }
}

export default Albums;