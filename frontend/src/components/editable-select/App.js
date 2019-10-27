import React, {
    Component,
    Fragment
} from'react';
import Select from 'react-select';
import HTTP from '../http/App';
import {
    unPrefixObject
} from '../../functions';
/**
 * PROPS
 * url
 * parent
 * value
 * isMulti
 * onChange
 */

export class ReDoThis extends Component {
    state = {
        parent: ( this.props.parent ? this.props.parent : {} ),
        value: ( this.props.value ? this.props.value : ( this.props.isMulti ? [] : {} ) ),
    }
    render() {
        return (
            <div className="my-3">

                <Fragment>
                    { this.props.children }
                </Fragment>
                                        
                <div>
                    <HTTP
                        propName="options"
                        url={ this.props.url }
                        responseHandler={ this.props.responseHandler }
                    >
                        <Select
                            value={ this.state.value }
                            isMulti={ this.props.isMulti }
                            onChange={ v => {
                                const emptySet = ( this.props.isMulti ? [] : {} );
                                this.setState(
                                    { value: ( v ? v : emptySet ) },
                                    function () {
                                        if ( this.props.onChange ) {
                                            const state = this.props.parent;
                                            state.children = this.state.value.map( x => {
                                                return {
                                                    id: x.value,
                                                    name: x.label
                                                }
                                            } );
                                            this.props.onChange( state );
                                        }
                                    }
                                );
                            } }
                        ></Select>
                    </HTTP>
                </div>
            
            </div>
        )
    }
}
export default class extends Component {
    state = {
        parent: ( this.props.parent ? this.props.parent : {} ),
        value: ( this.props.value ? this.props.value : ( this.props.isMulti ? [] :  {} ) ),
    }
    render() {
        return (
            <div className="my-3">

                <Fragment>
                    { this.props.children }
                </Fragment>
                                        
                <div>
                    <HTTP
                        propName="options"
                        url={ this.props.url }
                        responseHandler={ j => j.map( s => unPrefixObject( s ) ).map( x => ( { value: parseInt( x.id ), label: x.name } ) ) }
                    >
                        <Select
                            value={ this.state.value }
                            isMulti={ this.props.isMulti }
                            onChange={ v => {
                                const emptySet = ( this.props.isMulti ? [] : {} );
                                this.setState(
                                    { value: ( v ? v : emptySet ) },
                                    function () {
                                        if ( this.props.onChange ) {
                                            const state = this.props.parent;
                                            state.children = this.state.value.map( x => {
                                                return {
                                                    id: x.value,
                                                    name: x.label
                                                }
                                            } );
                                            this.props.onChange( state );
                                        }
                                    }
                                );
                            } }
                        ></Select>
                    </HTTP>
                </div>
            
            </div>
        )
    }
}