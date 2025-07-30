import { useState } from "react";

const useUpdateAdd = () => {
  const [details, setDetails] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: null,
    description: null,
  });

  //handle change
  function handleChange(name, value) {
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  //check empty
  function checkEmpty() {
    if (details.description.length === 0 && details.title.length === 0) {
      setErrors((prev) => ({
        description: "Please enter the description.",
        title: "Please enter title.",
      }));
      return true;
    }
    else if(details.title.length === 0) {
      setErrors((prev) => ({ ...prev, title: "Please enter title." , description : null}));
      return true;

    } else if (details.description.length === 0) {
      setErrors((prev) => ({
        title: null,
        description: "Please enter the description.",
      }));
      return true;
    }
    setErrors((prev) => ({ ...prev, description: null }));
    return false;
  }

  return {
    details,
    handleChange,
    errors,
    setDetails,
    checkEmpty,
  };
};

export default useUpdateAdd;
