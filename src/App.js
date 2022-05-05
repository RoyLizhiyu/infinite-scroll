import logo from './logo.svg';
import './App.css';
import React,{useEffect, useReducer, useState,useRef} from 'react';
import axios from 'axios';
const URL ='https://randomuser.me/api';

let canFetch = true;
function App() {
  const [users,setUsers] = useState([]);
  const scrollRef = useRef();

  const fetchFirstUser = async()=>{
    const {data} = await axios.get(URL);
    setUsers(data.results);
  }

  const fetchUserAndAppendToUser = async(number)=>{
    for (let i = 0; i<number; i++){
      const {data} = await axios.get(URL);
      setUsers(previous=>{
        return [...previous,data.results[0]]
      })
    }

  }


  const handleScroll= async(e)=>{
    const {scrollHeight,clientHeight,scrollTop} = e.target;
    if(scrollTop+clientHeight===scrollHeight && canFetch){
      canFetch = false;
      await fetchUserAndAppendToUser(3);
      canFetch = true;
    }
  }

  useEffect(()=>{
    fetchFirstUser();
    
  },[]);
  return (
    <div className="App" onScroll={handleScroll} ref={scrollRef}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Football
        </a>
      </header>
      <div>
      {users.map(user=>{
        return(
          <>
          <p>
            {`Name: ${user.name.first} ${user.name.last}`}
          </p>
          <p>
            {`Gender: ${user.gender}`}
          </p>
          <img src={user.picture.medium} alt='userimage'/>
          </>
        )
      })}

      </div>
    </div>
  );
}

export default App;
