import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import RateLimit from "../components/RateLimit";
import NoteCard from "../components/NoteCard";
import { toast } from "react-hot-toast"; // optional if using toast notifications
import NotesNotFound from "../components/NotesNotFound";

const HomePage = () => {
  const [isRateLimit, setRateLimit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/get");
        console.log("Fetched notes:", res.data);

        // ✅ handle if API returns {notes: [...]}
        const data = Array.isArray(res.data) ? res.data : res.data.notes;

        setNotes(data || []);
        setRateLimit(false);
      } catch (error) {
        console.error("Error while fetching the notes:", error);
        if (error.response && error.response.status === 429) {
          setRateLimit(true);
        } else {
          toast?.error?.("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      {isRateLimit && <RateLimit />}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Notes...</div>
        )}
        {notes.length === 0 && !isRateLimit && <NotesNotFound />}

        {!loading && notes.length === 0 && !isRateLimit && (
          <div className="text-center text-gray-500 py-10">No notes found.</div>
        )}

        {!loading && notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
