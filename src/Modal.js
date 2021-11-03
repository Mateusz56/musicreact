import React, {Component} from 'react';
import {Form} from "react-bootstrap";

class Modal extends Component {
    constructor(props) {
        super(props);

        this.escFunction = this.escFunction.bind(this)
    }

    escFunction(event){
        if(event.keyCode === 27) {
            this.props.hideModal()
        }
    }

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    outerDivStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 10
    }

    innerDivStyle = {
        position: 'fixed',
        background: 'white',
        height: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '30px',
        border: '2px',
        borderStyle: 'solid',
    }

    render() {
        return (this.props.enabled ?
                <div style={this.outerDivStyle} onClick={(event) => {
                    if(event.currentTarget == event.target) this.props.hideModal()
                    }
                }>
                    <div style={this.innerDivStyle}>
                        {this.props.children}
                    </div>
                </div>
                : ""
        );
    }
}

export default Modal;