import { useQuery } from "@tanstack/react-query";
import { loadProfile } from "../profile";

export const useLoadProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await loadProfile();

      return data;
    },
    retry: false,
  });
