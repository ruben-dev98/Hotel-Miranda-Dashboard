import { Dispatch, SetStateAction } from "react"
import { searchByFullName } from "../helpers/constants"
import { ButtonStyledNew } from "../styled/ButtonStyled"
import { DivStyledOptions } from "../styled/DivStyled"
import { InputSearch } from "../styled/InputStyled"
import { LinkStyled } from "../styled/LinkStyled"
import OrderComponent from "./OrderComponent"
import TabsComponent from "./TabsComponent"
import { ITabsObject } from "../assets/data/tabs"
import { IOrder } from "../assets/data/order"

interface TableOptionsProp {
    searchTerm?: string,
    setSearchTerm?: Dispatch<SetStateAction<string>>,
    setCurrentTab: Dispatch<SetStateAction<string>>,
    data: ITabsObject[],
    currentTab: string,
    setCurrentOrder: Dispatch<React.SetStateAction<string>>,
    dataOrder: IOrder[]
}

const TableOptions = ({searchTerm, setSearchTerm, setCurrentTab, data, currentTab, setCurrentOrder, dataOrder} : TableOptionsProp) => {
    
    return(<DivStyledOptions>
                <TabsComponent setCurrentTab={setCurrentTab} data={data} currentTab={currentTab}></TabsComponent>
                {(searchTerm && setSearchTerm) && <InputSearch value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={searchByFullName} />}
                <ButtonStyledNew as={LinkStyled} to={'room'}>+ New Room</ButtonStyledNew>
                <OrderComponent setCurrentOrder={setCurrentOrder} data={dataOrder} />
            </DivStyledOptions>
    )
}

export default TableOptions;