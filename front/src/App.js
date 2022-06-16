import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Create from './pages/routing/Create';
import Find from './pages/routing/Find';
import View from './pages/routing/View';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<Create />} path="/routing/new" />
        <Route element={<View />} path="/routing/view" />
        <Route element={<Find />} path="/routing/find" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
