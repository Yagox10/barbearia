import React from 'react';
import GetUser from '../GetUser';
import GluedText from '../../glued-text/App';

import {
	scopeName
} from '../../../settings';

// scope chooser
export default class CatcherForm extends React.Component {
	state = { scope: "" };
	updateScope ( scope ) {
		this.setState(
			{ scope: scope },
			() => {
				if ( this.props.onChange ) {
					this.props.onChange( this.state.scope );
				}
			}
		)
	}
	render () {
		if ( this.state.scope === "" ) {
			return (
				<div className="d-flex">
					<button
						className="btn btn-link m-auto"
						onClick={ event => this.updateScope( "medium" ) }
					>
						<GluedText>
							<div className="text-uppercase">
								<strong>
									{ ( this.props.altMedium ? this.props.altMedium : "Quero cotar" ) }
								</strong>
							</div>
							<small>
								(Mídia)
							</small>
						</GluedText>
					</button>
					<button
						className="btn btn-link text-secondary m-auto"
						onClick={ event => this.updateScope( "provider" ) }
					>
						<GluedText>
							<div className="text-uppercase">
								<strong>
									{ ( this.props.altProvider ? this.props.altProvider : "Quero Orçar!" ) }
								</strong>
							</div>
							<small>
								(Fornecedor)
							</small>
						</GluedText>
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<div className="text-right">
						<GluedText>
							<div className="text-uppercase">
								<strong>
									Cadastrando
								</strong>
							</div>
							<small className="badge badge-secondary">
									{ scopeName( this.state.scope ) }
							</small>
						</GluedText>
					</div>
					<GetUser scope={ this.state.scope } parentId={ this.props.parentId }></GetUser>
				</div>
			);
		}
	}
}