import { Route, Routes } from "react-router-dom";
import { MapProvider } from "./component/util/MyContext";
import Home from "./page/HomePage";
import JoinPage from "./page/JoinPage";
import List from "./page/ListPage";
import Login from "./page/LoginPage";
import Request from "./page/RequestPage";
import Question from "./page/QuestionPage";
import Header from "./component/header/Header";

function App() {
  return (
    <MapProvider>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/list" Component={List} />
          <Route exact path="/request" Component={Request} />
          <Route exact path="/question" Component={Question} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/join" Component={JoinPage} />
        </Routes>
      </div>
    </MapProvider>
  )
}

export default App;
