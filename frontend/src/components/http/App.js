import React from 'react';
import {
	filterObj
} from '../../functions';

/**
 * 
 * PROPS
 * url: URL string to fetch
 * init (optional): init object for fetch API
 * propName: string name of props to pass state through
 * responseHandler (optional): ( json ) => any
 * errorHandler (optional): ( exception ) => void
 */
export default class App extends React.Component {
	componentDidMount () {
		let promise;
		if ( this.props.init ) {
			promise = fetch( this.props.url, this.props.init );
		} else {
			promise = fetch( this.props.url );
		}
		promise.then( r => r.json() )
		.then( j => {
			if ( j ) {
				this.setState( { [this.props.propName]: ( this.props.responseHandler ? this.props.responseHandler( j ) : j ) } )
			}
		} )
		.catch( e => ( this.props.errorHandler ? this.props.errorHandler( e ) : console.warn( e ) ) )
	}
	render () {
		let newProps = filterObj( this.props, [ "url", "init", "propName", "responseHandler", "errorHandler" ] );
		if ( this.state ) {
			newProps[ this.props.propName ] = this.state[ this.props.propName ];
		}
		return React.cloneElement(
			React.Children.only( this.props.children ),
			newProps
		)
	}
}
