package st.nuc.edu.cn.mood_note.service;

import org.springframework.stereotype.Service;


@Service
public interface AdviceService {
    Object showList(int mid);
    Object showOne(int aid);
    Object mshowOne(int aid, int mid);
    boolean addAdvice(int mid, String date, String context);
    Object ushowList(String uid);
}
