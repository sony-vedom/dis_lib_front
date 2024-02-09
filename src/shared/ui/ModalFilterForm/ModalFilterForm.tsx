import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "@mui/material/Modal";
import React, {FC, PropsWithChildren} from "react";
import {type ModalFilterProps} from "./types"
import {useFormContext} from "react-hook-form"

export const ModalFilterForm: FC<PropsWithChildren<ModalFilterProps>> = (props) => {
    const {onClose, open, handleResetAdditional, children} = props
    const {reset} = useFormContext()
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid item xs={12} lg={3}>
                <Card sx={{
                    paddingX: {
                        xs: 2, md: 0,
                    },
                    width: {
                        xs: "calc(100vw - 64px)", md: "500px",
                    },
                    maxWidth: "500px",
                    position: "absolute",
                    top: "50%", right: "50%",
                    transform: "translate(50%,-50%)",
                }}>
                    <CardContent sx={{mt: "10px", pt: "0px"}}>
                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                            <h1>Фильтры</h1>
                            <IconButton sx={{width: "50px", height: "50px"}}
                                        onClick={onClose}>
                                <CloseIcon/>
                            </IconButton>
                        </Box>
                        {children}
                        <Box sx={{display: "grid", gap: "10px", gridTemplateColumns: "140px 1fr"}}>
                            <Button color={"error"} onClick={() => {
                                reset()
                                handleResetAdditional?.()
                                onClose()
                            }} variant="contained">
                                Очистить
                            </Button>
                            <Button form={"filterForm"} sx={{zIndex: 99}} type={"submit"} variant="contained">
                                Искать <SearchIcon/>
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Modal>
    )
}