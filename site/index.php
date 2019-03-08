<?php
    $this_filename = basename(__FILE__, '.php');

    include_once('../php-include/dbconn.php');

    class Page extends DbConnection {
        function __construct($page_name) {
            parent::__construct();
            echo $page_name;
        }
        function __destruct() {
            parent::__destruct();
        }
    }

    $page = new Page($this_filename);
    //phpinfo();
?>