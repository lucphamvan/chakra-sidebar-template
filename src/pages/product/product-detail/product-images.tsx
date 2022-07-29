import { GridItem } from "@chakra-ui/react";
import ImageGallery from "component/image-gallery";
import { Product } from "model/Product";
import { ReactImageGalleryItem } from "react-image-gallery";

const getItemImages = (product?: Product) => {
    // get list file not include primary image
    const files = product?.files?.filter((file) => file.url !== product.imgUrl);
    // generate list image gallery item based on files
    let items = files?.map((file) => {
        const item: ReactImageGalleryItem = {
            original: file.url,
            thumbnail: file.url,
            thumbnailAlt: "img"
        };
        return item;
    });
    items = items ?? [];
    // if have primary img => add it to the head of list => render this image first
    if (product?.imgUrl) {
        items = [{ original: product.imgUrl, thumbnail: product.imgUrl, thumbnailAlt: "img" }, ...items];
    }
    return items;
};

interface Props {
    product?: Product;
}
const ProductImages = ({ product }: Props) => {
    return (
        <GridItem>
            <ImageGallery items={getItemImages(product)} />
        </GridItem>
    );
};

export default ProductImages;
