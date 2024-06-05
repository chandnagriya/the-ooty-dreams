import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Account successfully created!");
    },
    onError: () => {
      toast.error("Account could not be created");
    },
  });

  return { signup, isLoading };
}
