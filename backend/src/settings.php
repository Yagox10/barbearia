<?php
$displayErrorDetails = true;
$addContentLengthHeader = true;
$database = [
    "host" => "localhost",
    "name" => "dearjohn",
    "charset" => "utf8",
    "user" => "dearjohn",
    "password" => "8888",
    "prefix" => "brb_",
];

return [
    "settings" => [
        "displayErrorDetails" => $displayErrorDetails,
        "addContentLengthHeader" => $addContentLengthHeader,
        "database" => $database,
    ]
];
