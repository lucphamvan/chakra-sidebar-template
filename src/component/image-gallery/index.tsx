import { Image as ChakraImage, Icon } from "@chakra-ui/react";
import styled from "@emotion/styled";
import ImageFallback from "component/image-fallback";
import { STYLE } from "config";
import React, { useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReactImageGallery, { ReactImageGalleryItem, ReactImageGalleryProps } from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const Gallery: any = ReactImageGallery;

const LeftIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 4;
    width: 3rem;
    height: 3rem;
    color: rgba(255, 255, 255, 0.4);
    cursor: pointer;
    :hover {
        color: rgba(255, 255, 255, 0.8);
    }
`;

const RightIcon = styled(LeftIcon)`
    left: unset;
    right: 0;
`;

const Image = styled(ChakraImage)`
    object-fit: scale-down;
    aspect-ratio: 5/3;
    width: 100%;
    background: ${STYLE.textColor};
    background: #000;
`;

const Wrapper = styled.div`
    .image-gallery-icon {
        color: rgba(255, 255, 255, 0.4) !important;
        :hover {
            color: rgba(255, 255, 255, 0.8) !important;
        }
    }
    .image-gallery-thumbnail {
        :hover {
            border-color: ${STYLE.primaryColor} !important;
        }
    }
    .image-gallery-thumbnail.active {
        border-color: ${STYLE.primaryColor} !important;
    }
    .image-gallery-thumbnails-container {
        text-align: left !important;
    }
    .image-gallery-index {
        background: rgba(11, 11, 11, 0.4);
        color: #fff;
        font-weight: bold;
        font-size: 1.2rem;
        border-radius: 0.25rem;
    }
`;

const ImageGallery: React.FC<ReactImageGalleryProps> = (props) => {
    const renderLeftNav = useCallback((onClick: React.MouseEventHandler<HTMLElement>, disable: boolean) => {
        return <LeftIcon as={FaChevronLeft} onClick={onClick as any} />;
    }, []);

    const renderRightNav = useCallback((onClick: React.MouseEventHandler<HTMLElement>, disable: boolean) => {
        return <RightIcon as={FaChevronRight} onClick={onClick as any} />;
    }, []);

    const renderItem = useCallback((item: ReactImageGalleryItem) => {
        return <Image src={item.original} fallback={<ImageFallback bg="black" />} />;
    }, []);

    const renderThumnail = useCallback((item: ReactImageGalleryItem) => {
        return <Image src={item.thumbnail} fallback={<ImageFallback bg="black" />} />;
    }, []);

    if (!props.items || !props.items.length) {
        return <ImageFallback />;
    }

    return (
        <Wrapper>
            <Gallery
                showIndex
                renderItem={renderItem}
                renderThumbInner={renderThumnail}
                showPlayButton={false}
                slideDuration={100}
                renderLeftNav={renderLeftNav}
                renderRightNav={renderRightNav}
                {...props}
            />
        </Wrapper>
    );
};

export default ImageGallery;
