<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(int $status, bool $ok): void
{
    http_response_code($status);
    echo json_encode(['ok' => $ok], JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    reply(405, false);
}

$raw = file_get_contents('php://input');
$data = is_string($raw) && $raw !== '' ? json_decode($raw, true) : $_POST;
if (!is_array($data)) {
    reply(400, false);
}

$website = trim((string) ($data['website'] ?? ''));
if ($website !== '') {
    reply(200, true);
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$company = trim((string) ($data['company'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    reply(422, false);
}

if (preg_match("/[\r\n]/", $name) || preg_match("/[\r\n]/", $email) || preg_match("/[\r\n]/", $company)) {
    reply(400, false);
}

$to = 'sasa@ztechprime.com';
$subject = 'Project inquiry — ' . $name;
$body = "Name: {$name}\nEmail: {$email}\nCompany: " . ($company !== '' ? $company : '—') . "\n\n{$message}\n";
$encodedName = '=?UTF-8?B?' . base64_encode($name) . '?=';
$headers = [
    'From: ZTech Prime <no-reply@ztechprime.com>',
    'Reply-To: ' . $encodedName . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: ZTechPrime-Contact',
];

$sent = mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
if (!$sent) {
    reply(502, false);
}

reply(200, true);
