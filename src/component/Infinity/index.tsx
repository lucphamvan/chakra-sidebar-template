import { List, ListItem } from "@chakra-ui/react";

const InfinityLevel = ({ data, level }: any) => {
    if (!data.children || !data.children.length) {
        return (
            <List>
                <ListItem ml={level} color="red.600">
                    {data.value}
                </ListItem>
            </List>
        );
    }

    const listItems = data.children.map((d: any, index: number) => {
        return <InfinityLevel key={`d-${index}`} data={d} level={level + 1} />;
    });

    return (
        <List>
            <ListItem ml={level} color="cyan.600">
                {data.value}
                {listItems}
            </ListItem>
        </List>
    );
};

export default InfinityLevel;
