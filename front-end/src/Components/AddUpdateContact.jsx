import { useState } from "react";

const AddUpdateContact = ({ edit }) => {
    const [profileName, setProfileName] = useState("No file chosen.");

    const handleChange = () => {
        const file = document.getElementById("profile");
        if (file.files[0]) {
            const fileName = file.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            setProfileName(fileName);
        }
    };

    return (
        <div>
            <div className="form-wrapper">
                <h2>{edit ? "Edit Contact" : "Add Contact"}</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone *</label>
                        <input
                            type="number"
                            className="form-control"
                            id="number"
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
