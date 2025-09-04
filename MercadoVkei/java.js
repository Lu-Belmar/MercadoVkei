function saludar(){
    console.log("hola mundo")
}

document.getElementById("nombre").addEventListener("keyup",()=>{
    var cantidad = document.getElementById("nombre").value.length
     if (cantidad<3 || cantidad>10){
        document.getElementById("pNombre").innerHTML = "Debe tener entre 3 y 10 carácteres"
        document.getElementById("pNombre").style.color = "red"
        document.getElementById("pNombre").hidden = false
        document.getElementById("nombre").classList.add("is-invalid")
        document.getElementById("nombre").classList.remove("is-valid")
        saludar()
    }else{

        document.getElementById("pNombre").style.color = "green"
        document.getElementById("pNombre").hidden = true
        document.getElementById("nombre").classList.add("is-valid")
        document.getElementById("nombre").classList.remove("is-invalid")
    }    
    if(cantidad == 0){
        document.getElementById("nombre").classList.remove("is-valid")
        document.getElementById("nombre").classList.remove("is-invalid")
        document.getElementById("pNombre").hidden = true
    }  } )

    document.getElementById("rut").addEventListener("keyup",()=>{
    var cantidad = document.getElementById("rut").value.length
     if (cantidad != 9){
        document.getElementById("pRut").innerHTML = "Debe tener entre 9 digitos"
        document.getElementById("pRut").style.color = "red"
        document.getElementById("pRut").hidden = false
        //corregir mas adelante
        document.getElementById("rut").classList.add("is-invalid")
        document.getElementById("rut").classList.remove("is-valid")
        saludar()
    }else{

        document.getElementById("pRut").style.color = "green"
        document.getElementById("rut").classList.add("is-valid")
        document.getElementById("rut").classList.remove("is-invalid")
        document.getElementById("pRut").hidden = true
    }
    if(cantidad == 0){
        document.getElementById("rut").classList.remove("is-valid")
        document.getElementById("rut").classList.remove("is-invalid")
        document.getElementById("pRut").hidden = true
    } 
})




