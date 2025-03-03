package st.nuc.edu.cn.mood_note.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import st.nuc.edu.cn.mood_note.service.AdviceService;

@RestController
public class AdviceController {
    @Autowired
    AdviceService adviceService;

    @RequestMapping("/showAdviceList")
    public Object showAdviceList(int mid) {
        return adviceService.showList(mid);
    }

    @RequestMapping("/showOneAdvice")
    public Object showOne(int aid) {
        return adviceService.showOne(aid);
    }

    @RequestMapping("/addAdvice")
    public void addAdvice(int mid, String date, String context) {
        adviceService.addAdvice(mid, date, context);
    }

    @RequestMapping("/ushowAdviceList")
    public Object ushowAdviceList(String uid) {
        return adviceService.ushowList(uid);
    }

    @RequestMapping("/mshowOneAdvice")
    public Object mshowOne(int aid, int mid) {
        return adviceService.mshowOne(aid, mid);
    }
}
