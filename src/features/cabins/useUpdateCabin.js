import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createEditCabin as editCabinAPI } from "../../services/apiCabins";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: updatingCabin, mutate: updateCabin } = useMutation({
    mutationFn: ({ cabinData, id }) => editCabinAPI(cabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updatingCabin, updateCabin };
}
