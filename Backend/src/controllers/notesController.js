import { Note } from "../model/notesSchema.js";

export const getNotes = async (_, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error while getting notes", error);
    res.status(500).json({
      msg: "Internal server Error ",
      error: error,
    });
  }
};
export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found!" });
    res.json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    const newNote = await Note.create({
      title,
      content,
    });
    res.status(200).json({
      msg: "Note created successfully",
      newNote,
    });
  } catch (error) {
    console.error("Error while creating the note", error);
    res.status(500).json({
      msg: "Internal Error",
      error: error,
    });
  }
};
export const updateNote = async (req, res) => {
  const { id } = req.params;

  console.log(id);
  try {
    const { title, content } = req.body;
    console.log(title);
    console.log(content);
    const updatednote = await Note.findByIdAndUpdate(id, {
      title,
      content,
    });
    if (!updatednote) {
      return res.status(400).json({
        msg: "Id is not valid",
      });
    }
    res.status(200).send({
      msg: "Notes updated successfully",
      updatednote,
    });
  } catch (error) {
    console.error("Error while updating the Notes");
    res.status(500).json({
      msg: "Error while updating",
      error,
    });
  }
};

export const delNotes = async (req, res) => {
  try {
    const { id } = req.params; // get note ID from route params

    // Check if note exists
    const note = await Note.findById(id);
    if (!note) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    // Delete the note
    await Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete note",
      error: error.message,
    });
  }
};
