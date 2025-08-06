import React from "react";
import { useApproveAccountAndRequestForDocuments } from "api/accounts/shared";
import LoadingBackdrop from "components/LoadingBackdrop";
import { useModal } from "hooks";
import { MdCheckCircle } from "react-icons/md";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

const ApproveAndRequestDocuments = ({ mover, type }) => {
  const { isLoading, mutate: approveAccount } =
    useApproveAccountAndRequestForDocuments(type);
  const approvePopup = useModal();

  return (
    <>
      {isLoading && <LoadingBackdrop />}
      <Button type="button" color="success" onClick={approvePopup.openModal}>
        Approve and Request for Documents
      </Button>
      <Modal
        isOpen={approvePopup.isOpen}
        toggle={approvePopup.toggleModal}
        centered
      >
        <ModalBody className="p-2 d-flex flex-column justify-content-center align-items-center">
          <MdCheckCircle color="#28C76F" size={70} />
          <h1 className="text-center mt-1">Approve {type}?</h1>
          <h6 className="text-center">
            This user will be Partially Approved, and will be requested for
            documents to complete the registration process.
          </h6>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-center">
          <Button
            color="success"
            type="button"
            onClick={() => {
              approveAccount({ mover_id: mover.id });
              approvePopup.closeModal();
            }}
          >
            Yes, Approve
          </Button>
          <Button
            type="button"
            color="outline-primary"
            onClick={approvePopup.closeModal}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ApproveAndRequestDocuments;
