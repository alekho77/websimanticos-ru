<?php

class DbConnection {
    const DbHost = 'mysql-srv84456.hts.ru';
    const DbUser = 'srv84456_php';
    const DbPass = '0+fnyBxmpd8d';
    function __construct() {
        $this->dblink = @mysqli_connect(DbConnection::DbHost, DbConnection::DbUser, DbConnection::DbPass) or die();
    }
    function __destruct() {
        @mysqli_close($this->dblink);
    }
}

?>