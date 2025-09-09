<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$userMessage = $data["message"];

$apiKey = "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";

$ch = curl_init("https://api.openai.com/v1/chat/completions");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer $apiKey"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    "model" => "gpt-4o-mini",
    "messages" => [
        ["role" => "system", "content" => "You are a helpful AI assistant."],
        ["role" => "user", "content" => $userMessage]
    ]
]));

$response = curl_exec($ch);
curl_close($ch);

$result = json_decode($response, true);
$reply = $result["choices"][0]["message"]["content"];

echo json_encode(["reply" => $reply]);
