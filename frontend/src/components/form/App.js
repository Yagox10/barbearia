import React, {
    Component
} from "react";
import Select from 'react-select';

import {
    peopleUrl,
    productsUrl,
    getInit,
    paymentsUrl,
    scopeName,
} from '../../settings';
import {
    responseWindow,
    unPrefixObject
} from "../../functions";

import Http from '../http';

/**
 * 
 */

const orderServices = [
    {
        value: 1,
        label: "Corte Tesoura",
    },
    {
        value: 2,
        label: "Corte na Máquina",
    },
    {
        value: 3,
        label: "Barba Modelada",
    },
    {
        value: 4,
        label: "Corte na Tesoura e Barba Modelada",
    }
]


export class NewOrder extends Component {
    state = {
        value: "",
        description: "",
        mode: "",
    }
    updateState ( pair ) {
        this.setState( pair );
    }
    submitHandler () {
        fetch( paymentsUrl, getInit( this.state ) )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                responseWindow( "Produto cadastro com sucesso." );
            } else {
                responseWindow( "Preencha os campos obrigatórios." );
            }
        } )
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="d-block my-3">
                            Registro de Pedido
                        </h2>
                    </div>
                </div>
                <div className="form-group row">
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Cliente
                            </small>
                            <Http
                                url={ peopleUrl + "?person_scope=customer" }
                                responseHandler={ j => j.map( x => unPrefixObject( x ) ).map( y => ( { value: y.id, label: y.fullName } ) ) }
                                propName="options"
                            >
                                <Select
                                    onChange={ v => this.updateState( { customerId: v.label } ) }
                                />
                            </Http>
                        </label>
                    </div>
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Funcionário/a
                            </small>
                            <Http
                                url={ peopleUrl + "?person_scope=employee" }
                                responseHandler={ j => j.map( x => unPrefixObject( x ) ).map( y => ( { value: y.id, label: y.fullName } ) ) }
                                propName="options"
                            >
                                <Select
                                    onChange={ v => this.updateState( { employeeId: v.label } ) }
                                />
                            </Http>
                        </label>
                    </div>
                    {/*  */}
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Serviço
                            </small>
                            <Http
                                url={ productsUrl + "?product_scope=service" }
                                responseHandler={ j => j.map( x => unPrefixObject( x ) ).map( y => ( { value: y.name, label: y.name } ) ) }
                                propName="options"
                            >
                                <Select
                                    onChange={ v => this.updateState( { service: v.value } ) }
                                />
                            </Http>
                        </label>
                    </div>
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Produtos
                            </small>
                            <button className="btn btn-block btn-primary"
                                onClick={ ev => alert( "em desenvolvimento" ) }
                            >
                                <i className="fas fa-plus"></i>
                                <span className="mx-1">
                                    Adicionar Produtos
                                </span>
                            </button>
                        </label>
                    </div>
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Modo de Pagamento
                            </small>
                            <Select
                                options={ paymentsModes }
                                onChange={ v => this.updateState( { mode: v.value } ) }
                            />
                        </label>
                    </div>
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Valor Total:
                            </small>
                            <input
                                value={ this.state.sum }
                                disabled
                                className="form-control"
                            />
                        </label>
                    </div>
                    {/*  */}
                    <div
                        className="col-12"
                    >
                        <label className="d-block my-2">
                            <small>
                                Observação <small className="text-muted">(opcional)</small>
                            </small>
                            <textarea
                                className="form-control"
                                value={ this.state.obs }
                                onChange={ ev => this.updateState( { obs: ev.target.value } ) }
                                placeholder="Descreva alguma situação fora do comum que o sistema não possa identificar de forma automática pelas operações padrão."
                            ></textarea>
                        </label>
                    </div>
                    <div className="col-12 text-center my-3">
                        <button
                            className="btn btn-success"
                            onClick={ ev => this.submitHandler() }
                        >
                            <span className="mx-1">
                                Registrar Pedido
                            </span>
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * 
 */
const paymentsModes = [
    {
        value: "Crédito",
        label: "Crédito",
    },
    {
        value: "Débito",
        label: "Débito",
    },
    {
        value: "Dinheiro",
        label: "Dinheiro",
    }
]
export class NewPayment extends Component {
    state = {
        value: "",
        description: "",
        mode: "",
    }
    updateState ( pair ) {
        this.setState( pair );
    }
    submitHandler () {
        fetch( paymentsUrl, getInit( this.state ) )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                responseWindow( "Produto cadastro com sucesso." );
            } else {
                responseWindow( "Preencha os campos obrigatórios." );
            }
        } )
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="d-block my-3">
                            Dados do Pagamento
                        </h2>
                    </div>
                </div>
                <div className="form-group row">
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Valor
                            </small>
                            <input
                                type="text"
                                value={ this.state.value }
                                onChange={ ev => this.updateState( { value: ev.target.value } ) }
                                className="form-control"
                            />
                        </label>
                    </div>
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Modo de Pagamento
                            </small>
                            <Select
                                options={ paymentsModes }
                                onChange={ v => this.updateState( { mode: v.value } ) }
                            />
                        </label>
                    </div>
                    <div
                        className="col-12"
                    >
                        <label className="d-block my-2">
                            <small>
                                Descrição ou observação
                            </small>
                            <textarea
                                className="form-control"
                                value={ this.state.description }
                                onChange={ ev => this.updateState( { description: ev.target.value } ) }
                            ></textarea>
                        </label>
                    </div>
                    <div className="col-12 text-center my-3">
                        <button
                            className="btn btn-success"
                            onClick={ ev => this.submitHandler() }
                        >
                            <span className="mx-1">
                                Registrar Pagamento
                            </span>
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
/**
 * 
 */
export class NewProduct extends Component {
    state = {
        price: "",
        description: "",
        name: "",
        scope: this.props.scope,
    }
    updateState ( pair ) {
        this.setState( pair );
    }
    submitHandler () {
        fetch( productsUrl, getInit( this.state ) )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                responseWindow( "Produto cadastro com sucesso." );
            } else {
                responseWindow( "Preencha os campos obrigatórios." );
            }
        } )
    }
    render () {
        const productsData = [
            {
                name: "name",
                text: "Nome do " + scopeName( this.props.scope ),
                type: "text",
                col: "6",
            },
            {
                name: "price",
                text: "Preço",
                type: "text",
                col: "6",
            },
            {
                name: "description",
                text: "Breve descrição",
                type: "text",
                col: "12",
            }
        ]
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="d-block my-3">
                            Cadastre seu { scopeName( this.props.scope ) }
                        </h2>
                    </div>
                </div>
                <div className="form-group row">
                    {
                        productsData.map( ( x, i ) => {
                            return (
                                <div
                                    className={ "col-12 col-sm-" + x.col }
                                    key={ i }
                                >
                                    <label className="d-block my-2">
                                        <small>
                                            { x.text } 
                                        </small>
                                        <input
                                            type={ x.type }
                                            value={ this.state[ x.name ] }
                                            onChange={ ev => this.updateState( { [ x.name ]: ev.target.value } ) }
                                            className="form-control"
                                        />
                                    </label>
                                </div>
                            );
                        } )
                    }
                    <div className="col-12 text-center my-3">
                        <button
                            className="btn btn-success"
                            onClick={ ev => this.submitHandler() }
                        >
                            <span className="mx-1">
                                Cadastrar { scopeName( this.props.scope ) }
                            </span>
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * url: string url
 * fields: array of { component: JSX* }; *: must render data as children (JSX just a frame)
 * append: JSX append to each row
 * preppend: list header array of strings
 */
export class SeeWithoutPrefix extends Component {
    state = {
        data: []
    }
    componentDidMount () {
        fetch( this.props.url )
        .then( r => r.json() )
        .then( j => this.setState( { data: j.map( x => unPrefixObject( x ) ) } ) );
    }
    preppendHander () {
        if ( this.props.preppend ) {
            return (
                <li className="list-group-item d-flex">
                    {
                        this.props.preppend.map( ( y, k ) => {
                            return ( 
                                <div
                                    key={ k }
                                    className="m-auto py-1"
                                >
                                    { y }
                                </div>
                            )
                        } )
                    }
                </li>
            )
        }
    }
    appendHandler ( x ) {
        if ( this.props.append ) {
            if ( x ) {
                return (
                    <div className="ml-auto my-auto">
                        { this.props.append( x ) }
                    </div>
                );
            }
        }
    }
    render () {
        if ( this.state.data.length > 0 ) {
            return (
                <ul
                    className="list-group"
                >
                    { this.preppendHander() }
                    {
                        this.state.data.map( ( x, i ) => {
                            return(
                                <li
                                    key={ i }
                                    className="list-group-item d-flex"
                                >
                                    {
                                        this.props.fields.map( ( y, k ) => {
                                            return ( 
                                                <td
                                                    key={ k }
                                                    className="m-auto py-2"
                                                >
                                                    { x[ y ] }
                                                </td>
                                            )
                                        } ) 
                                    }
                                    { this.appendHandler( x ) }
                                </li>
                            );
                        } )
                    }
                </ul>
            );
        } else {
            return <div>Sem registros.</div>
        }
    }
}

/**
 * 
 */
const data = [
    {
        name: "fullName",
        text: "Nome Completo",
        type: "text",
        col: "6",
    },
    {
        name: "birthday",
        text: "Nascimento",
        type: "date",
        col: "6",
    },
    {
        name: "phone",
        text: "Telefone",
        type: "text",
        col: "6",
    },
    {
        name: "email",
        text: "email",
        type: "email",
        col: "6",
    },
    {
        name: "address",
        text: "Endereço",
        type: "text",
        col: "6",
    },
    {
        name: "doc",
        text: "Documento",
        type: "text",
        col: "6",
    },
]

export class MoreGeneral extends Component {
    state = {
        fullName: "",
        birthday: "",
        phone: "",
        email: "",
        address: "",
        scope: this.props.scope,
        doc: ""
    }
    updateState ( pair ) {
        this.setState( pair );
    }
    submitHandler () {
        fetch( peopleUrl, getInit( this.state ) )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                responseWindow( "Cadastro realizado com sucesso." );
            } else {
                responseWindow( "Preencha os campos obrigatórios." );
            }
        } )
    }
    render () {
        return (
            <div className="container p-0">
                <div className="form-group row">
                    {
                        data.map( ( x, i ) => {
                            return (
                                <div
                                    className={ "col-12 col-sm-" + x.col }
                                    key={ i }
                                >
                                    <label className="d-block my-2">
                                        <small>
                                            { x.text } 
                                        </small>
                                        <input
                                            type={ x.type }
                                            value={ this.state[ x.name ] }
                                            onChange={ ev => this.updateState( { [ x.name ]: ev.target.value } ) }
                                            className="form-control"
                                        />
                                    </label>
                                </div>
                            );
                        } )
                    }
                </div>
            </div>
        );
    }
}

export default class NewCustomer extends Component {
    state = {
        fullName: "",
        birthday: "",
        phone: "",
        email: "",
        address: "",
        scope: this.props.scope,
        doc: ""
    }
    updateState ( pair ) {
        this.setState( pair );
    }
    submitHandler () {
        fetch( peopleUrl, getInit( this.state ) )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                responseWindow( "Cadastro realizado com sucesso." );
            } else {
                responseWindow( "Preencha os campos obrigatórios." );
            }
        } )
    }
    render () {
        return (
            <div className="container">
                <div className="form-group row">
                    <div className="col-12">
                        <h4 className="mb-3">
                            Cadastrando <span className={ "font-weight-bold text-" + ( this.props.scope === "employee" ? "danger" : "success" ) }>{ scopeName( this.props.scope ) }</span>
                        </h4>
                    </div>
                    {
                        data.map( ( x, i ) => {
                            return (
                                <div
                                    className={ "col-12 col-sm-" + x.col }
                                    key={ i }
                                >
                                    <label className="d-block my-2">
                                        <small>
                                            { x.text } 
                                        </small>
                                        <input
                                            type={ x.type }
                                            value={ this.state[ x.name ] }
                                            onChange={ ev => this.updateState( { [ x.name ]: ev.target.value } ) }
                                            className="form-control"
                                        />
                                    </label>
                                </div>
                            );
                        } )
                    }
                    <div className="col-12 text-center my-3">
                        <button
                            className="btn btn-success"
                            onClick={ ev => this.submitHandler() }
                        >
                            <span className="mx-1">
                                Confirmar cadastro
                            </span>
                            <i className="fas fa-check"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
