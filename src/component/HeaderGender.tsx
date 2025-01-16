import React from "react";
import { RadioGroup } from "@/ui";
import { RadioGroupOption } from "@/model/ui";
import useGenderStore from "@/store/useGenderStore";

const genderOptions: RadioGroupOption[] = [
  { label: "모두", value: "" },
  { label: "여성", value: "female" },
  { label: "남성", value: "male" },
];

const HeaderGender = () => {
  const { gender, setGender } = useGenderStore();

  return (
    <section className="flex items-center gap-4">
      <h3 className="text-sm font-semibold">성별 필터</h3>
      <RadioGroup
        options={genderOptions}
        selectedValue={gender}
        onChange={setGender}
        name="gender"
        direction="row"
      />
    </section>
  );
};

export default HeaderGender;
