import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import Comment from "./Comment";
import FetchFunctions from "./FetchFunctions";

class CommentsList extends Component {
    constructor(props) {
        super(props);

        this.cancelFlag = null
        this.state = {
            comments: [],
            offset: 0,
            canLoadMoreComments: true
        }

        this.loadMoreComments = this.loadMoreComments.bind(this)
        this.handleFetch = this.handleFetch.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    componentWillUnmount() {
        if(this.cancelFlag)
            this.cancelFlag.cancel = true
    }

    loadMoreComments() {
        this.setState((state) => {
            return {
                offset: state.offset + 1
            }
        }, this.fetchData)
    }

    handleFetch(json) {
        if(this.cancelFlag)
            this.cancelFlag = null

        this.setState((state) => {
            let commentsCount = state.comments.length
            let fetchedData = json
            fetchedData.forEach(x => x.date = new Date(x.create_date))
            fetchedData = fetchedData.sort((a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0)
            let newCommentsArray = state.comments.concat(fetchedData)
            if(commentsCount === newCommentsArray.length)
                return {
                    canLoadMoreComments: false
                }

            return {
                comments: newCommentsArray
            }
        })
    }

    fetchData() {
        let params = {
            targetId: this.props.targetId,
            offset: this.state.offset
        }
        if(this.cancelFlag)
            this.cancelFlag.cancel = true

        this.cancelFlag = FetchFunctions.Get(this.props.commentAPILink, params, this.handleFetch)
    }

    render() {
        return (
            <div style={{marginTop: 60}}>
                <Table striped hover>
                    <tbody>
                    {this.state.comments.map(x => {
                        return <Comment key={x.id} username={x.username} text={x.content} date={x.date.toLocaleString()}/>
                    })}
                    {this.state.canLoadMoreComments ?
                        <tr>
                            <td onClick={this.loadMoreComments}>
                                Załaduj więcej komentarzy
                            </td>
                        </tr>
                        :
                        <tr>
                            <td onClick={this.loadMoreComments}>
                                Załadowano wszystkie komentarze
                            </td>
                        </tr>}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default CommentsList;