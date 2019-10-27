import React from 'react';
import Loader from 'react-loader-spinner';
import {
    basename
} from '../../../settings';

export default class SendBody extends React.Component {
    state = {
        done: false
    }
    render () {
        if ( this.state.done === false ) {
            // preppend prefix of table
            let body = {}
            for ( let i in this.props.doc ) {
                body[ i ] = this.props.doc[ i ];
            }
            for ( let j in this.props.person ) {
                body[ j ] = this.props.person[ j ];
            }
            for ( let k in this.props.account ) {
                body[ k ] = this.props.account[ k ];
            }
            fetch(
                basename + "/user/create",
                {
                    method: "POST",
                    body: JSON.stringify( body ),
                    mode: "cors",
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            .then( r => r.json() )
            .then( j => {
                if ( j ) {
                    if ( j.status === 0 ) {
                        this.setState( { done: true } );
                    } else {
                        alert( j.message );
                    }
                } else {
                    alert( "Falha na sua conexão!" );
                }
            } )
            .catch( e => alert( "Falha na sua conexão!" ) );
            return (
                <div>
                    <Loader
                        type="Puff"
                        color="#DD8E00"
                        height="100"
                        width="100"
                    ></Loader>
                </div>
            );
        } else {
            return (
                <div className="d-flex flex-column p-3">
                    <figure className="mw-100 m-auto display-4">
                        <span className="text-success font-md-2">
                            <i className="fas fa-check"></i>
                        </span>
                    </figure>
                    <div className="m-auto text-center">
                        <p>
                            Cadastro realizado com sucesso!
                            <br />
                            Siga as próximas etapas acessando o sistema.
                            <br />
                            <a href={ basename + "/login" } class="text-secondary">
                                <strong>Clique aqui e faça login para finalizar seu cadastro.</strong>
                            </a>
                        </p>
                    </div>
                </div>
            );
        }
    }
}