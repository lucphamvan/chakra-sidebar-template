import { Box, Input } from "@chakra-ui/react";
import Card from "component/Card";
import Loading from "component/Loading";
import PageHeading from "component/page-heading";
import { useCallback, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// const pdf = "http://localhost:8000/static/PhamVanLuc_1658828074787.pdf";
const pdf = "http://localhost:8000/static/PDFTRON_about_1658846030241.pdf";

function highlightPattern(text: any, pattern: any) {
    const splitText = text.split(pattern);

    if (splitText.length <= 1) {
        return text;
    }

    const matches = text.match(pattern);

    return splitText.reduce(
        (arr: any, element: any, index: any) =>
            matches[index] ? [...arr, element, <mark key={index}>{matches[index]}</mark>] : [...arr, element],
        []
    );
}

const PdfPage = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber] = useState(1);
    const [searchText, setSearchText] = useState("");

    const onDocumentLoadSuccess = ({ numPages }: any) => {
        setNumPages(numPages);
    };

    const onChange = (event: any) => {
        setSearchText(event.target.value);
    };

    const textRenderer = useCallback(
        (textItem) => {
            return highlightPattern(textItem.str, searchText);
        },
        [searchText]
    );

    return (
        <>
            <PageHeading>PDF Reader</PageHeading>
            <Card width={"initial"} mt={4} height="calc(100% - 4rem)">
                <Input type="search" id="search" value={searchText} onChange={onChange} />
                <Box display="inline-block" w="max-content" border="1px solid greenyellow">
                    <Document
                        file={pdf}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={console.error}
                        renderMode={"canvas"}
                        loading={<Loading width="100%" height="calc(100vh - 4rem)" />}
                    >
                        <Page
                            pageNumber={pageNumber || 1}
                            customTextRenderer={textRenderer}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />
                    </Document>
                </Box>

                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </Card>
        </>
    );
};

export default PdfPage;
