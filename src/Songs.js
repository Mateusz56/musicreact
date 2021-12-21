import React, {Component} from 'react';
import {Col, Dropdown, Form} from "react-bootstrap";
import SongList from "./SongList";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import FetchFunctions from "./FetchFunctions";
import GlobalSettings from "./GlobalSettings";

class Songs extends Component {
    constructor(props) {
        super(props);

        this.cancelFlag = null
        this.state = {
            genres: [],
            genresInput: [],
            nameInput: "",
            yearSince: 1900,
            yearTo: 2021,
            markInput: 5,
            markLess: false,
            markMore: false,
            markEqual: false,
            favourite: false,
            genresText: "",
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleGenreCheckboxChange = this.handleGenreCheckboxChange.bind(this)
    }

    componentDidMount() {
        this.cancelFlag = FetchFunctions.Get("genres", null,
            (json) => {
                this.cancelFlag = null
                this.setState({
                    genres: json
                })
            });
    }

    componentWillUnmount() {
        if (this.cancelFlag)
            this.cancelFlag.cancel = true
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (name === 'markLess')
            this.setState({
                [name]: value,
                markMore: false
            })
        else if (name === 'markMore')
            this.setState({
                [name]: value,
                markLess: false
            })
        else
            this.setState({
                [name]: value
            });
    }

    handleGenreCheckboxChange(event) {
        const target = event.target;
        const value = target.checked;
        const name = target.name;

        const genresInput = this.state.genresInput
        if (value)
            genresInput.push(name)
        else
            for (let i = 0; i < genresInput.length; i++) {
                if (genresInput[i] === name) {
                    genresInput.splice(i, 1);
                }
            }

        this.setState({
            genresInput: genresInput
        }, this.createGenresString);
    }

    createGenresString() {
        let genresString = this.state.genresInput.join(',')
        this.setState({
            genresText: genresString
        })
    }

    render() {
        return (
            <div>
                <Form className={GlobalSettings.skinMode} style={{marginBottom: 20}}>
                    <Form.Row className="align-items-center">
                        <Col md={2}>
                            <Form.Control onChange={this.handleInputChange} name={'nameInput'}
                                          placeholder="Nazwa piosenki lub wykonawcy"/>
                        </Col>
                        <Col md={0.5} style={{marginLeft: 10, marginRight: 30}}>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                    Gatunki
                                </Dropdown.Toggle>
                                <DropdownMenu style={{margin: '100'}}>
                                    {this.state.genres.map(x => <Form.Check onChange={this.handleGenreCheckboxChange}
                                                                            key={x} name={x} style={{marginLeft: 10}}
                                                                            label={x} type={'checkbox'}/>)}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col md={0.5}>
                            Rok od
                        </Col>
                        <Col md={0.5}>
                            <Form.Control onChange={this.handleInputChange} name={'yearSince'} type={'number'}
                                          value={this.state.yearSince} min={1900} max={2021}/>
                        </Col>
                        <Col md={0.5}>
                            do
                        </Col>
                        <Col md={0.5}>
                            <Form.Control onChange={this.handleInputChange} name={'yearTo'} type={'number'}
                                          value={this.state.yearTo} min={1900} max={2021}/>
                        </Col>
                        <Col md={0.5} style={{marginLeft: 30}}>
                            Ocena
                        </Col>
                        <Col md={0.25}>
                            <Form.Control onChange={this.handleInputChange} name={'markInput'} type={'number'}
                                          value={this.state.markInput} step={0.1} min={1} max={5}/>
                        </Col>
                        <Col md={0.25}>
                            <Form.Check onChange={this.handleInputChange} inline style={{marginLeft: 10}}
                                        label={"Mniejsza"} name={'markLess'} checked={this.state.markLess} id={1}/>
                            <Form.Check onChange={this.handleInputChange} inline style={{marginLeft: 10}}
                                        label={"Większa"} name={'markMore'} checked={this.state.markMore} id={2}/>
                            <Form.Check onChange={this.handleInputChange} inline style={{marginLeft: 10}}
                                        label={"Równa"} name={'markEqual'} checked={this.state.markEqual} id={3}/>
                        </Col>
                        <Col md={0.25}>
                            <Form.Check onChange={this.handleInputChange} inline style={{marginLeft: 20}}
                                        label={"Ulubione"} name={"favourite"} checked={this.state.favourite} id={4}/>
                        </Col>
                    </Form.Row>
                </Form>
                <SongList name={this.state.nameInput} genres={this.state.genresText} yearSince={this.state.yearSince}
                          yearTo={this.state.yearTo} markInput={this.state.markInput} markLess={this.state.markLess}
                          markMore={this.state.markMore} markEqual={this.state.markEqual} history={this.props.history}
                          favourite={this.state.favourite}/>
            </div>
        );
    }
}

export default Songs;