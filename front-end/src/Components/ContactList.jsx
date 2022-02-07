import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContacts } from "../redux/actions/contacts";

const ContactList = () => {
    const contacts = useSelector((state) => state.contacts.contacts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchContacts = async () => {
        const res = await axios.get("/contacts").catch((e) => navigate("/"));
        dispatch(setContacts(res.data));
    };

    const deleteContact = async (id) => {
        await axios
            .delete(`/contacts/${id}`)
            .catch((e) => console.log(e.message));
        fetchContacts();
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="contact-wrapper">
            <h2>Contacts</h2>
            <div className="contacts">
                {contacts.map((contact) => {
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
                                    onClick={() => deleteContact(contact._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ContactList;
