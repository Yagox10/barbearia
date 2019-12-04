import React, {
    Component,
    cloneElement
} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {
    ordersUrl,
    productsUrl,
    paymentsUrl,
    peopleUrl
} from '../../settings';

import Unvailable from '../unvailable/App';
import Home from '../tela-inicial/App';
import NewUser, {
    NewProduct,
    SeeWithoutPrefix,
    NewPayment,
    NewOrder
} from '../form/App';


const SeeUsers = ( props ) => (
    <div>
        <SeeWithoutPrefix
            url={ peopleUrl + "?person_scope=" + props.scope }
            fields={ [ "fullName", "email", "phone" ] }
            preppend={ [ "Nome", "email", "Telefone" ] }
            // append={ x => (
            //     <a className="text-info small"
            //         onClick={ ev => alert( "..." )}
            //     >
            //         <i className="fas fa-list"></i>
            //         <span className="mx-1">Detalhes</span>
            //     </a>
            // ) }
        ></SeeWithoutPrefix>
    </div>
);
const SeeProducts = ( props ) => (
    <div>
        <SeeWithoutPrefix
            url={ productsUrl + "?product_scope=" + props.scope }
            fields={ props.fields }
            preppend={ props.preppend }
            // append={ x => (
            //     <a className="text-info small"
            //         onClick={ ev => alert( "..." )}
            //     >
            //         <i className="fas fa-list"></i>
            //         <span className="mx-1">Detalhes</span>
            //     </a>
            // ) }
        ></SeeWithoutPrefix>
    </div>
);
const SeeOrders = () => (
    <div>
        <SeeWithoutPrefix
            url={ paymentsUrl }
            fields={ [ "date", "mode", "customerId", "employeeId" ] }
            preppend={ [ "Data", "Modo de Pagamento", "Cliente", "Funcionário/a" ] }
            // append={ x => (
            //     <a className="text-info small"
            //         onClick={ ev => alert( "..." )}
            //     >
            //         <i className="fas fa-list"></i>
            //         <span className="mx-1">Detalhes</span>
            //     </a>
            // ) }
        ></SeeWithoutPrefix>
    </div>
);

export default class App extends Component {
    handleSidebar () {
        let output;
        const main = (
            <div className="w-100 p-2">
                <main className="d-block mb-5 pb-4 mb-sm-0 pb-sm-0">
                    <Switch>
                        <Route
                            path="/novo-funcionario"
                            render={ () => <NewUser scope="employee" /> }
                        />
                        <Route
                            path="/listar-funcionarios"
                            render={ () => <SeeUsers scope="employee" /> }
                        />

                        <Route
                            path="/novo-cliente"
                            render={ () => <NewUser scope="customer" /> }
                        />
                        <Route
                            path="/listar-clientes"
                            render={ () => <SeeUsers scope="customer" /> }
                        />
                        {/*  */}
                        <Route
                            path="/novo-produto"
                            render={ () => <NewProduct scope="product"/> }
                        />
                        <Route
                            path="/listar-produtos"
                            render={ () => <SeeProducts
                                scope="product"
                                fields={ [ "name", "price", "stock" ] }
                                preppend={ [ <span>Nome</span>, <span>Preço</span>, <span>Estoque</span> ] }
                            /> }
                        />
                        <Route
                            path="/novo-servico"
                            render={ () => <NewProduct scope="service" /> }
                        />
                        <Route
                            path="/listar-servicos"
                            render={ () => <SeeProducts
                                scope="service"
                                fields={ [ "name", "price" ] }
                                preppend={ [ <span>Nome</span>, <span>Preço</span>, <span></span> ] }
                            /> }
                        />
                        {/*  */}
                        <Route path="/novo-pedido" component={ NewOrder } />
                        <Route path="/listar-pedidos" component={ SeeOrders } />

                        <Route path="/" component={ Home } />
                        <Route component={ Unvailable } />
                    </Switch>
                </main>
            </div>
        );
        if ( this.props.sidebar ) {
            switch ( this.props.sidebarPosition ) {
                case "right":
                    output = [ main, this.props.sidebar ];
                    break;
                default:
                    output = [ this.props.sidebar, main ];
            }
        } else {
            output = main;
        }
        return output.map( ( x, i ) => cloneElement( x, { key: i } ) );
    }
    render() {
        return (
            <Router>
            
                { this.props.header }
    
                <div className={ "d-flex" + ( this.props.containerClassName ? this.props.containerClassName : "" ) }>
                    
                    { this.props.bottombar }
                    
                    { this.handleSidebar() }
                    
                </div>
    
            </Router>
        );
    }
}