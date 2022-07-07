import Button from "component/Button";

import Card from "component/Card";
import PageHeading from "component/page-heading";

export default function PageHome() {
    return (
        <>
            <PageHeading>Home Page</PageHeading>
            <Card width={"initial"} mt={4}>
                <Button mode="primary">Home</Button>
            </Card>
        </>
    );
}
