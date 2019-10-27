import React from 'react';
// import PasswordField from '../PasswordField/';
import {
    Password
} from '../../login/App';
import GluedText from '../../glued-text/App';

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
            this.setState( { message: "As senhas não coincidem." } );
        }
    }

    render = () => {
        return(
            <div>
                <div>
                    <Password
                        className={ this.props.className }
                        value={ this.state.value }
                        onChange={ v => { this.setState( { value: v } ) } }
                    />
                </div>
                <div className="mt-3">
                    <GluedText>
                        <small className="text-secondary">
                            Redigite para confimar
                        </small>
                        <Password
                            className={ this.props.className }
                            value={ this.state.cofirm }
                            onChange={ v => { this.setState( { cofirm: v } ) } }
                        />
                    </GluedText>
                </div>
                <div>
                    { this.state.message }
                </div>
            </div>
        );
    }
}
