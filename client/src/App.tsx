import { BrowserRouter, Routes, Route } from "react-router-dom"
import List from "./pages/ListPage/List"
import Setting from "./pages/SettingPage/Setting"
import Header from "./component/Header"

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/setting" element={<List />} />
        <Route path="/" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  )
}
