import React from 'react';
import SendBody from '../SendBody/';
import {
    checkLastChar
} from '../../../functions';

/**
 * PROPS:
 * @param doc: object { string docType, string doc }
 * @param account: object { string userName, string password, string scope }
 * @param person: object { string fullName, string email, string tel, string companyName, string stateSubscription }
 */
export default class GetAddress extends React.Component {
    state = {
        cep: "",
        city: "",
        uf: "",
        address: "",
        complement: "",
        done: false
    }
    getFields = () => {
        if ( this.state.cep !== "" ) {
            return (
                <div>
                    <div>
                        <label>
                            <small>UF</small>
                            <input
                                type="text"
                                disabled
                                className="form-control"
                                value={ this.state.uf }
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <small>Cidade</small>
                            <input
                                type="text"
                                disabled
                                className="form-control"
                                value={ this.state.city }
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <small>Endereço</small>
                            <input
                                type="text"
                                className="form-control"
                                value={ this.state.address }
                                onKeyUp={ event => event.target.value = checkLastChar( event.target.value, "[0-9A-Za-z\-,.áàãâéèêíóõúçÁÀÃÂÉÊÈÍÓÕÚÇ ]" ) }
                                onChange={ event => this.setState( { address: event.target.value } ) }
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <small>Complemento</small>
                            <input
                                type="text"
                                className="form-control"
                                value={ this.state.complement }
                                onKeyUp={ event => event.target.value = checkLastChar( event.target.value, "[0-9A-Za-z\-,.áàãâéèêíóõúçÁÀÃÂÉÊÈÍÓÕÚÇ ]" ) }
                                onChange={ event => this.setState( { complement: event.target.value } ) }
                            />
                        </label>
                    </div>
                    <div className="my-3">
                        <button
                            className="btn btn-success btn-block"
                            onClick={ () => {
                                this.setState( { done: true } );
                            } }
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            )
        }
        return <div>Preencha o CEP</div>
    }
    render () {
        if ( this.state.done === false ) {
            return (
                <div>
                    <div>
                        <label>
                            <small>CEP</small>
                            <input
                                type="text"
                                title="CEP"
                                className="form-control"
                                onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[0-9]' ) }
                                onChange={ event => { 
                                    const value = event.target.value;
                                    if ( value.match( /[0-9]{8}/ ) ) {
                                        fetch( "https://viacep.com.br/ws/" + value + "/json", { mode: 'cors' } )
                                        .then( r => r.json() )
                                        .then( j => {
                                            if ( j ) {
                                                if ( j.hasOwnProperty( "erro" ) ) {
                                                    this.setState( {
                                                        cep: "",
                                                        city: "",
                                                        uf: "",
                                                        address: "",
                                                        complement: ""
                                                    } );
                                                }
                                                if ( j.hasOwnProperty( "cep" ) ) {
                                                    this.setState( {
                                                        cep: value,
                                                        city: j.localidade,
                                                        uf: j.uf,
                                                        address: j.logradouro,
                                                        complement: j.complemento
                                                    } );
                                                }
                                            }
                                        } )
                                    }
                                    // .cacth( e => console.warn( e ) );
                                } }
                            />
                        </label>
                    </div>
                    { this.getFields() }
                </div>
            );
        } else {
            let person = {}
			for ( let i in this.state ) {
				if ( [ "done", "complement" ].indexOf( i ) === -1 ) {
					person[ i ] = this.state[ i ];
				}
            }
            person.address += ", " + this.state.complement;
            for ( let i in this.props.person ) {
                person[ i ] = this.props.person[ i ];
            }
            return (
                <SendBody
                    doc={ this.props.doc }
                    account={ this.props.account }
                    person={ person }
                ></SendBody>
            );
        }
    }
}