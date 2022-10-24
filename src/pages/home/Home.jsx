import HeaderBar from "../../components/headerBar/HeaderBar";
import {Outlet} from 'react-router-dom';

function Home() {
  return (
    <div className={'container-fluid p-0 d-flex flex-column'}>
      <HeaderBar />
      <div className={'w-100 p-4'}>
        <Outlet />
      </div>
    </div>
  )
}
export default Home;