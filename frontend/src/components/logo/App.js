import React from 'react';

export default function ( props ) {
	return (
        <figure
            className={ props.className }
            onClick={ ev => { if ( props.href ) { window.location.href = props.href } } }
        >
            {/* <img
                src={ basename + "/images/logo.png"}
                alt="Orça Agora"
                width={ props.width }
                className={ props.className }
            /> */}
            <div>
                <span className="mx-1">
                    <i className="fas fa-smile-wink"></i>
                </span>
                <span>
                    SUA EMPRESA
                </span>
            </div>
        </figure>
    );
}