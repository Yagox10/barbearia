/**
 * ORÇA AGORA BACKEND ROUTES
 */
export const basename = "http://localhost:8000";

export const apiUrl = basename + "/api";
export const peopleUrl = apiUrl + "/people";
export const productsUrl = apiUrl + "/products";
export const ordersUrl = apiUrl + "/orders";
export const paymentsUrl = apiUrl + "/payments";

export const scopeName = scope => {
    switch ( scope ) {
        case "provider":
            return "Fornecedor";
        case "medium":
            return "Mídia";
        case "dealer":
            return "Dealer";
        case "employee":
            return "Funcionário";
        case "operator":
            return "Operador";
        case "financial":
            return "Financeiro";
        case "master":
            return "Mestre";
        case "partner":
            return "Sócio";
        case "customer":
            return "Cliente";
        default:
            return "";
    }
}

export const navigation = [
    {
        "text": "Início",
        "url": "/",
        "icon": "fas fa-home",
    },
    {
        "text": "Nova Conta",
        "url": "/nova-conta",
        "icon": "fas fa-user-plus",
    },
    {
        text: "Listar Contas",
        url: "/listar-contas",
        icon: "fas fa-users"
    },
    {
        text: "Novo Produto",
        url: "/novo-produto",
        icon: "fas fa-plus"
    },
    {
        text: "Listar Produtos",
        url: "/listar-produtos",
        icon: "fas fa-list-ul"
    },
    {
        text: "Novo Pedido",
        url: "/novo-pedido",
        icon: "fas fa-file"
    },
    {
        text: "Listar Pedidos",
        url: "/listar-pedidos",
        icon: "fas fa-copy"
    },
    {
        text: "Novo Pagamento",
        url: "/novo-pagamento",
        icon: "fas fa-money-bill"
    },
    {
        text: "Listar Pagamentos",
        url: "/listar-pagamentos",
        icon: "fas fa-wallet"
    },
]

export const getInit = ( body, method = "POST" ) => {
    return {
        method: method,
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( body )
    }
}