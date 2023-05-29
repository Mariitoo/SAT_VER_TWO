<?php
    include '../../conexion.php';
    //obtenemos parametros
    $inserts = $_POST['datos'];
    $table = $_POST['tabla'];

    $query = '';
    $isValid = true;
    //agregar los campos correctos por cada tabla
    //los nombres d elas tablas deben estar escritos en mayusculas
    switch ($table) {
        case "A_1":
            $query = "INSERT INTO $table (Secretaria, Direccion, I_PreEst,I_PreMod,I_PreDev,I_PreRec,E_PreOrigApro,E_1A_AmpPres,E_2A_AmpPres,E_3A_AmpPres,E_Tot_Amp,E_PreModif,E_PreComp,E_PreDev,E_PreEjer,E_PreErog,E_PreCons,E_PrePorEjer,ClaveEjercicio,Elaboro,Reviso,Autorizo) VALUES $inserts";
            break;
        case "A_1_1":
            $query = "INSERT INTO $table (Secretaria,Direccion,Impuestos,Cuot_ApSS,Cont_Mej,Derechos,Productos,Aprov,Ing_Vta_Bs,Part_Apor,Tras_Sub_Oayu,Ing_Finan,ClaveEjercicio,Elaboro,Reviso,Autorizo) VALUES $inserts";
            break;
        case "A_1_2":
            $query = "INSERT INTO $table (Secretaria,Direccion,Serv_Per,Mat_Sum,Serv_Gen,Tras_Sub_Oayu,Bien_Mu_Inm_Inta,Iver_Pub,Inver_Fin_OP,Part_Apor,Dedua_Pub,ClaveEjercicio,Elaboro,Reviso,Autorizo) VALUES $inserts";
            break;

            
    }

    if ($isValid) {
		$stmt = sqlsrv_prepare($conn, $query);
		$result = sqlsrv_execute($stmt);
        $result = "true";
		//die( print_r( sqlsrv_errors(), true));
    } else {
		$result = "Conexión no se pudo establecer.";
		//die( print_r( sqlsrv_errors(), true));
    }
    echo $result;
?>