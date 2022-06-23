import { Heading, Popover, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import Button from "core/Button";

import Card from "../component/Card";

export default function PageHome() {
    return (
        <>
            <Heading>Home Page</Heading>
            <Card width={"initial"} mt={4}>
                <Button mode="primary">XXXX</Button>
                <Popover isLazy>
                    <PopoverTrigger>
                        <Button mode="primary">Click me</Button>
                    </PopoverTrigger>
                    <PopoverContent width="initial" minWidth="28">
                        <PopoverBody>xxx asdas dasdasd asdas asdasd</PopoverBody>
                    </PopoverContent>
                </Popover>
            </Card>
        </>
    );
}
