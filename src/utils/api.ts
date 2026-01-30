export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';
const API_BASE_URL = import.meta.env.VITE_API_URL || `${SERVER_URL}/api/accounts`;
export const GOOGLE_LOGIN_URL = `${SERVER_URL}/auth/login/google-oauth2/`;

export const getCookie = (name: string) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
        (headers as any)['X-CSRFToken'] = csrfToken;
    }

    const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || errorData.error || errorData.detail || `API error: ${response.status}`);
    }

    return response.json();
};
