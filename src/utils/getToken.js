
export const getToken = (req) => {
	let token = req.headers['authorization'] ? req.headers['authorization'].split(" ")[1] : null
	return token
}