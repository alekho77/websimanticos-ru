<?php

include_once('dbconn.php');

class Site extends DbConnection {
    protected function __construct() {
        parent::__construct();
        $this->sitename = $_SERVER['HTTP_HOST'];
        self::initialize() or die();
    }

    protected function __destruct() {
        parent::__destruct();
    }

    private function initialize() {
        $query = "select `icon` from  `sites` where  `name` = '{$this->sitename}' limit 0, 1";
        if ($result = $this->mysqli->query($query)) {
            if ($row = $result->fetch_assoc()) {
                $this->site_exists = true;
                if (isset($row['icon'])) {
                    $this->icon = json_decode($row['icon'], true) or die();
                    return isset($this->icon['href']) && isset($this->icon['type']);
                }
            } else {
                return true;
            }
        }
        return false;
    }

    protected function html_headers() {
        return <<<EOHEAD
    <link rel="shortcut icon" href="{$this->icon['href']}" type="{$this->icon['type']}" />
EOHEAD;
    }

    protected function site_form() {
        return <<<EOFORM
        <div>
            <img src="" alt="shortcut icon" style="vertical-align: middle">
        </div>
EOFORM;
    }

    protected $site_exists = false; 
    protected $sitename;
    private $icon = null; // assoc array of 'href' and 'type' value pairs.
}

?>