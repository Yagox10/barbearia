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
            append={ x => (
                <a className="text-info small">
                    <i className="fas fa-list"></i>
                    <span className="mx-1">Detalhes</span>
                </a>
            ) }
        ></SeeWithoutPrefix>
    </div>
);
const SeeProducts = () => (
    <div>
        <SeeWithoutPrefix
            url={ productsUrl }
            fields={ [ "name", "price", "description" ] }
            preppend={ [ "Nome", "Preço", "Descrição" ] }
            append={ x => (
                <a className="text-info small">
                    <i className="fas fa-list"></i>
                    <span className="mx-1">Detalhes</span>
                </a>
            ) }
        ></SeeWithoutPrefix>
    </div>
);
const SeeOrders = () => (
    <div>
        Em desenvolvimento
        {/* <SeeWithoutPrefix
            url={ ordersUrl }
            fields={ [ "date", "price", "description" ] }
            preppend={ [ "Data", "Preço", "Descrição" ] }
            append={ x => (
                <a className="text-info small">
                    <i className="fas fa-list"></i>
                    <span className="mx-1">Detalhes</span>
                </a>
            ) }
        ></SeeWithoutPrefix> */}
    </div>
);
const SeePayments = () => (
    <div>
        <SeeWithoutPrefix
            url={ paymentsUrl }
            fields={ [ "date", "mode", "description" ] }
            preppend={ [ "Data", "Modo de Pagamento", "Descrição" ] }
            append={ x => (
                <a className="text-info small">
                    <i className="fas fa-list"></i>
                    <span className="mx-1">Detalhes</span>
                </a>
            ) }
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

                        <Route path="/novo-produto" component={ NewProduct } />
                        <Route path="/listar-produtos" component={ SeeProducts } />

                        <Route path="/novo-pedido" component={ NewOrder } />
                        <Route path="/listar-pedidos" component={ SeeOrders } />

                        <Route path="/novo-pagamento" component={ NewPayment } />
                        <Route path="/listar-pagamentos" component={ SeePayments } />
                        
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