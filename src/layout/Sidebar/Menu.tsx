import {
    Icon as ChakraIcon,
    Collapse,
    HStack,
    ListItem as Item,
    List,
    ListIcon,
    chakra,
    useDisclosure,
    useId
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { MEDIA_QUERY, STYLE } from "config";
import { useRef } from "react";
import { FaChevronRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import navigation from "router/navigation";
import { NavigationProp } from "type";

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
    padding: 0.7rem 1rem;
    font-weight: bold;
    color: ${STYLE.textColor};

    /* &:hover {
        color: ${STYLE.textColor};
        svg {
            color: #428bff;
        }
    } */
    &.active {
        color: #428bff;
        ::after {
            content: "";
            position: absolute;
            right: 0;
            height: 2.5rem;
            width: 4px;
            border-radius: 2px;
            background-color: #528bff;
        }
    }
`;

const NormalItem = styled(chakra.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    padding: 0.7rem 1rem;
    font-weight: bold;
    cursor: pointer;
    color: ${STYLE.textColor};

    &:hover {
        /* color: ${STYLE.textColor};
        svg {
            color: #428bff;
        } */
        /* background-color: #d4d5d5; */
        /* box-shadow: 0 0 10px 1px #dae0dd; */
        /* border-radius: 0.125rem; */
    }
`;

const ListItem = styled(Item)`
    padding: 0rem;
    ${MEDIA_QUERY.md} {
        padding: 0rem 1rem;
    }
    &:hover {
        background-color: rgba(170, 170, 170, 0.1);
    }
`;

interface MenuItemProp {
    level: number;
    nav: NavigationProp;
    onClose: () => void;
}
const MenuItem = ({ nav, level, onClose }: MenuItemProp) => {
    return (
        <ListItem onClick={onClose}>
            <LinkItem style={{ marginLeft: `${level}rem` }} to={nav.path} end>
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
    onClose: () => void;
}
const MenuItemWithChildren = ({ nav, level, onClose }: MenuItemWithChildProp) => {
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
                            return <MenuItem level={level + 1} key={`ns-${index}`} nav={n} onClose={onClose} />;
                        }
                        return (
                            <MenuItemWithChildren
                                key={`${menuKey}-${index}`}
                                nav={n}
                                level={level + 1}
                                onClose={onClose}
                            />
                        );
                    })}
                </List>
            </Collapse>
        </>
    );
};

interface MenuProp {
    onClose: () => void;
}
const Menu = ({ onClose }: MenuProp) => {
    const itemKey = useId();
    const itemWithChildKey = useId();
    return (
        <List>
            {navigation.map((nav, index) => {
                if (!nav.children || !nav.children.length) {
                    return <MenuItem level={0} key={`${itemKey}-${index}`} nav={nav} onClose={onClose} />;
                }
                return (
                    <MenuItemWithChildren key={`${itemWithChildKey}-${index}`} nav={nav} level={0} onClose={onClose} />
                );
            })}
        </List>
    );
};
export default Menu;
