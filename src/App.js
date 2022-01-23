import AppScreen from "./AppScreen.js";
import { AuthProvider } from "./Authentication/AuthContext.js";
import { LocationProvider } from "./Location/LocationContext.js";

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
        </style>
        <AppScreen />
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
