import React, {Component} from 'react';
import {Col, Container, Dropdown, Form} from "react-bootstrap";
import SongList from "./SongList";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import FetchFunctions from "./FetchFunctions";
import GlobalSettings from "./GlobalSettings";
import Translations from "./Translations";

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
                <Form className={GlobalSettings.skinMode} style={{marginBottom: '10px', marginTop: '10px'}}>
                    <Form.Row className={'songFormRow'}>
                        <Col xs={9} sm={4} md={4} xl={'auto'} style={{width: '260px'}}>
                            <Form.Control onChange={this.handleInputChange} name={'nameInput'}
                                          placeholder={Translations.GetText('nameOfSongOrPerformer')}/>
                        </Col>
                        <Col xs={3} sm={2} md={2} xl={'auto'}>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                                    {Translations.GetText('genres')}
                                </Dropdown.Toggle>
                                <DropdownMenu style={{margin: '100'}}>
                                    {this.state.genres.map(x => <Form.Check onChange={this.handleGenreCheckboxChange}
                                                                            key={x} name={x} style={{marginLeft: 10}}
                                                                            label={x} type={'checkbox'}/>)}
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                        <Col xs={3} sm={1} md={1} xl={'auto'} className={'marginIfDesktop'}>
                            {Translations.GetText('yearSince')}
                        </Col>
                        <Col xs={3} sm={2} md={2} xl={'auto'}>
                            <Form.Control onChange={this.handleInputChange} name={'yearSince'} type={'number'}
                                          value={this.state.yearSince} min={1900} max={2021}/>
                        </Col>
                        <Col xs={2} sm={1} md={1} xl={'auto'}>
                            {Translations.GetText('to')}
                        </Col>
                        <Col xs={4} sm={2} md={2} xl={'auto'}>
                            <Form.Control onChange={this.handleInputChange} name={'yearTo'} type={'number'}
                                          value={this.state.yearTo} min={1900} max={2021}/>
                        </Col>
                        <Col xs={3} sm={1} md={1} xl={'auto'} className={'marginIfDesktop'}>
                            {Translations.GetText('mark')}
                        </Col>
                        <Col xs={9} sm={4} md={4} xl={'auto'}>
                            <Form.Control onChange={this.handleInputChange} name={'markInput'} type={'number'}
                                          value={this.state.markInput} step={0.1} min={1} max={5}/>
                        </Col>
                        <Col xs={12} sm={5} md={5} xl={'auto'}>
                            <Form.Check onChange={this.handleInputChange} inline
                                        label={Translations.GetText('lesser')} name={'markLess'} checked={this.state.markLess} id={1}/>
                            <Form.Check onChange={this.handleInputChange} inline
                                        label={Translations.GetText('higher')} name={'markMore'} checked={this.state.markMore} id={2}/>
                            <Form.Check onChange={this.handleInputChange} inline
                                        label={Translations.GetText('equal')} name={'markEqual'} checked={this.state.markEqual} id={3}/>
                        </Col>
                        {sessionStorage.getItem('userLoggedIn') ?
                        <Col xs={12} sm={2} md={2} xl={'auto'} className={'marginIfDesktop'}>
                            <Form.Check onChange={this.handleInputChange}
                                        label={Translations.GetText('favourite')} name={"favourite"} checked={this.state.favourite} id={4}/>
                        </Col>
                            :
                            ''}
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