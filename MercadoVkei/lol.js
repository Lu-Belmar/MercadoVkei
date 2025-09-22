document.getElementById("lol").addEventListener("click", () => {
    var cantidad1 = document.getElementById("correo").value.length;
    var cantidad2 = document.getElementById("contraseña").value.length;
    if (cantidad1 == 0 || cantidad2 == 0) {
        document.getElementById("texto").style.color = "red";
        document.getElementById("texto").innerHTML = "Falta rellenar un campo";
        document.getElementById("texto").hidden = false;
    } else {
        document.getElementById("texto").innerHTML = "Datos válidos";
        document.getElementById("texto").style.color = "green";
        document.getElementById("texto").hidden = false;
    }
});