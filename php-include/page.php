<?php

include_once('dbconn.php');
include_once('site.php');

class Page extends DbConnection {
    function __construct($pagename) {
        parent::__construct();
        $sitename = $this->initialize($pagename) or die();
        $this->site = new Site($this->mysqli, $sitename);
    }
    private function initialize($pagename) {
        $query = "select `site`, `title` from  `pages` where  `name` = '{$pagename}' limit 0, 1";
        if($result = $this->mysqli->query($query)) {
            if ($row = $result->fetch_assoc()) {
                if (isset($row['title'])) {
                    $this->title = $row['title'];
                    return isset($row['site']) ? $row['site'] : false;
                }
            }
        }
        return false;
    }
    function __destruct() {
        parent::__destruct();
    }
    function html() {
return <<<EOPAGE
<!DOCTYPE html>
<html>
  <head>
{$this->site->html_head()}
    <title>{$this->title}</title>
  </head>
  <body style="background-color: white">
  </body>
</html>
EOPAGE;
    }
}

?>