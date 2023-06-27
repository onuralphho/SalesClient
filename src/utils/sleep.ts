export function sleep(time: number) {
	return new Promise((resolve, reject) => {
		let a: unknown;
		setTimeout(() => {
			resolve(a);
		}, time);
	});
}
