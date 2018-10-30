import React from 'react';

class Guest extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drop: false
		}

		this.handleDrop = this.handleDrop.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleDrop(event) {
		event.preventDefault();

		this.setState({
			drop: true
		}, () => document.addEventListener('click', this.handleClose))
	}

	handleClose(event) {

		if (!this.menu.contains(event.target)) {
			this.setState({
				drop: false
			}, () => document.removeEventListener('click', this.handleClose))
		}
	}

	render() {
		return (
			<div>
				<h1>Booking Button</h1>
				<input value="Book" type="button" onClick={this.handleDrop}/>
				{ this.state.drop ? (
					<div ref={(ele) => this.menu = ele}>
						<p>Adults</p><input value="-" type="button"/><input value="+" type="button"/>
						<p>Children</p><input value="-" type="button"/><input value="+" type="button"/>
						<p>Infants</p><input value="-" type="button"/><input value="+" type="button"/>
					</div>) : null }
			</div>
		)
	}
}

export default Guest;