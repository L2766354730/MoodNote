package st.nuc.edu.cn.mood_note.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Manager {
    private int mid;
    private String openid;
    private String password;
}
