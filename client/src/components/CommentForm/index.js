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
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Leave a comment
        </h2>
      </div>
      <p
        className={`m-2 ${characterCount === 280 || error ? "text-error" : ""}`}
      >
        Character Count {characterCount}/280
        {error && <span className="m-3">Something went wrong...</span>}
      </p>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="mb-14 space-y-8" onSubmit={handleFormSubmit}>
            <textarea
              placeholder="Leave a comment to this dream"
              value={commentBody}
              className="mt-6 text-center text-3xl font-extrabold text-gray-900"
              onChange={handleChange}
            ></textarea>

            <button
              className="mt-10 w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
            >
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
