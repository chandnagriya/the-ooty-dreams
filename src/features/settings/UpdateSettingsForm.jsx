import useGetSettings from "./useGetSettings";
import useUpdateSetting from "./useUpdateSetting";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
  const { gettingSettings, settings = {} } = useGetSettings();

  const { updatingSetting, updateSetting } = useUpdateSetting();

  if (gettingSettings) return <Spinner />;

  function handleSettingChange(e, field) {
    const value = Number(e.target.value);

    if (!value || settings[field] === value) return;

    updateSetting({
      [field]: value,
    });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings.minBookingLength}
          onBlur={(e) => handleSettingChange(e, "minBookingLength")}
          disabled={updatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings.maxBookingLength}
          onBlur={(e) => handleSettingChange(e, "maxBookingLength")}
          disabled={updatingSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings.maxGuestsPerBooking}
          onBlur={(e) => handleSettingChange(e, "maxGuestsPerBooking")}
          disabled={updatingSetting}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings.breakfastPrice}
          onBlur={(e) => handleSettingChange(e, "breakfastPrice")}
          disabled={updatingSetting}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
