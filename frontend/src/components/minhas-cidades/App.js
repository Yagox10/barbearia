import React, {
    Component,
} from 'react';

import {
    readUserUrl,
    updateUserUrl
} from '../../settings';
import {
    getByQuery,
    valueToObject
} from '../../functions';

import RnR from './rows-and-new-row';
import Checkbox from '../checkbox-enable/App';

export default class App extends Component {
    state = {
        national: true,
        user: {}
    }
    componentDidMount () {
        this.setState(
            { user: valueToObject( getByQuery( "#user" ) ) },
            () => {
                fetch ( readUserUrl + "/" + this.state.user.id + "/cities" )
                .then( r => r.json() )
                .then( j => {
                    this.setState( { national: ! Array.isArray( j ) } )
                } )
            }
        )
    }
    render () {
        return (
            <div className="p-2 my-4">
                <div className="d-block">
                    <h2 className="text-secondary text-left mb-4">
                        Meus Locais
                    </h2>
                </div>
                <Checkbox
                    label="Atuação Nacional"
                    checked={ this.state.national }
                    inverse
                    onChange={ isEnabled => {
                        this.setState( { national: ! isEnabled } )
                        if ( ! isEnabled ) {
                            fetch( updateUserUrl + "/" + this.state.user.id + "/cities", {
                                method: "POST",
                                mode: "cors",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify( "*" )
                            } )
                            .then( r => r.json() )
                            .then( j => {
                                if ( j ) {
                                    alert( j.message );
                                } else {
                                    alert( "Falha! Verifique sua conexão com a internet" );
                                }
                            } )
                            .catch( e => alert( "Falha! Verifique sua conexão com a internet" ) );
                        }
                    } }
                >
                    <RnR />
                </Checkbox>
            </div>
        );
    }
}