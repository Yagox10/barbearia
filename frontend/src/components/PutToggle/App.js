import React from 'react';
import Select from 'react-select';
import {
    getBasename,
    unPrefixObject,
} from './functions';

/**
 * PROPS
 * url: full url to put
 * name: name attribute and db field
 * checked: 0 or 1
 */
export class PutToggle extends React.Component {
    state = { checked: false }

    componentDidMount () {
        this.setState( { checked: this.props.checked } );
    }

    sendData () {
        this.setState(
            { checked: ! this.state.checked },
            () => fetch( this.props.url, {
                method: "PUT",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( { [ this.props.name ]: ( this.state.checked ? 1 : 0 ) } )
            } ).then( r => r.json() ).then( j => alert( "Atualizado com sucesso" ) )
        );
    }

    render () {
        return (
            <input
                type="checkbox"
                name={ this.props.name }
                onChange={ ev => this.sendData() }
                checked={ this.state.checked }
            />
        );
    }
}

/**
 * PROPS
 * url: full url to put
 * name: name attribute and db field
 * value: initial value
 */
export class PutInput extends React.Component {
    state = { value: "" }

    componentDidMount () {
        this.setState( { value: this.props.value } );
    }

    sendData ( value ) {
        this.setState(
            { value: value },
            () => fetch( this.props.url, {
                method: "PUT",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( { [ this.props.name ]: this.state.value } )
            } ) //.then( r => r.json() )
        );
    }

    render () {
        return (
            <input
                className="form-control"
                type="text"
                name={ this.props.name }
                onChange={ ev => this.sendData( ev.target.value ) }
                value={ this.state.value }
            />
        );
    }
}

export default class App extends React.Component {

    state = {
        segments: [],
        services: []
    }

    componentDidMount () {
        fetch( getBasename() + "/api/services?service_parentId=0&service_active=1" )
        .then( res => res.json() )
        .then( json => {
            this.setState( { segments: ( json ? json.map( j => unPrefixObject( j ) ) : Array( 0 ) ) } );
        } );
    }

    callServices ( value ) {
        this.setState( { services: Array( 0 ) },
        () => fetch( getBasename() + "/api/services?service_parentId=" + value.value )
            .then( r => r.json() )
            .then( j => {
                this.setState( { services: ( j ? j.map( s => unPrefixObject( s ) ) : Array( 0 ) ) } );
            } )
        );
    }

    listServices () {
        return this.state.services.map( ( service, index ) => {
            return (
                <li className="d-flex border-bottom p-1 my-1" key={ index }>
                    <span className="my-auto">
                        <PutInput
                            name="name"
                            url={ getBasename() + "/api/services/" + service.id }
                            value={ service.name }
                        />
                    </span>
                    <label className="ml-auto">
                        <PutToggle
                            name="active"
                            url={ getBasename() + "/api/services/" + service.id }
                            checked={ service.active }
                        />
                    </label>
                </li>
            );
        } );
    }

    render () {
        return (
            <div className="">
                <div className="p-2">
                    <label className="d-block">
                        <small>
                            <strong>
                                Segmento
                            </strong>
                        </small>
                        <Select
                            options={ this.state.segments.map( s => ( { value: s.id, label: s.name } ) ) }
                            onChange={ value => this.callServices( value ) }
                        />
                    </label>
                </div>

                <ul className="list-group">
                    <li className="d-flex border-bottom p-1">
                        <small className="my-auto">
                            Nome do serviço / produto
                        </small>
                        <small className="ml-auto">
                            Ativo
                        </small>
                    </li>
                    { this.listServices() }
                </ul>
            </div>
        );
    }
}
