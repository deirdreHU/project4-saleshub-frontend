import style from './HeaderBar.module.css';
import AppsIcon from '@mui/icons-material/Apps';
import { Button} from "@mui/material";
import MenuAvatar from "../menuAvartar/MenuAvatar";

function HeaderBar() {
    return (
        <div className={style.headerBar + ' ' + 'bg-primary d-flex align-items-center'}>

            <AppsIcon className={'text-white me-3'}/>
            <h5 className={'m-0 text-white me-4'}>SalesHub</h5>

            <div className={'d-flex me-auto'}>
                <Button className={'text-white'}>Contacts</Button>
            </div>

            <div className={'me-3 d-flex h-100 align-items-center'}>
                <MenuAvatar />
            </div>

        </div>
    )
}

export default HeaderBar;
