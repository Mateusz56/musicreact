import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import MessageBar from "./MessageBar";
import Translations from "./Translations";

class ConfirmPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

        if(!this.state.password) {
            MessageBar.ShowError(Translations.GetText('givePassword'))
            return
        }

        this.props.callbackParam.check_password = this.state.password

        this.props.callback(this.props.callbackParam)
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Label>
                        {Translations.GetText('givePassword')}:
                        <Form.Control
                            name="password"
                            type="password"
                            onChange={this.handleInputChange} />
                    </Form.Label>
                    <Button type={'submit'} style={{...this.marginLeft10px, marginBottom: '7px'}}>{Translations.GetText('change')}</Button>
                </Form>
            </div>
        );
    }
}

export default ConfirmPassword;