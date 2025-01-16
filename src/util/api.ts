import axios from "axios";

import type {
  ParamReqPerson,
  RequestPersonModel,
  ResponsePersonModel,
} from "@/model/person";

const BASE_URL = "https://fakerapi.it/api/v2";

export const getPersonsApi = async ({
  quantity = 0,
  gender = "female",
  startDate = "2005-01-01",
}: ParamReqPerson): Promise<ResponsePersonModel[]> => {
  try {
    const params: RequestPersonModel = {
      _quantity: quantity,
      _gender: gender,
      _birthday_start: startDate,
    };
    const response = await axios.get(`${BASE_URL}/persons`, {
      params,
    });

    return response.data.data; // 데이터 배열 반환
  } catch (error) {
    console.error("Error fetching persons:", error);
    throw error;
  }
};
