package st.nuc.edu.cn.mood_note.service;

import org.springframework.stereotype.Service;
import st.nuc.edu.cn.mood_note.entity.UserDate;

@Service
public interface UserDateService {
    Object gDateMood(String uid, String date);
    boolean mixOperate(UserDate userDate);
    Object selectAllMood(String uid, String year, String month);
}
