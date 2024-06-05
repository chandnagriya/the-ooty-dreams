import { useState } from "react";

import { LuMinusCircle } from "react-icons/lu";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import ImagePreview from "../../ui/ImagePreview";
import ImagePreviewContainer from "../../ui/ImagePreviewContainer";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName, avatar: currentAvatar },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(currentAvatar);

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          e.target.reset();
        },
      }
    );
  }

  let imagePreview = avatar;

  if (imagePreview && typeof imagePreview === "object") {
    if (imagePreview.length === 0) {
      imagePreview = null;
    } else {
      imagePreview = URL.createObjectURL(imagePreview);
    }
  }

  function handleRemoveImage() {
    setAvatar(null);
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Avatar image (optional)">
        {!imagePreview && (
          <FileInput
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            disabled={isUpdating}
          />
        )}
        {imagePreview && (
          <ImagePreviewContainer>
            <ImagePreview src={imagePreview} noRatio={true} />
            <span onClick={handleRemoveImage}>
              <LuMinusCircle />
            </span>
          </ImagePreviewContainer>
        )}
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
