import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Contact } from "./models/todo.model";
import { useAddPostMutation, usePostsQuery } from "./services/api";

const App = () => {
  const initS = {
    id: 1,
    userId: 1,
    title: "",
    body: "",
  };
  const [formData, setFormData] = useState(initS);
  const { data, error, isLoading, refetch } = usePostsQuery();
  const [addPost, { data: response }] = useAddPostMutation();

  const addHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    await addPost(formData);
    refetch();
    setFormData(initS);
  };
  response && console.log(response);
  //   console.log(response);
  return (
    <div className="main">
      <h1>React Redux Toolkit RTK Query</h1>
      <div style={{ marginTop: "2rem" }}>
        <form onSubmit={addHandler}>
          <TextField
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData((data) => ({
                ...data,
                title: e.target.value,
              }))
            }
          />
          <TextField
            label="Body"
            value={formData.body}
            onChange={(e) =>
              setFormData((data) => ({
                ...data,
                body: e.target.value,
              }))
            }
          />
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </form>
      </div>
      {isLoading && <h2>...Loading</h2>}

      {error && <h2>Something went wrong</h2>}

      <div className="main__cardcontainer">
        {data?.map((v: Contact) => (
          <div className="main__card" key={v.id}>
            <span>{v.title}</span>
            <span>{v.body}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
