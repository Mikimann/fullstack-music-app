import useSWR from "swr";
import fetcher from "./fetcher";

// swr - library to do data fetching, fetches data and stores it locally.

// custom hook to get the user.
// anywhere in app the where you make an API call to get the user to /me, use this hook.
// whenever the user gets updated, cache at /me gets updated and every component in the app will automatically get that update.

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

// hook to get all the playlist from the db to populate the sidebar

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);
  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};
