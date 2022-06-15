import Card from "../component/Card";
import InfinityLevel from "../component/Infinity";

const xxx = {
    value: "abc",
    level: 1,
    children: [
        {
            value: "mon",
            level: 2,
            children: [
                {
                    value: "mon-1",
                    level: 3,
                    children: [
                        {
                            value: "mon-1-1",
                            level: 4,
                        },
                        {
                            value: "mon-1-2",
                            level: 4,
                        },
                    ],
                },
                {
                    value: "mon-2",
                    level: 3,
                    children: [
                        {
                            value: "mon-2-1",
                            level: 4,
                        },
                        {
                            value: "mon-2-2",
                            level: 4,
                        },
                    ],
                },
            ],
        },
    ],
};

export default function PageHome() {
    return (
        <Card>
            <InfinityLevel data={xxx} level={0} />
        </Card>
    );
}
