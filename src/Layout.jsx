import ScreenTransition from "./components/ScreenTransition";
import PlayerProvider from "./player/PlayerProvider";
import PlayerBar from "./player/PlayerBar";

// The player lives above the routes, so music keeps playing between pages.
const Layout = () => {
  return (
    <PlayerProvider>
      <ScreenTransition />
      <PlayerBar />
    </PlayerProvider>
  );
};
export default Layout;
