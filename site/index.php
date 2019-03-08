<?php

$this_filename = basename(__FILE__, '.php');

include_once('../php-include/page.php');

$page = new Page($this_filename);
echo $page->html();

?>