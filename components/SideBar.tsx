import NextImage from "next/image";
import NextLink from "next/link";

import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { usePlaylist } from "lib/hooks";
import { navMenu } from "./constants/constants";

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "",
  },
  {
    name: "Favourites",
    icon: MdFavorite,
    route: "favourites",
  },
];

// const playlists = new Array(30).fill(1).map((_, i) => `Playlist ${i + 1}`);

const SideBar = () => {
  // Get playlists from DB and map through them
  const { playlists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage
            src="./spotify-logo.svg"
            height={60}
            width={120}
            alt="site-logo"
          />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu) => {
              return (
                <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                  <LinkBox>
                    <NextLink href={`/${menu.route}`} passHref>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menu.name}
                    </NextLink>
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Box>
          <List spacing={2}>
            {musicMenu.map((menu) => {
              return (
                <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                  <LinkBox>
                    <NextLink href={`/${menu.route}`} passHref>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menu.name}
                    </NextLink>
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
        <Divider marginY="20px" color="gray.800" />
        <Box
          height="66%"
          overflowY="auto"
          paddingY="20px"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <List spacing={2}>
            {playlists.map((playlist) => {
              return (
                <ListItem paddingX="20px" fontSize="16px" key={playlist.id}>
                  <LinkBox>
                    <NextLink
                      // each playlist in the sidebar links to the playlist id
                      href={{
                        pathname: "/playlist/[id]",
                        query: { id: playlist.id },
                      }}
                      passHref
                    >
                      {playlist.name}
                    </NextLink>
                  </LinkBox>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
