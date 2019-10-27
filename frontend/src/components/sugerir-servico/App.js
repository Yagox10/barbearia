import React, {
    Component,
} from 'react';
import Createable from 'react-select/creatable';
import {
    unPrefixObject,
    getByQuery,
    valueToObject,
    isEmpty
} from '../../functions';
import {
    servicesUrl,
    suggestionsUrl
} from '../../settings';

import HTTP from '../http/App';

export default class App extends Component {
    state = {
        user: {},
        segment: {},
        services: [],
    }
    componentDidMount () {
        const u = valueToObject( getByQuery( "#user" ) );
        this.setState( { user: u } );
    }
    firstChoiceHandler ( v ) {
        this.setState( { segment: ( v ? v : {} ) } )
    }
    secondChoiceHandler ( v ) {
        this.setState( { services: ( v ? v : [] ) } )
    }
    submitHandler () {
        const body = {
            accountId: this.state.user.id,
            segment: this.state.segment.value,
            services: this.state.services.map( x => x.value ).join( "," )
        }
        // console.log( JSON.stringify( body ) );
        fetch(
            suggestionsUrl,
            {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( body )
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
    }

    render () {
        return (
            <div className="container p-2 mw-100">
                <div className="row mw-100 d-flex">
                    <div className="col-12 m-auto">
                        <h2 className="text-secondary mb-4">
                            Sugerir Segmentos, serviços ou produtos
                        </h2>
                        <p className="text-muted">
                            Selecione um segmento existente ou digite o novo segmento e tecle ENTER. No campo de serviços/produtos digite os nomes que deseje sugerir e tecle ENTER. Ao final clique em <code className="text-success"><span>enviar sugestão</span><i className="fas fa-angle-right"></i></code>
                        </p>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="">
                            <HTTP
                                url={ servicesUrl + "?service_parentId=0&service_active=1" }
                                propName="options"
                                responseHandler={ j => {
                                    if ( j ) {
                                        const segs = j.map( x => unPrefixObject( x ) ).map( x => ( { value: parseInt( x.id ), label: x.name } ) );
                                        return segs;
                                    } else {
                                        return [];
                                    }
                                } }
                            >
                                <Createable
                                    onChange={ v => this.firstChoiceHandler( v ) }
                                ></Createable>
                            </HTTP>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={ ( isEmpty( this.state.segment ) ? "d-none" : "d-block" ) }>
                            <Createable
                                options={ [] }
                                onChange={ v => this.secondChoiceHandler( v ) }
                                isMulti
                            ></Createable>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className={ ( isEmpty( this.state.services ) ? "d-none" : "d-block" ) }>
                            <button
                                className="btn btn-link text-success"
                                onClick={ ev => this.submitHandler() }
                            >
                                <span className="mx-1">
                                    enviar sugestão
                                </span>
                                <i className="fas fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}