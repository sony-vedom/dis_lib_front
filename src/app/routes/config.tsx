import {ResourceProps} from "@refinedev/core";
import {PipeSvg} from "src/shared/assets";

export const RoutesConfig:  ResourceProps[] | undefined = [
    {
        name: "parameter",
        list: "/parameter",
        show: "/parameter/show/:id",
        meta: {
            icon: <PipeSvg/>,
            canCreate: false,
            canEdit: false,
            canDelete: false,
        },
    },
    {
        name: "param_elevator",
        list: "/param_elevator",
        show: "/param_elevator/show/:id",
        meta: {
            canCreate: false,
            canEdit: false,
            canDelete: false,
        },
    },
    {
        name: "param_perevodnik",
        list: "/param_perevodnik",
        show: "/param_perevodnik/show/:id",
        meta: {
            canCreate: false,
            canEdit: false,
            canDelete: false,
        },
    },
    {
        name: "param_cable",
        list: "/param_cable",
        show: "/param_cable/show/:id",
        meta: {
            canCreate: false,
            canEdit: false,
            canDelete: false,
        },
    },
]