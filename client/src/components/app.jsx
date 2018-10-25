class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			clicked: false
		}
	}

	handleClick() {
		this.setState({
			clicked: true
		})
	}

	// conditional rendering

	render() {
		if (!this.state.clicked) {
			return (
				<div>
					<p onClick={this.handleClick.bind(this)}>click me bro</p>
					<input type="date" id="start" />
					<input type="date" id="end" />
				</div>
			)
		} else {
			return (
				<div><p>Nice Click bro</p></div>
			)
		}
	}
}

export default App;