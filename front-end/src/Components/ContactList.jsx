import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContacts } from "../redux/actions/contacts";

const ContactList = () => {
    const contacts = useSelector((state) => state.contacts.contacts) || [];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchContacts = async () => {
        try {
            const res = await axios.get("/contacts", {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            dispatch(setContacts(res.data));
        } catch (e) {
            navigate("/");
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`/contacts/${id}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
        } catch (e) {}
        fetchContacts();
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="contact-wrapper">
            <h2>Contacts</h2>
            <div className="contacts">
                {contacts.length > 0 &&
                    contacts
                        //sort by name
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((contact) => {
                            return (
                                <div className="contact" key={contact._id}>
                                    <img
                                        src={contact.image}
                                        alt="profile"
                                        width="100px"
                                    />
                                    <div className="contact-info">
                                        <h3>{contact.name}</h3>
                                        <span>{contact.phone}</span>
                                    </div>
                                    <div className="actions">
                                        <Link
                                            className="btn"
                                            to={`/update-contact/${contact._id}`}
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="btn"
                                            onClick={() =>
                                                deleteContact(contact._id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                {contacts.length <= 0 && (
                    <div className="no-data-wrapper">
                        <h3 className="no-data">No contacts found!</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactList;
