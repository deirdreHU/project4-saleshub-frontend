import {useState} from "react";
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import {AuthConsumer as useAuth} from "../../auth";
import { useNavigate } from 'react-router-dom';

function MenuAvatar() {
    const {logout} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        logout().then(() => {
            setAnchorEl(null);
            navigate('/login');
        })

    };

    return (
        <div>
            <Avatar
                role={'button'}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ width: 34, height: 34 }}
                src={'https://mui.com/static/images/avatar/1.jpg'}/>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >

                <MenuItem onClick={handleClose}>Logout</MenuItem>

            </Menu>
        </div>
    )

}
export default MenuAvatar;
