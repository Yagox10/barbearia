import React from 'react';
import Select from 'react-select';
import {
    unPrefixObject,
    noDuplicates,
    responseWindow,
    valueToObject,
    getByQuery
} from '../../functions';
import {
    accountsUrl,
    statesUrl
} from '../../settings';

import AssocSelects from '../associative-react-selects/App';

/**
 * PROPS
 * labelOne
 * isMultiOne
 * optionsOne
 * valueOne
 * callbackOne
 * labelTwo
 * isMultiTwo
 * // optionsTwo
 * valueTwo
 * callbackTwo
 *//*
export class AssocSelects extends React.Component {
    state = { optionsOne: [], optionsTwo: [] }
    componentDidMount () {
        console.log( this.props );
        fetch( statesUrl )
        .then( r => r.json() )
        .then( j => this.setState( { optionsOne: ( j ? j.map( y => ( { value: y.id, label: y.sigla } ) ) : [] ) } ) );
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <label className="d-block">
                            <small>
                                { this.props.labelOne }
                            </small>
                            <Select
                                options={ this.state.optionsOne }
                                value={ this.props.valueOne }
                                onChange={ v => {
                                    this.setState(
                                        { optionsTwo: [] },
                                        () => {
                                            if ( v ) {
                                                console.log( v );
                                                fetch( "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + v.value + "/municipios" )
                                                .then( r => r.json() )
                                                .then( j => this.setState( { optionsTwo: ( j ? j.map( y => ( { value: y.id, label: v.label + " - " + y.nome } ) ) : [] ) } ) );
                                            }
                                        }
                                    );
                                } }
                            />
                        </label>
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className={ ( this.state.optionsTwo.length > 0 ? "d-block" : "d-none" ) }>
                            <small>
                                { this.props.labelTwo }
                            </small>
                            <Select
                                isMulti={ this.props.isMultiTwo }
                                options={ this.state.optionsTwo }
                                value={ this.props.valueTwo }
                                onChange={ v => {
                                    if ( v ) {
                                        fetch(
                                            this.props.putUrl,
                                            {
                                                method: "PUT",
                                                mode: "cors",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify(
                                                    this.props.isMultiTwo
                                                    ?
                                                    { cities: v.map( x => x.label ).join( "," ) }
                                                    :
                                                    { cities: v.label }
                                                )
                                            }
                                        )
                                        .then( r => r.json() )
                                        .then( j => console.warn( j ) );
                                    }
                                } }
                            />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}
*/
export default class App extends React.Component {
    state = {
        enable: false,
        pairs: []
    }
    componentDidMount () {
        const u = valueToObject( getByQuery( "#user" ) );
        fetch( readUserUrl + "/" + u.id + "/cities" )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                this.setState(
                    { user: unPrefixObject( j ) },
                    () => {
                        this.setState(
                            { enable: ( this.state.user.cities === "TODOS" ? false : true ) },
                            () => {
                                if ( this.state.user.cities !== "TODOS" ) {
                                    const states = noDuplicates( this.state.user.cities.split( "," ).map( pair => pair.split( "-" )[ 0 ].trim() ) );
                                    console.log( states );

                                }
                            }
                        )
                    }
                )
            }
        } )
        // /user/read/id/cities
    }
    componentWillReceiveProps () {
        if ( this.state.user.cities ) {
        }
    }
    render () {
        console.log( this.state.user );
        return (
            <div className="container p-2 mw-100">
                <div className="row mw-100 d-flex">
                    <div className="col-12 m-auto text-left">
                        <h2 className="text-secondary">
                            Cidades de Atuação
                        </h2>
                    </div>
                    <div className="col-12 pt-3">
                        <label>
                            <input
                                type="checkbox"
                                checked={ ! this.state.enable }
                                onChange={ ev => {
                                    const checked = ev.target.checked;
                                    console.log( "checked", checked );
                                    this.setState(
                                        { enable: ! checked },
                                        () => {
                                            if ( checked ) {
                                                fetch( accountsUrl + "/" + this.state.user.id, {
                                                    method: "PUT",
                                                    mode: "cors",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify( { cities: "TODOS" } )
                                                } )
                                                .then( r => r.json() )
                                                .then( j => { if ( j ) { responseWindow( "Dados atualizados com sucesso" ) } } )
                                            }
                                        }
                                    )
                                } }
                            />
                            <span className="ml-2">
                                Atuação Nacional
                            </span>
                        </label>
                    </div>
                </div>
                <div className={ ( this.state.enable ? "row" : "d-none" ) }>
                    <div className="col-12">
                        <AssocSelects
                            labelOne="UF"
                            labelTwo="Municípios"
                            isMultiTwo={ true }
                            putUrl={ accountsUrl + "/" + ( this.state.user ? this.state.user.id : 0 ) }
                        ></AssocSelects>
                    </div>
                </div>
            </div>
        );
    }
}