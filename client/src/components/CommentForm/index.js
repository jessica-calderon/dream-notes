import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ dreamId }) => {
  const [commentBody, setBody] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleChange = (event) => {
    if (event.target.value.length <= 1280) {
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
    <div className="form-card bg-beige w-100 p-3 border-radius">
      <p
        className={`heading card__text  ${
          characterCount === 1280 || error ? "text-error" : ""
        }`}
      >
        Character Count {characterCount}/1280
        {error && <span className="">Something went wrong...</span>}
      </p>
      <form className="cards  m-2 " onSubmit={handleFormSubmit}>
        <textarea
          placeholder="Comment on this dream"
          value={commentBody}
          className="form-card  w-100 card-4 p-3"
          onChange={handleChange}
        ></textarea>

        <button className="btn b-block w-100 mx-3" type="submit">
          Comment 💭
        </button>
      </form>
      {error && <div>Something went wrong </div>}
    </div>
  );
};

export default CommentForm;
