import React, { createContext, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Force theme to always be light
    const theme: Theme = 'light';

    useEffect(() => {
        // Ensure dark class is removed
        const root = window.document.documentElement;
        root.classList.remove('dark');
        localStorage.removeItem('theme');
    }, []);

    const toggleTheme = () => {
        // No-op
        console.warn('Dark mode is disabled');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
