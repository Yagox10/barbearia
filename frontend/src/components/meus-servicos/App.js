import React, {
    Component,
} from 'react';
import {
    unPrefixObject,
    getByQuery,
    valueToObject,
    isEmpty
} from '../../functions';
import {
    servicesUrl,
    updateUserUrl,
    readUserUrl
} from '../../settings';

import AssocSelects from '../associative-react-selects/App';

import EditableSelect from '../editable-select/App';

export default class App extends Component {
    state = {
        services: [],
        segments: [],
        newSegment: {}
    }
    componentDidMount () {
        const u = valueToObject( getByQuery( "#user" ) );
        this.setState(
            { user: u },
            () => {
                fetch( readUserUrl + "/" + this.state.user.id + "/services" )
                .then( r => r.json() )
                .then( j => {
                    let services = j;
                    services.map( x => {
                        return {
                            id: parseInt( x.id ),
                            children: x.children.map( y => {
                                return {
                                    id: parseInt( y.id ),
                                    name: y.name
                                }
                            } )
                        }
                    } )
                    console.log( "j", services )
                    this.setState( { services: services } )
                } );
            }
        )

        fetch( servicesUrl + "?service_parentId=0&service_active=1" )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                this.setState(
                    { segments: j.map( x => unPrefixObject( x ) ).map( y => ( { value: parseInt( y.id ), label: y.name } ) ) }
                );
            }
        } );
    }
    updateService ( v ) {
        let services = this.state.services;
        this.state.services.forEach( ( x, i ) => {
            if ( v.id === x.id ) {
                services[ i ].children = v.children
            }
        }, services )
        this.setState( { services: services } );
    }
    newServicesHandler ( v ) {
        this.setState( { newSegment: ( isEmpty( v.children ) ? {} : v ) }, () => console.log( "newSegment", this.state.newSegment ) );
    }
    submitHandler () {
        let segment = {
            id: this.state.newSegment.value,
            children: this.state.newSegment.children.map( x => {
                return {
                    id: x.value
                }
            } )
        }
        let services = this.state.services.map( x => {
            return {
                id: x.id,
                children: x.children.map( y => {
                    return {
                        id: y.id
                    }
                } )
            }
        } )
        services.push( segment );
        fetch(
            updateUserUrl + "/" + this.state.user.id + "/services",
            {
                method: "POST",
                mode: "cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify( services )
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
            const confirm = window.confirm( "Deseja realmente remover o segmento?" );
            if ( confirm ) {
                let newServices = [];
                this.state.services.forEach( x => {
                    if ( x.id !== id ) {
                        newServices.push( x );
                    }
                } );
                this.setState( { services: newServices } );
            }
        } else {
            let hasEmptySeg = false;
            this.state.services.forEach( x => {
                if ( isEmpty( x.children ) ) {
                    hasEmptySeg = true;
                }
            } );
            if ( hasEmptySeg ) {
                alert( "Você possui um segmento sem serviços ou produtos selecionados. Por favor, elimine-o ou preencha pelo menos um serviço ou produto para prosseguir." );
            } else {
                fetch(
                    updateUserUrl + "/" + this.state.user.id + "/services",
                    {
                        method: "POST",
                        mode: "cors",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify( this.state.services )
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
        }
    }
    displayCurrentData () {
        if ( Array.isArray( this.state.services ) ) {
            return this.state.services.map( ( segment, i ) => {
                return (
                    <div key={ i } className="col-12">
                        <EditableSelect
                            url={ servicesUrl + "?service_parentId=" + segment.id + "&service_active=1" }
                            isMulti
                            onChange={ v => this.updateService( v ) }
                            parent={ { id: segment.id, name: segment.name } }
                            value={
                                segment.children.map( x => ( {
                                    value: parseInt( x.id ),
                                    label: x.name
                                } ) )
                            }
                        >
                            <div className="my-auto d-flex">
                                <span className="my-auto">
                                    <strong>
                                        { segment.name }
                                    </strong>
                                </span>
                                <small
                                    className="my-auto text-danger ml-auto"
                                    onClick={ ev => this.currentSegmentHandler( segment.id ) }
                                >
                                    <i className="fas fa-trash mx-1"></i>
                                    <strong>
                                        remover segmento
                                    </strong>
                                </small>
                            </div>
                        </EditableSelect>
                    </div>
                );
            } )
        }
    }
    render () {
        return (
            <div className="container p-2 mw-100">
                <div className="row mw-100 d-flex">
                    <div className="col-12 m-auto">
                        <h2 className="text-secondary mb-4">
                            Meus Serviços
                        </h2>
                    </div>
                </div>
                <div className={ ( this.state.services.length > 0 ? "row" : "d-none" ) }>
                    <div className="col-12">
                        <h4>Seus segmentos</h4>
                        <p className="text-muted">
                            É possível remover seus segmentos ou alterá-los. Para alterar basta escolher os serviços disponíveis para o segmento. É possível remover o segmento por inteiro clicando em <code><i className="fas fa-trash"></i><span>remover segmento</span></code>. Após terminar as alterações e remoções é necessário salvar o resultado clicando em <code className="text-success"><span>atualizar segmento</span><i className="fas fa-angle-right"></i></code>
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
                                    atualizar segmentos
                                </span>
                                <i className="fas fa-angle-right mx-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12">
                        <h4>Novo segmento</h4>
                        <p className="text-muted">
                            É possível adicionar um novo segmento. Após escolher o segmento, escolha os serviços e produtos oferecidos e clique em <code className="text-success">Confirmar novo segmento <i className="fas fa-angle-right"></i></code>.
                        </p>
                    </div>

                    <div className="col-12">
                        <div className="my-3">
                            <AssocSelects
                                labelOne="segmento"
                                optionsOne={
                                    this.state.segments.filter( seg => {
                                        for ( let i in this.state.services ) {
                                            if ( seg.value === parseInt( this.state.services[ i ][ "id" ] ) ) {
                                                return false;
                                            }
                                        }
                                        return true
                                    } )
                                }
                                responseHandler={ j => j
                                    .map( x => unPrefixObject( x ) )
                                    .map( y => ( { value: y.id, label: y.name } ) )
                                }
                                labelTwo="serviços"
                                isMultiTwo={ true }
                                onChange={ v => this.newServicesHandler( v ) }
                            ></AssocSelects>
                        </div>
                    </div>
                    <div className={ ( isEmpty( this.state.newSegment ) ? "d-none" : "d-block" ) }>
                        <button
                            className="btn btn-link text-success"
                            onClick={ ev => this.submitHandler() }
                        >
                            <span className="mx-1">
                                Confimar novo segmento
                            </span>
                            <i className="fas fa-angle-right"></i>
                        </button>
                    </div>

                </div>
            
            </div>
        );
    }
}