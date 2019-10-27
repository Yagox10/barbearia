import React, {
    Component
} from 'react';

export default class extends Component {
    render() {
        return (
            <header className={ this.props.className }>
                { this.props.children }
            </header>
        )
    }
}