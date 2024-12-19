import React, { useEffect, useState } from "react";
import { IPostResponse } from "./types/general";
import axios from "axios";
import { format } from "date-fns";

function App() {

  const [posts, setPosts] = useState<IPostResponse[]>([]);

  const getPosts = async () => {
    try {
      const data = await axios.get("/public/posts");
      setPosts(data.data.content || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [])

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {posts?.map((p) => {
            return <div className="col-md-12 mb-3" key={p.id}>
              <div className="card">
                <div className="card-header">
                  <h3 className="title">{p.title}</h3>
                </div>

                <div className="card-body">
                  {p.content}
                </div>

                <div className="card-footer">
                  <p>
                    <span>Author: </span>
                    <span>{p.author} </span>
                    <span>at {format(new Date(p.updatedAt), "dd/MM/yyyy HH:mm")}</span>
                  </p>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>


    </>
  );
}

export default App;
