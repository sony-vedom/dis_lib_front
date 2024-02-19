import {ColorModeContext} from "src/shared/lib";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {useGetIdentity} from "@refinedev/core";
import {HamburgerMenu, RefineThemedLayoutV2HeaderProps} from "@refinedev/mui";
import React, {useContext} from "react";

interface IUser {
    full_name: string;
}

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
                                                                      sticky = true,
                                                                  }) => {
    const {mode, setMode} = useContext(ColorModeContext);
    const {data: user} = useGetIdentity<IUser>();

    return (
        <AppBar position={sticky ? "sticky" : "relative"}>
            <Toolbar>
                <iframe src="http://localhost:3000/paradigma_logo.svg" width="100" height="100" title="Paradigma"></iframe>
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
