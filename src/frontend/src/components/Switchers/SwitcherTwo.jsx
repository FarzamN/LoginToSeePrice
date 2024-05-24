import toast from "react-hot-toast";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import { useStoreStateMutation } from "@/redux/actions/storeAction";
import { catchErr } from "@/utils/urls";

const SwitcherTwo = ({ row }) => {
  const [switchValue, setSwitchValue] = useState(row.is_active === "Yes");
  console.log(row);
  const [addStoreStoreApi] = useStoreStateMutation();
  const handleSwitchChange = async () => {
    const newSwitchValue = !switchValue;
    setSwitchValue(newSwitchValue);
    const is_active = newSwitchValue ? "Yes" : "No";
    try {
      const response = await addStoreStoreApi({
        is_active,
        id: row._id,
      });
      const { status, message, data } = response?.data;
      console.log(response);
      if (status === 200) {
        toast.success(message, { duration: 3000 });
      } else {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(catchErr, { duration: 3000 });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AntSwitch
        checked={switchValue}
        inputProps={{ "aria-label": "ant design" }}
        onChange={handleSwitchChange}
      />
    </div>
  );
};

export default SwitcherTwo;

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 30,
  height: 18,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
