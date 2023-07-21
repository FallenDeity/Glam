import confetti from "canvas-confetti";

export const runFireworks = (): void => {
	const duration = 5 * 1000;
	const animationEnd = Date.now() + duration;
	const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

	function randomInRange(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	const interval: NodeJS.Timeout = setInterval(function () {
		const timeLeft = animationEnd - Date.now();

		if (timeLeft <= 0) {
			return clearInterval(interval);
		}

		const particleCount = 50 * (timeLeft / duration);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		void confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
			})
		);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		void confetti(
			Object.assign({}, defaults, {
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
			})
		);
	}, 250);
};
