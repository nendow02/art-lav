import AppScreen from "./AppScreen.js";
import { AuthProvider } from "./Authentication/AuthContext.js";
import { LocationProvider } from "./Location/LocationContext.js";

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <AppScreen />
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
