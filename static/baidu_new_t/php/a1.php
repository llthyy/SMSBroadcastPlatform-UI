<?php
$url='http://api0.map.bdimg.com/getmodules?v=2.0&t=20140707&mod='.$_POST['m'];
$ch=curl_init($url);
curl_setopt($ch,CURLOPT_HEADER,0);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36');
$curl_data=curl_exec($ch);
file_put_contents('./baidu_3/'.$_POST['m'].'.js',$curl_data);
//foreach ($data as $k=>$v){
//    $new_one=$k.'_'.$v;
////    echo $new_one;
//    $url.=$new_one;
////    echo $url;
////    die;
//
//}

//$data=json_decode($data,true);
//print_r($data);
