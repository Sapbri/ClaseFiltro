let myForm = document.querySelector(`#myForm`);

myForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  let accion = e.submitter.dataset.accion;

  switch (accion) {
    case "enviar":
      let data = Object.fromEntries(new FormData(e.target));
      let headers = new Headers({"Content-Type": "application/json"})  
      let config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }
        peticion = await fetch("http://localhost:4001/user",config);
        datos = await peticion.json();
        console.log(datos);
      break;
    case "listar":
      let peticion = await fetch("http://localhost:4001/user");
      let datos = await peticion.json();
        let tabla = document.querySelector("#myData")
        let plantilla = "";
        datos.forEach((ele,id) => {
            plantilla += `
            <tr>
                <td scope="col">${ele.id}</td>
                <td scope="col">${ele["first_name"]}</td>
                <td scope="col">${ele["last_name"]}</td>
                <td scope="col">${ele.age}</td>
                <td scope="col">${ele.address}</td>
                </tr>
            `
        });
        tabla.innerHTML = plantilla
      break;

    default:
      break;
  }

  /* let peticion = await fetch("http://localhost:4001/user")
    let datos = await peticion.json()
    console.log(datos); */
});
