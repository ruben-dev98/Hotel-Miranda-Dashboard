import { roomsTabs } from "../assets/data/tabs";
import Tabs from "../components/Tabs";

const RoomsPage = () => {


    return (
        <Tabs data={roomsTabs}></Tabs>
    );
}

export default RoomsPage;