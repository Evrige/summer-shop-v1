import {EnumParams} from "@/app/types/main.interface";

const params = {
	[EnumParams.category]: "Категорія",
	[EnumParams.brands]: "Бренд",
	[EnumParams.size]: "Розміри",
	[EnumParams.gender]: "Стать",
	[EnumParams.price]: "Ціна",
}

export const getParamsTitle = (param: EnumParams): string => params[param];
