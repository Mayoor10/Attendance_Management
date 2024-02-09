import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portal from './Portal';  // Make sure to import your components
import AttendanceTable from './AttendanceTable';  // Adjust the import path accordingly

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/attendance" element={<AttendanceTable />} />
      </Routes>
    </Router>
  );
};

export default App;
