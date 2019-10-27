import React from 'react';
import TwinEmail from '../TwinEmail/';
import GetAddress from '../GetAddress/';
import {
	isMobile,
	checkLastChar,
} from '../../../functions';

import {
	basename
} from '../../../settings';

/**
 * PROPS:
 * @param doc: object { string docType, string doc }
 * @param account: object { string userName, string password, string scope }
 */
export default class PersonalData extends React.Component {
	state = {
		fullName: "",
		email: "",
		tel: "",
		stateSubscription: "",
		companyName: "",
		done: false,
		telMessage: "",
		mailMessage: ""
	}
	isDone = requiredFields => {
		const blanks = requiredFields.map( item => {
			return this.state[ item ] === ""
		} )
		.filter( bool => bool === true );
		this.setState( { done: ( blanks.length === 0 ) } );
	}
	render () {
		if ( this.state.done === false ) {
			let requiredFields;
			switch ( this.props.doc.docType ) {
				case "cpf":
					requiredFields = [ "fullName", "email", "tel" ];
					return (
						<div>
							<div>
								<label>
									<small>Nome completo</small>
									<input
										type="text"
										title="Nome Completo"
										className="form-control"
										onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[A-Za-z\- áàéêíóúüãõçÁÀÉÍÓÚÜÃÕÇ]' ) }
										onChange={ event => this.setState( { fullName: event.target.value } ) }
									/>
								</label>
							</div>
							<div>
								<label>
									<small>Telfone celular</small>
									<input
										type="text"
										title="Celular"
										className="form-control"
										onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[0-9]' ) }
										onChange={ event => {
											if ( isMobile( event.target.value ) ) {
												this.setState( {
													tel: event.target.value,
													telMessage: ""
												} )
											} else {
												this.setState( {
													tel: "",
													telMessage: "Telefone deve conter apenas números e incluir o DDD"
												} )
											}
										} }
									/>
								</label>
								<div className="text-danger">
									<small>
										{ this.state.telMessage }
									</small>
								</div>
							</div>
							<div>
								<TwinEmail
									className="form-control"
									label="email"
									twinLabel="Repita o email"
									isTwin={ ( isEqual, value ) => {
										if ( isEqual ) {
											fetch( basename + "/api/people?person_email=" + value )
											.then( r => r.json() )
											.then( j => {
												if ( j ) {
													const message = "O email inserido (" + value + ") já está sendo utilizado";
													this.setState( {
														email: "",
														mailMessage: message
													} );
												} else {
													this.setState( {
														email: value,
														mailMessage: ""
													} );
												}
											} )
											.catch( e => console.warn( e ) );
										} else {
											this.setState( {
												email: "",
												mailMessage: ""
											} );
										}
									} }
								></TwinEmail>
								<div className="text-danger">
									<small>
										{ this.state.mailMessage }
									</small>	
								</div>
							</div>
							<div className="my-3">
								<button
									className="btn btn-success btn-block"
									onClick={ event => this.isDone( requiredFields ) }
								>
									Finalizar Cadastro
								</button>
							</div>
						</div>
					);
				case "cnpj":
					requiredFields = [ "fullName", "email", "tel", "companyName" ];
					return (
						<div>
							<div>
								<label>
									<small>Razão Social</small>
									<input
										type="text"
										title="Razão Social"
										className="form-control"
										onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[A-Za-z\- áàéíóúüãõçÁÀÉÍÓÚÜÃÕÇ]' ) }
										onChange={ event => this.setState( { companyName: event.target.value } ) }
									/>
								</label>
							</div>
							<div>
								<label>
									<small>Inscrição Estadual</small>
									<input
										type="text"
										title="Inscrição Estadual"
										className="form-control"
										onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[0-9]' ) }
										onChange={ event => {
												this.setState( { stateSubscription: event.target.value } )
										} }
									/>
								</label>
							</div>
							<div>
								<label>
									<small>Nome completo</small>
									<input
										type="text"
										title="Nome Completo"
										className="form-control"
										onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[A-Za-z\- áàéíóúüãõçÁÀÉÍÓÚÜÃÕÇ]' ) }
										onChange={ event => this.setState( { fullName: event.target.value } ) }
									/>
								</label>
							</div>
							<div>
								<label className="d-block">
									<small>Telfone celular</small>
									<input
										type="text"
										title="Celular"
										className="form-control"
										onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[0-9]' ) }
										onChange={ event => {
											if ( isMobile( event.target.value ) ) {
												this.setState( {
													tel: event.target.value,
													telMessage: ""
												} )
											} else {
												this.setState( {
													tel: "",
													telMessage: "Telefone deve conter apenas números e incluir o DDD"
												} )
											}
										} }
									/>
								</label>
								<div className="text-danger">
									<small>
										{ this.state.telMessage }
									</small>
								</div>
							</div>
							<div>
								<TwinEmail
									className="form-control"
									label="email"
									twinLabel="Repita o email"
									isTwin={ ( isEqual, value ) => {
										if ( isEqual ) {
											fetch( basename + "/api/people?person_email=" + value )
											.then( r => r.json() )
											.then( j => {
												if ( j ) {
													const message = "O email inserido (" + value + ") já está sendo utilizado";
													this.setState( {
														email: "",
														mailMessage: message
													} );
												} else {
													this.setState( {
														email: value,
														mailMessage: ""
													} );
												}
											} )
											.catch( e => console.warn( e ) );
										} else {
											this.setState( {
												email: "",
												mailMessage: ""
											} );
										}
									} }
								></TwinEmail>
								<div className="text-danger">
									<small>
										{ this.state.mailMessage }
									</small>
								</div>
							</div>
							<div className="my-3">
								<button
									className="btn btn-success btn-block"
									onClick={ event => this.isDone( requiredFields ) }
								>
									Finalizar Cadastro
								</button>
							</div>
						</div>
					);
				default:
					return <div></div>;
			}
		} else {
			let person = {}
			for ( let i in this.state ) {
				if ( [ "done", "telMessage", "mailMessage" ].indexOf( i ) === -1 ) {
					person[ i ] = this.state[ i ];
				}
			}
			let doc = { doc: this.props.doc.doc }
			return (
				<GetAddress
					account={ this.props.account }
					doc={ doc }
					person={ person }
				></GetAddress>
			)
		}
	}
}