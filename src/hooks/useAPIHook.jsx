import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useAPIHooks({ fetch, create, update, remove }) {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(10);

  const deleteRecord = async (id) => {
    await dispatch(remove(id));
    fetchData();
  };

  const addRecord = async ({ data }) => {
    await dispatch(create(data));
    // .unwrap()
    // .then(() => {
    // setOpen(false);
    // });
    // navigate(-1,{replace:true})
    fetchData();
  };

  const updateRecord = async ({ data }) => {
    await dispatch(update(data))
      .unwrap()
      .then(() => fetchData());
  };

  const fetchData = async () => {
    await dispatch(fetch({ per_page: pageSize })).unwrap();
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return {
    deleteRecord,
    fetchData,
    addRecord,
    updateRecord,
    pageSize,
    setPageSize,
  };
}
