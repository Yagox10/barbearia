import React from 'react';
import InputReadPermission from './InputReadPermission';

/**
 * 
 * PROPS
 * lines: 1 || 2 || 3
 * value: value to cep field
 * trigger: true | false
 * disabled: true | false
 */

export default class AddressFields extends React.Component {

    constructor(){
        super();
        this.state = {
            control: "",
            city: "",
            location: "",
            state: ""
        }
        this.updateState = this.updateState.bind( this );
        this.isCep = this.isCep.bind( this );
        this.getValue = this.getValue.bind( this );
    }

    isCep = ( data ) => {
        return ( data.hasOwnProperty( "cep" ) ) ? true : false;
	}

    updateState( value ) {
        this.setState( {
            control: value.cep,
            location: value.logradouro,
            city: value.localidade,
            state: value.uf
        } );
    }

    getValue = ( value ) => {
        if ( this.isCep( value ) ) {
            this.updateState( value );
        } 
    }

    handleListener = () => {
        return ( this.props.disabled ? "onFocus" : "onBlur" );
    }
    
    render(){
        return(
            <div>
                <div className="form-group row">
                    <label className="col-6">
                        <span>
                            CEP 
                            <span className="mx-1 text-warning">
                                (apenas números)
                            </span>
                        </span>
                        <InputReadPermission
                            listener={ this.handleListener() }
                            handler={ this.getValue }
                            url="https://viacep.com.br/ws/$/json"
                            className="form-control"
                            name="cep"
                            value={ this.props.value }
                            disabled={ this.props.disabled }
                        />
                    </label>
                    <div className="col-4">
                        <span>
                            Cidade
                        </span>
                        <input
                            type="text"
                            value={ this.state.city }
                            disabled
                            name="city"
                            className="form-control"
                        />
                    </div>
                    <div className="col-2">
                        <span>
                            Estado
                        </span>
                        <input
                            type="text"
                            value={ this.state.state }
                            disabled
                            name="uf"
                            className="form-control"
                        />
                    </div>
                    <div className="col-12">
                        <span>
                            Logradouro e complemento
                        </span>
                        <input
                            type="text"
                            value={ this.state.location }
                            onChange={ event => this.setState( { location: event.target.value } ) }
                            name="address"
                            className="form-control"
                        />
                    </div>
                </div>
            </div>
        );
    }
  
}
