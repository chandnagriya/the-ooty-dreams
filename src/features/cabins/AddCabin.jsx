import styled from "styled-components";

import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const StyledAddCabin = styled.div`
  margin-left: 1.2rem;
`;

function AddCabin() {
  return (
    <StyledAddCabin>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </StyledAddCabin>
  );
}

export default AddCabin;
