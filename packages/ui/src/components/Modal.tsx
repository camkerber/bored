import CloseIcon from "@mui/icons-material/Close";
import {Box, IconButton, Modal as MuiModal, ModalProps} from "@mui/material";

interface BoredModalProps extends ModalProps {
  showCloseButton?: boolean;
}

export const Modal = ({showCloseButton = false, ...rest}: BoredModalProps) => {
  return (
    <MuiModal {...rest}>
      <Box
        className="bored-modal"
        sx={{
          p: 4,
          bgcolor: "background.paper",
        }}
      >
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
