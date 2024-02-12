import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { addVoter } from "@/utils/addVoter";

import { VotersContext } from "@/context/Voters.context";

function RegisterVoters({ title, titleFont }) {
  const [inputAddress, setInputAddress] = useState("");
  // const { votersWhitelist, setVotersWhitelist } = useContext(VotersContext);

  const handleChange = (e) => {
    setInputAddress(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addVoter(inputAddress);
      if (data.status === "success") {
        setVotersWhitelist((prev) => [...prev, inputAddress]);
        setInputAddress("");
        toast.success(`Voter ${inputAddress} added to whitelist`);
      } else {
        toast.error("Voter registration failed", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error during transaction:", error);
      toast.error("Voter registration failed", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    console.log("New voter added to whitelist: ", votersWhitelist);
  }, [votersWhitelist]);

  return (
    <>
      <h2
        className={`${titleFont.className} text-3xl font-bold text-center bg-blue-600 text-gray-900 py-2`}
      >
        {title}
      </h2>
      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-y-3 p-5 text-indigo-200"
      >
        <input
          type="text"
          value={inputAddress}
          placeholder="enter voter's address..."
          onChange={handleChange}
          className="p-2 bg-blue-100 rounded-sm placeholder-blue-500 font-semibold text-gray-900 w-2/3 my-3"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="text-green-400 border-2 tracking-wide font-semibold w-fit self-center p-2 rounded-md border-green-400 hover:bg-green-950 hover:translate-y-1"
        >
          Register voter
        </button>
      </form>
    </>
  );
}

export default RegisterVoters;
