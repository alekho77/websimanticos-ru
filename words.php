<?php
    $result = array('Нет данных');
    if (isset($_POST['x']) && isset($_POST['y']) && isset($_POST['z'])
        && is_numeric($_POST['x']) && is_numeric($_POST['y']) && is_numeric($_POST['z'])) {
        $x = (double)$_POST['x'];
        $y = (double)$_POST['y'];
        $z = (double)$_POST['z'];
        $cmd = 'python C:\nlp-projects\words3d.py ' . $x . ' ' . $y . ' ' . $z;
        $resp = shell_exec($cmd);
        if (isset($resp)) {
            $resp = json_decode($resp, true);
            if (json_last_error() == JSON_ERROR_NONE) {
                if (isset($resp['words'])) {
                    $result = $resp['words'];
                } else if (isset($resp['error'])) {
                    $result = array($resp['error']);
                } else {
                    $result = array('Что-то непонятное');
                }
            } else {
                $result = array('Что-то не то');
            }
        } else {
            $result = array('Что-то не так');
        }
    }
    echo json_encode($result);
?>