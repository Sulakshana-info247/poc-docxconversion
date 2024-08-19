import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentView from './DocumentView';
import FileUpload from './FileUpload';

function App() {
  return (
    <div className="App">
     <Router>
      <div className="bg-gray-50 min-h-screen">
        <main>
          <Routes>
            <Route path="/" element={<FileUpload />} />
            <Route path="/document/:id" element={<DocumentView />} />
          </Routes>
        </main>
      </div>
    </Router>
    </div>
  );
}

export default App;
