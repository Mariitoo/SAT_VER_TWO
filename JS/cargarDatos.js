$(document).ready(function () {
    // loader(true);
    function cargaDatos(inserts, table) {
        $.ajax({
            data: {
                datos: inserts,
                tabla: table
            },
            url: "../../PHP/PAGES/CARGARDATOS/cargaExcel.php",
            type: "post",
            async: true,
            beforeSend: function () {
                console.log("enviando...");
            },
            success: function (response) {
                if (response == "true") {
                    alert("carga de datos completada correctamente");
                } else {
                    alert("Error al intentar cargar los datos");
                    console.log(response);
                }
            },
            error: function (error) {
                console.log(error);
                // alert(error);
            }
        }).always(function () {
            // loader(false);
        });
    }

    $("#formCargaDatos").submit(function (ev) {
        ev.preventDefault();
        //loader(true);
        // Obtener el archivo seleccionado
        var file = document.querySelector("#file").files[0];
        if (file === undefined) {
            alert("No se ha seleccionado un archivo, por favor carga un documento.");
        } else {
            //obtenemos el nombre del archivo junto a su extension y 
            //separamos por punto(.) para obtener la extension del archivo
            var type = file.name.split('.'); //file.name es el nombre del archivo
            //validamos que el archivo sea solamente xls o xlsx (si no se requiere, se puede quitar esta validacion)
            if (type[type.length - 1] !== 'xlsx' && type[type.length - 1] !== 'xls') {
                alert('Seleccione solo el archivo de Excel para importar');
            } else {
                const reader = new FileReader();
                reader.readAsBinaryString(file);
                reader.onload = (e) => {
                    const data = e.target.result;
                    const zzexcel = window.XLS.read(data, {
                        type: 'binary'
                    });
                    // obtenemos las hojas del documento y lo guardamos en el array
                    const result = [];
                    //for (let i = 0; i < zzexcel.SheetNames.length; i++) {
						//nombre de la hojas
						//if(zzexcel.SheetNames[i]=='a1'){
                        //const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[i]]);
                        const newData = window.XLS.utils.sheet_to_json(zzexcel.Sheets[zzexcel.SheetNames[0]]);
                        result.push(...newData);
						//}
                    //}
                    //creamos un string con la forma de los inserts de la base de datos
                    /**
                     * el filtro data hace referencia a obtener solo los campos que contengan valores 
                     * los campos examen, valor y seccion son los encabezados del docuemtno excel, de tal manera 
                     * que la fila 1 del excel debe ser el nombre de la columna
                     * ejemplo:
                     * examen | valor | seccion
                     * test   | 450   | test
                     * test   | 434   | test
                     * test   | 004   | test
                     * test   | 454   | test
                     * test   | 104   | test
                     */
					var nombretabla = $("#servicio").val();//este es el nombre de la tabla
                    const datos = result.filter(data => data.Secretaria !== "");

                    let inserts = "";

					switch(nombretabla){
						case 'A_1':
						if (datos.length > 0) {
							
							datos.forEach(dato => {
								inserts += `('${dato.Secretaria}', '${dato.Direccion}', '${dato.IPreEst}', '${dato.I_PreMod}', '${dato.I_PreDev}', '${dato.I_PreRec}', '${dato.E_PreOrigApro}', '${dato.E_1A_AmpPres}', '${dato.E_2A_AmpPres}', '${dato.E_3A_AmpPres}', '${dato.E_Tot_Amp}', '${dato.E_PreModif}', '${dato.E_PreComp}', '${dato.E_PreDev}', '${dato.E_PreEjer}', '${dato.E_PreErog}', '${dato.E_PreCons}', '${dato.E_PrePorEjer}', '${dato.ClaveEjercicio}', '${dato.Elaboró}', '${dato.Revisó}', '${dato.Autorizó}'),`;
							});
							//slice elimina la ultimo valor de la cadena (en este caso la coma[,])
							//cargaDatos(inserts.slice(0, -1), file.name.replace('.' + type[type.length - 1], '').toUpperCase());
							
						} else {
							// loader(false);
							alert("No se encontraron regristros por cargar");
						}
								break;
								
					/*	case 'A_1_1':
						if (datos.length > 0) {
													let inserts = "";
													datos.forEach(dato => {
														inserts += `('${dato.secretaria}', '${dato.direccion}', '${dato.seccion}'),`;
													});
													//slice elimina la ultimo valor de la cadena (en este caso la coma[,])
													//cargaDatos(inserts.slice(0, -1), file.name.replace('.' + type[type.length - 1], '').toUpperCase());
													cargaDatos(inserts.slice(0, -1), nombretabla);
												} else {
													// loader(false);
													alert("No se encontraron regristros por cargar");
												}
						break;		*/						
					}
                    cargaDatos(inserts.slice(0, -1), nombretabla);
                    //console.log('result', datos);
                }
            }
        }
    });
});