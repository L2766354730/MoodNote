package st.nuc.edu.cn.mood_note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FeedBack {
    private int fid;
    private String date;
    private String rdate;
    private String uid;
    private String rcontext;
    private String context;
    private String isRead;
}
