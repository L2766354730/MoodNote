package st.nuc.edu.cn.mood_note.service;

import org.springframework.stereotype.Service;


@Service
public interface FeedBackService {
    boolean add(String uid, String date, String context);
    boolean mupdate(int mid, int fid, String rdate, String rcontext);
    Object showFeedBackList(String uid);
    Object getFeedBackContext(int fid);
    Object rshowFeedBack(int fid);
    Object respondedList(int mid);
    Object feedList(int mid);
    Object showFeedBack(int fid);
}
