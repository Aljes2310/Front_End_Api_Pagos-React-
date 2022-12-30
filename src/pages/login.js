import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import "./login.css";

function Login() {

  const [email, setemail]= useState("");
  const [password, setpassword]= useState("");
  const navigate = useNavigate()

  const submit= async GetToken => { 

    GetToken.preventDefault();

		try {
			const response = await fetch("http://127.0.0.1:8000/users/token/", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
          email: email,
          password: password
        }),
			});
			const data = await response.json();

			if ("access" in data) {
				console.log(data);
        // guardando los token en localstorage
        localStorage.setItem('access_token', data["access"]);
        localStorage.setItem('refresh_token', data["refresh"]);
        localStorage.setItem('email', JSON.stringify(email)); //para guardarlo como string los values

        navigate("/lista");
			}



		} 
    
    catch (error) {
			console.log(error);
		}
    

    }

    


  return (
<div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5"><strong> LOGIN</strong></h2>
        <div class="text-center mb-5 text-dark"></div>
        <div class="card my-5">

          <form class="card-body cardbody-color p-lg-5" onSubmit={submit}>

            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="email" aria-describedby="emailHelp"
                placeholder="Email" onChange={e => setemail(e.target.value)}/>
            </div>
            <div class="mb-3">
              <input type="password" class="form-control" id="password" placeholder="Password" onChange={e => setpassword(e.target.value)}/>
            </div>
            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Login para acceder a Api Pagos<a href="#" class="text-dark fw-bold">
                </a>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
  );
}

export default Login;
