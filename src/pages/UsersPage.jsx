import { usersTabs } from "../assets/data/tabs";
import Tabs from "../components/Tabs";

const UserPage = () => {


    return (
        <Tabs data={usersTabs}></Tabs>
    );
}

export default UserPage;