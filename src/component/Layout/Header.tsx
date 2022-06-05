import { chakra } from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";

const Header = () => {
    return (
        <chakra.header
            minH={16}
            p="4"
            mb={8}
            rounded="sm"
            bg="white"
            boxShadow="0 4px 24px 0 rgba(34,41,47,0.1)"
            display={"flex"}
            alignItems="center"
        >
            <ColorModeSwitcher />
        </chakra.header>
    );
};

export default Header;
