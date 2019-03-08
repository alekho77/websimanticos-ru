<?php

class Site {
    function __construct($mysqli, $sitename) {
        $this->initialize($mysqli, $sitename) or die();
    }
    private function initialize($mysqli, $sitename) {
        $query = "select `icon` from  `sites` where  `name` = '{$sitename}' limit 0, 1";
        if ($result = $mysqli->query($query)) {
            if ($row = $result->fetch_assoc()) {
                if (isset($row['icon'])) {
                    $this->icon = json_decode($row['icon'], true) or die();
                    return isset($this->icon['href']) && isset($this->icon['type']);
                }
            }
        }
        return false;
    }
    function html_head() {
return <<<EOHEAD
    <link rel="shortcut icon" href="{$this->icon['href']}" type="{$this->icon['type']}">
EOHEAD;
    }
}

?>