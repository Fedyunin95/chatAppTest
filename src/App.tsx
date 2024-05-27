import {Route, Routes} from "react-router-dom";
import {PrivateRouts} from "./layouts";
import {MainScreen} from "./screens";

function App() {

  return (
    <Routes>
      <Route element={<PrivateRouts />}>
        <Route path='/' element={<MainScreen />}/>
      </Route>
    </Routes>
  )
}

export default App
