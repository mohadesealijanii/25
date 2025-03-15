import React, { useEffect, useState } from "react";
import Table from "../../modules/Table";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function BookCategoryPage() {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = Cookies.get("authToken");
  const fetchData = async () => {
    try {
      if (!token) {
        toast.error("You're not logged in");
        return;
      }

      setLoading(true);
      const res = await fetch(
        "https://stg-core.bpapp.net/api/BookCategory/GetAllBookCategories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setInfo(data.data);
    } catch (error) {
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [info]);

  return (
    <Table
      info={info}
      setInfo={setInfo}
      fetchData={fetchData}
      title="Books Category"
      loading={loading}
    />
  );
}

export default BookCategoryPage;
