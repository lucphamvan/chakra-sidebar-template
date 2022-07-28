import { GridItem } from "@chakra-ui/react";
import ImageGallery from "component/image-gallery";
import { Product } from "model/Product";
import { ReactImageGalleryItem } from "react-image-gallery";

const getItemImages = (product?: Product) => {
    let items = product?.files?.map((file) => {
        const item: ReactImageGalleryItem = {
            original: file.url,
            thumbnail: file.url,
            thumbnailAlt: "img"
        };
        return item;
    });
    items = items ?? [];
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
