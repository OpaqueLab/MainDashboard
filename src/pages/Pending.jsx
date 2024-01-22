import { Center, Pagination, Select } from "@mantine/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { get } from "../Global/api";
import PendingTable from "../components/Table/PendingTable";
import Loading from "../components/Loading/Loading";

const Pending = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh,setRefresh] = useState(false)

  // for limit
  const [limit, setLimit] = useState(10);
  // for pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  // console.log(page)
  // console.log(limit)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(
          `/blogs?pending=true&page=${page}&limit=${limit}`
        );
        // console.log(response);
        setData(response?.data?.data);
        setPagination(response?.data?.pagination);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page, limit,refresh]);

  if (loading) {
    return (
      <div className="">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <h1 className="font-bold text-3xl text-[#344767] dark:text-white">Pending Blogs</h1>
      <div className="shadow-lg rounded-md border mt-5 dark:border-primary dark:bg-secondary">
        {/* Filter entries select and Add program Button*/}
        <div className="px-3 py-5 border-b flex items-center justify-start dark:border-primary">
          <div className="flex items-center gap-2">
            {/* Select */}
            <Select
              className="w-[70px]"
              value={limit}
              onChange={setLimit}
              data={[
                { value: 5, label: "5" },
                { value: 10, label: "10" },
                { value: 20, label: "20" },
              ]}
              styles={{
                label: { color: "white" },
                input: { ":focus": { borderColor: "#13C4E0" } },
                item: {
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor: "#13C4E0",
                      color: "white",
                    },
                  },
                },
              }}
            />
            <p className="text-sm font-semibold text-gray-700 dark:text-white">
              entries per page
            </p>
          </div>
          
        </div>

        {/* Table */}
        <PendingTable setRefresh={setRefresh} refresh={refresh} data={data} />

        {/* Pagination */}
        <div className="border-t dark:border-primary">
          <Center my={"lg"}>
            <Pagination
              onChange={setPage}
              value={page}
              total={pagination?.totalPages}
              styles={{
                control: {
                  color: "#344767",
                  borderRadius: "100%",

                  "&[data-active]": {
                    borderColor: "white",
                    //   backgroundColor:'#218FFE',
                    backgroundImage: "linear-gradient(#1BCCE8,#0CBCDA)",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                  },
                  "&[data-active]&:not([data-disabled]):hover": {
                    backgroundColor: "#3D3F3D70",
                  },
                  "&:not([data-disabled]):hover": {
                    backgroundColor: "#ddd",
                  },
                },
                dots: {
                  color: "black",
                },
              }}
            />
          </Center>
        </div>
      </div>
    </div>
  );
};

export default Pending;
