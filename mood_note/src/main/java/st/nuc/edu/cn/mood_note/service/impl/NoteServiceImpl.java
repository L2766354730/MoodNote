package st.nuc.edu.cn.mood_note.service.impl;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import st.nuc.edu.cn.mood_note.entity.Note;
import st.nuc.edu.cn.mood_note.entity.UserDate;
import st.nuc.edu.cn.mood_note.mapper.NoteMapper;
import st.nuc.edu.cn.mood_note.service.NoteService;

import java.util.ArrayList;
import java.util.List;

@Component
public class NoteServiceImpl implements NoteService {
    @Autowired
    NoteMapper noteMapper;


    @Override
    public Object getNoteList(String uid, String date) {
        List<Object> simpleList = new ArrayList();
        List<Note> noteList = noteMapper.showList(uid, date);
        JSONObject object1 = new JSONObject();
        if(!noteList.isEmpty()) {
            for (Note note : noteList) {
                JSONObject object = new JSONObject();
                String s = null;
                String context = note.getNcontext();
                if (context.length() > 11) {
                    s = context.substring(0,12);
                } else {
                    s = context.substring(0, context.length());
                }
                String s1 = note.getDate().substring(5, 10).replace("-", "月").replace("0", "");

                String s2 = s1 + "日 " + note.getNtime();
                object.put("nid", note.getNid());
                object.put("time", s2);
                object.put("context", s);
                object.put("mood", note.getMood());

                simpleList.add(object);

            }
            object1.put("noteList", simpleList);
        }
        return object1;
    }

    @Override
    public boolean deleteNote(int nid) {
        return noteMapper.deleteNote(nid);
    }

    @Override
    public Object selectOneByNid(int nid) {
        Note note = noteMapper.selectOneByNid(nid);
        if (note != null) {
            JSONObject object = new JSONObject();
            object.put("context", note.getNcontext());
            return object;
        } else {
            return null;
        }
    }

    @Override
    public boolean updateOne(int nid, String ncontext, String mood) {
        Note note = noteMapper.selectOneByNid(nid);
        if (note.getNcontext().equals(ncontext)) {
            ncontext = null;
        }
        if (note.getMood().equals(mood)) {
            mood = null;
        }
        return noteMapper.updateOne(nid, ncontext, mood);
    }

    @Override
    public boolean insertOne(Note note) {
        if (noteMapper.gDateMood(note.getUid(), note.getDate()) == null) {
            UserDate userDate = new UserDate(note.getUid(), note.getDate(), note.getMood());
            noteMapper.insert(userDate);
        }
        return noteMapper.insertOne(note);
    }

    public Object selectOne(Note note){
        Note note1 = noteMapper.selectOne(note);
        if (note1 != null) {
            JSONObject object = new JSONObject();
            object.put("nid", note1.getNid());
            return object;
        } else {
            return null;
        }
    }

}
