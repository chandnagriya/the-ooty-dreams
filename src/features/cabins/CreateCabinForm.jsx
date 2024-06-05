import { useForm } from "react-hook-form";
import { LuMinusCircle } from "react-icons/lu";

import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import ImagePreview from "../../ui/ImagePreview";
import ImagePreviewContainer from "../../ui/ImagePreviewContainer";

function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const { id: editId, ...editCabinValues } = cabinToEdit;
  const isEditMode = Boolean(editId);

  const { creatingCabin, createCabin } = useCreateCabin();
  const { updatingCabin, updateCabin } = useUpdateCabin();

  let creatingOrUpdating = creatingCabin || updatingCabin;

  const { register, handleSubmit, reset, formState, setValue, watch } = useForm(
    {
      defaultValues: isEditMode ? editCabinValues : {},
    }
  );

  const { errors } = formState;

  let imagePreview = watch("image");

  if (imagePreview && typeof imagePreview === "object") {
    if (imagePreview.length === 0) {
      imagePreview = null;
    } else {
      imagePreview = URL.createObjectURL(imagePreview[0]);
    }
  }

  function handleRemoveImage() {
    setValue("image", null);
  }

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditMode) {
      updateCabin(
        { cabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    } else {
      createCabin(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            closeModal?.();
          },
        }
      );
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      $type={closeModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={creatingOrUpdating}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={creatingOrUpdating}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be of atleast 1 guest",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={creatingOrUpdating}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be more than 0",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={creatingOrUpdating}
          {...register("discount", {
            required: "This field is required",
            validate: (value, formValues) =>
              value < Number(formValues.regularPrice) ||
              "Discount should not be equal or more than the price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={creatingOrUpdating}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        {!imagePreview && (
          <FileInput
            id="image"
            accept="image/*"
            disabled={creatingOrUpdating}
            {...register("image", {
              required: "This field is required",
            })}
          />
        )}
        {imagePreview && (
          <ImagePreviewContainer>
            <ImagePreview src={imagePreview} />
            <span onClick={handleRemoveImage}>
              <LuMinusCircle />
            </span>
          </ImagePreviewContainer>
        )}
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => closeModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={creatingOrUpdating}>
          {isEditMode ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
