export interface IUser {
	id: number
	name: string
	lastname: string
	email: string
	password: string
	oldpasswords: OldPasswordType[]
	token_reset_password: string
	privileges: number
	datebirth: string
	phonenumber: number
	favorites: string[]
}

export interface OldPasswordType {
	password: string
}
