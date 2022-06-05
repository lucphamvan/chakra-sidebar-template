import { useParams } from "react-router-dom";
import Card from "../component/Card";

export default function PageOneChild() {
    let { id } = useParams();

    return (
        <Card>
            <h2>page one child : {id}</h2>
        </Card>
    );
}
