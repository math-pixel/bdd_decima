<?php
ini_set('memory_limit', -1);
function dropIndex($index)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://localhost:9200/$index");
    curl_setopt($ch, CURLOPT_POST, false);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    dd($response);
}

function readDataFile($filename)
{
    $file = file_get_contents($filename);

    $f = json_decode($file);
    foreach ($f->playlists as $playlist) {
        yield $playlist;
    }
}


$types = [];
function bulkInsert(array $bag)
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://student:student@es.h91.co/_bulk");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, implode("\n", $bag) . "\n");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    $resp = curl_exec($ch);
}

$k = 0;


function listFiles()
{
    $files = glob("dataset/spotify/*.json");


// Print the entire match result

    $ret = [];
    foreach ($files as $k => $filename) {
        $ret[$filename] = "spotify";
    }
    return $ret;
}

$bag = [];
foreach (listFiles() as $filename => $index) {
    foreach (readDataFile($filename) as $row) {
        $bag[] = json_encode(["index" => ["_index" => $index, "_id" => $row->pid]]);
        $bag[] = json_encode($row);
        $k++;
        if ($k % 5000 === 0) {
            echo "bulk insert";
            bulkInsert($bag);
            $bag = [];
        }
    }

}
bulkInsert($bag);

print_r($types);
