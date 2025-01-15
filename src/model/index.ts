export type TGender = "female" | "male";

export interface RequestModel {
  quantity: number;
  gender: TGender;
  startDate: string;
}
