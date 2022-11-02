import style from './HeaderBar.module.css';
import AppsIcon from '@mui/icons-material/Apps';
import {Button} from "@mui/material";
import MenuAvatar from "../menuAvartar/MenuAvatar";
import {useLocation, useNavigate} from "react-router-dom";

function HeaderBar() {

    const location = useLocation();
    const pathname = location.pathname;
    const navigate = useNavigate();

    return (
        // eslint-disable-next-line 
        <div className={style.headerBar + " "  + 'bg-primary d-flex align-items-center'}>

            <AppsIcon className={'text-white me-3'}/>
            
            <h5 className={'m-0 text-white me-4'}>SalesHub</h5>

            <div className={'d-flex me-auto'}>
                <Button 
                    color={pathname.includes('/contacts') ? 'info' : ''}
                    variant={pathname.includes('/contacts') ? 'contained' : ''}  
                    className={'text-white'} onClick={() => navigate('/contacts')}>Contacts</Button>

                <Button
                    color={pathname.includes('/deals/list') ? 'info' : ''}
                    variant={pathname.includes('/deals/list') ? 'contained' : ''}
                    className={'text-white'} onClick={() => navigate('/deals/list')}>Deals</Button>
            </div>

            <div className={'me-3 d-flex h-100 align-items-center'}>
                <MenuAvatar />
            </div>

        </div>
    )
}

export default HeaderBar;
