export type TGender = "female" | "male";

export interface ParamReqPerson {
  quantity: number;
  gender: TGender;
  startDate: string;
}

export interface RequestPersonModel {
  _quantity: number;
  _gender: TGender;
  _birthday_start: string;
}

export interface Address {
  id: number; //  1;
  street: string; //  "1250 Kshlerin Inlet";
  streetName: string; //  "Lynch Knoll";
  buildingNumber: string; //  "4196";
  city: string; //  "Klockomouth";
  zipcode: string; //  "12269-1038";
  country: string; //  "Taiwan";
  country_code: string; //   "TW";
  latitude: number; // -49.674657;
  longitude: number; // 158.504335;
}
export interface ResponsePersonModel {
  id: number; //  1;
  firstname: string; //  "Norene";
  lastname: string; //  "Olson";
  email: string; //  "leone01@thiel.org";
  phone: string; //  "+19065816627";
  birthday: string; //  "2022-01-12";
  gender: TGender;
  address: Address;
  website: string; //  "http://abernathy.com";
  image: string; //  "http://placeimg.com/640/480/people";
}

export interface TPerson extends ResponsePersonModel {
  isSelect: boolean;
  name: string;
}
