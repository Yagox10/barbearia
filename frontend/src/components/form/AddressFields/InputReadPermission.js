import React from 'react';
import axios from 'axios';

/**
 * 
 * PROPS
 * url: string with optional placeholder symbol $;
 * element: element tag;
 * listener: camel case eventlistener to get data;
 * handler: function coming from parent;
 */
class InputReadPermission extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            value: "",
            data: null
        }

        this.handler = this.handler.bind( this );
        this.placeholderHandler = this.placeholderHandler.bind( this );
        this.getUrl = this.getUrl.bind( this );
        this.responseHandler = this.responseHandler.bind( this );
        this.changeHandler = this.changeHandler.bind( this );
        this.propsHandler = this.propsHandler.bind( this );
    }

    handler = ( value ) => {
        if ( this.props.parentHandler ) {
            this.props.parentHandler( value );
        }
        this.setState( { data: value } );
    }

    placeholderHandler = ( value ) => {
        if ( this.props.url.indexOf( "$" ) !== -1 ) {
            return this.props.url.replace( "$", value );
        } else {
            return this.props.url + value;
        }
    }

    getUrl = ( event ) => {
        var value = event.target.value;
        if ( value ) {
            axios.get( this.placeholderHandler( value ) )
            .then( response => {
                this.responseHandler( response.data );
                this.setState( { data: response.data } );
            } )
            .catch( response => {
                this.responseHandler( response );
            });
        }
    }

    responseHandler = ( data ) => {
        if ( this.props.handler && this.props.listener !== "onChange" ) {
            this.props.handler( data );
        }
        this.setState( { data: data } );
    }

    changeHandler = ( event ) => {
        this.setState( { value: event.target.value } );
        if ( this.props.listener === "onChange" ) {
            this.getUrl( event );
        }
    }

    propsHandler = () => {
        var properties = {};
        Object.keys( this.props ).forEach( prop => {
            if ( prop === "listener" && this.props[ prop ] !== "onChange"  ) {
                properties[ this.props[ prop ] ] = this.getUrl;
            } else {
                if ( prop !== "element" && prop !== "url" && prop !== "handler" ) {
                    properties[ prop ] = this.props[ prop ];
                }
            }
        } );
        properties[ "onChange" ] = this.changeHandler;
        return properties;
    }

    render() {
        const element = this.props.element ? this.props.element : "input";
        return React.createElement( element, this.propsHandler() );
    }
}

export default InputReadPermission;