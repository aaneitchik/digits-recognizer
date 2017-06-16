/* global mnist */

const algorithm = (function() {
	const sampleSize = 1000;
	const rangeStart = parseInt(Math.random() * 100, 10);
	const n = 28 * 28; // number of features
	let X0;
	let testX;
	getTrainingSample();
	const A = new Array(X0.length).fill(new Array(n));
	trainAlgorithm();
	const service = {
		generateDigit,
		getStatistics,
		recognize
	};

	return service;

	/* Generate random variable that is not in the training sample */
	function generateDigit() {
		return testX[parseInt(testX.length * Math.random(), 10)];
	}

	function getTrainingSample() {
		const set = mnist.set(1000, 1000);
		X0 = set.training;
		testX = set.test;
		X0 = X0.reduce((prev, curr) => {
			const digit = curr.output.indexOf(1);
			if (prev[digit]) {
				prev[digit].push(
					curr.input.map(digit => {
						return digit > 0.15 ? 1 : 0;
					})
				);
			} else {
				prev[digit] = [
					curr.input.map(digit => {
						return digit > 0.15 ? 1 : 0;
					})
				];
			}
			return prev;
		}, []);
		testX = testX.map(digitData => {
			return {
				input: digitData.input.map(digit => {
					return digit > 0.15 ? 1 : 0;
				}),
				output: digitData.output.indexOf(1)
			};
		});
	}

	function getStatistics() {
		const succeeded = testX.reduce((prev, curr) => {
			const recognized = recognize(curr.input);
			if (recognized.index === curr.output) {
				prev++;
			}
			return prev;
		}, 0);
		return {
			total: testX.length,
			succeeded
		};
	}

	function trainAlgorithm() {
		const B = new Array(X0.length);

		/* step 1 */
		for (let i = 0; i < X0.length; i++) {
			/* step 2,3 */
			B[i] = new Array(n);
			for (let t = 0; t < n; t++) {
				B[i][t] =
					X0[i].reduce((sum, next) => {
						return (sum += next[t]);
					}, 0) / X0[i].length;
			}
		}

		/* step 4 */
		const Bt = new Array(n);
		for (let t = 0; t < n; t++) {
			Bt[t] = 0;
			for (let i = 0; i < X0.length; i++) {
				Bt[t] += B[i][t];
			}
			Bt[t] = Bt[t] / X0.length;

			for (let k = 0; k < X0.length; k++) {
				A[k][t] = Math.abs(B[k][t] - Bt[t]);
			}
		}
	}

	function recognize(X) {
		const fX = new Array(X0.length);
		for (let i = 0; i < X0.length; i++) {
			fX[i] = new Array(X0.length);
			for (let x = 0; x < X0[i].length; x++) {
				let num = 0;
				let denum = 0;
				for (let j = 0; j < n; j++) {
					let t = X0[i][x][j] === X[j] ? 2 : 1;
					num += Math.pow(-1, t) * A[i][j];
					denum += A[i][j];
				}

				fX[i][x] = Math.max(0, num / denum);
			}
		}

		const closenessArray = fX.map(fxi => {
			return fxi.reduce((max, next) => {
				return Math.max(max, next);
			}, 0);
		});

		const result = closenessArray.reduce(
			(prev, curr, index) => {
				return curr > prev.max ? { max: curr, index } : prev;
			},
			{ max: 0, index: 0 }
		);

		return {
			closenessArray,
			...result
		};
	}
})();

export { algorithm };
