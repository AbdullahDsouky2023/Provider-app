import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../AppButton";

function SubmitButton({ title ,style,disabled=false}) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title}  disabled={disabled} onPress={handleSubmit}  style={style}/>;
}

export default SubmitButton;