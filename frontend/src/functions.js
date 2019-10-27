/**
 * 
 * ARRAY AND OBJECTS
 * 
 */
export function unPrefix ( string ) {
    return string.split( "_" )[ 1 ];
}
export function unPrefixObject ( object ) {
    let output = {};
    for ( let i in object ) { // eslint-disable-line no-unused-vars
        output[ unPrefix( i ) ] = object[ i ];
        
    }
    return output;
}
export function getBasename () {
    const hiddenTag = document.querySelector( "input[name=basename]" );
    return ( hiddenTag ? hiddenTag.value : "http://orcaagora.com.br" );
}

export function isEmpty( obj ) {
    for( let key in obj ) { // eslint-disable-line no-unused-vars
        if( obj.hasOwnProperty( key ) ) {
            return false;
        }
    }
    return true;
}

export function filterObj ( obj, listOfProperties, keep = false ) {
    let inList = {};
    let outList = {};
    for ( let i in obj ) { // eslint-disable-line no-unused-vars
        outList[ i ] = obj[ i ];
    }
    listOfProperties.forEach( x => {
        if ( obj.hasOwnProperty( x ) ) {
            inList[ x ] = obj[ x ];
            delete outList[ x ];
        }
    } )
    return ( keep ? inList : outList );
}

export function noDuplicates ( array ) {
    let output = [];
    for ( let i of array ) { // eslint-disable-line no-unused-vars
        if ( output.indexOf( i ) === -1 ) {
            output.push( i );
        }
    }
    return output;
}

// 
export function twoDigits ( number ) {
    return ( "0" + number ).slice( -2 );
}
export function getDate () {
    const date = new Date();
    return [ date.getFullYear(), twoDigits( date.getMonth() ), twoDigits( date.getDay() ) ].join( "-" );
}
export function getTime () {
    const date = new Date();
    return [ twoDigits( date.getHours() ), twoDigits( date.getMinutes() ), twoDigits( date.getSeconds() ) ].join( ":" );
}

export function wait ( timeInMiliSeconds ) {
    var d = new Date();
    var d2 = null;
    do { d2 = new Date(); }
    while( d2-d < timeInMiliSeconds );
}

export const publicText = string => {
    switch ( string ) {
        case "provider":
            return "fornecedor";
        case "medium":
            return "mídia";
        case "employee":
            return "operador";
        case "dealer":
            return "dealer";
        default:
            return "Sem regitro para público.";
    }
}

export const checkLastChar = ( string, regex ) => {
    const match = new RegExp( regex ).test( string[ string.length - 1 ] );
    if ( ! match ) {
        return string.substr( 0, string.length - 1 );
    } else {
        return string;
    }
}

export const isMobile = mobileNumber => {
    if ( ! mobileNumber.match( /[0-9]{11}/ ) ) {
        return false
    }
    return true;
}

export function getPropsFromDocument ( tagId = "#props" ) {
    if ( document.querySelector( tagId ) ) {
        return JSON.parse( document.querySelector( tagId ).value );
    } else {
        return {}
    }
}

export function navTo ( userScreen ) {
    const l = window.location;
    const origin = l.origin;
    const params = l.pathname.split( "/" );
    const userIndex = l.pathname.split( "/" ).indexOf( "user" );
    params[ userIndex + 2 ] = userScreen
    window.location.href = origin + params.join( "/" );
}

export function noUnicode ( string ) {
    return decodeURIComponent( JSON.parse( '"' + string + '"' ) );
}

export function condenseObjs( objArray ) {
    let output = {};
    objArray.forEach( obj => {
        for ( let u in obj ) { // eslint-disable-line no-unused-vars
            output[ u ] = obj[ u ];
        }
    } );
    return output;
}

export function responseWindow ( message, color ) {
    alert( message );
}

export const getByQuery = ( selector ) => document.querySelector( selector );
export const valueToObject = element => JSON.parse( element.value );