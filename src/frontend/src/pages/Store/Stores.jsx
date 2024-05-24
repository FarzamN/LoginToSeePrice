import {
  Pagination,
  PaginationItem,
  PaginationNext,
  PaginationLink,
  PaginationContent,
  PaginationPrevious,
} from "@/components/ui/pagination";
import toast from "react-hot-toast";
import Paper from "@mui/material/Paper";
import { catchErr } from "@/utils/urls";
import Table from "@mui/material/Table";
import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { ImSearch } from "react-icons/im";
import { Loader } from "../../components";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import TableContainer from "@mui/material/TableContainer";
import { setStoreID } from "@/redux/slices/getStoreIdSlice";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";

import {
  useGetStoreMutation,
  useSearchStoreMutation,
} from "@/redux/actions/storeAction";

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell className="text-title-md font-bold text-black dark:text-white">
          Store name
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Products
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Package
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Status
        </TableCell>
        <TableCell
          className="text-title-md font-bold text-black dark:text-white"
          align="center"
        >
          Actions
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const Stores = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [storeData, setStoreData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [finalStoreData, setFinalStoreData] = useState([]);
  useEffect(() => {
    handleGetStoreApi();
  }, [currentPage]);

  const [getStoreApi, { isLoading }] = useGetStoreMutation();
  const handleGetStoreApi = async () => {
    try {
      const page = currentPage;
      const response = await getStoreApi(page);
      const { status, message, data, currentPageNum, totalPage } =
        response?.data;

      if (status === 200) {
        setFinalStoreData(data);
        setCurrentPage(currentPageNum);
        setTotalPages(totalPage);
      } else if (status === 400) {
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
  const [searchStore] = useSearchStoreMutation();
  const handleSearch = async () => {
    const value = searchQuery;
    try {
      const response = await searchStore({ value });
      const { status, message, data } = response?.data;
      if (status === 200) {
        setStoreData(data);
      } else {
        toast.error(message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error(catchErr, { duration: 3000 });
    }
    // const filteredData = finalStoreData.filter((store) =>
    //   store.storeName.toLowerCase().includes(searchQuery.toLowerCase())
    // );
    // setStoreData(filteredData);
  };

  return (
    <div className="w-full">
      <DefaultLayout>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex flex-col sm:flex-row justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Stores
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
                  <TableBody>
                    {(storeData?.length > 0 ? storeData : finalStoreData).map(
                      (row, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="text-title-md font-bold text-black dark:text-white">
                              {row.storeName}
                            </TableCell>
                            <TableCell
                              className="text-title-md font-bold text-black dark:text-white"
                              align="center"
                            >
                              {row.productCount}
                            </TableCell>
                            <TableCell
                              className="text-title-md font-bold text-black dark:text-white"
                              align="center"
                            >
                              {/* {row.package} */}
                              bronze
                            </TableCell>

                            <TableCell
                              className="text-title-md font-bold text-black dark:text-white"
                              align="center"
                            >
                              {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <AntSwitch checked={switchValue === 1} onChange={() => handleSwitchChange(row, switchValue)} inputProps={{ 'aria-label': 'ant design' }} />
                              </div> */}

                              <SwitcherTwo row={row} />
                            </TableCell>

                            <TableCell
                              className="text-title-md font-bold text-black dark:text-white"
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <button
                                onClick={() => {
                                  if (row.productCount > 0) {
                                    navigation("/storedetails");
                                    dispatch(setStoreID(row._id));
                                  } else {
                                    toast.error(
                                      "Cannt navigate cause there isn't any Product",
                                      { duration: 3000 }
                                    );
                                  }
                                }}
                                className="h-8.5 flex justify-center rounded bg-primary dark:bg-white py-2 px-6 font-medium text-white dark:text-black hover:bg-opacity-90"
                              >
                                View
                              </button>
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                  </TableBody>
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
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
};

export default Stores;
