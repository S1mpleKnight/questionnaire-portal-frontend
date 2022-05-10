import EditProfile from "./components/EditProfile/EditProfile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import FieldsList from "./components/FieldsList/FieldsList";
import Responses from "./components/Responses/Responses";
import {Routes, Route} from 'react-router-dom'
import Congratulation from "./components/Congratulation/Congratulation";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Questionnaire from "./components/Questionnaire/Questionnaire";

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
            <Route path="/registration" element={<Registration/>}/>
            <Route path="/questionnaires/:questionnaireId" element={<Questionnaire/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </>
  );
}

export default App;
