import AddUpdateContact from "./AddUpdateContact";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearContact } from "../redux/actions/contact";

const AddContact = () => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(clearContact());
    // }, []);

    return <AddUpdateContact />;
};

export default AddContact;
