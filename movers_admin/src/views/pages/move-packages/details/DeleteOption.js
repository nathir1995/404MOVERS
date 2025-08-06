import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Routes } from "configs/Routes";

import confirmAlert from "extensions/confirm-alert";
import { useDeleteMovePackage } from "api/move_packages";

import LoadingBackdrop from "components/LoadingBackdrop";

const DeleteOption = ({ package_id }) => {
  const {
    mutate: deleteMovePackage,
    isLoading,
    isSuccess,
  } = useDeleteMovePackage();

  if (isSuccess) {
    return <Redirect to={Routes.move_packages.url} />;
  }

  return (
    <>
      {isLoading && <LoadingBackdrop />}
      <Button
        color="danger"
        type="button"
        className="ml-1"
        outline
        onClick={() =>
          confirmAlert({
            onConfirm: () => {
              deleteMovePackage({ id: package_id });
            },
          })
        }
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteOption;
