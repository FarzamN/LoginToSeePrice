import React, { useLayoutEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import SelectGroupOne from "../Forms/SelectGroup/SelectGroupOne";
import { useEditPackageMutation } from "../../redux/actions/userAction";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjusted to be responsive
  maxWidth: "500px", // Added to limit maximum width
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "auto",
  maxHeight: "95%",
};

function EditPackageModal(props) {
  const { data, open, onClose, handleGetData } = props;
  const [showCSV, setShowCSV] = useState(data?.packageCSVImportBoolean);
  const [value, setValue] = useState({
    packageName: data?.packageName,
    packagePrice: data?.packagePrice,
    packageAmazonImportNumber: data?.packageAmazonImportNumber,
    packageCSVImportBoolean: data?.packageCSVImportBoolean,
    packageCsvImportNumber: data?.packageCsvImportNumber,
    packageDesc: data?.packageDesc,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  useLayoutEffect(() => {
    setValue({
      packageName: data?.packageName,
      packagePrice: data?.packagePrice,
      packageAmazonImportNumber: data?.packageAmazonImportNumber,
      packageCSVImportBoolean: data?.packageCSVImportBoolean,
      packageCsvImportNumber: data?.packageCsvImportNumber,
      packageDesc: data?.packageDesc,
    });
  }, [data]);

  const [editProductApi, { isLoading }] = useEditPackageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = data?._id;
      const item = { ...value, id };
      const response = await editProductApi(item);
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
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Edit Package
                </h3>
              </div>
              <form action="#" onSubmit={handleSubmit}>
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Name
                      </label>
                      <input
                        name="packageName"
                        value={value.packageName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Package name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Price
                      </label>
                      <input
                        name="packagePrice"
                        value={value.packagePrice}
                        onChange={handleChange}
                        type="text"
                        placeholder="Package price"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Amazon import number
                    </label>
                    <input
                      value={value.packageAmazonImportNumber}
                      name="packageAmazonImportNumber"
                      onChange={handleChange}
                      type="number"
                      placeholder="Import number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <SelectGroupOne
                    showCSV={data?.packageCSVImportBoolean}
                    setShowCSV={setShowCSV}
                  />

                  {showCSV === "Yes" ||
                    (data?.packageCsvImportNumber && (
                      <div className="mb-4">
                        <label className="mb-2.5 block text-black dark:text-white">
                          CSV number
                        </label>
                        <input
                          value={value.packageCsvImportNumber}
                          name="packageCsvImportNumber"
                          onChange={handleChange}
                          type="number"
                          placeholder="CSV number"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    ))}

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      name="packageDesc"
                      value={value.packageDesc}
                      rows={6}
                      onChange={handleChange}
                      placeholder="Type your message"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <button
                    disabled={isLoading}
                    className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    {isLoading ? "Loading..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default EditPackageModal;
