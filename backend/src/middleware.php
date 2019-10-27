<?php

$mw[ "api" ] = function ( $request, $response, $next ) {
    $db = $this->dbInfo;
    $path = $request->getUri()->getPath();
    $params = explode( "/", $path );
    $index = array_search( "api", $params );
    $tableName = $params[ $index + 1 ];
    $tablePrefix = whichPrefix( $tableName );
    $request = $request->withAttribute( "tablePrefix", $tablePrefix );

    $allowedTables = array (
        "people",
        "payments",
        "orders",
        "products",
        "services",
    );

    if ( $request->isPost() || $request->isPut() ) {
        $requestBody = $request->getParsedBody();
        $prefixedBody = prefixOnKeys( $requestBody, $tablePrefix );
        $request = $request->withParsedBody( $prefixedBody );
    }
    if ( in_array( $tableName, $allowedTables ) ) {
        $response = $next( $request, $response );
    } else {
        $response = $response->withJson( [ "status" => "error", "message" => "Route not found" ] );
    }
    return $response;
};

$mw[ "hashIt" ] = function ( $request, $response, $next ) {
    if ( $request->isPost() || $request->isPut() ) {
        $body = $request->getParsedBody();
        foreach ( $body as $key => $value ) {
            if ( strpos( $key, "password" ) !== false ) {
                $newBody[ $key ] = password_hash( $value,  PASSWORD_DEFAULT );
            } else {
                $newBody[ $key ] = $value;
            }
        }
        $request = $request->withParsedBody( $newBody );
    }
    $response = $next( $request, $response );
    return $response;
};
