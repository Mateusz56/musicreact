import React, {Component} from 'react';
import {StarFill} from "react-bootstrap-icons";
import FetchFunctions from "./FetchFunctions";

class Mark extends Component {
    constructor(props) {
        super(props);

        this.cancelFlagMarks = null
        this.cancelFlagAuthor = null

        this.state = {
            starsColor: ['black', 'black', 'black', 'black', 'black'],
            mark: 5
        }

        this.onMouseEnterStar = this.onMouseEnterStar.bind(this)
    }

    componentDidMount() {
        let params = {
            targetId: this.props.targetId
        }

        if(this.cancelFlagMarks)
            this.cancelFlagMarks.cancel = true

        this.cancelFlagMarks = FetchFunctions.Get(this.props.markAPILink, params, (json) =>
            this.setState({
                mark: json.avg ? json.avg.toPrecision(2) : "Brak ocen"
            }))

        if(this.props.token)
        {
            let params = {
                targetId: this.props.targetId
            }
            if(this.cancelFlagAuthor)
                this.cancelFlagAuthor = true

            this.cancelFlagAuthor = FetchFunctions.Get(this.props.markAuthorAPILink, params, (json) =>
                this.setState({
                    myMark: json ? json.mark : '-'
                }, () => this.onMouseEnterStar(json.mark - 1)))
        }
    }

    componentWillUnmount() {
        if(this.cancelFlagMarks)
            this.cancelFlagMarks.cancel = true
        if(this.cancelFlagAuthor)
            this.cancelFlagAuthor.cancel = true
    }

    sendMark(mark) {
        let body = {
            author: this.props.token,
            song: this.props.targetId,
            album: this.props.targetId,
            mark: mark
        }

        FetchFunctions.Put(this.props.markAuthorAPILink, body, (json) => this.setState({
            myMark: json.mark
        }))
    }

    onMouseEnterStar(starIndex) {
        let newArray = this.state.starsColor.slice()
        for(let i = starIndex; i >= 0; i--)
            newArray[i] = 'yellow'
        for(let i = starIndex + 1; i < 5; i++)
            newArray[i] = 'black'

        this.setState({
            starsColor: newArray
        })
    }

    render() {
        return (
            <tr>
                <td width={250} align={"left"} colSpan={1} className={'m-auto'}>Ocena: {this.state.mark}<br/>Twoja ocena: {this.state.myMark}</td>
                {this.props.token ?
                    <td width={200} align={"left"} colSpan={1}
                        onMouseLeave={() => this.onMouseEnterStar(typeof this.state.myMark == 'number' ? this.state.myMark - 1 : -1)}>
                        <StarFill onMouseEnter={() => this.onMouseEnterStar(0)} onClick={() => this.sendMark(1)} size={35}
                                  color={this.state.starsColor[0]}/>
                        <StarFill onMouseEnter={() => this.onMouseEnterStar(1)} onClick={() => this.sendMark(2)} size={35}
                                  color={this.state.starsColor[1]}/>
                        <StarFill onMouseEnter={() => this.onMouseEnterStar(2)} onClick={() => this.sendMark(3)} size={35}
                                  color={this.state.starsColor[2]}/>
                        <StarFill onMouseEnter={() => this.onMouseEnterStar(3)} onClick={() => this.sendMark(4)} size={35}
                                  color={this.state.starsColor[3]}/>
                        <StarFill onMouseEnter={() => this.onMouseEnterStar(4)} onClick={() => this.sendMark(5)} size={35}
                                  color={this.state.starsColor[4]}/>
                    </td>
                    :
                    <td>
                        Zaloguj się, żeby ocenić.
                    </td>
                }
                <td></td>
            </tr>
        );
    }
}

export default Mark;