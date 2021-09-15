import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './common/NavBar';
import Routes from './routes/Routes';
import JoblyApi from './api/Api';
import jwt from 'jsonwebtoken';
import UserContext from './context/UserContext';
import './App.css';
import LoadingMessage from './common/LoadingMessage';
import useLocalStorage from './hooks/useLocalStorage';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const TOKEN_STORAGE_ID = 'jobly-token';

const theme = createTheme({
  palette: {
    primary: {
      main: '#602951'
    },
    secondary: {
      main: '#554057'
    },
    success: {
      main: '#11cb5f'
    },
    error: {
      main: '#FFB74D'
    },
  },
});

/**
 * Renders the App.
 * 
 * Holds state for currentUser, token, isloading, applications.
 * 
 * @signup function registers a new user and sets the token and user data.
 * @login authenticates a user and sets the token and user data.
 * @logout logges out the current user.
 * @hasApplied checks if current user has applied to a job.
 * @applyToJob applies the current user to a job.
 * 
 * @returns App, BrowserRouter, NavBar, and User/Theme Context.
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState([]);

  console.debug(
    "App",
    "isLoading=", isLoading,
    "currentUser=", currentUser,
    "token=", token,
);

  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);
    async function loadUserData() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          const user = await JoblyApi.getUser(username);
          setCurrentUser(user);
          setApplications(user.applications);
        } catch (err) {
          console.error('Error loading the new user data from the API.', err);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    }

    setIsLoading(true);
    loadUserData();
  }, [token]); 

  async function signup(signupData) {
    try {
      let userToken = await JoblyApi.register(signupData);
      setToken(userToken);
      return { success: true }
    } catch (err) {
      return { success: false, err };
    }
  };

  async function login(loginData) {
    try {
      let userToken = await JoblyApi.authenticate(loginData);
      setToken(userToken);
      return { success: true }
    } catch (err) {
      return { success: false, err };
    }
  };

  function logout() {
    setToken(null);
    setCurrentUser(null);
  };

  function hasApplied(id) {
    return applications.includes(id);
  }

  async function applyToJob(jobId) {
    if (hasApplied(jobId)) return { success: false , err: 'Already Applied!'};

    try {
      let id = await JoblyApi.applyToJob(currentUser.username, jobId);
      setApplications([...applications, id]);
      return { success: true }
    } catch (err) {
      return { success: false, err };
    }
  }

  if (isLoading) {
    return <LoadingMessage />
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, applyToJob, hasApplied }}>
        <ThemeProvider theme={theme}>
          <NavBar logout={logout} />
          <main>
            <Routes signup={signup} login={login} />
          </main>
        </ThemeProvider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
