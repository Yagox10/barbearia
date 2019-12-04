(window.webpackJsonpprovider=window.webpackJsonpprovider||[]).push([[0],{25:function(e,t,a){e.exports=a(36)},35:function(e,t,a){},36:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(13),c=a.n(l),o="http://localhost:8000/api",s=o+"/people",i=o+"/products",m=o+"/payments",u=function(e){switch(e){case"provider":return"Fornecedor";case"medium":return"M\xeddia";case"dealer":return"Dealer";case"employee":return"Funcion\xe1rio";case"operator":return"Operador";case"financial":return"Financeiro";case"master":return"Mestre";case"partner":return"S\xf3cio";case"customer":return"Cliente";case"service":return"Servi\xe7o";case"product":return"Produto";default:return""}},p=[{text:"In\xedcio",url:"/",icon:"fas fa-home"},{text:"Novo Funcion\xe1rio",url:"/novo-funcionario",icon:"fas fa-user-plus"},{text:"Listar Funcion\xe1rio",url:"/listar-funcionarios",icon:"fas fa-users"},{text:"Novo Cliente",url:"/novo-cliente",icon:"fas fa-user-plus"},{text:"Listar Clientes",url:"/listar-clientes",icon:"fas fa-users"},{text:"Novo Produto",url:"/novo-produto",icon:"fas fa-plus"},{text:"Listar Produtos",url:"/listar-produtos",icon:"fas fa-list-ul"},{text:"Novo Servi\xe7o",url:"/novo-servico",icon:"fas fa-plus"},{text:"Listar Servi\xe7os",url:"/listar-servicos",icon:"fas fa-list-ul"},{text:"Novo Pedido",url:"/novo-pedido",icon:"fas fa-file"},{text:"Listar Pedidos",url:"/listar-pedidos",icon:"fas fa-copy"}],d=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"POST";return{method:t,mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}},f=a(2),h=a(3),E=a(5),v=a(4),b=a(6),N=a(12),y=a(14),x=function(e){return r.a.createElement("figure",{className:e.className,onClick:function(t){e.href&&(window.location.href=e.href)}},r.a.createElement("div",null,r.a.createElement("span",{className:"mx-1"},r.a.createElement("i",{className:"fas fa-cut"})),r.a.createElement("span",null,"DEAR JOHN")))};function k(){return r.a.createElement("div",{className:"py-4 d-flex"},r.a.createElement("div",{className:"m-auto pt-4 text-center"},r.a.createElement(x,{width:"260"}),r.a.createElement("span",{className:"text-secondary font-weight-bold"},"Indispon\xedvel no momento.")))}var g=x;function j(){return r.a.createElement("div",null,r.a.createElement("div",{className:"d-flex p-3"},r.a.createElement(g,{className:"m-auto p-2 border border-secondary"})),r.a.createElement("div",null,r.a.createElement("h2",{className:"text-center m-auto text-secondary"},"SISTEMA ADMINSTRATIVO"),r.a.createElement("p",{className:"text-center mx-auto px-5 py-3 text-muted"},"Escolha onde deseja operar no menu ao lado.")))}var O=a(15),C=a(16);function w(e){var t,a={};for(var n in e)a[(t=n,t.split("_")[1])]=e[n];return a}function S(e,t){alert(e)}var P=function(e){function t(){return Object(f.a)(this,t),Object(E.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;(this.props.init?fetch(this.props.url,this.props.init):fetch(this.props.url)).then((function(e){return e.json()})).then((function(t){t&&e.setState(Object(O.a)({},e.props.propName,e.props.responseHandler?e.props.responseHandler(t):t))})).catch((function(t){return e.props.errorHandler?e.props.errorHandler(t):console.warn(t)}))}},{key:"render",value:function(){var e=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n={},r={};for(var l in e)r[l]=e[l];return t.forEach((function(t){e.hasOwnProperty(t)&&(n[t]=e[t],delete r[t])})),a?n:r}(this.props,["url","init","propName","responseHandler","errorHandler"]);return this.state&&(e[this.props.propName]=this.state[this.props.propName]),r.a.cloneElement(r.a.Children.only(this.props.children),e)}}]),t}(r.a.Component),H=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(E.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={value:"",description:"",mode:""},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"updateState",value:function(e){this.setState(e)}},{key:"submitHandler",value:function(){fetch(m,d(this.state)).then((function(e){return e.json()})).then((function(e){S(e?"Produto cadastro com sucesso.":"Preencha os campos obrigat\xf3rios.")}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h2",{className:"d-block my-3"},"Registro de Pedido"))),r.a.createElement("div",{className:"form-group row"},r.a.createElement("div",{className:"col-12 col-sm-6"},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,"Cliente"),r.a.createElement(P,{url:s+"?person_scope=customer",responseHandler:function(e){return e.map((function(e){return w(e)})).map((function(e){return{value:e.id,label:e.fullName}}))},propName:"options"},r.a.createElement(C.a,{onChange:function(t){return e.updateState({customerId:t.label})}})))),r.a.createElement("div",{className:"col-12 col-sm-6"},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,"Funcion\xe1rio/a"),r.a.createElement(P,{url:s+"?person_scope=employee",responseHandler:function(e){return e.map((function(e){return w(e)})).map((function(e){return{value:e.id,label:e.fullName}}))},propName:"options"},r.a.createElement(C.a,{onChange:function(t){return e.updateState({employeeId:t.label})}})))),r.a.createElement("div",{className:"col-12 col-sm-6"},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,"Servi\xe7o"),r.a.createElement(P,{url:i+"?product_scope=service",responseHandler:function(e){return e.map((function(e){return w(e)})).map((function(e){return{value:e.name,label:e.name}}))},propName:"options"},r.a.createElement(C.a,{onChange:function(t){return e.updateState({service:t.value})}})))),r.a.createElement("div",{className:"col-12 col-sm-6"},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,"Produtos"),r.a.createElement("button",{className:"btn btn-block btn-primary",onClick:function(e){return alert("em desenvolvimento")}},r.a.createElement("i",{className:"fas fa-plus"}),r.a.createElement("span",{className:"mx-1"},"Adicionar Produtos")))),r.a.createElement("div",{className:"col-12 col-sm-6"},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,"Modo de Pagamento"),r.a.createElement(C.a,{options:D,onChange:function(t){return e.updateState({mode:t.value})}}))),r.a.createElement("div",{className:"col-12 col-sm-6"},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,"Valor Total:"),r.a.createElement("input",{value:this.state.sum,disabled:!0,className:"form-control"}))),r.a.createElement("div",{className:"col-12"},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,"Observa\xe7\xe3o ",r.a.createElement("small",{className:"text-muted"},"(opcional)")),r.a.createElement("textarea",{className:"form-control",value:this.state.obs,onChange:function(t){return e.updateState({obs:t.target.value})},placeholder:"Descreva alguma situa\xe7\xe3o fora do comum que o sistema n\xe3o possa identificar de forma autom\xe1tica pelas opera\xe7\xf5es padr\xe3o."}))),r.a.createElement("div",{className:"col-12 text-center my-3"},r.a.createElement("button",{className:"btn btn-success",onClick:function(t){return e.submitHandler()}},r.a.createElement("span",{className:"mx-1"},"Registrar Pedido"),r.a.createElement("i",{className:"fas fa-check"})))))}}]),t}(n.Component),D=[{value:"Cr\xe9dito",label:"Cr\xe9dito"},{value:"D\xe9bito",label:"D\xe9bito"},{value:"Dinheiro",label:"Dinheiro"}],I=(n.Component,function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(E.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={price:"",description:"",name:"",scope:a.props.scope},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"updateState",value:function(e){this.setState(e)}},{key:"submitHandler",value:function(){fetch(i,d(this.state)).then((function(e){return e.json()})).then((function(e){S(e?"Produto cadastro com sucesso.":"Preencha os campos obrigat\xf3rios.")}))}},{key:"render",value:function(){var e=this,t=[{name:"name",text:"Nome do "+u(this.props.scope),type:"text",col:"6"},{name:"price",text:"Pre\xe7o",type:"text",col:"6"},{name:"description",text:"Breve descri\xe7\xe3o",type:"text",col:"12"}];return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h2",{className:"d-block my-3"},"Cadastre seu ",u(this.props.scope)))),r.a.createElement("div",{className:"form-group row"},t.map((function(t,a){return r.a.createElement("div",{className:"col-12 col-sm-"+t.col,key:a},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,t.text),r.a.createElement("input",{type:t.type,value:e.state[t.name],onChange:function(a){return e.updateState(Object(O.a)({},t.name,a.target.value))},className:"form-control"})))})),r.a.createElement("div",{className:"col-12 text-center my-3"},r.a.createElement("button",{className:"btn btn-success",onClick:function(t){return e.submitHandler()}},r.a.createElement("span",{className:"mx-1"},"Cadastrar ",u(this.props.scope)),r.a.createElement("i",{className:"fas fa-check"})))))}}]),t}(n.Component)),A=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(E.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={data:[]},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch(this.props.url).then((function(e){return e.json()})).then((function(t){return e.setState({data:t.map((function(e){return w(e)}))})}))}},{key:"preppendHander",value:function(){if(this.props.preppend)return r.a.createElement("li",{className:"list-group-item d-flex"},this.props.preppend.map((function(e,t){return r.a.createElement("div",{key:t,className:"m-auto py-1"},e)})))}},{key:"appendHandler",value:function(e){if(this.props.append&&e)return r.a.createElement("div",{className:"ml-auto my-auto"},this.props.append(e))}},{key:"render",value:function(){var e=this;return this.state.data.length>0?r.a.createElement("ul",{className:"list-group"},this.preppendHander(),this.state.data.map((function(t,a){return r.a.createElement("li",{key:a,className:"list-group-item d-flex"},e.props.fields.map((function(e,a){return r.a.createElement("td",{key:a,className:"m-auto py-2"},t[e])})),e.appendHandler(t))}))):r.a.createElement("div",null,"Sem registros.")}}]),t}(n.Component),F=[{name:"fullName",text:"Nome Completo",type:"text",col:"6"},{name:"birthday",text:"Nascimento",type:"date",col:"6"},{name:"phone",text:"Telefone",type:"text",col:"6"},{name:"email",text:"email",type:"email",col:"6"},{name:"address",text:"Endere\xe7o",type:"text",col:"6"},{name:"doc",text:"Documento",type:"text",col:"6"}],M=(n.Component,function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(E.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).state={fullName:"",birthday:"",phone:"",email:"",address:"",scope:a.props.scope,doc:""},a}return Object(b.a)(t,e),Object(h.a)(t,[{key:"updateState",value:function(e){this.setState(e)}},{key:"submitHandler",value:function(){fetch(s,d(this.state)).then((function(e){return e.json()})).then((function(e){S(e?"Cadastro realizado com sucesso.":"Preencha os campos obrigat\xf3rios.")}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"form-group row"},r.a.createElement("div",{className:"col-12"},r.a.createElement("h4",{className:"mb-3"},"Cadastrando ",r.a.createElement("span",{className:"font-weight-bold text-"+("employee"===this.props.scope?"danger":"success")},u(this.props.scope)))),F.map((function(t,a){return r.a.createElement("div",{className:"col-12 col-sm-"+t.col,key:a},r.a.createElement("label",{className:"d-block my-2"},r.a.createElement("small",null,t.text),r.a.createElement("input",{type:t.type,value:e.state[t.name],onChange:function(a){return e.updateState(Object(O.a)({},t.name,a.target.value))},className:"form-control"})))})),r.a.createElement("div",{className:"col-12 text-center my-3"},r.a.createElement("button",{className:"btn btn-success",onClick:function(t){return e.submitHandler()}},r.a.createElement("span",{className:"mx-1"},"Confirmar cadastro"),r.a.createElement("i",{className:"fas fa-check"})))))}}]),t}(n.Component)),T=function(e){return r.a.createElement("div",null,r.a.createElement(A,{url:s+"?person_scope="+e.scope,fields:["fullName","email","phone"],preppend:["Nome","email","Telefone"]}))},_=function(e){return r.a.createElement("div",null,r.a.createElement(A,{url:i+"?product_scope="+e.scope,fields:e.fields,preppend:e.preppend}))},L=function(){return r.a.createElement("div",null,r.a.createElement(A,{url:m,fields:["date","mode","customerId","employeeId"],preppend:["Data","Modo de Pagamento","Cliente","Funcion\xe1rio/a"]}))},J=function(e){function t(){return Object(f.a)(this,t),Object(E.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"handleSidebar",value:function(){var e,t=r.a.createElement("div",{className:"w-100 p-2"},r.a.createElement("main",{className:"d-block mb-5 pb-4 mb-sm-0 pb-sm-0"},r.a.createElement(N.c,null,r.a.createElement(N.a,{path:"/novo-funcionario",render:function(){return r.a.createElement(M,{scope:"employee"})}}),r.a.createElement(N.a,{path:"/listar-funcionarios",render:function(){return r.a.createElement(T,{scope:"employee"})}}),r.a.createElement(N.a,{path:"/novo-cliente",render:function(){return r.a.createElement(M,{scope:"customer"})}}),r.a.createElement(N.a,{path:"/listar-clientes",render:function(){return r.a.createElement(T,{scope:"customer"})}}),r.a.createElement(N.a,{path:"/novo-produto",render:function(){return r.a.createElement(I,{scope:"product"})}}),r.a.createElement(N.a,{path:"/listar-produtos",render:function(){return r.a.createElement(_,{scope:"product",fields:["name","price","stock"],preppend:[r.a.createElement("span",null,"Nome"),r.a.createElement("span",null,"Pre\xe7o"),r.a.createElement("span",null,"Estoque")]})}}),r.a.createElement(N.a,{path:"/novo-servico",render:function(){return r.a.createElement(I,{scope:"service"})}}),r.a.createElement(N.a,{path:"/listar-servicos",render:function(){return r.a.createElement(_,{scope:"service",fields:["name","price"],preppend:[r.a.createElement("span",null,"Nome"),r.a.createElement("span",null,"Pre\xe7o"),r.a.createElement("span",null)]})}}),r.a.createElement(N.a,{path:"/novo-pedido",component:H}),r.a.createElement(N.a,{path:"/listar-pedidos",component:L}),r.a.createElement(N.a,{path:"/",component:j}),r.a.createElement(N.a,{component:k}))));if(this.props.sidebar)switch(this.props.sidebarPosition){case"right":e=[t,this.props.sidebar];break;default:e=[this.props.sidebar,t]}else e=t;return e.map((function(e,t){return Object(n.cloneElement)(e,{key:t})}))}},{key:"render",value:function(){return r.a.createElement(y.a,null,this.props.header,r.a.createElement("div",{className:"d-flex"+(this.props.containerClassName?this.props.containerClassName:"")},this.props.bottombar,this.handleSidebar()))}}]),t}(n.Component);function R(){return r.a.createElement("li",{className:"ml-3 mb-3 d-flex"},r.a.createElement("span",{className:"mr-1"},r.a.createElement("div",{className:"bg-primary rounded-circle",style:{width:"20px",height:"20px"}})),r.a.createElement("span",{className:"mx-2"},r.a.createElement("div",{className:"bg-primary rounded",style:{width:"100px",height:"20px"}})))}var B=function(e){switch(e.scope){case"mobile":return t=e.items,r.a.createElement("nav",{className:"container"},r.a.createElement("ul",{className:"list-unstyled row text-center"},t.map((function(e,t){return r.a.createElement("li",{className:"col-6 p-1",key:t},r.a.createElement(y.b,{to:e.url},r.a.createElement("div",null,r.a.createElement("i",{className:e.icon})),r.a.createElement("small",null,e.text)))}))));case"desktop":return function(e){return e?r.a.createElement("nav",null,r.a.createElement("ul",{className:"list-unstyled"},e.map((function(e,t){return r.a.createElement("li",{className:"ml-3 mb-3",key:t},r.a.createElement(y.b,{to:e.url},r.a.createElement("span",{className:"mr-1"},r.a.createElement("i",{className:e.icon})),r.a.createElement("small",null,e.text)))})))):r.a.createElement("ul",{className:"list-unstyled"},[0,1,2,3,4].map((function(e){return r.a.createElement(R,{key:e})})))}(e.items);default:return r.a.createElement("ul",{className:"list-unstyled"},[0,1,2,3,4].map((function(e){return r.a.createElement(R,{key:e})})))}var t},W=function(e){function t(){return Object(f.a)(this,t),Object(E.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(h.a)(t,[{key:"handleChildren",value:function(){if(this.props.children)return r.a.createElement(n.Fragment,null,this.props.children,r.a.createElement("hr",{className:"mx-4"}))}},{key:"render",value:function(){return r.a.createElement("aside",{className:"d-none d-sm-block w-25 h-100 "+this.props.className,style:{minWidth:"162px"}},this.handleChildren(),r.a.createElement(B,{scope:"desktop",items:this.props.nav}))}}]),t}(n.Component),q=(a(35),r.a.createElement(W,{nav:p,className:"bg-secondary border-right pt-2 pb-5"},r.a.createElement("div",{className:"my-4"},r.a.createElement(g,{width:"85",className:"d-flex justify-content-center text-primary border border-primary p-2 mx-2",href:"http://localhost:8000"}))));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement((function(){return r.a.createElement(J,{nav:p,sidebar:q,sidebarPosition:"left"})}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[25,1,2]]]);
//# sourceMappingURL=main.2660c2c6.chunk.js.map