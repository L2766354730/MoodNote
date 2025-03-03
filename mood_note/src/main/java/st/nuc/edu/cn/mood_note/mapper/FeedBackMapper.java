package st.nuc.edu.cn.mood_note.mapper;

import org.apache.ibatis.annotations.*;
import st.nuc.edu.cn.mood_note.entity.FeedBack;

import java.util.List;

@Mapper
public interface FeedBackMapper {
    @Insert("insert into feedback (uid, date, context) values (#{uid},#{date},#{context})")
    boolean add(@Param("uid")String uid, @Param("date")String date, @Param("context")String context);
    @Update("update feedback set rdate = #{rdate}, rcontext = #{rcontext} where fid = #{fid}")
    boolean mupdate(@Param("fid") int fid, @Param("rdate")String rdate, @Param("rcontext")String rcontext);
    @Select("select * from feedback where trim(rcontext)!='' ORDER BY date DESC")
    List<FeedBack> showFeedBackList();
    @Select("select * from feedback where fid = #{fid}")
    FeedBack getFeedBack(@Param("fid") int fid);
    @Select("select * from feedback where trim(rcontext)!='' ORDER BY rdate DESC")
    List<FeedBack> respondedList();
    @Select("select * from feedback where rcontext is null or trim(rcontext)='' ORDER BY rdate DESC")
    List<FeedBack> feedList();
    @Update("update feedback set is_read = #{isRead} where fid = #{fid}")
    Boolean updateRead(@Param("fid") int fid, @Param("isRead")String isRead);
}
