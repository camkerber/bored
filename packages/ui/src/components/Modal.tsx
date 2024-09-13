import CloseIcon from "@mui/icons-material/Close";
import {Box, IconButton, Modal as MuiModal, ModalProps} from "@mui/material";
import "@bored/styles";

interface BoredModalProps extends ModalProps {
  showCloseButton?: boolean;
}

export const Modal = ({showCloseButton = false, ...rest}: BoredModalProps) => {
  return (
    <MuiModal {...rest}>
      <Box p={4} className="bored-modal" bgcolor="background.paper">
        <>
          {showCloseButton ? (
            <IconButton
              onClick={(e) => rest.onClose?.(e, "backdropClick")}
              className="bored-modal-close-button"
            >
              <CloseIcon />
            </IconButton>
          ) : null}
          {rest.children}
        </>
      </Box>
    </MuiModal>
  );
};
