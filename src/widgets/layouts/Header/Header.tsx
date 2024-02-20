import {ColorModeContext} from "src/shared/lib";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useGetIdentity} from "@refinedev/core";
import {HamburgerMenu, RefineThemedLayoutV2HeaderProps} from "@refinedev/mui";
import React, {useContext, useEffect} from "react";
import {usePathname} from "next/navigation";

interface IUser {
    full_name: string;
}

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
                                                                      sticky = true,
                                                                  }) => {
    const {mode, setMode} = useContext(ColorModeContext);
    const {data: user} = useGetIdentity<IUser>();
    useEffect(() => {
        window.addEventListener('message', function (event) {
            if (event.origin === 'http://localhost:3000') {
                const data = event.data;
                console.log(data);
            }
        });
        return window.addEventListener('message', function (event) {
            if (event.origin === 'http://localhost:3000') {
                const data = event.data;
                console.log(data);
            }
        });
    }, []);

    return (
        <AppBar position={sticky ? "sticky" : "relative"}>
            <Toolbar>
                <Box sx={{display: "none"}}>
                    <iframe src="http://localhost:3000" width="100" height="100" title="Paradigma"></iframe>
                </Box>
                <Stack direction="row" width="100%" alignItems="center">
                    <HamburgerMenu/>
                    <Stack
                        direction="row"
                        width="100%"
                        justifyContent="flex-end"
                        alignItems="center"
                        gap="16px"
                    >
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setMode();
                            }}
                        >
                            {mode === "dark" ? <LightModeOutlined/> : <DarkModeOutlined/>}
                        </IconButton>

                        {(user?.full_name) && (
                            <Stack
                                direction="row"
                                gap="16px"
                                alignItems="center"
                                justifyContent="center"
                            >
                                {user?.full_name && (
                                    <Typography
                                        sx={{
                                            display: {
                                                xs: "none",
                                                sm: "inline-block",
                                            },
                                        }}
                                        variant="subtitle2"
                                    >
                                        {user?.full_name}
                                    </Typography>
                                )}
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
