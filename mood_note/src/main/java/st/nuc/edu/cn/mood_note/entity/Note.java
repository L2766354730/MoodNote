package st.nuc.edu.cn.mood_note.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Note {
    private int nid;
    private String uid;
    private String date;
    private String ncontext;
    private String ntime;
    private String mood;

}
