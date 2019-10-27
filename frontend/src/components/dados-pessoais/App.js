import React, {
    Component
} from 'react';
import PutInput from '../PutInput/App';
import {
    peopleUrl,
    accountsUrl
} from '../../settings';
import {
    getByQuery,
    valueToObject,
    unPrefixObject,
    isEmpty
} from '../../functions';

export default class App extends Component {
    state = { person: {} }
    componentDidMount () {
        const user = valueToObject( getByQuery( "#user" ) );
        fetch( accountsUrl + "/" + user.id )
        .then( r => r.json() )
        .then( j => {
            const u = unPrefixObject( j );
            fetch( peopleUrl + "/" + u.personId )
            .then( r => r.json() )
            .then( j => this.setState( { person: unPrefixObject( j ) } ) );
        } );
    }
    renderCols () {
        if ( ! isEmpty( this.state.person ) ) {
            const url = peopleUrl + "/" + this.state.person.id;
            const fields = [
                { displayName: "Nome completo", name: "fullName" },
                { displayName: "Razão social", name: "companyName" },
                { displayName: "Celular", name: "tel" },
                { displayName: "CEP", name: "cep", className: "col-sm-4", disabled: true },
                { displayName: "Cidade", name: "city", className: "col-sm-6", disabled: true },
                { displayName: "UF", name: "uf", className: "col-sm-2", disabled: true },
                { displayName: "Endereço", name: "address" },
            ];
            return fields.map( ( field, index ) => {
                return (
                    <div className={ ( field.className ? field.className : "col-12" ) } key={ index }>
                        <label className="d-block">
                            <small>
                                { field.displayName }
                            </small>
                            <PutInput
                                disabled={ ( field.disabled ? true : false ) }
                                name={ field.name }
                                value={ this.state.person[ field.name ] }
                                url={ url }
                            />
                        </label>
                    </div>
                );
            } );
        }
        return <div></div>
    }
    render () {
        return (
            <div className="container p-2 mw-100 d-flex">
                <div className="row mw-100 m-auto">
                    <div className="col-12">
                        <h2 className="text-secondary">
                            Dados Pessoais
                        </h2>
                        <p className="text-muted">
                            Edite seus dados utilizando os campos abaixo. A atualização ocorre de forma automática, basta alterá-los.
                        </p>
                    </div>
                    { this.renderCols() }
                </div>
            </div>
        );
    }
}