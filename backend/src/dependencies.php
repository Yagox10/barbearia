<?php

$container = $app->getContainer();

$container[ "database" ] = function ( $c ) {
    $dbInfo = $c->get( 'settings' )[ "database" ];
	$dsn = "mysql:host=" . $dbInfo[ "host" ] . ";dbname=" . $dbInfo[ "name" ] . ";charset=" . $dbInfo[ "charset" ];
    $options = [
		PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
		PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
		PDO::ATTR_EMULATE_PREPARES => false,
    ];
    try {
        return new PDO( $dsn, $dbInfo[ "user" ], $dbInfo[ "password" ], $options );
    } catch ( PDOException $e ) {
        exit( $e->getMessage() );
    }
};

$container[ "dbInfo" ] = function ( $c ) {
    $database = $c->get( 'settings' )[ "database" ];
    unset( $database[ "password" ] );
    return $database;
};