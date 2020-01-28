<?php
$displayErrorDetails = true;
$addContentLengthHeader = true;
if ( IN_DEVELOPMENT ) {
    $database = [
        "host" => "localhost",
        "name" => "dearjohn",
        "charset" => "utf8",
        "user" => "enriquerene",
        "password" => "um2tres45",
        "prefix" => "brb_",
    ];
} else {
    $database = [
        "host" => "localhost",
        "name" => "dearjohn",
        "charset" => "utf8",
        "user" => "dearjohn",
        "password" => "8888",
        "prefix" => "brb_",
    ];
}

return [
    "settings" => [
        "displayErrorDetails" => $displayErrorDetails,
        "addContentLengthHeader" => $addContentLengthHeader,
        "database" => $database,
    ]
];
