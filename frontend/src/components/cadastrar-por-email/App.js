import React, {
    Component
} from 'react';
import {
    mailerUrl
} from '../../settings';

export class Sender extends Component {
    state = { email: "" }
    sendMail () {
        if ( this.state.email ) {
            fetch( mailerUrl + "/" + this.state.email )
            .then( r => r.json() )
            .then( j => {
                if ( j ) {
                    alert( "email enviado com sucesso" );
                    this.setState( { email: "" } );
                } else {
                    alert( "Falha!" );
                }
            } )
            .catch( e => alert( "Falha!" ) );
        } else {
            alert( "Preencha um email válido, por favor." );
        }
    }
    render () {
        return (
            <div className="p-3 my-3">
                <h3 className={ this.props.titleClassName }>
                    { this.props.title }
                </h3>
                <div className="mt-3">
                    <label className="d-block">
                        <input
                            type="text"
                            className="form-control"
                            placeholder={ this.props.placeholder }
                            value={ this.state.email }
                            onChange={ ev => this.setState( { email: ev.target.value } ) }
                        />
                    </label>
                </div>
                <div>
                    <button
                        className={ this.props.btnClassName }
                        onClick={ ev => this.sendMail() }
                    >
                        Enviar Email!
                    </button>
                </div>
            </div>
        );
    }
}
export default function App () {
    return (
       <div className="d-flex">
            <div className="text-center mw-xs m-auto ">
                
                <Sender
                    title="Enviar para Fornecedor"
                    titleClassName="text-primary"
                    placeholder="Insira o email do fornecedor"
                    btnClassName="btn btn-primary btn-block"
                />

                <Sender
                    title="Enviar para Midia"
                    titleClassName="text-secondary"
                    placeholder="Insira o email do Midia"
                    btnClassName="btn btn-secondary btn-block"
                />

                {/* <div className="p-3 my-3">
                    <h3 className="text-secondary">
                        Enviar para Midia
                    </h3>
                    <div className="mt-3">
                        <label className="d-block">
                            <input type="text" className="form-control " placeholder="Insira o email do Midia" />
                        </label>
                    </div>
                    <div>
                        <button className="btn btn-secondary btn-block">
                            Enviar Email!
                        </button>
                    </div>
                </div> */}

            </div>
        </div>
    );
}