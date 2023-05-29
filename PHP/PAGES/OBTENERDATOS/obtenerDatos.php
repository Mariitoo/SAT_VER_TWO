<?php
include '../../conexion.php';
//este parametro es el nombre de la tabla
$reporte = $_POST['reporte'];

$result;
$query = "SELECT * FROM" . $reporte;

$sel = $con->query($query);
if ($sel) {
    $row_cnt = $sel->num_rows;
    if ($row_cnt > 0) {
        while ($row = mysqli_fetch_assoc($sel)) {
            //colocar las columnas de la tabla
            $id = $row['id'];
            $examen = $row['Examen'];
            $valor = $row['Valor'];
            $idpaciente = $row['IdPaciente'];
            $servicio = $row['Servicio'];
            $cama = $row['Cama'];
            $fecha = $row['Fecha'];
            $nombre = $row['Nombre'];
            $apellido = $row['Apellidos'];

            //colocar un nombre para mostrar y el valor de la columna
            $jsonArray[] = array(
                'ID' => $id,
                'Examen' => $examen,
                'Valor' => $valor,
                'IdPaciente' => $idpaciente,
                'Paciente' => $nombre . ' ' . $apellido,
                'Servicio' => $servicio,
                'Cama' => $cama,
                'Fecha' => $fecha
            );

            $result = json_encode($jsonArray);
        }
    } else {
        $result = "null";
    }
} else {
    $result = die("Connection failed: " . mysqli_connect_error());
}

echo $result;
mysqli_close($con);
