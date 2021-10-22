import React from 'react';
import { browser, useHistory } from 'react-router';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

const Autoomplete = (questions) => {
    const URL_BASE = 'https://pure-tor-90145.herokuapp.com';

    const items = questions.questions;
    const history = useHistory();
    
      const handleOnSearch = (string, results) => {
        document.addEventListener("keydown", function(ev){
            if (ev.key === "Enter") {
                if (results[0] !== undefined) {
                    history.push(`/question/${results[0].id}`) 
                }       
            }});
      }
    
      const handleOnHover = (result) => {

      }
    
      const handleOnSelect = (item) => {
        
      }
    
      const handleOnFocus = () => {
        
      }
    
      return (
        <div className="App">
          <header className="App-header">
            <div style={{ width: 400 }}>
              <ReactSearchAutocomplete
                items={items}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                fuseOptions={{ keys: ["question"], minMatchCharLength: 3}}
                resultStringKeyName="question"
                autoFocus
              />
            </div>
          </header>
        </div>
      )
}
 
export default Autoomplete;