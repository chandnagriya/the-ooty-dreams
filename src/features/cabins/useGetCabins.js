import { useQuery } from "@tanstack/react-query";

import { getCabins as getCabinsAPI } from "../../services/apiCabins";

export default function useGetCabins() {
  const { isLoading: gettingCabins, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsAPI,
  });

  return { gettingCabins, cabins };
}
