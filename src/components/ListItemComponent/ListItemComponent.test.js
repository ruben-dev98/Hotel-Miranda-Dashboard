import { render } from "@testing-library/react";
import ListItemComponent from "./ListItemComponent";
import { beforeEach } from "node:test";

describe('TabsComponent', () => {

    it('List item is not selected', () => {
        render (
            <ListItemComponent index={0} str={'A'} setCurrentTab={() => {}} currentTab = {'B'}/>
        );

        const itemClass = ListItemComponent({}).type.styledComponentId
        const ListItemRoots = document.getElementsByClassName(itemClass)
        const style = window.getComputedStyle(ListItemRoots[0]);
        expect(style.borderBottom).toEqual('1px solid #D4D4D4');
    });

    it('List item is selected', () => {
        render (
            <ListItemComponent index={0} str={'A'} setCurrentTab={() => {}} currentTab = {'A'}/>
        );

        const itemClass = ListItemComponent({}).type.styledComponentId
        const ListItemRoots = document.getElementsByClassName(itemClass)
        const style = window.getComputedStyle(ListItemRoots[0]);
        expect(style.borderBottom).toEqual('2px solid #1186');
    });
    
})