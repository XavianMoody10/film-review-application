import { useQuery } from "@tanstack/react-query";
import { getTVCollectionByList } from "../services/tv.services";

export const useFetchTVCollectionByList = (listValue, enabled) => {
  const query = useQuery({
    queryKey: ["tv", listValue],
    queryFn: () => getTVCollectionByList(listValue),
    retry: false,
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled,
  });

  return query;
};
