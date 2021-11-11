import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";
import FetchFunctions from "./FetchFunctions";

class AddCommentBox extends Component {
    constructor(props) {
        super(props);
        this.sendComment = this.sendComment.bind(this)

        this.state = {
            textboxContent: ""
        }
    }

    sendComment(event) {
        event.preventDefault()

        let body = {
            token: this.props.token,
            song: this.props.songId,
            album: this.props.albumId,
            content: this.state.textboxContent
        }

        FetchFunctions.Post(this.props.commentAPILink, body, () => window.location.reload())
    }

    handleOnChange(event) {
        this.setState({
            textboxContent: event.target.value
        })
    }

    render() {
        return (
            <div>
                <Form style={{textAlign: 'left'}} onSubmit={this.sendComment}>
                    <Form.Label style={{paddingLeft: 10}}>Dodaj komentarz:</Form.Label>
                    <Form.Control as={'textarea'} rows={5} value={this.state.textboxContent} onChange={this.handleOnChange.bind(this)}/>
                    <Button type={'submit'} className={'float-right'}>Dodaj komentarz</Button>
                </Form>
            </div>
        );
    }
}

export default AddCommentBox;