import React from 'react';
import Logo from '../logo/App';
import {
    basename
} from '../../settings';

/**
 * 
 * PROPS
 * visible: if true visible
 * value: if not null, set initial value
 * className: input className
 * (optional) forgotHandler: () => void
 * (optional) forgotLabel: string label
 */
export class Password extends React.Component {
    state = {
        visible: ( this.props.visible ? true : false ),
        value: ( this.props.value ? this.props.value : "" )
    }
    
    render() {
        return (
            <div className="d-block">
                <div className="d-flex">
                    <small className="mt-auto">
                        senha
                    </small>
                    <button
                        className="btn btn-link p-0 ml-auto"
                        onClick={ ev => this.setState( { visible: ! this.state.visible } ) }
                    >
                        <small>
                            <i className={ "fas fa-" + ( ! this.state.visible ? "eye" : "eye-slash" ) }></i>
                            <span className="mx-1">
                                { ( ! this.state.visible ? "visualizar" : "ocultar" ) }
                            </span>
                        </small>
                    </button>
                </div>
                <input
                    className={ ( this.props.className ? this.props.className : "form-control" ) }
                    type={ ( this.state.visible ? "text" : "password" ) }
                    onChange={ ev => {
                        this.setState(
                            { value: ev.target.value },
                            () => {
                                if ( this.props.onChange ) {
                                    this.props.onChange( this.state.value )
                                }
                            }
                        )
                    } }
                    value={ this.state.value }
                />
                <button
                    className={ ( this.props.forgotHandler ? "btn btn-link text-secondary p-0 mr-auto" : "d-none" ) }
                    onClick={ ev => this.props.forgotHandler() }
                >
                    <small>
                        { this.props.forgotLabel }
                    </small>
                </button>
            </div>
        )
    }
}

export default class App extends React.Component {
    state = {
        userName: "",
        password: ""
    }
    forgotHandler () {
        if ( this.state.userName ) {
            fetch( basename + "/user/update/recover-password", {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( { userName: this.state.userName } )
            } )
            .then( r => r.json() )
            .then( j => {
                if ( j ) {
                    if ( j.status === 0 ) {
                        alert( j.message );
                    } else {
                        alert( "Erro " + j.status + ". " + j.message );
                    }
                } else {
                    alert( "Falha na sua conexão.")
                }
            } );
        } else {
            alert( "Insira o nome de usuário, por favor." );
        }
    }
    render () {
        return (
            <div className="mw-xs">
                
                <div className="d-flex pt-4">
                    <div
                        className="m-auto"
                    >
                        <div className="my-3">
                            <label className="d-block">
                                <small>
                                    usuário
                                </small>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={ this.state.userName }
                                    onChange={ ev => this.setState( { userName: ev.target.value } ) }
                                />
                            </label>
                        </div>
                        <div className="my-3">
                            <Password
                                className="form-control"
                                value={ this.state.password }
                                onChange={ v => { this.setState( { password: v } ) } }
                                forgotLabel="esqueci minha senha"
                                forgotHandler={ () => this.forgotHandler() }
                            />
                        </div>
                        <div className="d-flex flex-row my-2">
                            <div className="my-auto">
                                <button
                                    className="btn btn-link px-0"
                                    onClick={ ev => this.props.newHandler() }
                                >
                                    <small>
                                        Não tenho cadastro
                                    </small>
                                </button>
                            </div>
                            <div className="ml-auto">
                                <button 
                                    className="btn btn-link text-success px-0"
                                    onClick={ ev => this.props.formHandler( this.state ) }
                                >
                                    <small>
                                        <span className="mr-1">Acessar</span>
                                        <i className="fas fa-angle-right"></i>
                                    </small>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        );
    }
}