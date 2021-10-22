import React, { useState } from "react";
import { useHistory } from "react-router";

const Autoomplete = (questions) => {
  const history = useHistory();
  const [suggest, setSuggest] = useState([]);
  const [resfound, setResfound] = useState(true);
  const [searchtext, setSearchtext] = useState("");
  const items = questions.questions;

  const handleChange = (e) => {
      let searchval = e.target.value;
      let suggestion = [];
      if (searchval.length > 0) {
        suggestion = items
          .sort()
          .filter((e) => e.question.toLowerCase().includes(searchval.toLowerCase()));
          setResfound(suggestion.length !== 0 ? true : false);
      }
      setSuggest(suggestion)
      setSearchtext(searchval);
  }

  const suggestedText = (value) => {
    console.log(value);
    setSearchtext(value);
    setSuggest([]);
  };

  const getSuggestions = () => {
    if (suggest.length === 0 && searchtext !== "" && !resfound) {
      return <p>Search Content Not Found</p>;
    }
    return (
        <ul>
          {suggest.map((item, index) => {
            return (
              <div key={index}>
                <li onClick={() => suggestedText(item.question)}>{item.question}</li>
                {index !== suggest.length - 1 && <hr />}
              </div>
            );
          })}
        </ul>
      );
    }


    const handleEnter = (ev) => {
        if(ev.key == 'Enter'){
            suggest.length > 0 ? history.push(`/question/${suggest[0].id}`) : history.push(`/questions`)
         } 
    }


  return (
    <div>
      <input
        type="text"
        placeholder="search"
        onChange={handleChange}
        value={searchtext}
        className="search"
        onKeyDown={handleEnter}
      />
      {getSuggestions()}
    </div>
  );
};

export default Autoomplete;
