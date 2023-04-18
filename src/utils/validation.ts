export function validateEmail(email: string): boolean {
	let valid: boolean = false;
	const validEmailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	valid = validEmailReg.test(email);
	return valid;
}
