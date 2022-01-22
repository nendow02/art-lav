import AppScreen from "./AppScreen.js";
import { LocationProvider } from "./Location/LocationContext.js";

function App() {
  const [loginOpen,setLoginOpen] = useState(true);
  return (
    <LocationProvider>
      <AppScreen />
    </LocationProvider>
  );
}

export default App;
