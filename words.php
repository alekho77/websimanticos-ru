<?php
    $result = '[]';
    if (isset($_POST['type']) && isset($_POST['count']) && is_string($_POST['type']) && is_numeric($_POST['count'])) {
        $type = (string)$_POST['type'];
        $count = (int)$_POST['count'] + 1;
        $types = ['words', 'sites'];
        if (in_array($type, $types)) {
            $filename = getcwd() . '/' . $type . '/' . $type .'3d-' . $count . '.json';
            if (file_exists($filename)) {
                $result = file_get_contents($filename);
            }
        }
    }
    echo $result;
?>