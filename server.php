<?php
$server = new Swoole\WebSocket\Server("0.0.0.0", 8080);
$users = [];

$server->on("open", function ($server, $request) use (&$users) {
    $users[$request->fd] = true;
    broadcastCount($server, count($users));
});

$server->on("message", function ($server, $frame) {
    $data = json_decode($frame->data, true);
    if ($data['type'] === 'message') {
        foreach ($server->connections as $fd) {
            $server->push($fd, json_encode(["type" => "message", "username" => $data["username"], "message" => $data["message"]]));
        }
    }
});

$server->on("close", function ($server, $fd) use (&$users) {
    unset($users[$fd]);
    broadcastCount($server, count($users));
});

function broadcastCount($server, $count) {
    foreach ($server->connections as $fd) {
        $server->push($fd, json_encode(["type" => "count", "count" => $count]));
    }
}

$server->start();
