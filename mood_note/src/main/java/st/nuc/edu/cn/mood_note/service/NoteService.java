package st.nuc.edu.cn.mood_note.service;

import org.springframework.stereotype.Service;
import st.nuc.edu.cn.mood_note.entity.Note;

@Service
public interface NoteService {
    Object getNoteList(String uid, String date);
    boolean deleteNote(int nid);
    Object selectOneByNid(int nid);
    boolean updateOne(int nid, String ncontext, String mood);
    boolean insertOne(Note note);
    Object selectOne(Note note);

}
