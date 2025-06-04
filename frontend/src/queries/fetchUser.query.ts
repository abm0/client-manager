import { useQuery } from "@tanstack/react-query";
import { loadProfile } from "../api/user";

export const useLoadProfile = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await loadProfile();

      return data;
    },
    retry: false,
  });
