import { TabProps, Tab as ChakraTab } from "@chakra-ui/react";
import { COLOR } from "config";

const Tab = ({ children, ...props }: TabProps) => {
    return (
        <ChakraTab
            _selected={{
                boxShadow: COLOR.shadowBtn,
                backgroundColor: COLOR.primary,
                color: "white",
                borderRadius: "0.125rem",
            }}
            p="0.5rem 1.5rem"
            {...props}
        >
            {children}
        </ChakraTab>
    );
};

export default Tab;
