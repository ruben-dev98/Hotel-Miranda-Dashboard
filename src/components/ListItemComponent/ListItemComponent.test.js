import { render } from "@testing-library/react";
import ListItemComponent from "./ListItemComponent";
import { getStyledTest } from "../../helpers/getStyledTest";
import { transformHexToRgb } from "../../helpers/transformHexToRGB";

describe('TabsComponent', () => {

    it('List item is not selected changes border bottom to 1px solid #B2B2B2', () => {
        render (
            <ListItemComponent index={0} str={'A'} setCurrentTab={() => {}} currentTab = {'B'}/>
        );

        const style = getStyledTest(ListItemComponent);
        expect(style.borderBottom).toEqual('1px solid #B2B2B2');
    });

    it('List item is selected changes border bottom to 2px solid #135846', () => {
        render (
            <ListItemComponent index={0} str={'A'} setCurrentTab={() => {}} currentTab = {'A'}/>
        );

        const style = getStyledTest(ListItemComponent);
        expect(style.borderBottom).toEqual('2px solid #135846');
    });

    it('List item is not selected changes color to #B2B2B2', () => {
        render (
            <ListItemComponent index={0} str={'A'} setCurrentTab={() => {}} currentTab = {'B'}/>
        );
        
        const style = getStyledTest(ListItemComponent);
        const rgb = transformHexToRgb('#B2B2B2');
        expect(style.color).toEqual(rgb);
    });

    it('List item is selected changes color #135846', () => {
        render (
            <ListItemComponent index={0} str={'A'} setCurrentTab={() => {}} currentTab = {'A'}/>
        );

        const style = getStyledTest(ListItemComponent);
        const rgb = transformHexToRgb('#135846');
        expect(style.color).toEqual(rgb);
    });
    
})