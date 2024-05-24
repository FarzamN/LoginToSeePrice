import React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import moment from "moment/moment";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Adjusted to be responsive
  maxWidth: "500px", // Added to limit maximum width
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2.4,
};

function ViewPackageModal(props) {
  const { data, open, onClose } = props;
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <Typography
              className="text-title-md font-bold text-black dark:text-white"
              id="modal-modal-title"
              style={{ fontSize: "15px" }}
            >
              Package Name:
            </Typography>
            <Typography
              className="text-black dark:text-white"
              id="modal-modal-description"
              style={{ fontSize: "15px" }}
            >
              {data?.packageName}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography
              className="text-title-md font-bold text-black dark:text-white"
              id="modal-modal-title"
              style={{ fontSize: "15px" }}
            >
              Package Price:
            </Typography>
            <Typography
              className="text-black dark:text-white"
              id="modal-modal-description"
              style={{ fontSize: "15px" }}
            >
              {data?.packagePrice}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography
              className="text-title-md font-bold text-black dark:text-white"
              id="modal-modal-title"
              style={{ fontSize: "15px" }}
            >
              Amazon Import Number:
            </Typography>
            <Typography
              className="text-black dark:text-white"
              id="modal-modal-description"
              style={{ fontSize: "15px" }}
            >
              {data?.packageAmazonImportNumber}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography
              className="text-title-md font-bold text-black dark:text-white"
              id="modal-modal-title"
              style={{ fontSize: "15px" }}
            >
              CSV:
            </Typography>
            <Typography
              className="text-black dark:text-white"
              id="modal-modal-description"
              style={{ fontSize: "15px" }}
            >
              {data?.packageCsvImportNumber
                ? data?.packageCsvImportNumber
                : "-"}
            </Typography>
          </div>

          <div className="flex justify-between items-center">
            <Typography
              className="text-title-md font-bold text-black dark:text-white"
              id="modal-modal-title"
              style={{ fontSize: "15px" }}
            >
              Created at:
            </Typography>
            <Typography
              className="text-black dark:text-white"
              id="modal-modal-description"
              style={{ fontSize: "15px" }}
            >
              {moment(data?.createdAt).format("MMMM Do YYYY")}
            </Typography>
          </div>

          <div className="flex justify-between items-start">
            <Typography
              className="text-title-md font-bold text-black dark:text-white"
              id="modal-modal-title"
              style={{ fontSize: "15px" }}
            >
              Description:
            </Typography>
            <Typography
              className="text-black dark:text-white text-right"
              id="modal-modal-description"
              style={{ fontSize: "15px", maxWidth: "50%" }}
            >
              {data?.packageDesc}
            </Typography>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ViewPackageModal;
