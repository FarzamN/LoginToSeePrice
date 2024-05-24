import React, { useLayoutEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useEditPackageMutation } from "../../redux/actions/userAction";
import toast from "react-hot-toast";
import { useEditSettingApiMutation } from "../../redux/actions/SettingAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "500px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "auto",
  maxHeight: "95%",
};

const EditSettingModal = (props) => {
  const { data, open, onClose, handleGetData } = props;
  const [value, setValue] = useState({
    keyName: data?.keyName,
    keyValue: data?.keyValue,
    isDefault: data?.isDefault,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  useLayoutEffect(() => {
    setValue({
      keyName: data?.keyName,
      keyValue: data?.keyValue,
      isDefault: data?.isDefault,
    });
  }, [data]);

  const [editSettingApi, { isLoading }] = useEditSettingApiMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = data?._id;
      const item = { ...value, id };
      const response = await editSettingApi(item);
      const { status, message } = response.data;
      if (status === 200) {
        onClose();
        handleGetData();
        toast.success(message, { duration: 3000 });
      } else if (status === 400) {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      toast.error(error, { duration: 3000 });
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ overflow: "auto" }}
    >
      <Box
        sx={style}
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Edit field
            </h3>
          </div>

          <form action="#" onSubmit={handleSubmit}>
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Key
                </label>
                <input
                  disabled={value?.isDefault == 1}
                  value={value?.keyName}
                  name="keyName"
                  onChange={handleChange}
                  type="text"
                  placeholder="Edit your key"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Value
                </label>
                <input
                  value={value?.keyValue}
                  name="keyValue"
                  onChange={handleChange}
                  type="text"
                  placeholder="Edit your value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <button
                disabled={isLoading}
                // onClick={onClose}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default EditSettingModal;
