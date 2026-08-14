<?php

declare(strict_types=1);

return [
    'host' => getenv('PSHT_DB_HOST') ?: '127.0.0.1',
    'database' => getenv('PSHT_DB_NAME') ?: 'profil_ukm_psht',
    'username' => getenv('PSHT_DB_USER') ?: 'root',
    'password' => getenv('PSHT_DB_PASSWORD') ?: '',
];
