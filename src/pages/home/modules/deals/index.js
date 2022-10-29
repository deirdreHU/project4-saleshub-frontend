import {DealsTable} from "./components/DealsTable";
import {DealsHeader} from "./components/DealsHeader";
import {DealsFilter} from "./components/DealsFilter";


export const Deals = () => {
    return (
        <div>
            <DealsHeader />
            <DealsFilter />
            <DealsTable />
        </div>
    )
}
