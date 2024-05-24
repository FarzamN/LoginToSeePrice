import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import EditSettingModal from "../../components/Modals/EditSettingModal";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useDeleteSettingApiMutation,
  useGetSettingApiMutation,
} from "../../redux/actions/SettingAction";
import { setSetting } from "../../redux/slices/getSettingSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Loader } from "../../components";

function ListSetting() {
  const dispatch = useDispatch();

  const getSettingData = useSelector((state) => state.getSetting.value);
  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);
  const [data, setData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onDissmissDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleClose = (type, emnt) => {
    setAnchorEl(null);
  };
  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setData(rowData);
  };

  const [deleteSetting] = useDeleteSettingApiMutation();
  const onDeleteSetting = async () => {
    console.log("data._id", data._id);

    try {
      const delete_id = data._id;
      const response = await deleteSetting(delete_id);
      const { status, message } = response.data;
      if (status === 200) {
        handleGetSettingApi();
        toast.success(message, { duration: 3000 });
      } else if (status === 400) {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, { duration: 3000 });
    }
    setDeleteModal(false);
  };

  const [getSettingApi, { isLoading }] = useGetSettingApiMutation();
  const handleGetSettingApi = async () => {
    try {
      const response = await getSettingApi();
      const { status, message, object } = response.data;
      console.log("object", object);
      if (status === 200) {
        dispatch(setSetting(object));
      } else if (message) {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(error, { duration: 3000 });
    }
  };

  useEffect(() => {
    handleGetSettingApi();
  }, []);

  const handleEdit = (ele) => {
    setOpen3(true);
    setData(ele);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className="w-full">
      <DefaultLayout>
        <TableContainer
          component={Paper}
          className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="text-title-md font-bold text-black dark:text-white">
                  URL
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Name
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Default
                </TableCell>
                <TableCell
                  className="text-title-md font-bold text-black dark:text-white"
                  align="center"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {getSettingData.map((row, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      className="text-title-md font-bold text-black dark:text-white"
                      component="th"
                      scope="row"
                      style={{
                        maxWidth: "150px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {row?.keyName}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="text-title-md font-bold text-black dark:text-white"
                    >
                      {row?.keyValue}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="text-title-md font-bold text-black dark:text-white"
                    >
                      {row?.isDefault == 1 ? "Yes" : "No"}
                    </TableCell>

                    <TableCell
                      align="center"
                      className="text-title-md font-bold text-black dark:text-white"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button
                        onClick={() => handleEdit(row)}
                        className="h-8.5 flex justify-center rounded bg-primary dark:bg-white py-2 px-6 font-medium text-white dark:text-black hover:bg-opacity-90"
                      >
                        Edit
                      </button>
                      {row?.isDefault == 0 && (
                        <button
                          onClick={() => {
                            setDeleteModal(true);
                            setData(row);
                          }}
                          className="ml-2 h-8.5 flex justify-center rounded bg-danger py-1.5 px-4 font-medium text-white hover:bg-opacity-90"
                        >
                          Delete
                        </button>
                      )}
                    </TableCell>
                    <Menu
                      id="fade-menu"
                      MenuListProps={{
                        "aria-labelledby": "fade-button",
                      }}
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}
                    >
                      <MenuItem onClick={() => handleClose("edit", row)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleClose("delete", row)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DefaultLayout>

      <EditSettingModal
        handleGetData={handleGetSettingApi}
        open={open3}
        onClose={handleClose3}
        data={data}
      />
      <Dialog
        open={deleteModal}
        onClose={onDissmissDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dark:bg-boxdark-2 dark:text-bodydark"
        >
          {"Delete Field"}
        </DialogTitle>
        <DialogContent className="dark:bg-boxdark-2 dark:text-bodydark">
          <DialogContentText
            id="alert-dialog-description"
            className="dark:bg-boxdark-2 dark:text-bodydark"
          >
            Are you sure you want to delete this field?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dark:bg-boxdark-2 dark:text-bodydark">
          <Button onClick={onDeleteSetting}>Yes</Button>
          <Button onClick={onDissmissDeleteModal} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ListSetting;

const DATA = [
  {
    key_name: "google_url",
    key_value: "https://www.google.com/",
    isDefault: 1,
  },
  {
    key_name: "facebook_url",
    key_value: "https://www.facebook.com/",
    isDefault: 0,
  },
];
