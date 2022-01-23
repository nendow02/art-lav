import AppScreen from "./AppScreen.js";
import { AuthProvider } from "./Authentication/AuthContext.js";
import { LocationProvider } from "./Location/LocationContext.js";
import { ProfileProvider } from "./Profile/ProfileContext.js";

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <ProfileProvider>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
          </style>
          <AppScreen />
        </ProfileProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
