import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddressList from "./components/AddressList";
import EditPerson from "./components/EditPerson";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route exact path="/" element={<AddressList />} />
          <Route path="/edit" element={<EditPerson />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
