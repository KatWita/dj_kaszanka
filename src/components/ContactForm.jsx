import { useState } from "react";
import MainButton from "./MainButton";

const ContactForm = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("You have sent a message!");

    setNameInput("");
    setEmailInput("");
    setMessageInput("");
  };

  return (
    <form
      className="mt-10 flex flex-col gap-6 lg:mt-12"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className=" bg-input-bg px-5 py-3 text-[0.875rem] text-main-r placeholder:text-[0.875rem] placeholder:text-main-r"
        placeholder="Name"
        id="name"
        name="name"
        value={nameInput}
        onChange={(e) => setNameInput(e.target.value)}
      />
      <input
        type="email"
        className=" bg-input-bg px-5 py-3 font-encode-sans text-[0.875rem] font-medium text-main-r placeholder:text-[0.875rem] placeholder:text-main-r"
        placeholder="E-mail"
        id="email"
        name="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
      />
      <textarea
        cols="30"
        rows="10"
        className="resize-none bg-input-bg px-5 py-3 text-[0.875rem] text-main-r placeholder:text-[0.875rem] placeholder:text-main-r"
        placeholder="Message"
        name="message"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <MainButton
        type="submit"
        content="SEND"
        to="#"
        classnames="lg:w-[174px]"
      />
    </form>
  );
};
export default ContactForm;
