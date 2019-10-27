import React, {
    Component
} from 'react';

// do it getting two children
export default class App extends Component {
    render () {
        return (
            <div>
                { this.props.children[ 0 ] }
                <div style={ { lineHeight: "0.5" } }>
                    { this.props.children[ 1 ] }
                </div>
            </div>
        );
    }
}