<?php
$connection = $this->database;
$sql = "SELECT account_personId,account_id,person_uf FROM oag_accounts INNER JOIN oag_people ON account_personId = person_id WHERE account_scope = 'provider' AND account_parentId is NULL";
$x = $connection->prepare($sql);
$x->execute();
$providers = $x->fetchAll();
var_dump($providers[0]);
$array = [ '16', '17', '19', '20', '21', '35', '92' ];
for ($i = 0; $i < count($array); $i++)
{
   $sql = "SELECT account_id, person_uf FROM oag_accounts INNER JOIN oag_people ON account_personId = person_id WHERE account_scope = 'employee' AND account_parentId = $array[$i]";
    $x = $connection->prepare($sql);
    $x->execute();
    $y[$i] = $x->fetchAll();
    var_dump($y[$i]);
}
for ($i = 0; $i < count(); $i++)
{

    
}


























?>