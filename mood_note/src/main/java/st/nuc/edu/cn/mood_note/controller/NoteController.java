package st.nuc.edu.cn.mood_note.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import st.nuc.edu.cn.mood_note.entity.Note;
import st.nuc.edu.cn.mood_note.service.NoteService;

@RestController
public class NoteController {
    @Autowired
    NoteService noteService;

    @RequestMapping("/getNoteList")
    public Object getNoteList(String uid, String date) {
        return noteService.getNoteList(uid, date);
    }

    @RequestMapping("/deleteNote")
    public void deleteNote(int nid) {
        noteService.deleteNote(nid);
    }

    @RequestMapping("/selectNoteByNid")
    public Object selectNoteByNid(int nid) {
        return noteService.selectOneByNid(nid);
    }

    @RequestMapping("/updateNoteByNid")
    public void updateNoteByNid(int nid, @RequestParam("context") String ncontext, String mood) {
        noteService.updateOne(nid, ncontext, mood);
    }

    @RequestMapping("/insertNote")
    public Object insertNote(Note note) {

        if (noteService.insertOne(note) == true) {
            return noteService.selectOne(note);
        }
        return null;
    }


}
