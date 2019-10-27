import React from 'react';

export default class TitleAndSub extends React.Component {
    render () {
        return (
            <div className="text-center">
                <div className="text-uppercase">
                    <strong>
                        { this.props.title }
                    </strong>
                </div>
                <small style={ { lineHeight: "0.8" } }>
                    { this.props.sub }
                </small>
            </div>
        );
    }
}