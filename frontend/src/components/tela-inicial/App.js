import React, { Component } from 'react';
import Logo from '../logo';

import { findUrl, getInit } from '../../settings';
import { getDate, isEmpty, unPrefixObject } from '../../functions';

export default class App extends Component {
    state = {
        data: []
    }
    componentDidMount () {
        const dateArray = getDate().split( "-" );
        const yearAndMonth = dateArray[ 0 ] + "-" + dateArray[ 1 ] + "-";
        const body = {
            from: yearAndMonth + "01",
            to: yearAndMonth + "31"
        };
        fetch ( findUrl + "/people", getInit( body ) )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                if ( ! isEmpty( j ) ) {
                    this.setState( { data: j.map( x => unPrefixObject( x ) ) } )
                } else {}
            } else {}
        } )
    }
    listHandler () {
        if ( this.state.data.length > 0 ) {
            return this.state.data.map( ( x, i ) => {
                return (
                    <li className="list-group-item d-flex">
                        <span className="m-auto">
                            { x.birthday }
                        </span>
                        <span className="m-auto">
                            { x.fullName }
                        </span>
                        <span className="m-auto">
                            { x.phone }
                        </span>
                        <span className="m-auto">
                            { x.email }
                        </span>
                    </li>
                )
            } )
        }
        return <li className="list-group-item text-center">Sem registro.</li>;
    }
    render () {
        return (
            <div>
                <div className="d-flex p-3"> 
                    <Logo className="m-auto p-2 border border-secondary" />
                </div> 
                <div>
                    <h2 className="text-center m-auto text-secondary">
                        SISTEMA ADMINSTRATIVO
                    </h2>
                    <p className="text-center mx-auto px-5 py-3 text-muted">
                        Escolha onde deseja operar no menu ao lado.
                    </p>
                </div>
                <div className="m-3 border">
                    <h4 className="text-center m-auto p-3">
                        <span className="mx-3 text-warning">
                            <i className="fas fa-birthday-cake"></i>
                        </span>
                        <span className="border-bottom border-secondary">
                            Aniversariantes do mês
                        </span>
                        <span className="mx-3 text-warning">
                            <i className="fas fa-birthday-cake"></i>
                        </span>
                    </h4>
                    <ul className="list-group">{ this.listHandler() }</ul>
                </div>
            </div>
        );
    }
}