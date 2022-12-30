import { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom";
import "./login.css";
import Swal from "sweetalert2";

function Añadir_Pagos() {

  const tabla_user={"aljes@gmail.com": 1 , 
            "probando@gmail.com": 2 ,
          "testuser@gmail.com": 3}

  const [ExpirationDate, setExpirationDate]= useState("");
  const [service_name, setservice_name]= useState("");
  const [Amount, setAmount]= useState("");
  const navigate = useNavigate()
  const [servicios, setservicios]=useState([]); //no olvidar recibirlo en una lista


  let token = (localStorage.getItem("access_token")) ?? [];
  let email = JSON.parse(localStorage.getItem("email")) ?? [];
  const user_id=tabla_user[email]

  //POST
  const submit= async GetToken => { 

    GetToken.preventDefault();

			const response = await fetch("http://127.0.0.1:8000/api/v2/payment/", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
                    ExpirationDate: ExpirationDate,
                    service_id: service_name,
                    Amount:Amount,
                    user_id: user_id,
        }),
			}
      ).then((response) => {
        if (response.ok) {
          Swal.fire('Success!', 'Pago añadido con éxito.', 'success');
        } else {
          throw new Error('Error al enviar el post.');
        }
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  };


//GET
useEffect(() => {
  const fetchget= async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v2/services/`);
      const data = await response.json();
      setservicios(data)
      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }

  fetchget();     //{servicios.results?.map((servicio) => {console.log(servicio.Name) })}    {servicio.Name}

}, []);


  return ( 
    <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5"><strong> AÑADIR NUEVOS PAGOS</strong></h2>
        <div class="text-center mb-5 text-dark"></div>
        <div class="card my-5">
    <form class="card-body cardbody-color p-lg-5" onSubmit={submit}>
            <div class="mb-3">
                <label>Fecha de Vencimiento</label>
              <input type="datetime-local" class="form-control" id="email" aria-describedby="emailHelp"
                placeholder="Fecha de Vencimiento"  onChange={e => setExpirationDate(e.target.value)}/>
            </div>


      
            <div class="mb-3">
              <select class="form-select" aria-label="Default select example" onChange={e => setservice_name(e.target.value)}>
              <option hidden selected>Servicio</option>
              {servicios.results?.map(servicio => {  
                return <option value={servicio.Name}> {servicio.Name}
                </option>  })}
        </select>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="number" placeholder="Monto" 
              onChange={e => setAmount(e.target.value)}/>
            </div>


            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Añadir</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Form para enviar datos al back end usando POST<a href="#" class="text-dark fw-bold">
                </a>
            </div>
          </form>
          </div>
    </div>
  </div>
  </div>
  );
}

export default Añadir_Pagos