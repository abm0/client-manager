import { useQuery } from "@tanstack/react-query";
import { loadProfile } from "../api/profile";

export const useLoadProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await loadProfile();

      return data;
    },
    retry: false,
  });
