import React, { useState } from "react";
import toast from "react-hot-toast";
import DefaultLayout from "../../layout/DefaultLayout";
import { useAddPackageMutation } from "../../redux/actions/userAction";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";

function AddPackage() {
  const [showCSV, setShowCSV] = useState("No");
  const [value, setValue] = useState({
    packageName: "",
    packagePrice: "",
    packageAmazonImportNumber: "",
    packageCSVImportBoolean: showCSV,
    packageCsvImportNumber: "",
    packageDesc: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const [addProductApi, { isLoading }] = useAddPackageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addProductApi(value);
      const { status, message } = response.data;
      if (status === 200) {
        toast.success(message, { duration: 3000 });
        setValue({
          packageName: "",
          packagePrice: "",
          packageAmazonImportNumber: "",
          packageCSVImportBoolean: showCSV,
          packageCsvImportNumber: "",
          packageDesc: "",
        });
      } else if (message) {
        toast.error(message, { duration: 3000 });
        console.log("message", message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error, { duration: 3000 });
    }
  };

  return (
    <div className="w-full">
      <DefaultLayout>
        {/* <Breadcrumb pageName="Form Layout" /> */}
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Package
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
                        type="text"
                        name="packageName"
                        value={value.packageName}
                        onChange={handleChange}
                        placeholder="Package name"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Price
                      </label>
                      <input
                        type="text"
                        name="packagePrice"
                        value={value.packagePrice}
                        onChange={handleChange}
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
                      type="number"
                      onChange={handleChange}
                      name="packageAmazonImportNumber"
                      value={value.packageAmazonImportNumber}
                      placeholder="Amazon Import number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <SelectGroupOne setShowCSV={setShowCSV} />

                  {showCSV == "Yes" && (
                    <div className="mb-4">
                      <label className="mb-2.5 block text-black dark:text-white">
                        CSV number
                      </label>
                      <input
                        type="number"
                        onChange={handleChange}
                        placeholder="CSV number"
                        name="packageCsvImportNumber"
                        value={value.packageCsvImportNumber}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      name="packageDesc"
                      onChange={handleChange}
                      value={value.packageDesc}
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
      </DefaultLayout>
    </div>
  );
}

export default AddPackage;
