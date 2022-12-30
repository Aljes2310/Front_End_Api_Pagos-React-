import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

    const [username, setusername]= useState("");
    const [email, setemail]= useState("");
    const [password, setpassword]= useState("");
    const navigate = useNavigate()

    const submit = async e => {
        e.preventDefault();

        await fetch("http://127.0.0.1:8000/users/signup/", { //no olvidar configurar el cors en el backend
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password,
              email: email
            })
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            navigate("/login");
          })
          .catch(error => {
            console.error(error);
          });

    }


        
    return (
      <div class="container h-100">
      <div class="row h-100 justify-content-center align-items-center">
          <div class="col-10 col-md-8 col-lg-6">
              <div class="card border-info mb-3" >
                <div class="card-body">
                  <form onSubmit={submit}>
                    <h1 class='text-center'>Register</h1>
                    <p class="description"></p>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="text" class="form-control username" id="email" placeholder="Email..." 
                        onChange={e => setemail(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="password">Username:</label>
                        <input type="text" class="form-control username" id="Username" 
                        placeholder="Username..."  onChange={e => setusername(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control password" id="password" 
                        placeholder="Password..." onChange={e => setpassword(e.target.value)}/>
                    </div>
                    <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-primary btn-customized mt-4 text-center" >Sign up</button>
                </div>
                </form>
                </div>
      </div>
    </div>
    </div>
  </div>
    );
  }
  
  export default Register;