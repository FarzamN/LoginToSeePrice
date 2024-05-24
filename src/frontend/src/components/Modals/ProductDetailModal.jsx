import React, { useState, useEffect } from "react";
import { Modal, Box, MobileStepper, Button } from "@mui/material";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import moment from "moment/moment";
import { useGetSingleStoreProductApiMutation as useGetProduct } from "@/redux/actions/storeAction";
import toast from "react-hot-toast";
import { Loader } from "..";

import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Link } from "react-router-dom";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductDetailModal = ({ visible, id, onClose }) => {
  const [data, setData] = useState({});
  console.log({ data });

  const [getProduct, { isLoading }] = useGetProduct();
  const handleGetProductDetail = async () => {
    try {
      const response = await getProduct(id);
      const { status, message, data: getData } = await response.data;
      if (status === 200) {
        setData(getData);
        console.log("yhh raha data bharway");
      } else {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      toast.error(error.message, { duration: 3000 });
    }
  };

  useEffect(() => {
    if (visible) {
      handleGetProductDetail();
    }
  }, [id]);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Modal
      open={visible}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <Box sx={style[0]}>
          <AutoPlaySwipeableViews
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, i) => (
              <div key={i.toString()}>
                {Math.abs(activeStep - i) <= 2 ? (
                  <Box
                    component="img"
                    sx={style[1]}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            variant="text"
            color="#fff"
            sx={{
              backgroundColor: "#397BE5",
              borderRadius: "10px",
            }}
            className="text-[#fff]"
            itemProp="light"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            style={{ backgroundColor: "#12181F" }}
            nextButton={
              <Button
                style={{ color: "#fff" }}
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                <MdKeyboardArrowRight size={23} color={"#fff"} />
              </Button>
            }
            backButton={
              <Button
                size="small"
                style={{ color: "#fff" }}
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                <MdKeyboardArrowLeft size={23} color={"#fff"} />
                Back
              </Button>
            }
          />
          <p className="text-[#fff] text-center">{data.title}</p>
          <Link target="blank" to={data.product_url}>
            <p className="text-blue-500 hover:underline text-center">
              {data.product_url}
            </p>
          </Link>
          {/* <a
            href={data.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {data.product_url}
          </a> */}
        </Box>
      )}
    </Modal>
  );
};

export default ProductDetailModal;

const style = [
  {
    position: "absolute",
    top: "50%",
    left: "60%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: "700px",
    height: "90%",
    bgcolor: "#12181F",
    boxShadow: 24,
    p: 2.4,
    borderRadius: "10px",
    overflow: "hidden",
  },
  {
    height: 255,
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
    resize: "cover",
    borderRadius: "10px",
  },
];

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Bali, Indonesia",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Goč, Serbia",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];
