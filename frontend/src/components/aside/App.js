import React, {
    Component,
    Fragment
} from 'react';
import Nav from '../navs';

export default class extends Component {
    handleChildren () {
        if ( this.props.children ) {
            return (
                <Fragment>
                    { this.props.children }
                    <hr className="mx-4" />
                </Fragment>
            )
        }
    }
    render () {
        return (
            <aside
                className={ "d-none d-sm-block w-25 h-100 " + this.props.className }
                style={ { minWidth: "162px" } }
            >
                { this.handleChildren() }

                <Nav
                    scope="desktop"
                    items={ this.props.nav }
                />
                
            </aside>
        )
    }
}