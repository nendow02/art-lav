import AppScreen from "./AppScreen.js";
import { LocationProvider } from "./Location/LocationContext.js";

function App() {
  return (
    <LocationProvider>
      <AppScreen />
    </LocationProvider>
  );
}

export default App;
