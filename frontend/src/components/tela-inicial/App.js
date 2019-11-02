import React from 'react';
import Logo from '../logo';

import {
    Link
} from 'react-router-dom';

export default function App () {
    return (
        <div>
            <div className="d-flex p-3"> 
                <Logo className="m-auto p-2 border border-secondary" />
            </div> 
            <div>
                <h2 className="text-center m-auto text-secondary">
                    SISTEMA ADMINSTRATIVO
                </h2>

                <p className="text-center mx-auto px-5 py-3 text-muted">
                    Escolha onde deseja operar no menu ao lado.
                </p>
            </div>
        </div>
    );
}