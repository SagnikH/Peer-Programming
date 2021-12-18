export const checkAuth = async () => {
  console.log("waiting.....");
	let promise = new Promise((res, rej) => {
		setTimeout(() => res(true), 3000);
	});

  console.log("sending data.....");
	return await promise;
};
