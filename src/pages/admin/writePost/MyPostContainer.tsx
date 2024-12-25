/*
 * Mimium Pty. Ltd. ("LKG") CONFIDENTIAL
 * Copyright (c) 2022 Mimium project Pty. Ltd. All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains the property of LKG. The intellectual and technical concepts contained
 * herein are proprietary to LKG and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material is strictly forbidden unless prior written permission is obtained
 * from LKG.  Access to the source code contained herein is hereby forbidden to anyone except current LKG employees, managers or contractors who have executed
 * Confidentiality and Non-disclosure agreements explicitly covering such access.
 */
import React, { FC, useEffect, useState } from "react";
import TableComponent from "../../../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyPostContainer: FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  // Action handlers
  const handleEdit = (row) => {
    navigate(`/MyPost/${row.id}/Edit`);
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete("/posts/" + row.id);
      getMyPost();
    } catch (error) {

    }
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
      style: { minWidth: "80px" }, // set width for this column
      Cell: ({ row }: any) => (
        <div className="text-right">
          <i className="fa fa-pencil cursor-pointer" aria-hidden="true" onClick={() => handleEdit(row.original)} />
          <i className="fa fa-trash ml-2 text-danger cursor-pointer" aria-hidden="true" onClick={() => handleDelete(row.original)} />
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
