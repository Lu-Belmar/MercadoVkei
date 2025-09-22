

document.getElementById("nombre").addEventListener("keyup",()=>{
    var cantidad = document.getElementById("nombre").value.length
     if (cantidad<3 || cantidad>10){
        document.getElementById("pNombre").innerHTML = "Debe tener entre 3 y 10 carácteres"
        document.getElementById("pNombre").style.color = "red"
        document.getElementById("pNombre").hidden = false
        document.getElementById("nombre").classList.add("is-invalid")
        document.getElementById("nombre").classList.remove("is-valid")
        
    }else{

        document.getElementById("pNombre").style.color = "green"
        document.getElementById("pNombre").hidden = true
        document.getElementById("nombre").classList.add("is-valid")
        document.getElementById("nombre").classList.remove("is-invalid")
        nn = true
    }    
    if(cantidad == 0){
        document.getElementById("nombre").classList.remove("is-valid")
        document.getElementById("nombre").classList.remove("is-invalid")
        document.getElementById("pNombre").hidden = true
    }  } )

    document.getElementById("contraseña").addEventListener("keyup",()=>{
    var cantidad = document.getElementById("contraseña").value.length
     if (cantidad <4 || cantidad >10){
        document.getElementById("pcontraseña").innerHTML = "Debe tener entre 4 y 10 digitos"
        document.getElementById("pcontraseña").style.color = "red"
        document.getElementById("pcontraseña").hidden = false
        document.getElementById("contraseña").classList.add("is-invalid")
        document.getElementById("contraseña").classList.remove("is-valid")
        
    }else{

        document.getElementById("pcontraseña").style.color = "green"
        document.getElementById("contraseña").classList.add("is-valid")
        document.getElementById("contraseña").classList.remove("is-invalid")
        document.getElementById("pcontraseña").hidden = true
    }
    if(cantidad == 0){
        document.getElementById("contraseña").classList.remove("is-valid")
        document.getElementById("contraseña").classList.remove("is-invalid")
        document.getElementById("pcontraseña").hidden = true
    } 
})


document.getElementById("correo").addEventListener("keyup", () => {
    const email = document.getElementById("correo").value.trim();
    const regexDuocuc = /@duocuc\.cl$/;
    const regexProfesor = /@profesor\.duoc\.cl$/;
    const regexGmail = /@gmail\.com$/;

    if (
        !regexDuocuc.test(email) &&
        !regexProfesor.test(email) &&
        !regexGmail.test(email)
    ) {
        document.getElementById("pcorreo").innerHTML = "Debe ser @duocuc.cl o @gmail.com o @profesor.duoc.cl";
        document.getElementById("pcorreo").style.color = "red";
                document.getElementById("correo").classList.add("is-invalid")
        document.getElementById("correo").classList.remove("is-valid")
        document.getElementById("pcorreo").hidden = false;
    } else {
        document.getElementById("pcorreo").hidden = true;
                document.getElementById("correo").classList.add("is-valid")
        document.getElementById("correo").classList.remove("is-invalid")
    }
});


