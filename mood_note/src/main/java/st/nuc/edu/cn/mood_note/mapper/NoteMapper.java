package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.*;
import st.nuc.edu.cn.mood_note.entity.Note;
import st.nuc.edu.cn.mood_note.entity.UserDate;

import java.util.List;

@Mapper
public interface NoteMapper {
    @Select("select * from note where uid = #{uid} and date = #{date} ORDER BY ntime DESC")
    List<Note> showList(@Param("uid") String uid, @Param("date") String date);
    @Delete("delete from note where nid = #{nid}")
    boolean deleteNote(@Param("nid") int nid);
    @Select("select * from note where nid = #{nid}")
    Note selectOneByNid(@Param("nid") int nid);
    boolean updateOne(@Param("nid") int nid, @Param("ncontext") String ncontext, @Param("mood") String mood);
    @Insert("insert into note (uid,date,ncontext,ntime,mood) values (#{uid},#{date},#{ncontext},#{ntime},#{mood})")
    boolean insertOne(Note note);
    @Select("select * from note where uid=#{uid} and date=#{date} and ncontext=#{ncontext} and ntime=#{ntime} and mood=#{mood}")
    Note selectOne(Note note);
    @Select("select * from user_date where uid = #{uid} and date = #{date}")
    UserDate gDateMood(@Param("uid")String uid, @Param("date")String date);
    @Insert("insert into user_date (uid,date,date_mood) values (#{uid},#{date},#{dateMood})")
    boolean insert(UserDate userDate);
}
