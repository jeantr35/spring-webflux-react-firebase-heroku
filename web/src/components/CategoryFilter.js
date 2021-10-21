import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchCategoryQuestions } from "../actions/questionActions";

const CategoryFilter = (dispatch, renderQuestions) => {

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data.type);
        dispatch(fetchCategoryQuestions(data.type));
    };

    return ( 
        <form onSubmit={handleSubmit(onSubmit)} >
            <div id="CategoryFilter">
                <label for="type">Type</label>
                <select {...register("type")} id="">
                        <option value="TECHNOLOGY-AND-COMPUTER">TECHNOLOGY AND COMPUTER</option>
                        <option value="SCIENCES">SCIENCES</option>
                        <option value="SOFTWARE-DEVELOPMENT">SOFTWARE DEVELOPMENT</option>
                        <option value="SOCIAL-SCIENCES">SOCIAL SCIENCES</option>
                        <option value="LANGUAGE">LANGUAGE</option>
                </select>
                <button type="submit" className="button">Filter</button>
            </div>
        </form>
     );
                
}

 
export default CategoryFilter;