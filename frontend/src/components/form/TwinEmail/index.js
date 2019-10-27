import React from 'react';

/**
 * 
 * PROPS
 * className: it's passed to input tag
 * label:   String to prepend form control
 * twinLabel: String to prepend twin form control
 * isTwin: callback function from parent receiving ( boolean, value ) parameter
 */

export default class TwinFields extends React.Component {
    state = {
        value: "",
        confirm: "",
        message: ""
    }

    isTwin = () => {
        if ( this.state.value === this.state.confirm && this.state.value !== "" ) {
            this.props.isTwin( true, this.state.value );
            this.setState( { message: "" } );
        } else {
            this.props.isTwin( false, null );
            this.setState( { message: "Os emails não coincidem." } );
        }
    }

    render = () => {
        return(
            <div>
                <div>
                    <small>{ this.props.label }</small>
                    <input
                        title="email"
                        type="email"
                        className={ this.props.className }
                        onChange={ event => this.setState( { value: event.target.value }, this.isTwin ) }
                    />
                </div>
                <div>
                    <small>{ this.props.twinLabel }</small>
                    <input
                        type="email"
                        className={ this.props.className }
                        onChange={ event => this.setState( { confirm: event.target.value }, this.isTwin ) }
                    />
                </div>
                <div>
                    { this.state.message }
                </div>
            </div>
        );
    }
}
