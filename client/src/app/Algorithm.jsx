import React from 'react';
import { algorithm } from './AlgorithmService';

/* global document, mnist */

class Algorithm extends React.Component {
	constructor() {
		super();
		this.state = {
			generatedDigit: {}
		};
	}
	generateDigit = () => {
		const generatedDigit = algorithm.generateDigit();
		this.setState({
			generatedDigit
		});
		const context = document
			.getElementById('digit-canvas')
			.getContext('2d');
		mnist.draw(generatedDigit.input, context);
	};
	recognizeDigit = () => {
		const result = algorithm.recognize(this.state.generatedDigit.input);
		this.setState({ result });
	};
	renderResults() {
		if (!this.state.result) {
			return '';
		}
		const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit =>
			<th key={digit}><b>{digit}</b></th>
		);
		const closeness = this.state.result.closenessArray.map(item =>
			<td key={item}>{item.toFixed(3)}</td>
		);
		return (
			<div>
				<table className="result-table">
					<thead>
						<tr>{indices}</tr>
					</thead>
					<tbody>
						<tr>{closeness}</tr>
					</tbody>
				</table>
				<p><b>Max:</b> {this.state.result.max.toFixed(3)}</p>
				<p><b>Digit:</b> {this.state.result.index}</p>
			</div>
		);
	}
	render() {
		const generatedDigit = this.state.generatedDigit.output
			? <p>Generated number: {this.state.generatedDigit.output}</p>
			: '';
		const recognizeBtn = this.state.generatedDigit.input
			? <div>
					<button className="btn" onClick={this.recognizeDigit}>
						Recognize
					</button>
				</div>
			: '';
		return (
			<div className="algorithm-content">
				<div>
					<button className="btn" onClick={this.generateDigit}>
						Generate number
					</button>
				</div>
				<div style={{ marginTop: '50px' }}>
					{generatedDigit}
					<canvas id="digit-canvas" width="28" height="28" />
				</div>
				{recognizeBtn}
				<div className="results-container">
					{this.renderResults()}
				</div>
			</div>
		);
	}
}

export default Algorithm;
