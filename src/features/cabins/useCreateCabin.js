import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin as createCabinAPI } from "../../services/apiCabins";

export default function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: creatingCabin, mutate: createCabin } = useMutation({
    mutationFn: createCabinAPI,
    onSuccess: () => {
      toast.success("Cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { creatingCabin, createCabin };
}
