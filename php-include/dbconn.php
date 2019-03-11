<?php

class DbConnection {
    const DbHost = 'mysql-srv84456.hts.ru';
    const DbUser = 'srv84456_php';
    const DbPass = '0+fnyBxmpd8d';
    const DbName = 'srv84456_websimdb';

    protected function __construct() {
        $this->mysqli = @mysqli_connect(DbConnection::DbHost, DbConnection::DbUser, DbConnection::DbPass) or die();
        $this->mysqli->select_db(DbConnection::DbName) or die();
        $this->mysqli->set_charset("utf8") or die();
    }

    protected function __destruct() {
        @mysqli_close($this->mysqli);
    }

    protected $mysqli;
}

?>