import React, {
    Component
} from 'react';

/**
 * onClick: () => void
 * className: string className container
 */
export default class Clickable extends Component {
    onClick () {
        if ( this.props.onClick ) {
            this.props.onClick()
        }
    }
    render () {
        return (
            <div
                onClick={ ev => this.onClick() }
                className={ this.props.className }
                style={ { cursor: "pointer" } }
            >
                { this.props.children }
            </div>
        );
    }
}