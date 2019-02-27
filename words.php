<?php
    $result = '[]';
    if (isset($_POST['count']) && is_numeric($_POST['count'])) {
        $count = (int)$_POST['count'] + 1;
        $filename = getcwd() . '/words/words3d-' . $count . '.json';
        if (file_exists($filename)) {
            $result = file_get_contents($filename);
        }
    }
    echo $result;
?>