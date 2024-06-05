import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting as updateSettingAPI } from "../../services/apiSettings";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: updatingSetting, mutate: updateSetting } = useMutation({
    mutationFn: (newSetting) => updateSettingAPI(newSetting),
    onSuccess: () => {
      toast.success("Setting updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updatingSetting, updateSetting };
}
