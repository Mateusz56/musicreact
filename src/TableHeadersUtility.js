import {Button} from "react-bootstrap";
import {ArrowDownShort, ArrowUpShort} from "react-bootstrap-icons";
import React from "react";

class TableHeadersUtility {
    static buttonStyle = {
        position: 'absolute',
        right: '-12px',
        height: '25px',
    }

    static buttonUpStyle = {
        top: '-12px',
        borderRadius: '5px 5px 0 0',
    }

    static buttonDownStyle = {
        top: '12px',
        borderRadius: '0 0 5px 5px',
    }

    static buttonPressedStyle = {
        color: 'white',
        borderColor: 'rgb(200 200 200)',
        backgroundColor: 'rgb(200 200 200)',
    }

    static buttonNotPressedStyle = {
        color: 'rgb(200 200 200)',
        borderColor: 'rgb(200 200 200)',
        backgroundColor: 'white',
    }

    static sortOptions = {
        titleUp: 'title',
        titleDown: '-title',
        nameUp: 'name',
        nameDown: '-name',
        songsCountUp: 'songs_count',
        songsCountDown: '-songs_count',
        performerUp: 'performer',
        performerDown: '-performer',
        genreUp: 'genre',
        genreDown: '-genre',
        yearUp: 'year',
        yearDown: '-year',
        marksUp: 'marks_avg',
        marksDown: '-marks_avg',
        commentsUp: 'comments_count',
        commentsDown: '-comments_count',
    }

    static getSortButtonVariant(sortOption) {
        return this.state.sortMode === sortOption ? 'secondary' : 'outline-secondary'
    }

    static changeSortMode(sortMode) {
        let newSortMode = this.state.sortMode === sortMode ? '' : sortMode;
        this.setState({
            sortMode: newSortMode
        })
    }

    static renderTableHeader(content, sortModeUp, sortModeDown) {
        let colorsStyleUp = this.state.sortMode === sortModeUp ? TableHeadersUtility.buttonPressedStyle : TableHeadersUtility.buttonNotPressedStyle
        let colorsStyleDown = this.state.sortMode === sortModeDown ? TableHeadersUtility.buttonPressedStyle : TableHeadersUtility.buttonNotPressedStyle

        return <div style={{position: 'relative'}}>
            {content}
            <Button onClick={() => this.changeSortMode(sortModeUp)}
                    variant={this.getSortButtonVariant(sortModeUp)}
                    style={{...TableHeadersUtility.buttonStyle, ...TableHeadersUtility.buttonUpStyle, ...colorsStyleUp}}>
                <ArrowUpShort size={'20px'} style={{margin: '-10px', position: 'relative', top: '-8px'}}/>
            </Button>
            <Button onClick={() => this.changeSortMode(sortModeDown)}
                    variant={this.getSortButtonVariant(sortModeDown)}
                    style={{...TableHeadersUtility.buttonStyle, ...TableHeadersUtility.buttonDownStyle, ...colorsStyleDown}}>
                <ArrowDownShort size={'20px'} style={{margin: '-10px', position: 'relative', top: '-8px'}}/>
            </Button>
        </div>
    }
}

export default TableHeadersUtility