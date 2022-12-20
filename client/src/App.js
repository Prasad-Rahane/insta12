import React,{useEffect,createContext,useReducer,useContext} from 'react'
import NavBar from './components/navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/Screens/Home'
import Signin from './components/Screens/Signin'
import Profile from './components/Screens/Profile'
import Signup from './components/Screens/Signup'
import CreatePost from './components/Screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/Screens/UserProfile'
import SubscribedUserPosts from './components/Screens/SubscribesUserPosts'
//import Reset from './components/screens/Reset'
//import NewPassword from './components/screens/Newpassword'
export const UserContext = createContext()

const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
     
    }else{
        if(!history.location.pathname.startsWith('/reset'))
             history.push('/signin')
      }
    },[])
return(
  <Switch>
    
      
      
       <Route exact path="/">
        <Home/>
       </Route>
      

       <Route exact path="/Profile">
        <Profile/>
       </Route>

       <Route path="/Signup">
        <Signup/>
       </Route>

       <Route path="/Signin">
        <Signin/>
       </Route>
       <Route path="/createpost">
        <CreatePost/>
       </Route>
       <Route path="/profile/:userid">
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
       </Switch>
  
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
      <NavBar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
