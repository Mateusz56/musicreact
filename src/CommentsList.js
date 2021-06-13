import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import Comment from "./Comment";

class CommentsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: [],
            offset: 0,
            canLoadMoreComments: true
        }

        this.loadMoreComments = this.loadMoreComments.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    loadMoreComments() {
        this.setState((state) => {
            return {
                offset: state.offset + 1
            }
        }, this.fetchData)
    }

    fetchData() {
        fetch(`http://localhost:8000/${this.props.commentAPILink}/?${this.props.targetId ? "targetId=" + this.props.targetId : ""}${'&offset=' + this.state.offset}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((respone) => respone.json())
            .then((json) => this.setState((state, props) => {
                let commentsCount = state.comments.length
                let newCommentsArray = state.comments.concat(json)
                if(commentsCount === newCommentsArray.length)
                    return {
                        canLoadMoreComments: false
                    }

                return {
                    comments: newCommentsArray
                }
            }))
    }

    render() {
        return (
            <div style={{marginTop: 60}}>
                <Table striped hover>
                    <tbody>
                    {this.state.comments.map(x => {
                        return <Comment username={x.username} text={x.content} date={new Date(x.create_date).toLocaleString()}/>
                    })}
                    {this.state.canLoadMoreComments ?
                        <tr>
                            <td onClick={this.loadMoreComments}>
                                Załaduj więcej komentarzy
                            </td>
                        </tr>
                        : ""}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CommentsList;