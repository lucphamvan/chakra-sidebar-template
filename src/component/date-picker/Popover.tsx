import styled from "@emotion/styled";
import { useDialog } from "@react-aria/dialog";
import { FocusScope } from "@react-aria/focus";
import { DismissButton, useModal, useOverlay } from "@react-aria/overlays";
import { mergeProps } from "@react-aria/utils";
import { useRef } from "react";

const Box = styled.div`
    background: white;
    border: 1px solid #cbd5e0;
    border-radius: 4px;
    position: absolute;
    z-index: 110;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.25rem;
    padding: 1.5rem;
    outline: none;
`;

export function Popover(props: any) {
    let ref = useRef();
    let { popoverRef = ref, isOpen, onClose, children, ...otherProps } = props;

    // Handle events that should cause the popup to close,
    // e.g. blur, clicking outside, or pressing the escape key.
    let { overlayProps } = useOverlay(
        {
            isOpen,
            onClose,
            shouldCloseOnBlur: true,
            isDismissable: true
        },
        popoverRef
    );

    let { modalProps } = useModal();
    let { dialogProps } = useDialog(otherProps, popoverRef);

    // Add a hidden <DismissButton> component at the end of the popover
    // to allow screen reader users to dismiss the popup easily.
    return (
        <FocusScope contain restoreFocus>
            <Box {...mergeProps(overlayProps, modalProps, dialogProps)} ref={popoverRef}>
                {children}
                <DismissButton onDismiss={onClose} />
            </Box>
        </FocusScope>
    );
}
