import {EnumParams} from "@/app/types/main.interface";

const params = {
	[EnumParams.category]: "Категорія",
	[EnumParams.brands]: "Бренд",
	[EnumParams.size]: "Розміри",
	[EnumParams.gender]: "Стать",
	[EnumParams.price]: "Ціна",
	[EnumParams.sort]: "Сортування",
	[EnumParams.search]: "Пошук",

}

export const getParamsTitle = (param: EnumParams): string => params[param];
