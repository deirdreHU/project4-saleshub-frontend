import ListIcon from '@mui/icons-material/List';
import {useState} from "react";

import {MenuItem, Menu} from "@mui/material";
function MenuAction({onEdit, onDelete}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ListIcon  
                id="menu-button"
                role={'button'}
                aria-controls={open ? 'action-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}/>

            <Menu
                id="action-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'menu-button',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    onEdit && onEdit();
                }}>Edit</MenuItem>

                <MenuItem onClick={() => {
                    handleClose();
                    onDelete && onDelete();
                }}>Delete</MenuItem>
            </Menu>
        </div>
    )
}
export default MenuAction;
