import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { FaLocationArrow } from "react-icons/fa";

interface InputWithIconProps {
  value: string | undefined;
  onChange: (value: string) => void;
  icon: IconType;
  placeholder: string;
  readOnly?: boolean;
  onKeyDown?: (event?: any) => void;
  backgroundColor?: string;
}

export const InputWithIcon: React.FC<InputWithIconProps> = ({
  value,
  onChange,
  icon: Icon,
  placeholder,
  readOnly,
  onKeyDown,
  backgroundColor,
}: InputWithIconProps) => {
  return (
    <InputGroup borderColor="green.600">
      <InputLeftElement>
        <Icon color="green" />
      </InputLeftElement>
      <Input
        backgroundColor={backgroundColor}
        disabled={readOnly || false}
        color="green.700"
        fontSize="sm"
        type="text"
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
        onKeyDown={(event) => (onKeyDown ? onKeyDown(event) : undefined)}
      />
    </InputGroup>
  );
};
