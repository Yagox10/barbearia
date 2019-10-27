import React from 'react';

/**
 * 
 * PROPS
 * label: the text which appears above input tag
 * className: it's passed to input tag
 */

class PasswordField extends React.Component {
    state = {
        visible: false,
        value: ""
    }

    toggle = () => {
        this.setState( { visible: ! this.state.visible } );
    }

    change = ( event ) => {
        this.setState(
            { value: event.target.value },
            () => {
                if ( this.props.getValue ) {
                    this.props.getValue( this.state.value );
                }
            }
        );
    }

    render = () => {
        var iconClass = ( this.state.visible ) ? "fas fa-eye" : "fas fa-eye-slash";
        var inputType = ( this.state.visible ) ? "text" : "password";
        if ( ! this.props.label ) {
            return(
                <div className="input-group">
                    <input
                        type={ inputType }
                        value={ this.state.value }
                        onChange={ this.change }
                        className={ this.props.className }
                    />
                    <div className="input-group-append">
                        <span
                            className="input-group-text"
                            onClick={ this.toggle }
                        >
                            <i className={ iconClass }></i>
                        </span>
                    </div>
                </div>
            );
        }
        return(
            <label>
                <small>
                    { this.props.label }
                </small>
                <div className="input-group">
                    <input
                        type={ inputType }
                        value={ this.state.value }
                        onChange={ this.change }
                        className={ this.props.className }
                    />
                    <div className="input-group-append">
                        <span
                            className="input-group-text"
                            onClick={ this.toggle }
                        >
                            <i className={ iconClass }></i>
                        </span>
                    </div>
                </div>
            </label>
        );
    }
}

export default PasswordField;