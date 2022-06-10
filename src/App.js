import EditProfile from "./pages/EditProfile/EditProfile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import FieldsList from "./pages/FieldsList/FieldsList";
import Responses from "./pages/Responses/Responses";
import {Routes, Route} from 'react-router-dom'
import Congratulation from "./pages/Congratulation/Congratulation";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Questionnaire from "./pages/Questionnaire/Questionnaire";

function App() {
  return (
      <>
        <Routes>
            <Route path="/profile" element={<EditProfile/>}/>
            <Route path="/password" element={<ChangePassword/>}/>
            <Route path="/fields" element={<FieldsList/>}/>
            <Route path="/responses" element={<Responses/>}/>
            <Route path="/success" element={<Congratulation/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Registration/>}/>
            <Route path="/questionnaires">
                <Route path=":questionnaireId" element={<Questionnaire/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </>
  );
}

export default App;
