import React from 'react';

class Guest extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drop: ''
		}

		this.handleDrop = this.handleDrop.bind(this);
	}

	handleDrop() {
		this.setState({
			drop: <p>hello</p>
		})
	}

	render() {
		return (
			<div>
			<h1>Ohana means family, and family means no one gets left behind... or forgotten.</h1>
			<input type="text" onClick={() => this.handleDrop()}/>
			{this.state.drop}
			</div>
		)
	}
}

export default Guest;