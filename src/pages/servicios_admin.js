import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


const Servicios = () => {

    const [Name, setname]=useState()
    const [Description, setdescription]=useState()
    const [Logo, setlogo]=useState()
    const [id, setservice_id]= useState("");
    let token = (localStorage.getItem("access_token")) ?? [];
    // POST with fetch API
    const fetchPost = async servicespost => {

        servicespost.preventDefault();


       const response = await fetch(
          'http://127.0.0.1:8000/api/v2/services/', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                Name: Name,
                Description: Description,
                Logo: Logo,
    })}
       ).then((response) => {
        if (response.ok) {
          Swal.fire('Success!', 'Servicio añadido con éxito.', 'success');
        } else {
          throw new Error('Error al enviar el post.');
        }
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  
  
      const data = await response.json();
      console.log(data);
  
    };
      


 // PUT with fetch API
 const fetchPut = async servicesput => {

    servicesput.preventDefault();

    
   const response = await fetch( 
      `http://127.0.0.1:8000/api/v2/services/${id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            Name: Name,
            Description: Description,
            Logo: Logo,
})}
   ).then((response) => {
    if (response.ok) {
      Swal.fire('Success!', 'Servicio modificado con éxito.', 'success');
    } else {
      throw new Error('Error ');
    }
  })
  .catch((error) => {
    Swal.fire('Error', error.message, 'error');
  });


  const data = await response.json();
  console.log(data);

};


const [servicios, setservicios]=useState([]); //no olvidar recibirlo en una lista

//GET
useEffect(() => {
    const fetchget= async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v2/services/`, {
          method: "GET",
          mode: "cors",
          headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${token}`,
          }});
        const data = await response.json();
        setservicios(data)
        console.log(data)
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchget();     //{servicios.results?.map((servicio) => {console.log(servicio.Name) })}    {servicio.Name}
  
  }, []);



    return    <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5"><strong> AÑADIR NUEVOS SERVICIOS</strong></h2>
        <div class="text-center mb-5 text-dark"></div>
        <div class="card my-5">
    <form class="card-body cardbody-color p-lg-5" onSubmit={fetchPost}>
            <div class="mb-3">
              <input type="text" class="form-control" id="email" aria-describedby="emailHelp"
                placeholder="Nombre"  onChange={e => setname(e.target.value)}/>
            </div>


            <div class="mb-3">
                <input type="text" class="form-control" id="number" placeholder="Prefijo/Descripcion" 
              onChange={e => setdescription(e.target.value)}/>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="number" placeholder="URL Logo" 
              onChange={e => setlogo(e.target.value)}/>
            </div>


            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Añadir</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Form para enviar datos al back end usando POST<a href="#" class="text-dark fw-bold">
                </a>
            </div>
          </form>
          </div>
    </div>
  </div>

  <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5"><strong> MODIFICAR SERVICIO</strong></h2>
        <div class="text-center mb-5 text-dark"></div>
        <div class="card my-5">
    <form class="card-body cardbody-color p-lg-5" onSubmit={fetchPut}>

    <div class="mb-3">
              <select class="form-select" aria-label="Default select example" onChange={e => setservice_id(e.target.value)}>
              <option hidden selected>Servicio</option>
              {servicios.results?.map(servicio => {  
                return <option value={servicio.Name}> {servicio.Name}
                </option>  })}
        </select>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="email" aria-describedby="emailHelp"
                placeholder="Nombre"  onChange={e => setname(e.target.value)}/>
            </div>


            <div class="mb-3">
                <input type="text" class="form-control" id="number" placeholder="Prefijo/Descripcion" 
              onChange={e => setdescription(e.target.value)}/>
            </div>

            <div class="mb-3">
              <input type="text" class="form-control" id="number" placeholder="URL Logo" 
              onChange={e => setlogo(e.target.value)}/>
            </div>


            <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Añadir</button></div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Form para modificar datos al back end usando PUT<a href="#" class="text-dark fw-bold">
                </a>
            </div>
          </form>
          </div>
    </div>
  </div>





  </div>

}

export default Servicios