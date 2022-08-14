import { Tab as ChakraTab, TabProps } from "@chakra-ui/react";
import { STYLE } from "config";

const Tab = ({ children, ...props }: TabProps) => {
    return (
        <ChakraTab
            _selected={{
                boxShadow: STYLE.shadowBtn,
                backgroundColor: STYLE.primaryColor,
                color: "white",
                borderRadius: "0.25rem"
            }}
            p={STYLE.paddingTap}
            {...props}
        >
            {children}
        </ChakraTab>
    );
};

export default Tab;
