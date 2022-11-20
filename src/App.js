import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

	apiKey = process.env.REACT_APP_API_KEY
	state = {
		progress: 10,
		
	}
	
	setProgress = (progress) => {
		this.setState({progress: progress})
	}

	render() {
		return (
			<div>
				<Router>
					<NavBar />
					<LoadingBar
						color='#f11946'
						height={3}
						progress={this.state.progress}
					/>
					<Routes>
						<Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={5} country="in" category="general" />} />
						<Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={5} country="in" category="business" />} />
						<Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={5} country="in" category="entertainment" />} />
						<Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={5} country="in" category="general" />} />
						<Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={5} country="in" category="health" />} />
						<Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={5} country="in" category="science" />} />
						<Route exact key="sports" path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} pageSize={5} country="in" category="sports" />} />
						<Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={5} country="in" category="technology" />} />
					</Routes>
				</Router>
			</div>
		);
	}
}

// API KEY
// 8e332278873f4c6284c548a95e14289c


// key="business"
// key="entertainment"
// key="general"
// key="health"
// key="science"
// key="sports"
// key="technology"