import React, {Component} from 'react';
import {StarFill} from "react-bootstrap-icons";

class Mark extends Component {
    constructor(props) {
        super(props);

        this.state = {
            starsColor: ['black', 'black', 'black', 'black', 'black'],
            mark: 5
        }

        this.onMouseEnterStar = this.onMouseEnterStar.bind(this)
    }

    componentDidMount() {
        fetch(`http://localhost:8000/${this.props.markAPILink}/?${this.props.targetId}`, {
            method: "GET",
            headers: {
                'content-type': "application/json",
            }
        }).then((response) => response.json())
            .then((json) =>
                this.setState({
                    mark: json.avg ? json.avg.toPrecision(2) : "Brak ocen"
                }))

        if(this.props.token)
            fetch(`http://localhost:8000/${this.props.markAuthorAPILink}/?${this.props.token ? "token=" + this.props.token : ""}${this.props.targetId ? "&songId=" + this.props.targetId : ""}`, {
                method: "GET",
                headers: {
                    'content-type': "application/json",
                }
            }).then((response) => response.json())
                .then((json) =>
                    this.setState({
                        myMark: json.mark
                    }, () => this.onMouseEnterStar(json.mark - 1)))
    }

    sendMark(mark) {
        fetch(`http://localhost:8000/song_mark_author/`, {
            method: "PUT",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify({
                author: this.props.token,
                song: this.props.targetId,
                album: this.props.album,
                mark: mark
            })
        }).then((response) => response.json())
            .then((json) =>
                this.setState({
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
                        onMouseLeave={() => this.onMouseEnterStar(this.state.myMark ? this.state.myMark - 1 : -1)}>
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