import "./App.css";
import { Route, Routes } from "react-router-dom";
import PaymentFormPage from "./PaymentFormPage";
import PaymentSuccessPage from "./PaymentSuccessPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/id" element={<PaymentFormPage />} />
        <Route path="/success" element={<PaymentSuccessPage />} />
      </Routes>
    </>
  );
}

export default App;
