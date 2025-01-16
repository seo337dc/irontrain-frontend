import { create } from "zustand";
import type { TGender } from "@/model/person";

interface GenderStore {
  gender: TGender;
  setGender: (gender: TGender) => void;
}

const useGenderStore = create<GenderStore>((set) => ({
  gender: "",
  setGender: (gender) => set(() => ({ gender })),
}));

export default useGenderStore;
