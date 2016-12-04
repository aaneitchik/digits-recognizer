import React from 'react';
import reactStamp from 'react-stamp';

import {algorithm} from './AlgorithmService';


const Statistics = reactStamp(React).compose({
	state: {
		loading: false
	},
	getStatistics() {
		this.setState({loading: true});
		setTimeout(() => {
			const statistics = algorithm.getStatistics();
			this.setState({...statistics, loading: false});
		}, 0);
	},
	render() {
		const {total, succeeded, loading} = this.state;
		let results = this.state.total ?
			<div className="results-container">
				<p><b>Total: </b>{total}</p>
				<p><b>Succeeded: </b>{succeeded} ({(succeeded * 100 / total).toFixed(1)}%)</p>
			</div> : '';
		if (loading) {
			results = 'Loading...';
		}

		return (
			<div className="statistics-content">
				<div>
					<button className="btn"
							onClick={this.getStatistics.bind(this)}>Get Statistics
					</button>
				</div>
				{results}
			</div>
		);
	}
});

export {Statistics};