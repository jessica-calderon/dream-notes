import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_DREAM } from "../../utils/mutations";
import { QUERY_DREAMS, QUERY_ME } from "../../utils/queries";

const DreamForm = () => {
  const [dreamText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addDream, { error }] = useMutation(ADD_DREAM, {
    update(cache, { data: { addDream } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, dreams: [...me.dreams, addDream] } },
        });
      } catch (e) {
        console.warn("First dream insertion by user!");
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
    <div>
      <p
<<<<<<< HEAD
        className={`m-0 ${characterCount === 280 || error ? "text-error" : ""}`}
=======
        className={`m-0 ${characterCount === 1280 || error ? 'text-error' : ''}`}
>>>>>>> 2c028a167083ce2fe80ce461581a57f9744f8378
      >
        Character Count: {characterCount}/1280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new dream..."
          value={dreamText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DreamForm;
