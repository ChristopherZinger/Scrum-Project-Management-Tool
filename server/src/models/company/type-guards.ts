export interface ITeammateResponse {
	firstname: string;
	lastname: string;
	email: string;
}

export interface ITeammatesResponse {
	invitedUsers: string[];
	registeredUsers: ITeammateResponse[];
}
