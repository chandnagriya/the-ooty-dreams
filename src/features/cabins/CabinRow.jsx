import styled from "styled-components";
import { LuCopy, LuMoreVertical, LuPenSquare, LuTrash2 } from "react-icons/lu";

import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";

import { formatCurrency } from "../../utils/helpers";

import CreateCabinForm from "./CreateCabinForm";
import ImagePreview from "../../ui/ImagePreview";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
  text-align: right;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  text-align: right;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const { creatingCabin, createCabin } = useCreateCabin();
  const { deletingCabin, deleteCabin } = useDeleteCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  function handleDelete() {
    deleteCabin(cabinId);
  }

  return (
    <Table.Row>
      <Table.CellData>
        <ImagePreview src={image} scaleImage={true} />
      </Table.CellData>
      <Cabin>{name}</Cabin>
      <Table.CellData>Fits up to {maxCapacity} guests</Table.CellData>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <td>&mdash;</td>
      )}
      <Table.CellData>
        <Modal>
          <Menus.Menu>
            <Menus.ToggleMenu id={cabinId}>
              <LuMoreVertical />
            </Menus.ToggleMenu>
            <Menus.MenuList id={cabinId}>
              <Menus.MenuListItem
                icon={<LuCopy />}
                onClick={handleDuplicate}
                disabled={creatingCabin}
              >
                Duplicate
              </Menus.MenuListItem>
              <Modal.Open opens="cabin-form">
                <Menus.MenuListItem icon={<LuPenSquare />}>
                  Edit
                </Menus.MenuListItem>
              </Modal.Open>

              <Modal.Open opens="confirm-delete">
                <Menus.MenuListItem icon={<LuTrash2 />}>
                  Delete
                </Menus.MenuListItem>
              </Modal.Open>
            </Menus.MenuList>
          </Menus.Menu>

          <Modal.Window name="cabin-form">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="confirm-delete">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={handleDelete}
              disabled={deletingCabin}
            />
          </Modal.Window>
        </Modal>
      </Table.CellData>
    </Table.Row>
  );
}

export default CabinRow;
