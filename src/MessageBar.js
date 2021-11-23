import React, {Component} from 'react';

class MessageBar extends Component {
    static instance;
    static timeout;

    constructor() {
        super();

        MessageBar.instance = this;
        this.state = {
            message: '',
            isError: false
        }
    }

    errorColor = 'rgba(255,100,100, 0.6)'
    successColor = 'rgba(100,255,100, 0.6)'

    style = {
        position: 'fixed',
        width: '100%',
        height: '60px',
        lineHeight: '60px',
        zIndex: 50
    }

    static ShowError(error) {
        clearTimeout(this.timeout)

        this.instance.setState({
            message: error,
            isError: true
        })

        this.timeout = setTimeout(() => this.instance.setState({
            message: ''
        }), 4000)
    }

    static ShowMessage(message) {
        clearTimeout(this.timeout)

        this.instance.setState({
            message: message,
            isError: false
        })

        this.timeout = setTimeout(() => this.instance.setState({
            message: ''
        }), 4000)
    }

    hideMessage() {
        clearTimeout(MessageBar.timeout)
        this.setState({
            message: '',
        })
    }

    render() {
        return (
            this.state.message ?
            <div onClick={() => this.hideMessage()} style={{...this.style, backgroundColor: this.state.isError ? this.errorColor : this.successColor}}>
                {this.state.message}
            </div>
                :
                ''
        );
    }
}

export default MessageBar;