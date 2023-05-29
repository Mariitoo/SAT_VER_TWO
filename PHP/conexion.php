<?php
		$serverName = "localhost";
		$connectionInfo = array( "Database"=>"ER", "UID"=>"sa", "PWD"=>"Passw0rd");
		$conn = sqlsrv_connect( $serverName, $connectionInfo);
?>