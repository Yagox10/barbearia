<main>
    <?php if ( empty( $suspended ) ) : ?>
        <?php if ( empty( $verified ) || empty( $terms ) ) : ?>
            <div class="d-flex mt-5">

                <div class="d-flex text-center mx-auto mt-5 py-5">
                                        
                    <div class="d-flex flex-column mx-3 p-3">
                        <figure class="display-3 mb-0">
                            <i class="fas fa-envelope <?php echo ( empty( $verified ) ) ? "text-danger" : "text-success" ; ?>"></i>
                        </figure>
                        <div class="d-flex mb-auto">
                            <span class="">
                                { (
                                    $verified
                                    ?
                                    <span class="text-secondary">
                                        <i class="fas fa-check"></i>
                                        <span class="mx-1">
                                            e-mail verificado com sucesso!
                                        </span>
                                    </span>
                                    :
                                    É necessário clicar no link enviado por email para validá-lo.<br/>
                                    <a href="<?php echo BASENAME . VALIDATION_PATH . "/mail/" . $userName . "/generate" ; ?>" class="text-secondary">
                                        Reenviar link de verificação para o email cadastrado.
                                    </a>
                                ) }
                            </span>
                        </div>
                    </div>
                    <div class="d-flex flex-column mx-3 p-3">
                        <figure class="display-3">
                            <i class="fas fa-file-alt <?php echo ( empty( $terms ) ) ? "text-danger" : "text-success" ; ?>"></i>
                        </figure>
                        <div class="d-flex m-auto">
                            <span>
                                <input
                                    type="checkbox"
                                    value="1"
                                    onChange="updateTerms( this )"
                                    <?php if ( ! empty( $terms ) ) : ?>
                                        checked
                                    <?php endif; ?>
                                />
                            </span>
                            <span class="px-2">
                                Declaro que li e aceito os
                                <br>
                                <a
                                    href="<?php echo BASENAME . DOCS_PATH; ?>termos-de-uso.pdf"
                                    class="btn btn-link text-secondary pt-0"
                                    target="_blank"
                                >
                                    termos de uso
                                </a>
                            </span>
                        </div>
                    </div>

                </div>

            </div>
        <?php else : ?>
            <?php 
                $scopeName = [
                    "dealer" => "dealer",
                    "provider" => "fornecedor",
                    "medium" => "mídia",
                    "employee" => "funcionário",
                    "commercial" => "comercial",
                    "financial" => "financeiro",
                    "master" => "mestre",
                    "partner" => "sócio"
                ];
            ?>
            <div class="container-fluid">

                <div class="border-bottom p-2 w-100 d-flex">
                    <div class="text-secondary m-auto">
                        <small class="d-block">
                            Painel de Controle
                        </small>
                        <span class="text-primary line-h-4 d-block font-sm-3">
                            <strong class="text-uppercase">
                                <?php echo $scopeName[ $scope ] ; ?>
                            </strong>
                        </span>
                    </div>

                    <div class="text-secondary m-auto">
                        <small class="d-block">
                            <?php echo $fullName; ?>
                        </small>
                        <span class="text-primary line-h-4 d-block font-sm-3">
                            <strong>
                                <?php echo $userName; ?>
                            </strong>
                        </span>
                    </div>
                    <?php if ( $scope === "provider" || $scope === "medium" ) : ?>
                        <div class="ml-auto">
                            <div class="badge badge-primary text-white p-2">
                                <i class="fas fa-star-half-alt"></i>
                                <span>
                                    Novo
                                </span>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
                <div class="row">
                    <div class="col-2 col-sm-3">
                        <nav class="border-right">
                            <ul class="list-unstyled">
                                <?php foreach ( $nav as $item ) : ?>
                                    <li class="d-block my-3 text-center">
                                        <a href="<?php echo BASENAME . "/user/" . $userName . $item[ "url" ]; ?>" class="d-block">
                                            <i class="<?php echo $item[ "icon" ]; ?>"></i>
                                            <small class="text-uppercase d-none d-sm-block">
                                                <?php echo $item[ "text" ]; ?>
                                            </small>
                                        </a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </nav>
                    </div>

                    <div class="col-10 col-sm-9">
                        

                        <div class="d-block text-grey">
                            <small>
                                <strong>>> </strong>
                                <?php echo $page[ "url" ];?>
                            </small>
                        </div>

                        <div class="my-5" style="y-overflow: scroll;">
                            <input type="hidden" name="props" id="props" value='<?php echo $json; ?>' />
                            <div id="root"></div>
                        </div>
                    </div>

                </div>
            </div>
        <?php endif; ?>
    <?php else : ?>
        <div class="m-auto">
            Sua conta está suspensa. Entre em contato com a administração.
        </div>
    <?php endif; ?>
</main>