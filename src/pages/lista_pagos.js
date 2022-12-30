
import { useState, useEffect } from 'react';
import "./lista_pagos.css";


 function Lista() {

    let token = localStorage.getItem("access_token")
  
    const [services, setservices] = useState([]); //guardamos la data

    useEffect(() => {
    const fetchget= async () => {
    
    try {
    const response = await fetch("http://127.0.0.1:8000/api/v2/payment/", {
	method: "GET",
	headers: {
			"Content-type": "application/json",
          Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
    setservices(data)
    console.log(data);
        }  

    catch (error) {
		console.log(error);
    }
        }

    fetchget();

}, []);

    return (
      <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5"><strong> PAGOS REALIZADOS </strong></h2>
        <div class="text-center mb-5 text-dark"></div>
        <div class="card my-5"></div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="text-center">Servicio</th>						
                        <th class="text-center">Fecha de Pago</th>
                        <th class="text-center">Monto</th>
                    </tr>
                </thead>
                <tbody>
                  
                {services.results?.map((service) => {

                  if (service.ExpirationDate < service.PaymentDate) {
                    return  <tr>
                        <td class= 'table-data'>
                        <p class="avatar rounded-circle mr-3">
                          <img alt="Logo" src="#"/><strong>{service.service_id.toUpperCase()} </strong>
                        </p>
                        </td>   
                        <td class= 'table-data'>{service.PaymentDate}</td>                        
                        <td class= 'table-data'>{service.Amount}</td>
                    </tr>
                     ;
                }
                

                else {}
              }
 
                )
              
                  }
                </tbody>
            </table>
            </div>

</div>
<br></br>
<br></br>
<br></br>
<br></br>

<div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5"><strong> PAGOS VENCIDOS </strong></h2>
        <div class="text-center mb-5 text-dark"></div>
        <div class="card my-5"></div>
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th class="text-center">Servicio</th>						
                        <th class="text-center">Fecha de Pago</th>
                        <th class="text-center">Monto</th>
                        <th class="text-center">Penalidad</th>
                    </tr>
                </thead>
                <tbody>
                  
                {services.results?.map((service) => {

                  if (service.ExpirationDate > service.PaymentDate) {
                    return  <tr>
                        <td class= 'table-data'>
                        <p class="avatar rounded-circle mr-3">
                          <img alt="Logo" src="#"/><strong>{service.service_id.toUpperCase()} </strong>
                        </p>
                        </td>   
                        <td class= 'table-data'>{service.PaymentDate}</td>                        
                        <td class= 'table-data'>{service.Amount}</td>
                        <td class= 'table-data'>{service.Amount}</td>
                    </tr>
                     ;
                }
                

                else {}
              }
 
                )
              
                  }
                </tbody>
            </table>
            </div>

</div>






</div>

     )
}


export default Lista ;









