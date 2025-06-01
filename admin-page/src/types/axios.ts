import axios from "axios";



// Hàm đọc cookie
function getCookie(name: string): string | null {
    const value: string = `; ${document.cookie}`;
    const parts: string[] = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
    return null; // Trả về null nếu không tìm thấy
}


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true; // để gửi cookie (Sanctum)
axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // << Thêm dòng này
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// DÒNG NÀY RẤT QUAN TRỌNG!
axios.defaults.headers.common = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
}

// Request interceptor - Tự thêm X-XSRF-TOKEN nếu axios không làm
axios.interceptors.request.use(config => {
    // Luôn cố gắng đọc cookie mỗi lần request
    const token = getCookie('XSRF-TOKEN');

    console.log("Checking for XSRF-TOKEN. Found:", token ? 'Yes' : 'No'); // Log để xem có đọc được không

    if (token) {
        // Axios nên tự làm việc này, nhưng chúng ta sẽ làm lại để chắc chắn
        // DecodeURIComponent là quan trọng vì cookie thường được encode
        config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
        console.log("Setting X-XSRF-TOKEN header manually.");
    } else {
        console.warn("XSRF-TOKEN cookie not found by getCookie function!");
    }

    console.log("Headers before sending:", config.headers);

    return config;
}, error => {
    return Promise.reject(error);
});

// Response interceptor - Xử lý lỗi 401
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("Axios Interceptor: 401 - Token hết hạn hoặc không hợp lệ");

            // Lấy URL gốc của yêu cầu gây ra lỗi
            const originalRequestUrl = error.config.url;

            // Các endpoint kiểm tra auth mà ta không muốn redirect tự động
            const authCheckEndpoints = ['/api/me', '/api/role']; // Thêm các endpoint khác nếu có

            if (authCheckEndpoints.includes(originalRequestUrl)) {
                // Nếu lỗi 401 từ các endpoint này, không redirect toàn cục.
                // Component gọi API sẽ tự xử lý (ToDoProvider đã làm điều này).
                console.log("Axios Interceptor: 401 trên endpoint kiểm tra auth, không redirect toàn cục.");
            } else if (!window.location.pathname.includes('/login')) {
                // Đối với các lỗi 401 khác, redirect về trang login
                console.log("Axios Interceptor: 401 trên endpoint khác, redirect về /login.");
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axios;