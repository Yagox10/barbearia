import React, {
    Component
} from 'react';
import Select from 'react-select';

export class Row extends Component {
    render() {
        return (
            <div>
                row
            </div>
        )
    }
}



export default class App extends Component {
    render() {
        return   (
            <div>
                <Select
                    value={ options }
                />
            </div>
        )
    }
}