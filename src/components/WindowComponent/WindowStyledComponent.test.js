import { render } from "@testing-library/react";
import WindowStyledComponent from "./WindowComponent";

describe('WindowStyled', () => {

    it('Side bar component is visible', () => {
        render (
            <div>
                <WindowStyledComponent visibleLateral={true} />
            </div>
        );

        const windowClass = WindowStyledComponent({}).type.styledComponentId
        const WindowRoots = document.getElementsByClassName(windowClass)
        const style = window.getComputedStyle(WindowRoots[0]);
        expect(style.gridTemplateAreas).toEqual("'sidebar header' 'sidebar content'")
    });

    it('Side bar component is not visible', () => {
        render (
            <div>
                <WindowStyledComponent />
            </div>
        );

        const windowClass = WindowStyledComponent({}).type.styledComponentId
        const WindowRoots = document.getElementsByClassName(windowClass)
        const style = window.getComputedStyle(WindowRoots[0]);
        expect(style.gridTemplateAreas).toEqual("'header header' 'content content'")
    });
    
})