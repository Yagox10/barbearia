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
    unPrefixObject,
    getDate
} from "../../functions";

import Http from '../http';


export class Products extends Component {
    state = {
        options: [],
        items: []
    };

    componentDidMount () {
        fetch( productsUrl + "?product_scope=product" )
        .then( r => r.json() )
        .then( j => {
            if ( j ) {
                const options = j.map( x => {
                    let y = unPrefixObject( x );
                    y.amount = 0;
                    return y;
                } );
                this.setState( { options: options } );
            }
        } );
    }
    itemsHandler = v => {
        if ( v ) {
            const items = v.map( x => {
                if ( ! this.state.items.some( item => item.value === x.value ) ) {
                    x.amount = 1;
                }
                return x;
            } );
            this.setState( { items: items } );
        }
    };

    changeHandler ( item, amount ) {
        const options = this.state.options.map( i => {
            if ( i.id === item.id ) {
                let nItem = item;
                nItem.amount = amount
                return nItem;
            }
            return i;
        } );
        this.setState(
            { options: options },
            () => {
                if ( this.props.onChange ) {
                    this.props.onChange( this.state.options.filter( op => op.amount > 0 ) )
                }
            }
        );
    }

    render() {
        return (
            <div>
                { this.state.options.map( ( option, i ) => {
                    return (
                        <div key={ i } >
                            <span>
                                <strong>{ option.name }</strong>
                                <span className="text-success px-2">{ option.price }</span>
                            </span>
                            
                            <div className="ml-auto">
                                <input
                                    type="number"
                                    min="0"
                                    className="form-control"
                                    value={ option.amount }
                                    onChange={ ev => this.changeHandler( option, ev.target.value ) }
                                />
                            </div>
                        </div>
                    );
                } ) }
            </div>
        );
    }
}


export class NewOrder extends Component {
    state = {
        value: "",
        description: "",
        mode: "",
        totalPrice: "",
        items: [],
        obs: ""
    }
    updateState ( pair ) {
        this.setState( pair );
    }
    submitHandler () {
        if (
            this.state.customerId
            &&
            this.state.employeeId
            &&
            this.state.service
            &&
            this.state.mode
            &&
            this.state.employeeId
        ) {
            if ( this.state.totalPrice !== "" ) {
                const pDescription = "Produtos:" + this.state.items.map( x => x.name + "(x" + x.amount + ")" ).join( "," );
                let value = "";
                if ( ! ( "" + this.state.totalPrice ).match( /,/ ) ) {
                    value = this.state.totalPrice + ",00";
                } else {
                    value = this.state.totalPrice
                }
                const body = {
                    customerId: this.state.customerId,
                    employeeId: this.state.employeeId,
                    service: this.state.service.label,
                    mode: this.state.mode,
                    description: pDescription + "|" + this.state.obs,
                    value: value,
                }
                fetch( paymentsUrl, getInit( body ) )
                .then( r => r.json() )
                .then( j => {
                    if ( j ) {
                        responseWindow( "Pedido cadastrado com sucesso." );
                        window.location.reload( true );
                    } else {
                        responseWindow( "Preencha os campos obrigatórios." );
                    }
                } )
            } else {
                alert( "Clique em \"Calular valor ->\" antes de registrar." );
            }
        } else {
            alert( "Preencha os campos acima antes de registrar." );
        }
    }
    totalPriceHandler () {
        if ( ! this.state.service ) {
            alert( "Escolha o serviço, por favor." );
        } else {
            let totalValue = parseFloat( this.state.service.price );
            if ( this.state.items.length > 0 ) {
                const productsValue = this.state.items.map( item => {
                    return parseFloat( item.price )*parseFloat( item.amount )
                } )
                .reduce( ( total, currentValue ) => total + currentValue, 0 );
                totalValue = totalValue + productsValue;
            }
            this.setState( { totalPrice: totalValue } );
        }
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
                                responseHandler={ j => j.map( x => unPrefixObject( x ) ).map( y => ( { value: y.name, label: y.name, price: y.price } ) ) }
                                propName="options"
                            >
                                <Select
                                    onChange={ v => this.updateState( { service: v } ) }
                                />
                            </Http>
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
                        <div className="d-block my-2">
                            <small>
                                Produtos
                            </small>
                            <Products onChange={ items => this.updateState( { items: items } ) } />
                        </div>
                    </div>
                    
                    <div
                        className="col-12"
                    >
                        <div className="input-group mb-3 mt-4">
                            <div className="input-group-prepend">
                                <span className="input-group-text text-white bg-success"
                                onClick={ ev => this.totalPriceHandler() }>
                                    Calular valor <i className="fas fa-arrow-right mx-2"></i>
                                </span>
                            </div>
                            <input
                                disabled
                                value={ this.state.totalPrice }
                                className="form-control"
                                type="text"
                                placeholder="Clique no botão ao lado para calcular o valor final"
                                onChange={ ev => () => {} }
                            />
                        </div>
                    </div>
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
    initialize () {
        fetch( this.props.url )
        .then( r => r.json() )
        .then( j => this.setState( { data: ( j ? j.map( x => unPrefixObject( x ) ) : [] ) } ) );
    }
    componentDidMount () {
        this.initialize();
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
    contentHandler () {
        if ( this.state.data.length > 0 ) {
            return this.state.data.map( ( x, i ) => {
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
        } else {
            return "Sem registros."
        }
    }
    finderHandler ( value ) {
        if ( value ) {
            fetch( this.props.withFinder + "/" + this.props.scope + "/" + value )
            .then( r => r.json() )
            .then( j => {
                if ( j ) {
                    this.setState( { data: j.map( x => unPrefixObject( x ) ) } );
                } else {
                    this.initialize();
                }
            } )
        } else {
            this.initialize();
        }
    }
    filterHandler () {
        if ( this.props.filter ) {
            return (
                <label>
                    <small>
                        { this.props.filterLabel }
                    </small>
                    <input
                        type="text"
                        className="form-control"
                        onChange={ ev => this.finderHandler( ev.target.value ) }
                    />
                </label>
            )
        }
        return ""
    }
    render () {
        return (
            <div>
                { this.filterHandler() }
                <ul
                    className="list-group"
                >
                    { this.preppendHander() }
                    { this.contentHandler() }
                </ul>
            </div>
        );
    }
}
export class OtherSeeWithoutPrefix extends Component {
    state = {
        data: [],
        from: "",
        to: getDate()
    }
    initialize () {
        fetch( this.props.url )
        .then( r => r.json() )
        .then( j => this.setState( { data: ( j ? j.map( x => unPrefixObject( x ) ) : [] ) } ) );
    }
    componentDidMount () {
        this.initialize();
    }
    updateState ( pair ) {
        this.setState( pair );
    }
    preppendHander () {
        if ( this.props.preppend ) {
            return (
                <th className="list-group-item d-flex">
                    {
                        this.props.preppend.map( ( y, k ) => {
                            return ( 
                                <td
                                    key={ k }
                                    className="m-auto py-1"
                                >
                                    { y }
                                </td>
                            )
                        } )
                    }
                </th>
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
    contentHandler () {
        if ( this.state.data.length > 0 ) {
            return this.state.data.map( ( x, i ) => {
                return(
                    <tr
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
                    </tr>
                );
            } )
        } else {
            return "Sem registros."
        }
    }
    finderHandler () {
        if ( this.state.to === "" ) {
            this.setState(
                { to: getDate() },
                () => {
                    const body = {
                        from: this.state.from,
                        to: ( this.state.to === "" ? getDate() : this.state.to ),
                        field: "date"
                    }
                    console.log( "body", body );
                    fetch( this.props.withFinder, getInit( body ) )
                    .then( r => r.json() )
                    .then( j => {
                        if ( j ) {
                            this.setState( { data: j.map( x => unPrefixObject( x ) ) } );
                        } else {
                            this.initialize();
                        }
                    } )
                }
            );
        } else {
            const body = {
                from: this.state.from,
                to: ( this.state.to === "" ? getDate() : this.state.to ),
                field: "date"
            }
            console.log( "body",body );
            fetch( this.props.withFinder, getInit( body ) )
            .then( r => r.json() )
            .then( j => {
                if ( j ) {
                    this.setState( { data: j.map( x => unPrefixObject( x ) ) } );
                } else {
                    this.initialize();
                }
            } )
        }
    }
    filterHandler () {
        // if ( this.props.filter ) {
            console.log( this.state );
            return (
                <div>
                    <label className="mx-3">
                        <small>
                            A partir de
                        </small>
                        <input
                            type="date"
                            className="form-control"
                            value={ this.state.from }
                            onChange={ ev => this.setState( { from: ev.target.value }, () => this.finderHandler() ) }
                        />
                    </label>
                    <label className="mx-3">
                        <small>
                            Até
                        </small>
                        <input
                            type="date"
                            className="form-control"
                            value={ this.state.to }
                            onChange={ ev => this.setState( { to: ev.target.value }, () => this.finderHandler() ) }
                        />
                    </label>
                </div>
            )
        // }
        // return ""
    }
    render () {
        return (
            <div>
                { this.filterHandler() }
                <table
                    className="list-group"
                >
                    { this.preppendHander() }
                    { this.contentHandler() }
                </table>
            </div>
        );
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
