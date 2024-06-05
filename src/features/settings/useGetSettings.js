import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

export default function useGetSettings() {
  const { isLoading: gettingSettings, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { gettingSettings, settings };
}
