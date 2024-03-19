import * as React from 'react';
import { response } from 'express';

class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			randomString: "",
			name: "",
			typing_tests: [],

		};
		this.handleChange = this.handleChange.bind(this);
	}

	async componentDidMount() {
		try {
			this.generateUserKey();
			let r = await fetch('/api/typing_tests');
			let typing_tests = await r.json();
			this.setState({ typing_tests });
		} catch (error) {
			console.log(error);
		}
	}
	generateUserKey() {
		let randlist = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
		let RandomString = "";
		for (let i = 0; i < 10; i++) {
			RandomString += randlist[Math.floor(Math.random() * Math.floor(35))]
		}
		this.setState({ randomString: RandomString })
	}

	handleChange(event) {
		this.setState({ name: event.target.value });
	}
	handleSubmit(event) {
		// console.log('A name was submitted: ' + this.state.name);
		const userInfo = JSON.stringify({
			name: this.state.name

		});
		console.log(userInfo)

		fetch("/api/addnew", {
			method: "POST",
			body: userInfo,
			headers: { "Content-Type": "application/json" }
		})
			.then(response => {
				console.log(response)
			})
		event.preventDefault();

	}
	render() {
		return (
			<main className="container my-5">
				<h1 className="text-primary text-center">Typing Test Results</h1>
				<div style={{ borderWidth: 5, borderColor: '#3F87A6', borderStyle: 'solid', padding: 15 }}>
					<div style={{ flex: 1, flexDirection: 'column' }}>
						<button onClick={() => this.generateUserKey()}>Generate New</button>
						<input type="text" name="randomKey" style={{ margin: 15 }} value={this.state.randomString} readOnly></input>
					</div>
					<h5 style={{ marginTop: 35 }}>Add new Tester: </h5>
					<div style={{ flex: 1, flexDirection: 'column' }}>
						<input type="text" name="name" style={{ margin: 15 }} placeholder="Name" onChange={this.handleChange} />
						<button onClick={(e) => this.handleSubmit(e)}>Submit</button>
					</div>
				</div>
				{this.state.typing_tests.map(tests => {
					return <div>
						<ul className="list-group">
							<li className="list-group-item">{tests.user_key}</li>
							<li className="list-group-item">{tests.user_key}</li>
						</ul>
						<ul className="list-group">
							<li className="list-group-item">{tests.name}</li>
						</ul>
					</div>
				})

				}
				{/* <ul className='list-group'>
					{this.state.typing_tests.map(tests => {
						return <li className="list-group-item">{tests.user_key}</li>
					})

					}
				</ul> */}
			</main>
		);
	}
}

export interface IAppProps { }

export interface IAppState {
	typing_tests: Array<any>;
	randomString: string;
	name: string;
}

export default App;
