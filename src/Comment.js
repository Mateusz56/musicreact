import React, {Component} from 'react';

class Comment extends Component {
    render() {
        return (
            <React.Fragment>
                <tr>
                    <td align={"left"}>{this.props.username} {this.props.date}</td>
                </tr>
                <tr>
                    <td align={"left"}>{this.props.text}</td>
                </tr>
            </React.Fragment>
        );
    }
}

export default Comment;