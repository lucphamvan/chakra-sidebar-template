import { Input, Box, Button } from "@chakra-ui/react";
import ListCheckbox from "component/CheckBoxList";
import StyledButton from "core/Button";
import { useEffect, useMemo, useState } from "react";

import rolesService from "services/roles.service";
import usersService from "services/users.service";
import Card from "../component/Card";

export default function PageHome() {
    const [permissions, setPermissions] = useState<string[]>([]);
    const [roleName, setRoleName] = useState<string>("");

    useEffect(() => {
        const getPermissions = async () => {
            const [_permissions, error] = await rolesService.getPermissions();
            if (!error) {
                setPermissions(_permissions);
            }
        };
        getPermissions();
    }, []);

    const options = useMemo(() => {
        return permissions?.map((p) => {
            return { value: p, text: p };
        });
    }, [permissions]);

    const applyFunc = async (checkValue: string[]) => {
        await rolesService.createRole(roleName, checkValue);
    };

    const assignRole = async () => {
        const [userRole, error] = await usersService.setRole("62a49eb350bf52fa5d1a93c0", "62a987aff836e9d6f5290a3e");
        if (!error) {
            console.log("user role", userRole);
        }
    };

    return (
        <Card>
            <Box p={4}>
                <Input size={"sm"} placeholder="Role name" onChange={(event) => setRoleName(event.target.value)} />
            </Box>
            <ListCheckbox applyFunc={applyFunc} optionData={options} />
            <Button onClick={assignRole}>Test Assign Role</Button>
            <StyledButton mode="primary">Test Assign</StyledButton>
        </Card>
    );
}
