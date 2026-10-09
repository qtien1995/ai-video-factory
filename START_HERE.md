# START HERE — AI VIDEO FACTORY V2

Bạn không cần biết code để bắt đầu. Mở Codex tại `D:\VIDEO AI` và gửi idea/URL/source text theo cách bình thường.

## Quy trình làm một video

1. Codex làm Story Pass: research (nếu cần), narration, beats, rough visual actions.
2. Bạn duyệt Script + Beats.
3. Codex đưa tối đa 3 Creative Direction dễ hình dung.
4. Bạn chọn hướng kể.
5. Codex tạo voice, lấy timing thật, dựng Remotion (hoặc HyperFrames khi có lý do), preview và QA.
6. Bạn chốt render cuối khi preview đạt.

## Prompt mẫu

```text
Làm video 45 giây về lý do quỹ dự phòng và bảo hiểm không thay thế nhau.
Đối tượng: gia đình trẻ.
Tone: hiện đại, rõ, không bán hàng.
```

## Lưu ý

- Chưa render final khi bạn chưa nói rõ “chốt render” hoặc tương đương.
- Với số liệu, sản phẩm bảo hiểm, pháp lý hoặc tài chính: Codex phải kiểm tra nguồn trước khi dùng.
- Feedback như “rối”, “giống slide”, “motion chán” sẽ được chuyển thành nguyên nhân kỹ thuật và rule để tránh lặp lại.

## Kiểm tra tiến độ

Trong `D:\VIDEO AI`, chạy `node core/scripts/factory/index.js status --project <tên-project>` hoặc nhờ Codex chạy. `next` cho biết bước cần làm; state cũ sẽ hiện `needsReview` cho đến khi được kiểm tra lại. Video preview/final của luồng mới nằm trong `projects/<tên-project>/output/`.
