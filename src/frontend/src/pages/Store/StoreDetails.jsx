import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DefaultLayout from "../../layout/DefaultLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Loader, ProductDetailModal } from "../../components";

import { ImSearch } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { catchErr } from "@/utils/urls";
import {
  useGetSingleStoreMutation,
  useSearchStoreProductMutation,
} from "@/redux/actions/storeAction";
import { useSelector } from "react-redux";

const EnhancedTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="text-title-md font-bold text-black dark:text-white">
          Product Images
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Product name
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Link
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Price
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

const StoreDetails = () => {
  const id = useSelector((state) => state.getStoreId.value);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [storeData, setStoreData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalStoreData, setFinalStoreData] = useState([]);
  const [totalItemNum, setTotalItemNum] = useState(0);
  const [showProductDetail, setShowProductDetail] = useState({
    id: 0,
    visible: false,
  });

  const [searchStoreProduct] = useSearchStoreProductMutation();
  const handleSearch = async () => {
    try {
      const value = searchQuery;
      const response = await searchStoreProduct({ value });
      const { status, message, data } = response?.data;
      if (status === 200) {
        setStoreData(data[0].products);
      } else {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(catchErr, { duration: 3000 });
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPages = 5;
    const startPage = Math.max(currentPage - Math.floor(maxPages / 2), 1);
    const endPage = Math.min(startPage + maxPages - 1, totalPages);

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  useEffect(() => {
    handleStoreDetail();
  }, [currentPage]);

  const [getSingleStoreApi, { isLoading }] = useGetSingleStoreMutation();
  const handleStoreDetail = async () => {
    try {
      const response = await getSingleStoreApi({ id, currentPage });
      const { status, message, data, currentPageNum, totalPage, totalItems } =
        response?.data;
      if (status === 200) {
        setFinalStoreData(data.products);
        setCurrentPage(currentPageNum);
        setTotalPages(totalPage);
        setTotalItemNum(totalItems);
      } else if (status === 400) {
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
        <div className="grid grid-cols-1 gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col sm:flex-row justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-bold text-black dark:text-white">
                Developer Store
              </h3>
              <h3 className="font-bold text-black dark:text-white">
                Total Products: {totalItemNum}
              </h3>

              <Paper
                className="bg-white dark:bg-boxdark-2 dark:text-bodydark text-black flex items-center overflow-hidden mt-4 sm:mt-0"
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                {!searchQuery && (
                  <IconButton sx={{ p: "10px" }} aria-label="search">
                    <ImSearch color="gray" size={15} />
                  </IconButton>
                )}
                <InputBase
                  style={{
                    margin: searchQuery ? "0 0 0 14px" : "0 0 0 0",
                  }}
                  className="font-bold text-black dark:text-white flex-1"
                  placeholder="Search by name"
                  inputProps={{ "aria-label": "search store" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <IconButton
                    aria-label="search"
                    onClick={() => (setStoreData(), setSearchQuery(""))}
                  >
                    <RxCross2 color="gray" size={15} />
                  </IconButton>
                )}
                <button
                  className="flex justify-center items-center  w-15 h-full font-satoshi text-black dark:text-white"
                  type="submit"
                >
                  Search
                </button>
              </Paper>
            </div>

            <TableContainer className="rounded-sm bg-white dark:border-strokedark dark:bg-boxdark">
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <EnhancedTableHead />
                {isLoading ? (
                  <Loader />
                ) : (
                  <TableBody>
                    {/* (storeData ? storeData : finalStoreData) */}
                    {/* yhh condotion nhh chl rahi theek say */}
                    {(storeData.length >= 0 ? finalStoreData : storeData).map(
                      (row, index) => (
                        <TableRow key={index}>
                          <TableCell className="text-title-md font-bold text-black dark:text-white flex flex-row">
                            <div className="flex flex-1">
                              {row?.image_url?.length > 0 ? (
                                <div
                                  style={{
                                    height: "30px",
                                    width: "40px",
                                    overflow: "hidden",
                                  }}
                                >
                                  <img
                                    style={{ height: "100%", width: "100%" }}
                                    src={row?.image_url[0]?.img}
                                    alt="Product image"
                                  />
                                </div>
                              ) : (
                                "-"
                              )}
                            </div>
                          </TableCell>
                          <TableCell
                            className="text-title-md font-bold text-black dark:text-white"
                            align="center"
                          >
                            {row.title}
                          </TableCell>
                          <TableCell
                            className="text-title-md font-bold text-black dark:text-white"
                            align="center"
                          >
                            <a
                              href={row.product_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {row.product_url}
                            </a>
                          </TableCell>
                          <TableCell
                            className="text-title-md font-bold text-black dark:text-white"
                            align="center"
                          >
                            {row.price}
                          </TableCell>
                          <TableCell
                            className="text-title-md font-bold text-black dark:text-white"
                            align="center"
                          >
                            <button
                              onClick={() =>
                                setShowProductDetail({
                                  visible: true,
                                  id: row._id,
                                })
                              }
                              className="h-8.5 flex justify-center rounded bg-primary dark:bg-white py-2 px-6 font-medium text-white dark:text-black hover:bg-opacity-90"
                            >
                              View
                            </button>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                )}
              </Table>
              {!searchQuery && (
                <div className="flex justify-end h-12 bg-white dark:border-strokedark dark:bg-boxdark p-2 sm:p-4">
                  <div
                    className="flex items-center space-x-2 sm:space-x-4 bg-white dark:bg-boxdark px-2 sm:px-4 rounded-md overflow-x-auto"
                    style={{
                      overflowX: "auto",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    <Pagination>
                      <PaginationContent>
                        {currentPage !== 1 && (
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={() => setCurrentPage(currentPage - 1)}
                            />
                          </PaginationItem>
                        )}
                        {generatePageNumbers().map((page, index) => (
                          <PaginationItem
                            key={index}
                            isActive={currentPage === page}
                            onClick={() =>
                              typeof page === "number" && setCurrentPage(page)
                            }
                          >
                            <PaginationLink href="#">{page}</PaginationLink>
                          </PaginationItem>
                        ))}
                        {currentPage !== totalPages && (
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={() => setCurrentPage(currentPage + 1)}
                            />
                          </PaginationItem>
                        )}
                      </PaginationContent>
                    </Pagination>
                  </div>
                </div>
              )}
            </TableContainer>
            <ProductDetailModal
              id={showProductDetail.id}
              visible={showProductDetail.visible}
              onClose={() => setShowProductDetail({ visible: false, id: "" })}
            />
          </div>
        </div>
      </DefaultLayout>
    </div>
  );
};

export default StoreDetails;

/*
const DATA = {
  data: [
    {
      id: 1,
      product_name: "Shopify.com",
      price: 12,
      link: "https://www.google.com/",
      images: [
        { id: 1, img: Logo },
        { id: 2, img: Logo },
      ],
    },
    {
      id: 2,
      product_name: "Shopify.com",
      price: 12,
      link: "https://www.google.com/",
      images: [],
    },
    {
      id: 3,
      product_name: "zdfdf.com",
      price: 12,
      link: "https://www.google.com/",
      images: [{ id: 1, img: Logo }],
    },
    {
      id: 4,
      product_name: "dfs.com",
      price: 12,
      link: "https://www.google.com/",
      images: [{ id: 1, img: Logo }],
    },
    {
      id: 5,
      product_name: "sssf.com",
      price: 12,
      link: "https://www.google.com/",
      images: [{ id: 1, img: Logo }],
    },
    {
      id: 6,
      product_name: "sdf.com",
      price: 12,
      link: "https://www.google.com/",
      images: [{ id: 1, img: Logo }],
    },
    {
      id: 7,
      product_name: "Shsdfsdsdfopify.com",
      price: 12,
      link: "https://www.google.com/",
      images: [{ id: 1, img: Logo }],
    },
  ],
  total_pages: 111,
  current_page_no: 4,
};
 */
