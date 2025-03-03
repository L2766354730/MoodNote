package st.nuc.edu.cn.mood_note.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import st.nuc.edu.cn.mood_note.service.FeedBackService;

@RestController
public class FeedBackControler {
    @Autowired
    FeedBackService feedBackService;

    @RequestMapping("/uaddFeedBack")
    public void uaddFeedBack(String uid, String date, String context) {
        feedBackService.add(uid, date, context);
    }

    @RequestMapping("/mupdateFeedBack")
    public void mupdateFeedBack(int mid, int fid, String rdate, String rcontext) {
        feedBackService.mupdate(mid, fid, rdate, rcontext);
    }

    @RequestMapping("/showFeedBackList")
    public Object showFeedBackList(String uid) {
        return feedBackService.showFeedBackList(uid);
    }

    @RequestMapping("/getFeedBackContext")
    public Object getFeedBackContext(int fid) {
        return feedBackService.getFeedBackContext(fid);
    }

    @RequestMapping("/showFeedBack")
    public Object showFeedBack(int fid) {
        return feedBackService.showFeedBack(fid);
    }

    @RequestMapping("/feedList")
    public Object feedList(int mid) {
        return feedBackService.feedList(mid);
    }

    @RequestMapping("/respondedList")
    public Object respondedList(int mid) {
        return feedBackService.respondedList(mid);
    }

    @RequestMapping("/rshowFeedBack")
    public Object rshowFeedBack(int fid) {
        return feedBackService.rshowFeedBack(fid);
    }
}
