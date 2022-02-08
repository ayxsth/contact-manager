import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import AddUpdateContact from "./AddUpdateContact";
import { setContact, clearContact } from "../redux/actions/contact";

const UpdateContact = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchContact = async (id) => {
        try {
            const res = await axios.get(`/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            dispatch(setContact(res.data));
        } catch (e) {
            navigate("/");
        }
    };

    useEffect(() => {
        fetchContact(id);
        return () => {
            dispatch(clearContact());
        };
    }, []);

    return <AddUpdateContact edit={true} />;
};

export default UpdateContact;
