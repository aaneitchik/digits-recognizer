/* global mnist */

const transformPixel = pixel => (pixel > 0.15 ? 1 : 0);

const sampleSize = 1000;
const n = 28 * 28; // number of features
const { X0, testX } = getTrainingSample();
const A = new Array(X0.length).fill(new Array(n));
trainAlgorithm();

const algorithm = {
	generateDigit,
	getStatistics,
	recognize
};

/* Generate random variable that is not in the training sample */
function generateDigit() {
	return testX[parseInt(testX.length * Math.random(), 10)];
}

function getTrainingSample() {
	const set = mnist.set(sampleSize, sampleSize);
	const training = set.training.reduce((prev, curr) => {
		const digit = curr.output.indexOf(1);
		const digitData = curr.input.map(transformPixel);
		const trainingSample = [...prev];
		if (trainingSample[digit]) {
			trainingSample[digit].push(digitData);
		} else {
			trainingSample[digit] = [digitData];
		}
		return trainingSample;
	}, []);
	const test = set.test.map(digitData => ({
		input: digitData.input.map(transformPixel),
		output: digitData.output.indexOf(1)
	}));
	return { X0: training, testX: test };
}

function getStatistics(setProgress) {
	const totalDigits = testX.length;
	let succeeded = 0;
	let index = 0;
	let resolveStatistics;
	setTimeout(recognizeDigit);

	return new Promise(resolve => {
		resolveStatistics = resolve;
	});

	function recognizeDigit() {
		const recognized = recognize(testX[index].input);
		if (recognized.index === testX[index].output) {
			succeeded = succeeded + 1;
		}
		const progress = index / totalDigits;
		if (progress * 100 % 5 === 0) {
			setProgress(progress);
		}
		if (index !== totalDigits - 1) {
			setTimeout(recognizeDigit);
		} else {
			resolveStatistics({
				total: totalDigits,
				succeeded
			});
		}
		index = index + 1;
	}
}

function trainAlgorithm() {
	const B = [];

	/* step 1 */
	for (let i = 0; i < X0.length; i++) {
		/* step 2,3 */
		B[i] = [];
		for (let t = 0; t < n; t++) {
			B[i][t] =
				X0[i].reduce((sum, next) => sum + next[t], 0) / X0[i].length;
		}
	}

	/* step 4 */
	const Bt = [];
	for (let t = 0; t < n; t++) {
		Bt[t] = 0;
		for (let i = 0; i < X0.length; i++) {
			Bt[t] = Bt[t] + B[i][t];
		}
		Bt[t] = Bt[t] / X0.length;

		for (let k = 0; k < X0.length; k++) {
			A[k][t] = Math.abs(B[k][t] - Bt[t]);
		}
	}
}

function recognize(X) {
	const fX = [];
	for (let i = 0; i < X0.length; i++) {
		fX[i] = [];
		for (let x = 0; x < X0[i].length; x++) {
			let num = 0;
			let denum = 0;
			for (let j = 0; j < n; j++) {
				const t = X0[i][x][j] === X[j] ? 2 : 1;
				num = num + (-1) ** t * A[i][j];
				denum = denum + A[i][j];
			}

			fX[i][x] = Math.max(0, num / denum);
		}
	}

	const closenessArray = fX.map(fxi =>
		fxi.reduce((max, next) => Math.max(max, next), 0)
	);

	const result = closenessArray.reduce(
		(prev, curr, index) => (curr > prev.max ? { max: curr, index } : prev),
		{ max: 0, index: 0 }
	);

	return {
		closenessArray,
		...result
	};
}

export default algorithm;
