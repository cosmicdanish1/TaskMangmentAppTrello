 "use client";
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom";

export const FormDelete = () => {
  const { pending } = useFormState();
  return(
    <Button disabled={pending} type="submit" variant="destructive" size="sm">
    Delete
  </Button>
  )
}