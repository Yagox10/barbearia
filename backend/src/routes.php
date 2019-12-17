<?php
header( "Access-Control-Allow-Origin: *" );
header( "Access-Control-Allow-Headers: Content-Type" );
header( "Access-Control-Allow-Methods: GET, POST, PUT, DELETE" );


use Slim\Http\Request;
use Slim\Http\Response;
use SebastianBergmann\GlobalState\Exception;

/**
 * 
 * A FAZER
 * 
 */
$app->get( "/products[/{id}]", function( Request $request, Response $response, array $args ) {} );

 /**
  * 
  */
$app->get( "/payments[/{id}]", function( Request $request, Response $response, array $args ){
    $connection = $this->database;
    $sql = "SELECT * FROM brb_payments";
    if( ! empty( $args[ "id" ] ) ) {
        $sql .= " WHERE payment_id = {$args["id"]}";
    }
    $preparedSql = $connection->prepare( $sql );
    $preparedSql->execute();
    if ( ! empty( $args[ "id" ] ) ) {
        $fetch = $preparedSql->fetchAll();
    } else {
        $fetch[] = $preparedSql->fetch();
    }

    foreach ( $fetch as $p ) {
        // var_dump( $p );
        $sql = "SELECT * FROM brb_people WHERE person_id = {$p[ "payment_customerId" ]} OR person_id = {$p[ "payment_employeeId" ]}";
        $preparedSql = $connection->prepare( $sql );
        $preparedSql->execute();
        $people = $preparedSql->fetchAll();
        var_dump( $p );
        $sql = "SELECT * FROM brb_products WHERE product_id = {$p[ "payment_service" ]}";
        $preparedSql = $connection->prepare( $sql );
        $preparedSql->execute();
        $service = $preparedSql->fetch();
        $p[ "customer" ] = ( $p[ "payment_customerId" ] === $people[ 0 ][ "person_id" ] ) ? $people[ 0 ] : $people[ 1 ];
        $p[ "employee" ] = ( $p[ "payment_employeeId" ] === $people[ 0 ][ "person_id" ] ) ? $people[ 0 ] : $people[ 1 ];
        $p[ "service" ] = $service;
        $data[] = $p;
    }
    return $response->withJson( $data );
});

$app->group( '/api', function () use ( $app ) {

    $this->map( [ "POST", "GET" ], "/{param}", function( Request $request, Response $response, array $args ) {
        $db = $this->dbInfo;
        $route = $args['param'];
        $connection = $this->database;
        $tablePrefix = $request->getAttribute( "tablePrefix" );
        if( $request->isGet() ){
            $queryParams = $request->getQueryParams();
            $statement = "SELECT * FROM " . $db[ "prefix" ] . $route;
            $haystack = ['quotation_providerIds'];
            $orderBy = "";
            if ( ! empty ( $queryParams ) ) {
                foreach ( $queryParams as $field => $value ) {
                    if( $field !== "order_by" ) {
                        if ( in_array( $field, $haystack) ) {
                            $paramValues = explode(",", $value);
                            foreach ( explode( ",", $value ) as $paramValue ) {
                                if ( ! empty( $paramValue ) ) {
                                    $where[] = $field . " LIKE '%" . $paramValue . "%'";
                                }
                            }
                        } else {
                            $where[] = $field . " = '" . $value . "'";
                        }
                    } else {
                        $orderBy = " ORDER BY " . $value . " ASC";
                    }
                }
                $statement .= " WHERE " . implode( " AND ", $where ) . $orderBy;
            }
            try {
                if ( in_array( $field, $haystack ) ) {
                    foreach ( $connection->query( $statement ) as $row ) {
                        $idsInQueryParam = explode( ",", $request->getQueryParam( "quotation_providerIds" ) );
                        $rowProvIds = explode( ",", $row[ "quotation_providerIds" ] );
                        foreach( $idsInQueryParam as $id ) {
                           if (in_array($id, $rowProvIds))
                           {
                                $idFilter = array_intersect($idsInQueryParam, $rowProvIds);
                                $output[] = $row;
                           }
                        }
                    }
                } else {
                    foreach ( $connection->query( $statement ) as $row ) {
                        $output[] = $row;
                    }
                }

            } catch ( PDOExcepetion $e ) {
                $output[ "code" ] = $e->getCode();
                $output[ "error" ] = ( $e->getCode() == 23000 )? "Informação já existente no banco de dados." : $e->getMessage();
            } finally {
                $response = $response->withJson( $output );
            }
        }
        if ( $request->isPost() ) {
            $body = $request->getParsedBody();
            $keys = implode( ", ", array_keys( $body ) );
            $values = implode( "', '", array_values( $body ) );

            $statement = "INSERT INTO " . $db[ "prefix" ] . $route . " ( " . $keys . " ) VALUES ( '" . $values . "' )";
            try {
                $connection->prepare( $statement );
                $affectedRows = $connection->exec( $statement );
                if ( $affectedRows !== 0 ) {
                    $sql = "SELECT * FROM {$db[ "prefix" ]}{$route} WHERE {$tablePrefix}id=(";
                    $sql .= " SELECT max({$tablePrefix}id) FROM {$db[ "prefix" ]}{$route}";
                    $sql .= " )";
                    $pdoStatement = $connection->query( $sql );
                    $output = $pdoStatement->fetch();
                }
            } catch ( PDOExcepetion $e ) {
                $output[ "code" ] = $e->getCode();
                $output[ "error" ] = ( $e->getCode() == 23000 )? "Informação já existente no banco de dados." : $e->getMessage();
            } finally {
                $response = $response->withJson( $output );
            }
        }
        
        return $response;
    } );
    
    $this->map( [ "PUT", "DELETE", "GET" ], "/{param}/{id}", function( Request $request, Response $response, array $args ) {
        
        $db = $this->dbInfo;
        $connection = $this->database;
        $tablePrefix = $request->getAttribute( "tablePrefix" );
        
        if( $request->isPut() ){
            $body = $request->getParsedBody();
            foreach ( $body as $key => $value ) {
                $pairs[] = $key . " = '" . $value . "'";
            }
            $sql = "UPDATE " . $db[ "prefix" ] . $args[ "param" ] . " SET ". implode( ", ", $pairs ) ." WHERE " . $tablePrefix . "id = " . $args[ "id" ];
            try {
                foreach ( $connection->query( $sql ) as $row ) {
                    $output = $row;
                }
                $updated = true;
            }
            catch ( PDOExcepetion $e ) {
                $output = $e->getMessage();
                $updated = false;
            }
            if( $updated ) {
                $sql = "SELECT * FROM " . $db[ "prefix" ] . $args[ "param" ] . " WHERE " . $tablePrefix . "id = " . $args[ "id" ];
                foreach ( $connection->query( $sql ) as $row ) {
                    $output = $row;
                }
            } else {
                $output = NULL;                
            }
            
            $response = $response->withJson( $output );
        }
        
        if ( $request->isDelete() ) {
            $sql = "DELETE FROM " . $db[ "prefix" ] . $args[ "param" ] . " WHERE " . $tablePrefix . "id = " . $args[ "id" ];
            $output = ( $this->database->exec( $sql ) ) ? [ "status" => "ok" ]: [ "status" => "error" ];
            $response = $response->withJson( $output );
        }
        if ( $request->isGet() ) {
            $sql = "SELECT * FROM " . $db[ "prefix" ] . $args[ "param" ] . " WHERE " . $tablePrefix . "id = " . $args[ "id" ];
            foreach ( $connection->query( $sql ) as $row ) {
                $output = $row;
            }
            $response = $response->withJson( $output );
        }
            
        return $response;
    } );
    
} )->add( $mw[ "api" ] )->add( $mw[ "hashIt" ] );