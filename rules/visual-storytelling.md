# Visual Storytelling Rules — thiết kế cho điện thoại

## Phạm vi

Áp dụng cho video tạo mới và chỉnh sửa được người dùng yêu cầu; không tự sửa/render lại video cũ. Trước khi dựng, đọc AGENTS.md, tài liệu thiết kế/brand, cấu trúc project và scene/component thực sự được dùng. Giữ engine, nội dung, thương hiệu và phong cách hiện có.

Quy tắc này thay thế hướng dẫn cũ về cỡ chữ cố định, thẻ tối đa hai dòng, phụ đề một dòng hoặc phóng to từ đang đọc. Các token trong component là điểm thử, không phải chứng nhận dễ đọc.

## Thiết kế riêng từng thẻ

1. Xác định một ý chính; phân cấp tiêu đề, nội dung, số liệu, đơn vị, điều kiện và nhãn phụ. Điều kiện quan trọng phải đọc được và đi cùng claim liên quan.
2. Áp dụng 6 Bố cục thẻ chuẩn (Card Archetypes) theo [card-archetypes.md](file:///d:/AI/VIDEO%20AI/rules/card-archetypes.md): Hero Metric + Footnote, Side-by-Side Comparison, 3-Column Feature Grid, Sequential Step Flow, Checklist & Status Badge, Quote & Official Statement.
3. Agent tự chọn hướng xếp, số cột, chiều rộng/cao, padding, khoảng cách, căn hàng, ngắt dòng và vị trí icon/badge theo nội dung và diện tích cảnh. Không dùng một cấu hình chung làm đáp án cho mọi thẻ.
4. Giữ font, màu và chất liệu của project. Dùng thứ bậc, khoảng thở và căn hàng phù hợp video; không bê bố cục website, thêm glass/glow/uppercase hoặc viền kép khi không thuộc phong cách hiện có.
5. Các khoảng font size chỉ là điểm thử. Khả năng đọc thực tế tại khoảng 360×640 mới là tiêu chí. Tăng đồng loạt cỡ chữ, đặt cỡ cố định hoặc thuật toán tự co chữ không hoàn thành công việc thiết kế.
6. Khi chật: cân lại lượng chữ hiển thị, ngắt dòng theo nghĩa, icon/badge, số cột, diện tích thẻ hoặc chia thành nhịp khác; sau đó mới chỉnh cỡ chữ. Có thể hơn hai dòng nếu dễ đọc và đủ thời gian.
7. Không cắt chữ, giấu chữ bằng overflow-hidden/ellipsis/line-clamp hoặc thu nhỏ cả thẻ. Mask cho hiệu ứng được phép nhưng trạng thái đọc phải hiện đầy đủ. Giữ số liệu, đơn vị, mốc thời gian, phủ định và điều kiện quan trọng.
8. Nếu biên tập có thể đổi nghĩa, đối chiếu lời đọc và nguồn; ghi bản trước/sau và căn cứ trong storyboard hoặc qc.md. Chưa chắc thì giữ ý và sửa bố cục. Chia nhịp phải bám timing thật, không tự đổi voice đã duyệt.
9. Giữ khoảng thở có chủ đích và một điểm nhìn chính. Không ép tọa độ chung, không thêm thẻ chỉ để lấp chỗ trống. Chừa vùng phụ đề theo kích thước thực tế lớn nhất và UI nền tảng.

Trong storyboard hiện có, ghi cho từng thẻ: ý chính; phần bắt buộc giữ; thứ bậc; bố cục chọn và lý do; thời điểm toàn bộ chữ hiện. Không cần tạo thuật toán layout hay abstraction mới để đáp ứng quy tắc.

## Phụ đề theo từng từ

- Chuẩn bị cụm trước khi phát theo nghĩa, dấu câu, khoảng nghỉ và chiều rộng thực tế với font đã tải. Đối chiếu script khi word timing thiếu dấu câu. Không chia máy móc mỗi 4–5 từ.
- Hiện sẵn toàn bộ cụm ngắn ngay khi bắt đầu đọc cụm. Từ đã đọc và chưa đọc cùng màu thường; chỉ từ đang đọc đổi màu highlight. Không tô theo danh sách từ khóa.
- Giữ nguyên font size, weight, scale, khoảng cách, khung và xuống dòng trong cụm. Không reflow theo active word. Nếu chật, chia cụm lại hoặc xác định dòng trước, không shrink-to-fit.
- Dùng timing thật và fps của composition. Ẩn toàn bộ phụ đề gồm nền/viền khi im lặng. Timing căn chỉnh ước lượng phải ghi rõ và kiểm tra nghe/nhìn; không gọi là đồng bộ chính xác.

## Visual storytelling

- Text hỗ trợ visual, không chép narration thành slide chữ.
- Mỗi beat có visual action có nghĩa: grow, draw, flow, fill, stack, split, merge, connect, count, morph, expand, collapse, focus, track, reveal, highlight hoặc interrupt.
- Ưu tiên continuity: cảnh sau kế thừa trạng thái trước khi hợp lý. Motion diễn giải ý, không chỉ trang trí. Voice và timing thật là master timeline.

## QA bằng hình ảnh thực tế

1. Render frame khi toàn bộ chữ mỗi cảnh đã xuất hiện ổn định. Cảnh có nhiều trạng thái thẻ phải chụp từng trạng thái; không chỉ chụp giữa cảnh.
2. Xem từng ảnh gốc và bản khoảng 360×640. Kiểm tra ý chính, chữ nhỏ nhất có ý nghĩa, dấu tiếng Việt, điều kiện/đơn vị, tương phản, khoảng thở, clipping/chồng lấn và vùng phụ đề. Contact sheet chỉ hỗ trợ tổng quan.
3. Kiểm tra thêm đầu/giữa/cuối cụm, chuyển cụm, khoảng lặng và cảnh đông chữ nhất. Thẻ phải có đủ thời gian đọc sau khi xuất hiện.
4. Tự sửa từng thẻ chưa đạt, render lại và xem lại đến khi đạt. Ghi scene/card, frame/time, đường dẫn ảnh gốc/360×640, lỗi, sửa đổi và kết quả vào qc.md. Chưa xem thì ghi chưa kiểm tra.
5. Chạy lint/typecheck nếu có. Khi có MP4 mới: dùng FFprobe kiểm tra streams, codec, kích thước, fps, duration theo spec; FFmpeg trích frame từ chính MP4 đó để xem lại. Kiểm tra motion/audio thực tế. Lint hoặc exit code không chứng minh hình ảnh đạt.
6. Khi được yêu cầu video hoàn chỉnh, chỉ bàn giao một MP4 ở output chuẩn (Factory: projects/<id>/output/final.mp4); cập nhật chính file đó khi có feedback. Không giao preview/v001/v002. Chỉ báo final/QA đạt sau kiểm tra cả kỹ thuật lẫn hình ảnh thực tế.
