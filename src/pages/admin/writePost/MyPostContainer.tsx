import React, { FC, useEffect, useState } from "react";
import TableComponent from "../../../components/Table";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPostContainer: FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Action handlers
  const handleEdit = (row) => {
    navigate(`/MyPost/${row.id}/Edit`);
  };

  const handleDelete = (row) => {
    alert(`Deleting ${row.title}`);
  };

  const getMyPost = async () => {
    try {
      const rs = await axios.get("/myposts");
      setPosts(rs.data?.content);
    } catch (error) {

    }
  }

  useEffect(() => {
    getMyPost();
  }, [])


  const columns = [
    {
      id: "title",
      Header: "Title",
      accessor: "title"
    },
    {
      Header: "",
      id: "actions", // unique id for the column
      style: { width: "100px" }, // set width for this column
      Cell: ({ row }: any) => (
        <div className="text-right">
          <Button variant="warning" className="mr-2" onClick={() => handleEdit(row.original)}>
            <i className="fa fa-pencil" aria-hidden="true" />
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.original)}>
            <i className="fa fa-trash" aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ]

  return <div className="row">
    <div className="col-lg-12">
      <TableComponent columns={columns} data={posts} />
    </div>
  </div>
}

export default MyPostContainer;
