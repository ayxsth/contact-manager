import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setProcess } from "../redux/actions/process";
import { getError, clearError } from "../redux/actions/error";

const AddUpdateContact = ({ edit }) => {
    const contact = useSelector((state) => state.contact);
    const process = useSelector((state) => state.process);
    const { isProcessing } = process;
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [profileName, setProfileName] = useState("No file chosen.");
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    const handleChange = () => {
        const file = document.getElementById("profile");
        if (file.files[0]) {
            setImage(file.files[0]);
            const fileName = file.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            setProfileName(fileName);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", name);
        formData.append("phone", phone);
        formData.append("image", image);
        dispatch(clearError());
        dispatch(setProcess({ isProcessing: true }));
        if (edit) {
            updateContact(formData);
        } else {
            saveContact(formData);
        }
    };

    const saveContact = async (formData) => {
        try {
            await axios.post("/contacts", formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            navigate("/");
        } catch (e) {
            dispatch(getError("Invalid inputs!"));
            dispatch(setProcess({ isProcessing: false }));
        }
    };

    const updateContact = async (formData) => {
        try {
            await axios.put(`/contacts/${contact._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            navigate("/");
        } catch (e) {
            dispatch(getError("Invalid inputs!"));
            dispatch(setProcess({ isProcessing: false }));
        }
    };

    useEffect(() => {
        setName(contact.name);
        setPhone(contact.phone);
        return () => {
            dispatch(clearError());
            dispatch(setProcess({ isProcessing: false }));
        };
    }, [contact]);

    return (
        <div>
            <div className="form-wrapper">
                <h2>{edit ? "Edit Contact" : "Add Contact"}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input
                            type="number"
                            className="form-control"
                            id="number"
                            value={phone || ""}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile">Profile Image</label>
                        <div className="file-container">
                            <input
                                type="file"
                                id="profile"
                                hidden
                                onChange={handleChange}
                                accept=".png, .jpg, .jpeg"
                                name="image"
                            />
                            <label htmlFor="profile">Choose File</label>
                            <span id="profile-name">{profileName}</span>
                        </div>
                    </div>
                    {error && <p>{error}</p>}
                    <div className="form-action">
                        <button type="submit" disabled={isProcessing}>
                            {edit
                                ? isProcessing
                                    ? "Updating"
                                    : "Update"
                                : isProcessing
                                ? "Saving"
                                : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUpdateContact;
