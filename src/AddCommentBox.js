import React, {Component} from 'react';
import {Button, Form} from "react-bootstrap";

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
        fetch(`http://localhost:8000/${this.props.commentAPILink}/`, {
            method: "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                token: this.props.token,
                song: this.props.songId,
                album: this.props.albumId,
                content: this.state.textboxContent
            })
        }).then((response) => {
            if(response.status === 201)
                window.location.reload()
        })
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