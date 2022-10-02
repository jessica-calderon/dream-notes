import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_DREAM } from "../../utils/mutations";
import { QUERY_DREAMS, QUERY_ME } from "../../utils/queries";

const DreamForm = () => {
  const [dreamText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addDream, { error }] = useMutation(ADD_DREAM, {
    update(cache, { data: { addDream } }) {
      // try/catch statment in case no dream yet
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, dreams: [...me.dreams, addDream] } },
        });
      } catch (e) {
        console.warn("First dream added by user!");
      }

      // update dream array's cache
      const { dreams } = cache.readQuery({ query: QUERY_DREAMS });
      cache.writeQuery({
        query: QUERY_DREAMS,
        data: { dreams: [addDream, ...dreams] },
      });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 1280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
      
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault(); 
    window.location.reload(false);

    try {
      await addDream({
        variables: { dreamText },
      });

      // clear form value
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="containerDream cards">
      <div className="form-card card-3 w-100 p-3 border-radius">
      <p
        className={`mb-2 ${characterCount === 1280 || error ? "text-error" : ""}`}
      >
        <span className="text-beige text-bold m-2">Character Count: {characterCount}/1280</span><br />
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="DreamForm"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Share my dream..."
          value={dreamText}
          className="form-input m-1 form w-100 p-3 border-radius"
          onChange={handleChange}
        ></textarea><br />
        <button className="btn mt-2" type="submit">
          Share Your Dreams 💭
        </button>
      </form>
    </div>
    </div>
  );
};

export default DreamForm;
