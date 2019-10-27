import React from 'react';
import Logo from '../logo/App';


export default function App () {
    return(
        <div className="py-4 d-flex">
            <div className="m-auto pt-4 text-center">
                <Logo
                    width="260"
                />
                <span className="text-secondary font-weight-bold">Indisponível no momento.</span>
            </div>
        </div>
    )
}