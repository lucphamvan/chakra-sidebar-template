/*
 * Usage:
 *   const { alert, confirm, prompt } = useModals()
 *   alert("Hey!") // awaitable too
 *   if (await confirm("Are you sure?")) ...
 *   const result = await prompt("Enter a URL", "http://")
 */
import { Box, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Stack } from "@chakra-ui/react";
import Button from "component/Button";
import { ReactNode, createContext, useCallback, useContext, useRef, useState } from "react";

// TODO: Select field contents when a prompt() loads
// TODO: Fix Promise<> return types instead of using any

enum ModalType {
    Alert,
    Confirm,
    Prompt
}

export interface Modals {
    alert: (message: string) => Promise<any>;
    confirm: (message: any) => Promise<any>;
    prompt: (message: string, defaultValue?: string) => Promise<any>;
}

const defaultContext: Modals = {
    alert() {
        throw new Error("<ModalProvider> is missing");
    },
    confirm() {
        throw new Error("<ModalProvider> is missing");
    },
    prompt() {
        throw new Error("<ModalProvider> is missing");
    }
};

const Context = createContext<Modals>(defaultContext);

interface AnyEvent {
    preventDefault(): void;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modal, setModal] = useState<ReactNode | null>(null);
    const input = useRef<HTMLInputElement>(null);
    const ok = useRef<HTMLButtonElement>(null);

    const createOpener = useCallback(
        (type: ModalType) =>
            (message: any, defaultValue = "") =>
                new Promise((resolve) => {
                    const handleClose = (e?: AnyEvent) => {
                        e?.preventDefault();
                        setModal(null);
                        resolve(null);
                    };

                    const handleCancel = (e?: AnyEvent) => {
                        e?.preventDefault();
                        setModal(null);
                        if (type === ModalType.Prompt) resolve(null);
                        else resolve(false);
                    };

                    const handleOK = (e?: AnyEvent) => {
                        e?.preventDefault();
                        setModal(null);
                        if (type === ModalType.Prompt) resolve(input.current?.value);
                        else resolve(true);
                    };

                    setModal(
                        <Modal
                            isCentered
                            isOpen={true}
                            onClose={handleClose}
                            initialFocusRef={type === ModalType.Prompt ? input : ok}
                        >
                            <ModalOverlay />
                            <ModalContent>
                                <ModalBody mt={5}>
                                    <Stack spacing={5}>
                                        <Box>{message}</Box>
                                        {type === ModalType.Prompt && <Input ref={input} defaultValue={defaultValue} />}
                                    </Stack>
                                </ModalBody>
                                <ModalFooter>
                                    {type !== ModalType.Alert && (
                                        <Button mr={3} mode="secondary" onClick={handleCancel} minW="6.5rem">
                                            Cancel
                                        </Button>
                                    )}
                                    <Button onClick={handleOK} ref={ok} minW="6.5rem">
                                        OK
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    );
                }),
        []
    );

    return (
        <Context.Provider
            value={{
                alert: createOpener(ModalType.Alert),
                confirm: createOpener(ModalType.Confirm),
                prompt: createOpener(ModalType.Prompt)
            }}
        >
            {children}
            {modal}
        </Context.Provider>
    );
};

const useModals = () => useContext(Context);

export default useModals;
