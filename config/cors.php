<?php

// config/cors.php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // Không dùng ['*'] khi supports_credentials = true
    'allowed_origins' => [
        'http://localhost:5173',
        'http://localhost:5174',
        // nếu lúc deploy xài domain khác thì thêm vào đây
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];

