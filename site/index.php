<?php
    $this_filename = basename(__FILE__, '.php');

    class Page {
        function __construct($page_name) {
            echo $page_name;
        }
    }

    $page = new Page($this_filename);
?>