import React from "react";

export interface IRegisterForm {
		name: string,
		email: string,
		password: string,
		confirmPassword?: string
}

export interface ILoginForm {
	name: string,
	password: string
}

export type TypeInputProps = {
	properties: any,
	labelText: string,
	children?: React.ReactNode,
	type: string,
	message: string | undefined
}