import React, {
    Component
} from 'react';
import {
    Link
} from 'react-router-dom';
import {
    navUrl,
    accountsUrl
} from '../../settings';
import {
    getByQuery
} from '../../functions';

export function PlaceholderNav () {
    return (
        <li className="ml-3 mb-3 d-flex">
            <span className="mr-1">
                <div className="bg-primary rounded-circle" style={ { width: "20px", height: "20px" } }></div>
            </span>
            <span className="mx-2">
                <div className="bg-primary rounded" style={ { width: "100px", height: "20px" } }></div>
            </span>
        </li>
    )
}
export function DesktopNav ( nav ) {
    if ( nav ) {
        return (
            <nav>
                <ul className="list-unstyled">
                    { nav.map( ( x, i ) => {
                        return(
                            <li className="ml-3 mb-3" key={ i }>
                                <Link to={ x.url }>
                                    <span className="mr-1">
                                        <i className={ x.icon }></i>
                                    </span>
                                    <small>
                                        { x.text }
                                    </small>
                                </Link>
                            </li>
                        )
                    } ) }
                </ul>
            </nav>
        );
    } else {
        return (
            <ul className="list-unstyled">
                { [0,1,2,3,4].map( i => <PlaceholderNav key={ i } /> ) }
            </ul>
        );
    }
}
export function MyMobNav ( nav ) {
    return (
        <nav className="container">
            <ul className="list-unstyled row text-center">
                { nav.map( ( x, i ) => {
                    return(
                        <li className="col-6 p-1" key={ i }>
                            <Link to={ x.url }>
                                <div>
                                    <i className={ x.icon }></i>
                                </div>
                                <small>
                                    { x.text }
                                </small>
                            </Link>
                        </li>
                    )
                } ) }
            </ul>
        </nav>
    )
}

export default function ( props ) {
    switch( props.scope ) {
        case "mobile":
            return MyMobNav( props.items );
        case "desktop":
            return DesktopNav( props.items );
        default:
            return (
                <ul className="list-unstyled">
                    {
                        [ 0, 1, 2, 3, 4 ].map( i => <PlaceholderNav key={ i } /> )
                    }
                </ul>
            );
    }
}