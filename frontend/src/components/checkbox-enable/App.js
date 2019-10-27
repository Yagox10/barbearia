import React from 'react';
/**
 * PROPS
 * checked: bool
 * label: string
 * onChange: (): void
 * inverse: bool
*/

export default class App extends React.Component {
    state = { enable: ( this.props.inverse && this.props.checked ) }
    // componentDidMount () {
    //     let a = ( this.props.inverse ? true : false );
    //     let b = ( this.props.checked ? true : false );
    //     this.setState( { enable: a && b } );
    // }
    render () {
		return (
            <div>
               <div className="d-flex">
					<label>
                        <input 
                            type="checkbox"
                            checked={ this.props.checked }
                            onChange={ event => {
                                const isChecked = event.target.checked;
                                console.log( "isChecked", isChecked );
                                this.setState(
                                    { enable: ( this.props.inverse ? ! isChecked : isChecked ) },
                                    () => {
                                        console.log( "callback", this.state.enable );
                                        if ( this.props.onChange ) {
                                            this.props.onChange( this.state.enable )
                                        }
                                    }
                                ) }
                            }
                        />
                        <span className="mx-1">
                            {this.props.label}
                        </span>
					</label>
			   </div>
			   <div className={ ( this.state.enable ? "d-block" : "d-none" ) }>
			        { this.props.children }
			   </div>
			</div>
		);
	}
}	