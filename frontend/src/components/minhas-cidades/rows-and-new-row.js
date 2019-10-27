import React, {
    Component,
} from 'react';
import {
    getByQuery,
    valueToObject,
    isEmpty
} from '../../functions';
import {
    statesUrl,
    updateUserUrl,
    readUserUrl
} from '../../settings';

import AssocSelects from '../associative-react-selects/alt';

import { ReDoThis } from '../editable-select/App';

export default class App extends Component {
    state = {
        cities: [],
        states: [],
        newState: {}
    }
    componentDidMount () {
        const u = valueToObject( getByQuery( "#user" ) );
        this.setState(
            { user: u },
            () => {
                fetch( readUserUrl + "/" + this.state.user.id + "/cities" )
                .then( r => r.json() )
                .then( j => {
                    console.log( j );
                    let cities;
                    if ( Array.isArray( j ) ) {
                        cities = j.map( x => {
                            let t = x;
                            t.id = parseInt( x.id );
                            if ( x.children === "*" ) {
                                t.children = "*";
                            } else {
                                t.children = x.children.map( y => {
                                    let b = y;
                                    b.id = parseInt( y.id );
                                    return b;
                                } )
                            }
                            return t;
                        } )
                    } else {
                        cities = "*"
                    }
                    this.setState( { cities: cities } )
                } );
            }
        )

        fetch( statesUrl )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                this.setState(
                    { states: j.map( y => ( { value: parseInt( y.id ), label: y.name } ) ) }
                );
            }
        } );
    }
    updateService ( v ) {
        let cities = this.state.cities;
        this.state.cities.forEach( ( x, i ) => {
            if ( v.id === x.id ) {
                cities[ i ].children = v.children
            }
        }, cities )
        this.setState( { cities: cities } );
    }
    newServicesHandler ( v ) {
        this.setState( { newState: ( isEmpty( v.children ) ? {} : v ) } );
    }
    submitHandler () {
        let newOne = {
            id: this.state.newState.value,
            children: this.state.newState.children.map( x => {
                return {
                    id: x.value
                }
            } )
        }
        let cities = (
            this.state.cities === "*" || this.state.cities === ""
            ? []
            : this.state.cities
        );
        cities = cities.map( x => {
            return {
                id: x.id,
                children: x.children.map( y => {
                    return {
                        id: y.id
                    }
                } )
            }
        } )
        cities.push( newOne );
        fetch(
            updateUserUrl + "/" + this.state.user.id + "/cities",
            {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( cities )
            }
        )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                alert( j.message );
            } else {
                alert( "Falha. Verifique sua conexão com internet e tente mais tarde." );
            }
        } )
        .catch( e => {
            alert( "Falha. Verifique sua conexão com internet e tente mais tarde." );
        } )
    }
    currentSegmentHandler ( id ) {
        if ( id ) {
            const confirm = window.confirm( "Deseja realmente remover o estado?" );
            if ( confirm ) {
                let newServices = [];
                this.state.cities.forEach( x => {
                    if ( x.id !== id ) {
                        newServices.push( x );
                    }
                } );
                this.setState( { cities: newServices } );
            }
        } else {
            let hasEmptySeg = false;
            this.state.cities.forEach( x => {
                if ( isEmpty( x.children ) ) {
                    hasEmptySeg = true;
                }
            } );
            // if ( hasEmptySeg ) {
            //     alert( "Você possui um estado sem serviços ou produtos selecionados. Por favor, elimine-o ou preencha pelo menos um serviço ou produto para prosseguir." );
            // } else {
                fetch(
                    updateUserUrl + "/" + this.state.user.id + "/cities",
                    {
                        method: "POST",
                        mode: "cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify( this.state.cities )
                    }
                )
                .then( r => r.json() )
                .then( j => {
                    if ( j ) {
                        alert( "Dados atualizados com sucesso." );
                    } else {
                        alert( "Falha. Verifique sua conexão com internet e tente mais tarde." );
                    }
                } )
                .catch( e => {
                    alert( "Falha. Verifique sua conexão com internet e tente mais tarde." );
                } )
            // }
        }
    }
    displayCurrentData () {
        if ( Array.isArray( this.state.cities ) ) {
            return this.state.cities.map( ( state, i ) => {
                return (
                    <div key={ i } className="col-12">
                        <ReDoThis
                            url={ statesUrl + "/" + state.id }
                            responseHandler={ j => j.children.map( x => ( { value: parseInt( x.id ), label: x.name } ) ) }
                            isMulti
                            onChange={ v => this.updateService( v ) }
                            parent={ { id: state.id, name: state.name } }
                            value={ (
                                Array.isArray( state.children )
                                ? state.children.map( x => ( {
                                    value: parseInt( x.id ),
                                    label: x.name
                                } ) )
                                : []
                            ) }
                        >
                            <div className="my-auto d-flex">
                                <span className="my-auto">
                                    <strong>
                                        { state.fullName }
                                    </strong>
                                </span>
                                <small
                                    className="my-auto text-danger ml-auto"
                                    onClick={ ev => this.currentSegmentHandler( state.id ) }
                                >
                                    <i className="fas fa-trash mx-1"></i>
                                    <strong>
                                        remover estado
                                    </strong>
                                </small>
                            </div>
                        </ReDoThis>
                    </div>
                );
            } )
        }
    }
    render () {
        return (
            <div className="container p-0 mw-100">
                <div className={ ( Array.isArray( this.state.cities ) ? "row" : "d-none" ) }>
                    <div className="col-12">
                        <h4>Seus estados <small>(UF)</small></h4>
                        <p className="text-muted">
                            É possível remover os estados ou alterá-los. Para alterar basta escolher as cidades disponíveis para o estado. É possível remover o estado por inteiro clicando em <code><i className="fas fa-trash"></i><span>remover estado</span></code>. Após terminar as alterações e remoções é necessário salvar o resultado clicando em <code className="text-success"><span>atualizar estado</span><i className="fas fa-angle-right"></i></code>
                        </p>
                    </div>
                    { this.displayCurrentData() }
                    <div className="col-12">
                        <div className="mt-3 mb-5">
                            <button
                                className="btn btn-link text-success"
                                onClick={ ev => this.currentSegmentHandler() }
                            >
                                <span>
                                    atualizar estados
                                </span>
                                <i className="fas fa-angle-right mx-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h4>Novo estado</h4>
                        <p className="text-muted">
                            É possível adicionar um novo estado. Após escolher o estado, escolha as cidades adequadas e clique em <code className="text-success">Confirmar novo estado <i className="fas fa-angle-right"></i></code>.
                        </p>
                    </div>
                    <div className="col-12">
                        <div className="my-3">
                            <AssocSelects
                                labelOne="estado"
                                optionsOne={
                                    this.state.states.filter( s => {
                                        for ( let i in this.state.cities ) {
                                            if ( s.value === parseInt( this.state.cities[ i ][ "id" ] ) ) {
                                                return false;
                                            }
                                        }
                                        return true
                                    } )
                                }
                                url={ oOne => {
                                    return statesUrl + "/" + oOne.value;
                                } }
                                responseHandler={ j => {
                                    return j.children.map( y => ( { value: y.id, label: y.name } ) )
                                } }
                                labelTwo="cidades"
                                isMultiTwo={ true }
                                onChange={ v => this.newServicesHandler( v ) }
                            ></AssocSelects>
                        </div>
                    </div>
                    {/* make as component */}
                    <div className={ ( isEmpty( this.state.newState ) ? "d-none" : "d-block" ) }>
                        <button
                            className="btn btn-link text-success"
                            onClick={ ev => this.submitHandler() }
                        >
                            <span className="mx-1">
                                Confimar novo estado
                            </span>
                            <i className="fas fa-angle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}