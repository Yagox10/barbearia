import React, {
    Component
} from "react";
import Select from 'react-select';

import {
    peopleUrl,
    productsUrl,
    getInit,
    paymentsUrl,
    scopeName
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

const orderProducts = [
    {
        value: 1,
        label: "Cerveja Artesanal Dear John",
    },
    {
        value: 2,
        label: "Cerveja Brhama 1L",
    },
    {
        value: 3,
        label: "Cerveja Brhama 365mL",
    },
    {
        value: 4,
        label: "Cerveja Antártica 1L",
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
                                url={ peopleUrl }
                                responseHandler={ j => j.map( x => unPrefixObject( x ) ).map( y => ( { value: y.id, label: y.fullName } ) ) }
                                propName="options"
                            >
                                <Select
                                    onChange={ v => this.updateState( { customerId: v.value } ) }
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
                                url={ peopleUrl }
                                responseHandler={ j => j.map( x => unPrefixObject( x ) ).map( y => ( { value: y.id, label: y.fullName } ) ) }
                                propName="options"
                            >
                                <Select
                                    onChange={ v => this.updateState( { employeeId: v.value } ) }
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
                            <Select
                                options={ orderServices }
                                onChange={ v => this.updateState( { service: v.value } ) }
                            />
                        </label>
                    </div>
                    <div
                        className="col-12 col-sm-6"
                    >
                        <label className="d-block my-2">
                            <small>
                                Produtos
                            </small>
                            <Select
                                options={ orderProducts }
                                onChange={ v => this.updateState( { produtcts: ( v ? v.map( x => x.value ) : [] ) } ) }
                                isMulti
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
        value: "credit",
        label: "Crédito",
    },
    {
        value: "debit",
        label: "Débito",
    },
    {
        value: "cash",
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
const productsData = [
    {
        name: "name",
        text: "Nome do Produto",
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
export class NewProduct extends Component {
    state = {
        price: "",
        description: "",
        name: "",
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
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="d-block my-3">
                            Cadastre seu produto
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
                                Cadastrar Produto
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
    appendHander ( x ) {
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
                                                <div
                                                    key={ k }
                                                    className="m-auto py-2"
                                                >
                                                    { x[ y ] }
                                                </div>
                                            )
                                        } ) 
                                    }
                                    { this.appendHander( x ) }
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
        scope: "",
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
                <div className="row">
                    <div className="col-12">
                        <h2 className="d-block my-3">
                            Qual tipo de cadastro?
                        </h2>
                        <div className="d-block">
                            <Select
                                options={ [
                                    { value: "employee", label: "Funcionário" },
                                    { value: "customer", label: "Cliente" }
                                ] }
                                onChange={ v => this.updateState( { scope: v.value } ) }
                            />
                        </div>
                    </div>
                </div>
                <hr className="my-5" />
                <div className="form-group row">
                    <div className="col-12">
                        <h4 className="mb-3">
                            Cadastrando <span className={ "font-weight-bold text-" + ( this.state.scope === "employee" ? "danger" : "success" ) }>{ scopeName( this.state.scope ) }</span>
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
