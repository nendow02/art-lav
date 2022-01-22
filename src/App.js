import { useState } from 'react';
import './App.css';
import Login from './login';
import Upload from './upload';

function App() {
  const [loginOpen,setLoginOpen] = useState(true);
  return (
    <div>
      {loginOpen ? <Login handleSuccess={() => setLoginOpen(!loginOpen)}/>: null}
      <div>main page</div>
      <Upload/>
    </div>
  );
}

export default App;
