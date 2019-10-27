import React from 'react';

/**
 * 
 * PROPS
 * data: array as props
 * noneMessage: () => JSX
 */

export default class App extends React.Component {
    state = {
        data: ( this.props.data ? this.props.data : [] )
    }


    fillChild = ( child, content, key ) => {
        const childsChildren = child.props.children.map( ( item, i ) => {
            return React.createElement(
                item.type,
                {
                    className: item.props.className,
                    onClick: this.props.onClick,
                    key: i
                },
                content[ item.props.children ]
            );
        } );

        const parent = React.createElement(
            child.type,
            { className: child.props.className, key: key },
            childsChildren
        );
        return parent;
    }

    render() {
        const child = React.Children.only( this.props.children );
        if ( this.state.data.length > 0 ) {
            return this.state.data.map( ( item, i ) => {
                return this.fillChild( child, item, i );
            } );
        } else {
            return <React.Fragment>{ ( this.props.noneMessage ? this.props.noneMessage() : "Nenhum registro" ) }</React.Fragment>
        }
    }
}
