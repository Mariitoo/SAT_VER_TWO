$(document).ready(function () {
    $("#formObtenerDatos").submit(function (ev) {
        ev.preventDefault();
        obtenerDatos();
    });
});

function obtenerDatos() {
    //aqui podemos buscar el nombre de la tabla
    var tabla;
    switch ($("#reporte").val()) {
        case "1":
            tabla = 'NOMBRE DE LA TABLA';
            break;
        case "2":
            tabla = 'NOMBRE DE LA TABLA';
            break;
        default: break;
    }

    $.ajax({
        data: {
            reporte: tabla
        },
        url: "../../PHP/PAGES/OBTENERDATOS/obtenerDatos.php",
        type: "post",
        async: true,
        beforeSend: function () {
            // loader(true);
        },
        success: function (response) {
            //validamos respuesta del servidor
            switch (response.startsWith) {
                case "null":
                    alert("No hay datos por mostrar");
                    break;
                case "Connection failed":
                    alert("Ha ocurrio un error");
                    break;
                default:
                    var json_response = JSON.parse(response);
                    if (json_response.length > 0) {
                        // json_response.forEach(paciente => {
                        //     options += `<option value="${paciente.ID}">${paciente.Nombre} ${paciente.Apellidos}</option>`;
                        // });
                        ProcesarDatos(json_response);
                    }
                    break;
            }
        },
        error: function (error) {
            console.log(error);
        }
    }).always(function () {
        // loader(false);
    });
}

function ProcesarDatos(datos) {
    //aqui va todo l odemas a hacer
}