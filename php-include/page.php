<?php

include_once('site.php');

final class Page extends Site {
    public function __construct($pagename) {
        parent::__construct();
        //$sitename = $this->initialize($pagename) or die();
        //$this->site = new Site($this->mysqli, $sitename);
    }

    public function __destruct() {
        parent::__destruct();
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

    public function html() {
        return <<<EOPAGE
<!DOCTYPE html>
<html>
  <head>
{parent::html()}
    <title>{$this->title}</title>
  </head>
  <body style="background-color: white">
  </body>
</html>
EOPAGE;
    }
}

?>