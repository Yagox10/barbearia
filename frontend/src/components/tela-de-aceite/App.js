import React, {
    Component
} from 'react';

export default class extends Component {
    render() {
        if ( this.props.suspended ) {
            return (
                <div className="m-auto">
                    Sua conta está suspensa. Entre em contato com a administração.
                </div>
            );
        } else {
            if ( this.props.verified && this.props.terms ) {
                return <Frame />
            } else {
                return (
                    <div className="d-flex mt-5">
        
                        <div className="d-flex text-center mx-auto mt-5 py-5">
                                                
                            <div className="d-flex flex-column mx-3 p-3">
                                <figure className="display-3 mb-0">
                                    <i className={
                                        "fas fa-envelope" + (
                                            this.props.verified
                                            ? 
                                            "text-success"
                                            :
                                            "text-danger" 
                                        ) }
                                    ></i>
                                </figure>
                                <div className="d-flex mb-auto">
                                    <span className="">
                                        { (
                                            this.props.verified
                                            ?
                                            <span className="text-secondary">
                                                <i className="fas fa-check"></i>
                                                <span className="mx-1">
                                                    e-mail verificado com sucesso!
                                                </span>
                                            </span>
                                            :
                                            É necessário clicar no link enviado por email para validá-lo.<br/>
                                            <a href="<?php echo BASENAME . VALIDATION_PATH . "/mail/" . this.props.userName . "/generate" ; ?>" className="text-secondary">
                                                Reenviar link de verificação para o email cadastrado.
                                            </a>
                                        ) }
                                    </span>
                                </div>
                            </div>
                            <div className="d-flex flex-column mx-3 p-3">
                                <figure className="display-3">
                                    <i className="fas fa-file-alt <?php echo ( empty( this.props.terms ) ) ? "text-danger" : "text-success" ; ?>"></i>
                                </figure>
                                <div className="d-flex m-auto">
                                    <span>
                                        <input
                                            type="checkbox"
                                            value="1"
                                            onChange="updateTerms( this )"
                                            <?php if ( ! empty( this.props.terms ) ) : ?>
                                                checked
                                            <?php endif; ?>
                                        />
                                    </span>
                                    <span className="px-2">
                                        Declaro que li e aceito os
                                        <br>
                                        <a
                                            href="<?php echo BASENAME . DOCS_PATH; ?>termos-de-uso.pdf"
                                            className="btn btn-link text-secondary pt-0"
                                            target="_blank"
                                        >
                                            termos de uso
                                        </a>
                                    </span>
                                </div>
                            </div>
        
                        </div>
        
                    </div>
                );
            }
        }
    }
}