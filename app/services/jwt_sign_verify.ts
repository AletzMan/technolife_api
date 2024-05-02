import { SignJWT, jwtVerify, type JWTPayload } from "jose"

export async function sign(payload: string, secret: string, expTime: number): Promise<string> {
	const iat = Math.floor(Date.now() / 1000)
	const exp = iat + expTime // one hour

	return new SignJWT({ payload })
		.setProtectedHeader({ alg: "HS256", typ: "JWT" })
		.setExpirationTime(exp)
		.setIssuedAt(iat)
		.setNotBefore(iat)
		.sign(new TextEncoder().encode(secret))
}

export async function verify(token: string, secret: string): Promise<JWTPayload> {
	const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
	// run some checks on the returned payload, perhaps you expect some specific values

	// if its all good, return it, or perhaps just return a boolean
	return payload
}