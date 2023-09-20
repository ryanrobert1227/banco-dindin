import { ButtonCSS } from "./Button";

import { ButtonProps } from "../../types/propsTypes";

export default function Button(props: ButtonProps) {
  const { text, widthflex } = props;
  return <ButtonCSS widthflex={widthflex}>{text}</ButtonCSS>;
}
