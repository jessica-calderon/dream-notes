import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ dreamId }) => {
  const [commentBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addComment({
        variables: { commentBody, dreamId },
      });

      setBody("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="">
      <div className="">
        <h2 className="">Leave a comment</h2>
      </div>
      <p
        className={`m-2 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count {characterCount}/280
        {error && <span className="">Something went wrong...</span>}
      </p>
      <div className="">
        <div className="">
          <form className="" onSubmit={handleFormSubmit}>
            <textarea
              placeholder=""
              value={commentBody}
              className=""
              onChange={handleChange}
            ></textarea>

            <button className="" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      {error && <div>Something went wrong </div>}
    </div>
  );
};

export default CommentForm;
