import axios from "axios";

import type { RequestModel } from "@/model";

const BASE_URL = "https://fakerapi.it/api/v2";

export const fetchData = async ({
  quantity = 0,
  gender = "female",
  startDate = "2005-01-01",
}: RequestModel) => {
  try {
    const response = await axios.get(`${BASE_URL}/persons`, {
      params: {
        _quantity: quantity,
        _gender: gender,
        _birthday_start: startDate,
      },
    });
    console.log("response", response);
    return response.data.data; // 데이터 배열 반환
  } catch (error) {
    console.error("Error fetching persons:", error);
    throw error;
  }
};
