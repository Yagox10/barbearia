import React, {
    Component
} from 'react';
import Select from 'react-select';
import {
    isEmpty, unPrefixObject
} from '../../functions';
import {
    statesUrl,
    servicesUrl
} from '../../settings';
import AssocSelects from '../associative-react-selects/alt';

export default class NewQuot extends Component {
    state={
        states:[],
        state: {},
        services: [],
        service: {},
        cities: [],
        city: {}
    }
    componentDidMount () {
        fetch( statesUrl )
        .then ( response => response.json() )
        .then ( j =>{
            const states = j.map( uf => {
                return {
                    value: parseInt( uf.id ),
                    label: uf.name
                }
            } )
            this.setState( { states : states } )
        } );

        fetch( servicesUrl + "?service_parentId=0&service_active=1" )
        .then( response => response.json() )
        .then( j =>{
            const services = j.map( y => unPrefixObject( y ) ).map( s => {
                return {
                    value: parseInt( s.id ),
                    label: s.name
                }
            } )
            this.setState( { services : services } )
        } );

    }

    updateCity ( v ) {
            this.setState( { state: ( isEmpty( v.children ) ? {} : v ) } );
    }

    updateService ( v ) {
        this.setState( { service: ( isEmpty( v.children ) ? {} : v ) } );
}

   

    render (){
        console.log(this.state)
        return (
            <div>
                    <div>
                        <h2 className="text-left text-secondary m-auto p-3">
                            Nova Cotação
                        </h2>
                    </div>
            
                <div className="container-fluid mw-sm">
                    
                    <div className="form-group row">
    
                        <div className="my-3 col-12">
                            <AssocSelects
                                labelOne="estado"
                                optionsOne={ this.state.states }
                                url={ oOne => {
                                    return statesUrl + "/" + oOne.value;
                                } }
                                responseHandler={ j => {
                                    return j.children.map( y => ( { value: y.id, label: y.name } ) )
                                } }
                                labelTwo="cidades"
                                onChange={ v => this.updateCity( v ) }
                         ></AssocSelects>
                        </div>

                    </div>  

                 <div className="form-group row">
    
                        <div className="my-3 col-12">
                            <AssocSelects
                                labelOne="Segmentos"
                                optionsOne={ this.state.services }
                                url={ oOne => {
                                    return servicesUrl + "?service_parentId=" + oOne.value + "&service_active=1";
                                } }
                                responseHandler={ j => {
                                    return j.map( x => unPrefixObject( x ) ).map( y => ( { value: y.id, label: y.name } ) )
                                } }
                                labelTwo="Produtos / Serviços"
                                onChange={ v => this.updateService ( v ) }
                            ></AssocSelects>
                        </div>
                    </div>   

                    <div className="form-group row pt-4">
                    
                        <div class="col-9 text-left">
                            <label className="d-block">
                                <small>Fornecedores</small>
                                <select className="form-control">
                                    <option selected>Fornecedores</option>
                                    <option value="1">RJ</option>
                                    <option value="2">Sp</option>
                                </select>
                            </label>
                        </div>
                        
                        <div className="col-3 d-flex">
                            <div className="btn-group m-auto" role="group" aria-label="sorted by">
                                <button type="button" className="active btn btn-secondary">
                                    <i className="fas fa-star-half-alt"></i>
                                </button>
                                <button type="button" className="btn btn-secondary">
                                    <i class="fas fa-sort-alpha-down"></i>
                                </button>
                            </div>
                        </div>
    
                    </div>
                    
                    
                    <div className="form-group row pt-4">
    
                        <div class="col-12 m-auto">
                            <label className="d-block">
                                <small> Descriçao </small>
                                <textarea className="form-control" placeholder="Insira aqui seu pedido detalhado e com quantidades"></textarea>
                            </label>
                        </div>
                    
                       
                        <div class="col-6 col-sm-4 d-flex">
                            <div class="my-auto">
                                <label className="">
                                    <small>Data Limite para resposta</small>
                                    <input className="form-control"  type="date" />
                                </label>
                            </div>
                        </div>
                        
                        <div class="col-6 col-sm-4 d-flex">
                            { <div class="my-auto">
                                <span className="">Balcão de negócios</span>
                                <label className="d-flex">
                                    <input className="mt-1" type="checkbox" />
                                    <small className="mx-2 mb-2">Tornar cotação pública</small>
                                </label>
                            </div> }
                        </div>
    
                        <div class="col-12 col-sm-4">    
                            <div className="mt-3">
                                <button class="btn btn-success btn-block" type="submit">
                                    Enviar
                                </button>
                            </div>
                        </div>
    
                    </div>
                
                </div>
            </div>
            
        );
    }
}