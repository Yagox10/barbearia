import React from 'react';
import {
    basename
} from '../../settings';

export default function App ( props ) {
	return (
		<div className={ props.className }>
			<a href={ basename } className="text-info">
				<small>
					<i className="fas fa-angle-left"></i>
					<span className="mx-1 border-bottom border-info">
						voltar para o site
					</span>
				</small>
			</a>
		</div>
	)
}