import React, { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import userThree from "../../images/user/user-03.png";
import slugify from "react-slugify";
import { useDispatch } from "react-redux";
import { useAddSettingApiMutation as useAdd } from "../../redux/actions/SettingAction";
import { catchErr } from "../../utils/urls";
import toast from "react-hot-toast";

function AddSetting() {
  const dispatch = useDispatch();
  const [key_Name, setKeyName] = useState("");
  const [keyValue, setKeyValue] = useState("");

  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   setKeyName(name);
  //   setKeyValue(value);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setKeyName(value);
    } else if (name === "value") {
      setKeyValue(value);
    }
  };

  const [AddSettingApi, { isLoading }] = useAdd();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const keyName = slugify(key_Name, { delimiter: "_" });
      const isDefault = 0;
      const response = await AddSettingApi({ keyName, keyValue, isDefault });
      const { status, message } = response.data;

      if (status === 200) {
        setKeyName("");
        setKeyValue("");
        toast.success(message, { duration: 3000 });
      } else if (status === 400) {
        console.log("message", message);
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(catchErr, { duration: 3000 });
    }
  };

  return (
    <div className="w-full">
      <DefaultLayout>
        <div className="mx-auto max-w-270">
          {/* <Breadcrumb pageName="Add Setting" show /> */}
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Add Setting
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor={`keyName`}
                      >
                        Key Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          onChange={handleChange}
                          value={key_Name}
                          placeholder="Enter your key"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor={`keyValue`}
                      >
                        Key Value
                      </label>
                      <input
                        type="text"
                        name="value"
                        id="value"
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        onChange={handleChange}
                        value={keyValue}
                        placeholder="Enter your value"
                      />
                    </div>
                  </div>

                  {/* <div className="flex justify-end gap-4.5">
                    {fieldData?.length > 1 && (
                      <button
                        onClick={handleCancel}
                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        // type="submit"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={handleAddField}
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Add field
                    </button>
                  </div> */}

                  <button
                    disabled={isLoading}
                    className="mt-5.5 flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    {isLoading ? "Loading..." : "Save"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
}

export default AddSetting;
