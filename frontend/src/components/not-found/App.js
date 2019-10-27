import React from 'react'
export default function app ()
{
    return (
        <div className='d-flex h-100 mt-5 py-sm-5'>
            <div className='m-auto'>
                <div>
                    <h1 className="text-center  text-primary align-self-center">
                        404
                    </h1>
                </div>
                <div className="text-center text-secondary small ">
                    Pagina não encontrada
                </div>
                <div>
                    <Logo width="50" />
                </div>
            </div>
        </div>
        
    );
}
