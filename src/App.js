import EditProfile from "./components/EditProfile/EditProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Fields from "./components/Fields/Fields";
import Responses from "./components/Responses/Responses";
import {Routes, Route} from 'react-router-dom'
import Congratulation from "./components/Congratulation/Congratulation";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";

function App() {
  return (
      <>
        <Routes>
            <Route path="/profile" element={<EditProfile/>}/>
            <Route path="/password" element={<ChangePassword/>}/>
            <Route path="/fields" element={<Fields/>}/>
            <Route path="/responses" element={<Responses/>}/>
            <Route path="/congratulation" element={<Congratulation/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </>
  );
}

export default App;
