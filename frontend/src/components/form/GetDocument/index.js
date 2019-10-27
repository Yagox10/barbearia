import React, {
	Component
} from 'react';
import PersonalData from '../PersonalData/';
import {
	checkLastChar
} from '../../../functions';
import {
	basename
} from '../../../settings';


/**
 * PROPS:
 * @param account: object { string userName, string password, string scope }
 */
export default class GetDocument extends Component {
	state = {
		docType: "cpf",
		doc: "",
		message: ""
	};
	render () {
		if ( this.state.doc === "" ) {
			return (
				<div>
					<div className="d-flex flex-column flex-sm-row">
						<div className="mx-1">
							<label>
								<small>
									Tipo de documento
								</small>
								<select
									value={ this.state.docType }
									onChange={ event => this.setState( { docType: event.target.value } ) }
									className="form-control"
								>
									<option value="cpf">CPF</option>
									<option value="cnpj">CNPJ</option>
								</select>
							</label>
						</div>
						<div className="mx-1">
							<label>
								<small>
									Documento
								</small>
								<input
									type="text"
									className="form-control"
									onKeyUp={ event => event.target.value = checkLastChar( event.target.value, '[0-9]' ) }
									onChange={ event => {
										const value = event.target.value;
										fetch( basename + "/validation/document/" + value )
										.then( r => r.json() )
										.then( j => {
											if ( j ) {
												if ( j.status ) {
													if ( j.type === this.state.docType ) {
														fetch( basename + "/api/docs?doc_doc=" + value )
														.then( r => r.json() )
														.then( j => {
															if ( j ) {
																const message = "O documento inserido (" + value + ") já está sendo utilizado";
																this.setState( {
																	doc: "",
																	message: message
																} );
															} else {
																this.setState( {
																	doc: value,
																	message: ""
																} );
															}
														} )
														.catch( e => console.warn( e ) );
													} else {
														const message = "Documento inserido é " + j.type + " mas esperasse por um " + this.state.docType + ".";
														this.setState( { message: message } );
													}
												} else {
													const message = "Documento inválido.";
													this.setState( { message: message } );
												}
											}
										} )
										.catch( e => console.warn( e ) );
									} }
								/>
							</label>
						</div>
					</div>
					<div className="text-danger">
						<small>
							{ this.state.message }
						</small>
					</div>
				</div>
			);
		} else {
			const doc = {
				docType: this.state.docType,
				doc: this.state.doc
			}
			return <PersonalData account={ this.props.account } doc={ doc }></PersonalData>
		}
	}
}