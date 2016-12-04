export default function () {
	const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	const sampleSize = 100;
	const rangeStart = parseInt(Math.random() * 100);
	const n = 28 * 28; //number of features
	const X0 = getTrainingSample();
	const A = (new Array(X0.length)).fill(new Array(n));
	trainAlgorithm();
	const service = {
		generateDigit,
		recognize
	};

	return service;

	/* Generate random variable that is not in the training sample */
	function generateDigit(digit) {
		const start = rangeStart + sampleSize;
		const end = mnist[digit].length;
		return mnist[digit]
			.get(parseInt(start + (end - start) * Math.random()))
			.map(pixel => pixel > 0.15 ? 1 : 0);
	}

	function getTrainingSample() {
		return digits.map(digit => {
			const digitClass = mnist[digit].range(rangeStart, rangeStart + sampleSize);
			return digitClass.map((digitArray) => {
				return digitArray.map(digit => {
					return digit > 0.15 ? 1 : 0;
				});
			});
		});
	}

	function trainAlgorithm() {
		const B = new Array(X0.length);

		/* step 1 */
		for (let i = 0; i < X0.length; i++) {
			/* step 2,3 */
			B[i] = new Array(n);
			for (let t = 0; t < n; t++) {
				B[i][t] = X0[i].reduce((sum, next) => {
						return sum += next[t];
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
					let t = (X0[i][x][j] === X[j]) ? 2 : 1;
					num += Math.pow(-1, t) * A[i][j];
					denum += A[i][j];
				}

				fX[i][x] = Math.max(0, num / denum);
			}
		}

		const closenessArray = fX.map((fxi) => {
			return fxi.reduce((max, next) => {
				return Math.max(max, next);
			}, 0);
		});

		const result = closenessArray.reduce((prev, curr, index) => {
			return curr > prev.max ? {max: curr, index} : prev;
		}, {max: 0, index: 0});

		return {
			closenessArray,
			...result
		};
	}
}
