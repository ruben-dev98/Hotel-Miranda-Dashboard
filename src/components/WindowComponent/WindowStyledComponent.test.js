import { render } from "@testing-library/react";
import WindowStyledComponent from "./WindowComponent";
import { getStyledTest } from "../../helpers/getStyledTest";

describe('WindowStyled', () => {

    it('Side bar component is visible', () => {
        render (
                <WindowStyledComponent visibleLateral={true} />
        );

        const style = getStyledTest(WindowStyledComponent);
        expect(style.gridTemplateAreas).toEqual("'sidebar header' 'sidebar content'");
    });

    it('Side bar component is not visible', () => {
        render (
                <WindowStyledComponent />
        );

        const style = getStyledTest(WindowStyledComponent);
        expect(style.gridTemplateAreas).toEqual("'header header' 'content content'");
    });
    
})