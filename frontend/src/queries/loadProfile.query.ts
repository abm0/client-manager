import { useQuery } from "@tanstack/react-query";
import { loadProfile } from "../api/user";

export const useLoadProfile = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      console.log('query fn call')
      const { data } = await loadProfile();

      return data;
    },
    retry: false,
    refetchOnMount: true,
  });
