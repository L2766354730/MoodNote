package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.*;
import st.nuc.edu.cn.mood_note.entity.Advice;

import java.util.List;

@Mapper
public interface AdviceMapper {
    @Select("select * from advice ORDER BY date DESC")
    List<Advice> showList();
    @Select("select * from advice where aid = #{aid}")
    Advice showOne(@Param("aid") int aid);
    @Insert("insert into advice (date, context) values (#{date},#{context})")
    boolean addAdvice(@Param("date") String date, @Param("context") String context);
    @Update("update advice set is_read = #{isRead} where aid = #{aid}")
    Boolean updateRead(@Param("aid") int aid, @Param("isRead")String isRead);
}
