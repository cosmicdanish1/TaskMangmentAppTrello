import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

export const FormButton = () =>{
  const { pending } = useFormState();
  return(
    <Button disabled={pending} type="submit">
    Submit
  </Button>
  );
};
