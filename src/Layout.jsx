import ScreenTransition from "./components/ScreenTransition";
import PlayerProvider from "./player/PlayerProvider";
import MiniPlayer from "./player/MiniPlayer";

// The player lives above the routes, so music keeps playing between pages.
const Layout = () => {
  return (
    <PlayerProvider>
      <ScreenTransition />
      <MiniPlayer />
    </PlayerProvider>
  );
};
export default Layout;
