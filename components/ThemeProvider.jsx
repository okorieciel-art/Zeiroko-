'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() { return useContext(ThemeContext); }

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
      if (typeof window === 'undefined') return 'dark';
          return localStorage.getItem('ZE_THEME') || (window.matchMedia && window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark');
            });

              useEffect(() => {
                  document.documentElement.setAttribute('data-theme', theme);
                      localStorage.setItem('ZE_THEME', theme);
                        }, [theme]);

                          function toggle() { setTheme(t => (t === 'dark' ? 'light' : 'dark')); }

                            return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
                            }