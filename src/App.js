import { useState, useEffect } from 'react'
import GlobalService from './GlobalService';
import './App.css';

const App = () => {
  const service = new GlobalService();

  const [searchTerm, setSearchTerm] = useState('Code');
  const [searchCounter, setSearchCounter] = useState(0);
  const [giphLib, setGiphLib] = useState([]);

  useEffect(() => {
    service.findGiphs('Code', 0, setSearchCounter, setGiphLib);

    return () => { };
  }, []);

  const performSearch = () => {
    service.findGiphs(searchTerm, 0, setSearchCounter, setGiphLib);
  }

  return (
    <div className="App">
      <div className='App-wrapper'>
        {/* HEADER */}
        <header className="App-header">
          Giphy
        </header>
        <p className='text'>Find your favorite giphs here!</p>

        {/* NAVIGATION AND TOOLS */}
        <div className='bar'>
          <p className='text'>You search here </p>
          <input className='input' value={searchTerm} onChange={io => setSearchTerm(io.target.value)} />
          <div onClick={performSearch} className='button'>FIND</div>
        </div>

        <div className='bar'>
          <p className='text'>Then browse here </p>
          <p className='found-entries'>{searchCounter} Entries found</p>
          <div className='button'> &lt;</div>
          <p className='text'>page: 1</p>
          <div className='button'> &gt;</div>
        </div>

        <div>
          {giphLib.map((giph, key) =>
            <img key={key} className='giph-pic' src={giph.images.downsized.url} />
          )}
        </div>

      </div>
    </div>
  );
}

export default App;
