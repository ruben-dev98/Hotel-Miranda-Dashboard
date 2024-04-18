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
import styled from "styled-components"

interface TableOptionsProp {
    searchTerm?: string,
    setSearchTerm?: Dispatch<SetStateAction<string>>,
    setCurrentTab: Dispatch<SetStateAction<string>>,
    data: ITabsObject[],
    currentTab: string,
    setCurrentOrder: Dispatch<React.SetStateAction<string>>,
    dataOrder: IOrder[],
    isUserOrBooking?: boolean
}

const DivStyledActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 15px;
`;

const TableOptions = ({searchTerm, setSearchTerm, setCurrentTab, data, currentTab, setCurrentOrder, dataOrder, isUserOrBooking} : TableOptionsProp) => {
    
    return(<DivStyledOptions>
                <TabsComponent setCurrentTab={setCurrentTab} data={data} currentTab={currentTab}></TabsComponent>
                <DivStyledActions>
                    {isUserOrBooking && <InputSearch value={searchTerm} onChange={(event) => setSearchTerm && setSearchTerm(event.target.value)} placeholder={searchByFullName} />}
                    <ButtonStyledNew as={LinkStyled} to={'room'}>+ New Room</ButtonStyledNew>
                    <OrderComponent setCurrentOrder={setCurrentOrder} data={dataOrder} />
                </DivStyledActions>
            </DivStyledOptions>
    )
}

export default TableOptions;