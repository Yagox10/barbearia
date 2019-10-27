import React, {
    Component
} from 'react';
import Select from 'react-select';
import {
    servicesUrl
} from '../../settings';
/**
 * PROPS
 * labelOne
 * isMultiOne
 * optionsOne
 * valueOne
 * callbackOne
 * labelTwo
 * isMultiTwo
 * // optionsTwo
 * valueTwo
 * callbackTwo
 */
export default class AssocSelects extends Component {
    state = {
        optionsTwo: [],
        valueOne: ( this.props.isMultiOne ? [] : {} ),
        valueTwo: ( this.props.isMultiTwo ? [] : {} )
    }
    changeOne ( v ) {
        this.setState(
            { optionsTwo: [] },
            () => {
                let val;
                if ( this.props.isMultiTwo ) {
                    val = ( v ? v : [] );
                } else {
                    val = ( v ? v : {} );
                }
                this.setState(
                    { valueOne: val },
                    () => {
                        fetch( servicesUrl + "?service_parentId=" + this.state.valueOne.value + "&service_active=1" )
                        .then( r => r.json() )
                        .then( j => {
                            if ( j ) {
                                this.setState( {
                                    optionsTwo: (
                                        this.props.responseHandler
                                        ? this.props.responseHandler( j )
                                        : j
                                    ),
                                    valueTwo: (
                                        this.props.isMultiTwo
                                        ? []
                                        : {}
                                    )
                                } );
                            }
                        } );
                    }
                )
            }
        );
    }
    changeTwo ( v ) {
        let val;
        if ( this.props.isMultiTwo ) {
            val = ( v ? v : [] );
        } else {
            val = ( v ? v : {} );
        }
        this.setState(
            { valueTwo: val },
            () => {
                if ( this.props.onChange ) {
                    let obj = this.state.valueOne;
                    obj.children = this.state.valueTwo;
                    this.props.onChange( obj );
                }
            }
        )
    }
    render () {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <label className="d-block">
                            <small>
                                { this.props.labelOne }
                            </small>
                            <Select
                                options={ this.props.optionsOne }
                                onChange={ v => this.changeOne( v ) }
                            />
                        </label>
                    </div>
                    <div className="col-12 col-sm-6">
                        <label className={ ( this.state.optionsTwo.length > 0 ? "d-block" : "d-none" ) }>
                            <small>
                                { this.props.labelTwo }
                            </small>
                            <Select
                                isMulti={ this.props.isMultiTwo }
                                options={ this.state.optionsTwo }
                                onChange={ v => this.changeTwo( v ) }
                                value={ this.state.valueTwo }
                            />
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}