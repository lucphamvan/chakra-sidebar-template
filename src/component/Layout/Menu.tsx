import {
    chakra,
    Collapse,
    HStack,
    List,
    useDisclosure,
    Icon as ChakraIcon,
    ListItem as Item,
    useId,
    ListIcon,
} from "@chakra-ui/react";

import { Color } from "config";
import { useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import navigation from "router/navigation";
import { NavigationProp } from "type";
import styled from "@emotion/styled";

const Icon = styled(ChakraIcon)`
    display: flex;
    align-items: center;
    /* height: ${(props) => props.height};
    width: ${(props) => props.width}; */
    height: 0.65rem;
    width: 0.65rem;
`;

const LinkItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: bold;
    &:hover {
        background-color: #d4d5d5;
        box-shadow: 0 0 10px 1px #dae0dd;
        border-radius: 0.125rem;
    }
    &.active {
        background-color: ${Color.primary};
        box-shadow: 0 0 10px 1px ${Color.primaryShadow};
        color: #fff;
        border-radius: 0.125rem;
    }
`;

const NormalItem = styled(chakra.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: bold;
    cursor: pointer;
    &:hover {
        background-color: #d4d5d5;
        box-shadow: 0 0 10px 1px #dae0dd;
        border-radius: 0.125rem;
    }
`;

const ListItem = styled(Item)`
    padding: 0.25rem 1rem;
`;

interface MenuItemProp {
    level: number;
    nav: NavigationProp;
}
const MenuItem = ({ nav, level }: MenuItemProp) => {
    return (
        <ListItem>
            <LinkItem style={{ marginLeft: `${level}rem` }} to={nav.path}>
                {nav.icon ? (
                    <ListIcon as={nav.icon} style={nav.size ? { width: nav.size, height: nav.size } : {}} />
                ) : null}
                <chakra.span noOfLines={1}>{nav.navText}</chakra.span>
            </LinkItem>
        </ListItem>
    );
};

interface MenuItemWithChildProp {
    nav: NavigationProp;
    level: number;
}
const MenuItemWithChildren = ({ nav, level }: MenuItemWithChildProp) => {
    const menuKey = useId();
    const { isOpen, onToggle } = useDisclosure();
    const ref = useRef<any>();
    const refDegree = useRef<number>(0);

    const handleClick = () => {
        onToggle();
        if (refDegree.current === 0) {
            refDegree.current += 90;
        } else {
            refDegree.current -= 90;
        }
        ref.current.style.transform = `rotate(${refDegree.current}deg)`;
    };

    return (
        <>
            <ListItem onClick={handleClick}>
                <NormalItem style={{ marginLeft: `${level}rem` }}>
                    <HStack alignItems="center">
                        {nav.icon ? (
                            <ListIcon as={nav.icon} style={nav.size ? { width: nav.size, height: nav.size } : {}} />
                        ) : null}
                        <chakra.span noOfLines={1}>{nav.navText}</chakra.span>
                    </HStack>
                    <chakra.div ref={ref} transition="transform 0.25s">
                        <Icon as={FaChevronRight} display="flex" alignItems="center" />
                    </chakra.div>
                </NormalItem>
            </ListItem>
            <Collapse in={isOpen}>
                <List>
                    {nav?.children?.map((n, index) => {
                        if (!n.children || !n.children.length) {
                            return <MenuItem level={level + 1} key={`ns-${index}`} nav={n} />;
                        }
                        return <MenuItemWithChildren key={`${menuKey}-${index}`} nav={n} level={level + 1} />;
                    })}
                </List>
            </Collapse>
        </>
    );
};

const Menu = () => {
    const itemKey = useId();
    const itemWithChildKey = useId();
    return (
        <List>
            {navigation.map((nav, index) => {
                if (!nav.children || !nav.children.length) {
                    return <MenuItem level={0} key={`${itemKey}-${index}`} nav={nav} />;
                }
                return <MenuItemWithChildren key={`${itemWithChildKey}-${index}`} nav={nav} level={0} />;
            })}
        </List>
    );
};
export default Menu;
