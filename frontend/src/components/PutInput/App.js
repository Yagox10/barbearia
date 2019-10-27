import React from 'react';

/**
 * PROPS
 * url: full url to put
 * name: name attribute and db field
 * value: initial value
 * responseHandler
 * errorHandler
 */
export default class PutInput extends React.Component {
    state = {
        value: ( this.props.value ? this.props.value : "" ),
        updated: false
    }

    sendData ( value ) {
        this.setState(
            { value: value },
            () => fetch( this.props.url, {
                method: "PUT",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( { [ this.props.name ]: this.state.value } )
            } )
            .then( r => r.json() )
            .then( j => {
                this.setState( { updated: true } );
                if ( this.props.responseHandler ) {
                    this.props.responseHandler( j );
                }
            } )
            .catch( e => {
                if ( this.props.errorHandler ) {
                    this.props.errorHandler( e );
                }
            } )
        );
    }
    classNameHandler () {
        let className = "";
        className = ( this.props.className ? this.props.className : "form-control" );
        if ( this.state.updated ) {
            className += " border-success"
            setTimeout(
                () => this.setState( { updated: false } ),
                3000
            );
        }
        return className;
    }
    render () {
        return (
            <input
                className={ this.classNameHandler() }
                type={ ( this.props.type ? this.props.type : "text" ) }
                name={ this.props.name }
                onChange={ ev => this.sendData( ev.target.value ) }
                value={ this.state.value }
                disabled={ this.props.disabled }
            />
        );
    }
}
