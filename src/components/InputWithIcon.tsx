import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaLocationArrow } from "react-icons/fa";

interface InputWithIconProps {
  value: string;
  onChange: (value: string) => void;
  icon: IconType;
  placeholder: string;
  readOnly?: boolean;
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  value,
  onChange,
  icon: Icon,
  placeholder,
  readOnly,
}: InputWithIconProps) => {
  return (
    <InputGroup borderColor="green.600">
      <InputLeftElement>
        <Icon color="green" />
      </InputLeftElement>
      <Input
        disabled={readOnly || false}
        color="green.700"
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        _hover={{ borderColor: "green.700" }}
        _focus={{ borderColor: "green.700" }}
        sx={{
          "&::placeholder": {
            color: "gray.400",
            fontSize: "sm",
          },
        }}
      />
    </InputGroup>
  );
};
