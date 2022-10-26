import {Drawer} from "@mui/material";


export const DrawerForm = (
    {
        open,
        onClose,
        children
    }
) => {
    return (
        <Drawer
            onClose={onClose}
            anchor={'right'}
            open={open}>

            <div style={{width: '600px'}}>
                {children}
            </div>
        </Drawer>
    )
}
