import React from 'react';
import Select from 'react-select'
import CheckboxEnable from '../checkbox-enable/App';
import {
    accountsUrl
} from '../../App';

export default class App extends React.Component {
    state = { enable: false }
    componentDidMount () {
        this.setState( { enable: ( this.props.user.cities === "TODOS" ? false : true ) } )
    }
    render () {
        return (
        <div>
            <CheckboxEnable 
                label="Atuação nacional"
            >
              
                <div
                className='container w-100'
                >   
                    
                    <div 
                        className='row'
                    >
                
                        <div
                            className='col-12 col-sm-4'
                        >
                    
                            <label>
                                <small>Estados</small>
                                <Select />

                                    
                            </label>
                        </div>
                                
                        <div
                            className='col-12 col-sm-8'
                        > 
                        
                            <label>
                                <small>Cidades</small>
                                <Select />
                            </label>
                        </div>
                    </div>
              
              </div>                 
            </CheckboxEnable>

                    
                   
        </div>
               
        );   
    }
}

