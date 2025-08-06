import React from "react";
import { useRejectAccount } from "api/accounts/shared";
import LoadingBackdrop from "components/LoadingBackdrop";
import { useModal } from "hooks";
import { MdWarning } from "react-icons/md";
import ReasonInput from "../ReasonInput";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const RejectAccountAction = ({ mover, type }) => {
  const [reason, setReason] = React.useState("");
  const { isLoading, mutate: rejectAccount } = useRejectAccount(type);
  const rejectPopup = useModal();

  return (
    <>
      {isLoading && <LoadingBackdrop />}
      <Button color="danger" type="button" onClick={rejectPopup.openModal}>
        Reject Account
      </Button>
      <Modal
        isOpen={rejectPopup.isOpen}
        toggle={rejectPopup.toggleModal}
        centered
      >
        <ModalBody className="p-2 d-flex flex-column justify-content-center align-items-center">
          <MdWarning color="red" size={70} />
          <h1 className="text-center m-0">REJECTING {type}!</h1>
          <h2 className="text-center mb-2"> Are you sure?</h2>
          <h6 className="text-center">
            This user will not be able to use the system anymore, You won't be
            able to revert this!
          </h6>
          <ReasonInput reason={reason} setReason={setReason} />
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button
            color="danger"
            type="button"
            disabled={reason === ""}
            onClick={() => {
              rejectAccount({ mover_id: mover.id, reason });
              rejectPopup.closeModal();
            }}
          >
            Yes, Reject
          </Button>
          <Button
            type="button"
            color="outline-primary"
            onClick={rejectPopup.closeModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default RejectAccountAction;
