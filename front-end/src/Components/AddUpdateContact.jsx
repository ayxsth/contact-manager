import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddUpdateContact = ({ edit }) => {
    const contact = useSelector((state) => state.contact);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");
    const [profileName, setProfileName] = useState("No file chosen.");

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
        if (edit) {
            updateContact(formData);
        } else {
            saveContact(formData);
        }
    };

    const saveContact = async (formData) => {
        await axios
            .post("/contacts", formData)
            .catch((e) => console.log(e.message));
        navigate("/");
    };

    const updateContact = async (formData) => {
        await axios
            .put(`/contacts/${contact._id}`, formData)
            .catch((e) => console.log(e.message));
        navigate("/");
    };

    useEffect(() => {
        setName(contact.name);
        setPhone(contact.phone);
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
                    {/* {!register && <p>Incorrect credentials!</p>} */}
                    <div className="form-action">
                        <button type="submit">
                            {edit ? "Update" : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUpdateContact;
