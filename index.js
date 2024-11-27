const http = require('http');
const cookie = require('cookie');

// Tạo server
const server = http.createServer((req, res) => {
    // Lấy cookie từ request
    const cookies = cookie.parse(req.headers.cookie || '');

    // Kiểm tra nếu có cookie tên `username`
    if (cookies.username) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Hello, ${cookies.username}! Welcome back!`);
    } else {
        // Tạo cookie mới nếu không có
        const newCookie = cookie.serialize('username', 'Guest', {
            httpOnly: true,
            maxAge: 3600, // Cookie tồn tại 1 giờ
        });

        res.writeHead(200, {
            'Set-Cookie': newCookie,
            'Content-Type': 'text/plain',
        });
        res.end('Hello! This is your first visit. A cookie has been set.');
    }
});

// Lắng nghe trên cổng 3000
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
