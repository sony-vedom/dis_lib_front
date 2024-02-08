import {ThemeProvider} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {RefineThemes} from "@refinedev/mui";
import {parseCookies, setCookie} from "nookies";
import React, {createContext, PropsWithChildren, useEffect, useState,} from "react";
import {ColorModeContextType} from "./types";

export const ColorModeContext = createContext<ColorModeContextType>(
    {} as ColorModeContextType
);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({
                                                                          children,
                                                                      }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [mode, setMode] = useState("light");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const systemTheme = useMediaQuery(`(prefers-color-scheme: dark)`);

    useEffect(() => {
        if (isMounted) {
            setMode(parseCookies()["theme"] || (systemTheme ? "dark" : "light"));
        }
    }, [isMounted, systemTheme]);

    const toggleTheme = () => {
        const nextTheme = mode === "light" ? "dark" : "light";

        setMode(nextTheme);
        setCookie(null, "theme", nextTheme);
    };

    const scrollbarBody = {
        '*::-webkit-scrollbar': {
            width: '5px',
            height: '5px'
        },
        '*::-webkit-scrollbar-track': {
            background: "#c3e3b6",
            WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#689F38',
            outline: "none"
        },
        scrollbarColor: "#689F38",
        scrollbarWidth: "thin",
    }

    return (
        <ColorModeContext.Provider
            value={{
                setMode: toggleTheme,
                mode,
            }}
        >
            <ThemeProvider
                theme={mode === "light" ? {
                    ...RefineThemes.Green,
                    components: {
                        MuiCssBaseline: {
                            styleOverrides: {
                                body: {
                                  ...scrollbarBody,
                                }
                            }
                        }
                    }
                } : {
                    ...RefineThemes.GreenDark,
                    components: {
                        MuiCssBaseline: {
                            styleOverrides: {
                                body: {
                                    ...scrollbarBody,
                                    '*::-webkit-scrollbar-track': {
                                        background: "#547c3f",
                                        WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                    },
                                }
                            }
                        }
                    }
                }}
            >
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
