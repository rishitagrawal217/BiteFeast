import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
  const [credentials, setcredentials] = useState({email:"", password:""})
  let navigate = useNavigate()
      const handleSubmit = async(e)=> {
          e.preventDefault();
          const response = await fetch("http://localhost:5000/api/loginuser",{
              method: 'POST',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify({email: credentials.email, password: credentials.password})
          })
          const json = await response.json()
          console.log(json);
          if(!json.success){
              alert("Enter valid credentials")
          }
          if(json.success){
            localStorage.setItem("userEmail", credentials.email)
            localStorage.setItem("authToken", json.authToken)
            navigate("/");
          }
  
      }
  const onChange = (event) =>{
      setcredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    <>
    <div>
        <div className = 'container'></div>
        <form onSubmit={handleSubmit}>
      <div class="mb-3">
        <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
        <input type="text" className="form-control" name='email' value={credentials.email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onChange}/>
        <div id="emailHelp" class="form-text"></div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange}/>
      </div>
      <button type="submit" className="m-3 btn btn-success">Submit</button>
      <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
    </form> 
    </div>
    </>
  )
}
