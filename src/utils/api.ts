export const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'https://pragyaan.navrobotec.com';
const API_BASE_URL = import.meta.env.VITE_API_URL || `${SERVER_URL}/api`;
export const GOOGLE_LOGIN_URL = `${SERVER_URL}/auth/login/google-oauth2/`;

export const getCookie = (name: string) => {
    let cookieValue = null;
    if (typeof document !== 'undefined' && document.cookie && document.cookie !== '') {
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
    // Standardize URL: prefix with API_BASE_URL unless it's a full URL
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    const headers: HeadersInit = {
        ...options.headers,
    };

    // Only set Content-Type if not sending FormData
    if (!(options.body instanceof FormData)) {
        (headers as any)['Content-Type'] = 'application/json';
    }

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

    if (response.status === 204) {
        return null;
    }

    return response.json();
};
