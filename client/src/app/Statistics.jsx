import React from 'react';
import { Circle } from 'react-progressbar.js';

import algorithm from './AlgorithmService';

const containerStyle = {
	height: '100px',
	width: '100px',
	margin: '0 auto'
};

class Statistics extends React.Component {
	constructor() {
		super();
		this.state = {
			loading: false
		};
	}
	setProgress = progress => {
		this.setState(prevState => ({ ...prevState, progress }));
	};
	getStatistics = () => {
		this.setState({ loading: true, progress: 0 });
		setTimeout(() => {
			algorithm.getStatistics(this.setProgress).then(result => {
				this.setState({ ...result, loading: false });
			});
		});
	};
	render() {
		const { total, succeeded, loading, progress } = this.state;
		let results = total
			? <div className="results-container">
					<p><b>Total: </b>{total}</p>
					<p>
						<b>Succeeded: </b>{succeeded} ({(succeeded * 100 / total).toFixed(1)}%)
					</p>
				</div>
			: '';
		if (loading) {
			results = (
				<Circle
					progress={progress}
					text={`${progress * 100} %`}
					containerStyle={containerStyle}
				/>
			);
		}

		return (
			<div className="statistics-content">
				<div>
					<button className="btn" onClick={this.getStatistics}>
						Get Statistics
					</button>
				</div>
				{results}
			</div>
		);
	}
}

export default Statistics;
