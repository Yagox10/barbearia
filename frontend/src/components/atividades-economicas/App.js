import React from 'react';
import Select from 'react-select';
import {
    unPrefixObject,
    responseWindow,
    noDuplicates
} from '../../functions';

import {
    accountsUrl
} from '../../settings';

export class RowCounter extends React.Component {
    render() {
        return (
            <div>
                x
            </div>
        );
    }
}


export class CNAE extends React.Component {
    state = {
        secoes: [],
        divisoes: [],
        grupos: [],
        classes: [],
        subclasses: [],
        cnae: {}
    }
    componentDidMount () {
        fetch( "https://servicodados.ibge.gov.br/api/v2/cnae/secoes" )
        .then( r => r.json() )
        .then( j => this.setState( { secoes: j } ) );
    }
    render () {
        return (
            <div className="container p-2 mw-100">
                <div className="col-12">
                    <div>
                        <label className="d-block">
                            <small>
                                Seção
                            </small>
                            <Select
                                options={ this.state.secoes.map( s => ( { value: s.id, label: s.descricao } ) ) }
                                onChange={ v => {
                                    this.setState(
                                        {
                                            divisoes: [],
                                            grupos: [],
                                            classes: [],
                                            subclasses: [],
                                            cnae: {}
                                        },
                                        () => {
                                            fetch( "https://servicodados.ibge.gov.br/api/v2/cnae/secoes/" + v.value + "/divisoes" )
                                            .then( r => r.json() )
                                            .then( j => this.setState( { divisoes: j } ) );
                                        }
                                    )
                                } }
                            ></Select>
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div>
                        <label className={ this.state.divisoes.length > 0 ? "d-block" : "d-none" }>
                            <small>
                                Divisão
                            </small>
                            <Select
                                options={ this.state.divisoes.map( d => ( { value: d.id, label: d.descricao } ) ) }
                                onChange={ v => {
                                    this.setState(
                                        {
                                            grupos: [],
                                            classes: [],
                                            subclasses: [],
                                            cnae: {}
                                        },
                                        () => {
                                            fetch( "https://servicodados.ibge.gov.br/api/v2/cnae/divisoes/" + v.value + "/grupos" )
                                            .then( r => r.json() )
                                            .then( j => this.setState( { grupos: j } ) );
                                        }
                                    )
                                } }
                            ></Select>
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div>
                        <label className={ this.state.grupos.length > 0 ? "d-block" : "d-none" }>
                            <small>
                                Grupo
                            </small>
                            <Select
                                options={ this.state.grupos.map( g => ( { value: g.id, label: g.descricao } ) ) }
                                onChange={ v => {
                                    this.setState(
                                        {
                                            classes: [],
                                            subclasses: [],
                                            cnae: {}
                                        },
                                        () => {
                                            fetch( "https://servicodados.ibge.gov.br/api/v2/cnae/grupos/" + v.value + "/classes" )
                                            .then( r => r.json() )
                                            .then( j => this.setState( { classes: j } ) );
                                        }
                                    )
                                } }
                            ></Select>
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div>
                        <label className={ this.state.classes.length > 0 ? "d-block" : "d-none" }>
                            <small>
                                Classe
                            </small>
                            <Select
                                options={ this.state.classes.map( c => ( { value: c.id, label: c.descricao } ) ) }
                                onChange={ v => {
                                    this.setState(
                                        {
                                            subclasses: [],
                                            cnae: {}
                                        },
                                        () => {
                                            fetch( "https://servicodados.ibge.gov.br/api/v2/cnae/classes/" + v.value + "/subclasses" )
                                            .then( r => r.json() )
                                            .then( j => this.setState( { subclasses: j } ) );
                                        }
                                    )
                                } }
                            ></Select>
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <div>
                        <label className={ this.state.subclasses.length > 0 ? "d-block" : "d-none" }>
                            <small>
                                Atividade
                            </small>
                            <Select
                                options={ this.state.subclasses.map( s => ( { value: s.id, label: s.descricao } ) ) }
                                onChange={ v => {
                                    this.setState(
                                        { cnae: ( v ? v : {} ) },
                                        () => {
                                            if ( this.props.callback && v ) {
                                                this.props.callback( this.state.cnae );
                                            }
                                            if ( this.props.once ) {
                                                this.setState( {
                                                    divisoes: [],
                                                    grupos: [],
                                                    classes: [],
                                                    subclasses: [],
                                                    cnae: {}
                                                } )
                                            } 
                                        }
                                    );
                                } }
                            ></Select>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default class App extends React.Component {
    state = { services: [] }
    componentDidMount () {
    }
    componentWillReceiveProps () {
        if ( this.props.account.services ) {
            const cnaes = this.props.account.services.split( "," );
            cnaes.forEach( x => {
                fetch( "https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/" + x )
                .then( r => r.json() )
                .then( j => {
                    const v = j.map( y => ( { value: y.id, label: y.descricao } ) )
                    const val = v[ 0 ]
                    let services = this.state.services;
                    services.push( val );
                    this.setState( { services: services } );
                } );
            } )
            this.setState( { services: cnaes } );
        }
    }
    x () {
        if ( this.state.services.length > 0 ) {
            return this.state.services.map( ( x, i ) => {
                return(
                    <li className="my-2" key={ i }>
                        <div className="d-flex">
                            <small>
                                <strong>
                                    { x.value }
                                </strong>
                            </small>
                            <span className="ml-auto">
                                <button className="btn btn-link text-danger">
                                    <small>
                                        <i className="fas fa-trash"></i>
                                        <span className="mx-1">Eliminar</span>
                                    </small>
                                </button>
                            </span>
                        </div>
                        <p>
                            { x.label }
                        </p>
                    </li>
                );
            } )
        }
    }
    render () {
        return(
            <div className="container p-2 mw-100">
                <div className="row">
                    <div className="col-12 d-flex">
                        <h2 className="text-secondary m-auto">
                            Meus Serviços
                        </h2>
                    </div>
                </div>
                <div className="col-12 p-3">
                    <small className="text-uppercase">
                        <strong>
                            Suas AEs
                        </strong>
                    </small>
                    <p className="text-muted">
                        Você poderá ser seleciodo para cotação se a Atividade Econômica da cotação for compatível com algumas de suas AEs abaixo.
                    </p>
                    <ul className="list-unstyled">
                        { this.x() }
                    </ul>
                </div>
                <div className="col-12 p-3">
                    <small className="text-uppercase">
                        <strong>
                            Adicione uma AE
                        </strong>
                    </small>
                    <p className="text-muted">
                        Fornecedores são escolhidos para cotação através da Atividade Econômica. 
                    </p>
                    <CNAE
                        once
                        callback={
                            v => {
                                let services = this.state.services;
                                services.push( v );
                                this.setState(
                                    { services: services },
                                    () => {
                                        // fetch(
                                        //     accountsUrl + "/" + this.props.account.id ,
                                        //     {
                                        //         method: "PUT",
                                        //         mode: "cors",
                                        //         headers: {
                                        //             "Content-Type": "application/json"
                                        //         },
                                        //         body: JSON.stringify( { services: this.state.services.map( x => x.value ).join( "," ) } )
                                        //     }
                                        // )
                                        // .then( r => r.json() )
                                        // .then( j => responseWindow( "Atualizado com sucesso" ) );
                                    }
                                )
                            }
                        }
                    />
                </div>
            </div>
        );
    }
}