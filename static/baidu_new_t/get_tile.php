<?php
$type=empty($_GET['action_name'])?$_POST['action_type']:$_GET['action_name'];
switch ($type){
    case 'get':
        $id='';
        break;
    case 'save':

        break;
    case 'tiles':
        $data=$_POST['p'];
        $type=$_POST['map_type'];
        $url='http://mt0.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&scale=2&x='.$data['x'].'&y='.$data['y'].'&z='.$data['z'];
        break;
}

function httpCurl($url, $type = 'get', $data = '')
{
    $url = trim($url);
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_TIMEOUT, 3);
    curl_setopt($ch,CURLOPT_REFERER,'https://www.baidu.com');
    curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36');
    if ($type == 'post') {
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }

    if(strpos($url,'https')===0){
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
    }

    $curl_data = curl_exec($ch);
    if (curl_errno($ch)) {
        $this->setError(curl_error($ch));
        return false;
    }
    curl_close($ch);
    return $curl_data;
}