import React, { useEffect, useState } from "react";
import HashTagData from "../components/HashTag/HashTagData";
import { get } from "../Global/api";

const HashTag = () => {
  //     get  for hashtags
  const [hashTags, setHashTags] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const getHashTags = async () => {
    try {
      const response = await get("/hashTags");
      // console.log(response);
      setHashTags(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHashTags();
  }, [refresh]);

  return (
    
      <div>
        <HashTagData hashData={hashTags} refresh={refresh} setRefresh={setRefresh}/>
      </div>
  
  );
};

export default HashTag;
