<?php

include_once('site.php');

final class CmsPage extends Site {
    public function __construct() {
        parent::__construct();
        self::initialize() or die();
        //$this->site = new Site($this->mysqli, $sitename);
    }

    public function __destruct() {
        parent::__destruct();
    }

    private function initialize() {
        if (!$this->site_exists) {
            return true;
        }
        return false;
    }

    private function page_form() {
        $str = '';
        foreach ($_POST as $key => $value) {
            $str .= "'{$key}' = '{$value}'<br />";
        }
        return $str;
    }

    public function html() {
        $siteform = $this->site_form();
        $pageform = $this->page_form();
        return <<<EOPAGE
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/cms/images/cms.png" type="image/png">
    <title>CMS for host {$this->sitename}</title>
  </head>
  <body style="background-color: white">
    <div style="width: 90%; max-width: 1280px; margin-left: auto; margin-right: auto; background-color: linen">
{$siteform}
{$pageform}
    </div>
  </body>
</html>
EOPAGE;
    }
}

?>