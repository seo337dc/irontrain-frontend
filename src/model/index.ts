// TODO : 다 제거하고 Response Error 타입 지정ㅊ
export type TGender = "female" | "male";

export interface RequestModel {
  quantity: number;
  gender: TGender;
  startDate: string;
}
