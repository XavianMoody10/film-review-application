import { useQuery } from "@tanstack/react-query";
import { getTVCollectionByList } from "../services/tv.services";

export const useFetchTVCollectionByList = (listValue, enabled, page) => {
  const query = useQuery({
    queryKey: ["tv", listValue, page],
    queryFn: () => getTVCollectionByList(listValue, page),
    retry: false,
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled,
  });

  return query;
};
