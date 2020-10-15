import React from 'react';
import { Route, Routes } from 'react-router';
import { List } from './components/view/crudlist';
import { FixedMenuLayout } from './components/home';
import { Add } from './components/view/crudAdd';
import { Edit } from './components/view/crudEdit';
import { CountryContextProvider } from '../src/components/hooks/crudhook';


function App() {
  return (
    <div>
      {/* Enables Country to be accessed global and mantain state */}
      <CountryContextProvider>
        <FixedMenuLayout />
        <Routes>
          {/* Routing to different components */}
          <Route path="list" element={<List />} />
          <Route path="add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />,
     </Routes>
      </CountryContextProvider>
    </div>


  );
}

export default App;
