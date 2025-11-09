import { Picker } from "@react-native-picker/picker";

type SelectProps = {
  list: { label: string; value: "Alta" | "Media" | "Baja" }[];
  value?: "Alta" | "Media" | "Baja";
  onChange?: (value: "Alta" | "Media" | "Baja") => void;
};

export const Select = ({ list, value, onChange }: SelectProps) => (
  <Picker
    selectedValue={value}
    onValueChange={(val: "Alta" | "Media" | "Baja") => {
      if (onChange) onChange(val);
    }}
  >
    {list.map((item) => (
      <Picker.Item key={item.value} label={item.label} value={item.value} />
    ))}
  </Picker>
);
