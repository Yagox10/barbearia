import React from 'react';
import GetDocument from '../GetDocument/';
import {
	Password
} from '../../login/App';
import {
	basename,
} from '../../../settings';
import {
	checkLastChar
} from '../../../functions';
/**
 * PROPS:
 * @param scope: string
 */
export default class GetUser extends React.Component {
	state = {
		userName: "",
		password: "",
		message: "",
		passMessage: "",
		done: false
	};
	render () {
		if ( ! this.state.done ) {
			return (
				<div className="m-auto">
					<div className="">
						<label className="d-block">
							<small>Nome de Usuário</small>
							<input
								type="text"
								className="form-control"
								onKeyUp={ event => { event.target.value = checkLastChar( event.target.value, '[0-9a-z_.-]' ) } }
								onChange={ event => {
									const value = event.target.value;
									if ( value.length < 6 ) {
										this.setState( {
											message: "O nome de usuário deve possuir pelo menos 6 caracteres."
										} )
									} else {
										this.setState(
											{ message: "" },
											() => {
												fetch( basename + "/api/accounts?account_userName=" + value )
												.then( r => r.json() )
												.then( j => {
													if ( j ) {
														const message = "O nome de usuário " + value + " já existe.";
														this.setState( {
															userName: "",
															message: message
														} );
													} else {
														this.setState( {
															userName: value,
															message: ""
														} );
													}
												} )
												.catch( e => console.warn( e ) );
											}
										)
									}
								} }
							/>
						</label>
						<div className="text-danger">
							<small>
								{ this.state.message }
							</small>
						</div>
					</div>
					<div className={ ( this.state.passMessage !== "" ? "hasError" : "" ) }>
						<Password
							className={ this.props.className }
							value={ this.state.password }
							onChange={ v => {
								if ( v.length < 6 ) {
									this.setState( {
										password: "",
										passMessage: "A senha deve possuir pelo menos 6 caracteres."
									} )
								} else {
									this.setState( {
										password: v,
										passMessage: ""
									} )
								}
							} }
						/>
						<div className="text-danger">
							<small>
								{ this.state.passMessage }
							</small>
						</div>
					</div>
					<div className="my-4">
						<button
							className="btn btn-success btn-block"
							onClick={ () => this.setState( { done: ( this.state.userName !== "" && this.state.password !== "" ) } ) }
						>
							<span className="mx-1">
								Confirmar
							</span>
							<i className="fas fa-check"></i>
						</button>
					</div>
				</div>
			);
		} else {
			const account = {
				userName: this.state.userName,
				password: this.state.password,
				scope: this.props.scope,
				parentId: this.props.parentId,
				verified: 1
			}
			return (
				<div className="d-flex my-4">
					<div className="m-auto">
						<GetDocument account={ account }></GetDocument>
					</div>
				</div>
			)
		}
	}
}