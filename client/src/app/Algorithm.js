import React from 'react';
import reactStamp from 'react-stamp';
import {algorithm} from './AlgorithmService';
console.log(algorithm);

const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => {
	return {value: digit, label: digit}
});

const Algorithm = reactStamp(React).compose({
	state: {
		generatedDigit: {}
	},
	generateDigit() {
		const generatedDigit = algorithm.generateDigit();
		this.setState({
			generatedDigit
		});
		const context = document.getElementById('digit-canvas').getContext('2d');
		mnist.draw(generatedDigit.input, context);
	},
	recognizeDigit() {
		const result = algorithm.recognize(this.state.generatedDigit.input);
		this.setState({result});
	},
	onSelectChange(selectedDigit) {
		this.setState({selectedDigit});
	},
	renderResults() {
		if (!this.state.result) {
			return '';
		}
		const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit, index) => {
			return <th key={index}><b>{digit}</b></th>
		});
		const closeness = this.state.result.closenessArray.map((item, index) => {
			return <td key={index}>{item.toFixed(3)}</td>
		});
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
	},
	render() {
		const generatedDigit = this.state.generatedDigit.output ?
			<p>Generated number: {this.state.generatedDigit.output}</p> : '';
		const recognizeBtn = this.state.generatedDigit.input ?
			<div>
				<button className="btn"
						onClick={this.recognizeDigit.bind(this)}>Recognize
				</button>
			</div> : '';
		return (
			<div className="algorithm-content">
				<div>
					<button className="btn"
							onClick={this.generateDigit.bind(this)}>Generate number
					</button>
				</div>
				<div style={{marginTop: '50px'}}>
					{generatedDigit}
					<canvas id="digit-canvas" width="28" height="28"/>
				</div>
				{recognizeBtn}
				<div className="results-container">
					{this.renderResults()}
				</div>
			</div>
		);
	}
});

export default Algorithm;