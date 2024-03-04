import { messageTabs } from "../assets/data/tabs";
import Tabs from "../components/Tabs";

const ContactPage = () => {

    return (
        <Tabs data={messageTabs}></Tabs>
    );
}

export default ContactPage;