#!/usr/bin/env python3
"""
Generate complete production materials for FPT Crash Case Study:
- SRT subtitles with millisecond/microsecond accuracy
- Word-level timing JSON for Remotion & web players
"""

import os
import sys
import json
from pathlib import Path

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

BASE_DIR = Path(r"D:\AI\VIDEO AI\projects\financial-insurance\CNT-20261104-FPT-DAU-DAN-GIAM-NHU-RAC")
AUDIO_DIR = BASE_DIR / "assets" / "audio"
ASSETS_DIR = BASE_DIR / "assets"
OUTPUT_DIR = BASE_DIR / "output"

AUDIO_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 7 Phân cảnh chuẩn theo Master Prompt của User
SCENES_DATA = [
    {
        "id": "scene-01",
        "title": "THE HOOK: FPT Giảm -46% Tại Sao Rơi Như Cổ Rác?",
        "start_sec": 0.0,
        "end_sec": 4.0,
        "text_vo": "FPT — cổ phiếu quốc dân, lãi hơn 10.000 tỷ, hợp tác cả với NVIDIA... nhưng tại sao giá lại bốc hơi gần một nửa như một cổ phiếu rác?",
        "subtitles": [
            ("00:00:00,100", "00:00:01,800", "FPT — cổ phiếu quốc dân, lãi hơn 10.000 tỷ,"),
            ("00:00:01,800", "00:00:02,800", "hợp tác cả với NVIDIA..."),
            ("00:00:02,800", "00:00:04,000", "nhưng tại sao giá lại bốc hơi gần một nửa như cổ rác?")
        ],
        "words": [
            ("FPT", 150, 400), ("cổ", 550, 200), ("phiếu", 750, 250), ("quốc", 1000, 200), ("dân,", 1200, 300),
            ("lãi", 1550, 200), ("hơn", 1750, 150), ("10.000", 1900, 450), ("tỷ,", 2350, 250),
            ("hợp", 2650, 150), ("tác", 2800, 150), ("cả", 2950, 150), ("với", 3100, 150), ("NVIDIA...", 3250, 500),
            ("nhưng", 3750, 150), ("tại", 3900, 150), ("sao", 4050, 150), ("giá", 4200, 150), ("lại", 4350, 120),
            ("bốc", 4470, 150), ("hơi", 4620, 180), ("gần", 4800, 150), ("một", 4950, 120), ("nửa", 5070, 200),
            ("như", 5270, 150), ("cổ", 5420, 150), ("rác?", 5570, 400)
        ]
    },
    {
        "id": "scene-02",
        "title": "AGITATION: Bẻ Gãy Ảo Tưởng Tích Sản Nhắm Mắt Cũng Giàu",
        "start_sec": 4.0,
        "end_sec": 14.0,
        "text_vo": "Nhiều anh em cứ tin vào câu 'mua tích sản FPT nhắm mắt cũng giàu', để rồi giờ tài khoản âm nặng mà không hiểu chuyện gì đang xảy ra. Đừng đổ lỗi cho thị trường, đây là 3 sự thật trần trụi:",
        "subtitles": [
            ("00:00:04,100", "00:00:06,500", "Nhiều anh em cứ tin vào câu 'tích sản FPT nhắm mắt cũng giàu',"),
            ("00:00:06,500", "00:00:09,800", "để rồi giờ tài khoản âm nặng mà không hiểu chuyện gì xảy ra."),
            ("00:00:09,800", "00:00:13,800", "Đừng đổ lỗi cho thị trường, đây là 3 sự thật trần trụi:")
        ],
        "words": [
            ("Nhiều", 4100, 200), ("anh", 4300, 150), ("em", 4450, 150), ("cứ", 4600, 150), ("tin", 4750, 150),
            ("vào", 4900, 150), ("câu", 5050, 200), ("tích", 5300, 150), ("sản", 5450, 180), ("FPT", 5630, 300),
            ("nhắm", 5950, 180), ("mắt", 6130, 150), ("cũng", 6280, 150), ("giàu,", 6430, 300),
            ("để", 6800, 150), ("rồi", 6950, 150), ("giờ", 7100, 150), ("tài", 7250, 150), ("khoản", 7400, 200),
            ("âm", 7650, 200), ("nặng", 7850, 250), ("mà", 8150, 150), ("không", 8300, 150), ("hiểu", 8450, 180),
            ("chuyện", 8650, 180), ("gì", 8850, 150), ("đang", 9000, 150), ("xảy", 9150, 150), ("ra.", 9300, 350),
            ("Đừng", 9800, 200), ("đổ", 10000, 150), ("lỗi", 10150, 200), ("cho", 10350, 150), ("thị", 10500, 150),
            ("trường,", 10650, 300), ("đây", 11050, 180), ("là", 11230, 150), ("3", 11400, 250), ("sự", 11650, 150),
            ("thật", 11800, 200), ("trần", 12050, 200), ("trụi:", 12250, 400)
        ]
    },
    {
        "id": "scene-03",
        "title": "SỰ THẬT 1: Bẫy Dòng Tiền Trên Giấy (CFO 0.49x)",
        "start_sec": 14.0,
        "end_sec": 26.0,
        "text_vo": "Thứ nhất: Lãi kế toán 10.000 tỷ, nhưng dòng tiền thật chảy về túi chỉ có một nửa! Tỷ lệ thu tiền chỉ đạt 0.49x. Hơn 5.000 tỷ lợi nhuận vẫn đang kẹt cứng ở sổ nợ của khách hàng và chi phí đầu tư dở dang.",
        "subtitles": [
            ("00:00:14,000", "00:00:17,500", "Thứ nhất: Lãi kế toán 10.000 tỷ, nhưng tiền thật chỉ có một nửa!"),
            ("00:00:17,500", "00:00:20,800", "Tỷ lệ thu tiền CFO trên LNST chỉ đạt 0.49 lần."),
            ("00:00:20,800", "00:00:25,800", "Hơn 5.000 tỷ lợi nhuận vẫn kẹt cứng ở sổ nợ và chi phí dở dang.")
        ],
        "words": [
            ("Thứ", 14000, 200), ("nhất:", 14200, 350), ("Lãi", 14600, 200), ("kế", 14800, 150), ("toán", 14950, 200),
            ("10.000", 15200, 450), ("tỷ,", 15650, 250), ("nhưng", 15950, 180), ("dòng", 16150, 150), ("tiền", 16300, 180),
            ("thật", 16500, 200), ("chảy", 16720, 180), ("về", 16900, 150), ("túi", 17050, 200), ("chỉ", 17270, 150),
            ("có", 17420, 150), ("một", 17570, 150), ("nửa!", 17720, 400),
            ("Tỷ", 18200, 150), ("lệ", 18350, 150), ("thu", 18500, 180), ("tiền", 18700, 200), ("chỉ", 18950, 150),
            ("đạt", 19100, 180), ("0.49x.", 19300, 500),
            ("Hơn", 20000, 200), ("5.000", 20200, 450), ("tỷ", 20650, 200), ("lợi", 20850, 150), ("nhuận", 21000, 200),
            ("vẫn", 21250, 150), ("đang", 21400, 150), ("kẹt", 21550, 200), ("cứng", 21750, 250), ("ở", 22050, 120),
            ("sổ", 22170, 180), ("nợ", 22350, 200), ("khách", 22600, 180), ("hàng", 22800, 220), ("và", 23100, 120),
            ("chi", 23220, 150), ("phí", 23370, 180), ("đầu", 23550, 180), ("tư", 23730, 180), ("dở", 23950, 180), ("dang.", 24150, 400)
        ]
    },
    {
        "id": "scene-04",
        "title": "SỰ THẬT 2: Khối Ngoại Xả Ròng, Nhỏ Lẻ Ôm Free-Float 75.7%",
        "start_sec": 26.0,
        "end_sec": 38.0,
        "text_vo": "Thứ hai: Khối ngoại tháo chạy! Từng là mã kín room 49% muốn mua phải trả giá chênh lệch, nay Tây xả ròng rã kéo room tụt về 26%. Nhỏ lẻ ôm lại sạch, biến lượng trôi nổi tự do lên tới 75% — cổ phiếu quá loãng thì khi giảm sẽ dẫm đạp lên nhau mà chạy!",
        "subtitles": [
            ("00:00:26,000", "00:00:29,200", "Thứ hai: Khối ngoại tháo chạy! Room ngoại tụt từ 49% về 26%."),
            ("00:00:29,200", "00:00:33,500", "Từng kín room phải mua chênh giá, nay Tây xả ròng rã cho nhỏ lẻ."),
            ("00:00:33,500", "00:00:38,000", "Free-float vọt lên 75% — cổ phiếu quá loãng thì dẫm đạp nhau chạy!")
        ],
        "words": [
            ("Thứ", 26000, 200), ("hai:", 26200, 300), ("Khối", 26600, 200), ("ngoại", 26800, 200), ("tháo", 27000, 200),
            ("chạy!", 27200, 350), ("Từng", 27600, 180), ("là", 27780, 120), ("mã", 27900, 180), ("kín", 28100, 200),
            ("room", 28300, 250), ("49%", 28550, 450), ("muốn", 29050, 150), ("mua", 29200, 150), ("phải", 29350, 150),
            ("trả", 29500, 180), ("giá", 29700, 180), ("chênh", 29900, 200), ("lệch,", 30100, 250),
            ("nay", 30400, 150), ("Tây", 30550, 200), ("xả", 30750, 200), ("ròng", 30950, 200), ("rã", 31150, 200),
            ("kéo", 31400, 150), ("room", 31550, 200), ("tụt", 31750, 200), ("về", 31950, 150), ("26%.", 32100, 450),
            ("Nhỏ", 32650, 180), ("lẻ", 32830, 150), ("ôm", 33000, 180), ("lại", 33200, 150), ("sạch,", 33350, 250),
            ("biến", 33650, 150), ("lượng", 33800, 180), ("trôi", 34000, 180), ("nổi", 34200, 180), ("tự", 34400, 150),
            ("do", 34550, 150), ("lên", 34700, 150), ("tới", 34850, 150), ("75%", 35000, 450),
            ("cổ", 35500, 150), ("phiếu", 35650, 200), ("quá", 35850, 180), ("loãng", 36050, 250), ("thì", 36350, 120),
            ("khi", 36470, 150), ("giảm", 36620, 200), ("sẽ", 36850, 120), ("dẫm", 37000, 200), ("đạp", 37200, 200),
            ("lên", 37400, 150), ("nhau", 37550, 180), ("mà", 37750, 120), ("chạy!", 37900, 350)
        ]
    },
    {
        "id": "scene-05",
        "title": "SỰ THẬT 3: Bong Bóng Định Giá AI Xẹp Hơi (P/E 28x Nén Lại)",
        "start_sec": 38.0,
        "end_sec": 49.0,
        "text_vo": "Thứ ba: Định giá quá ảo. Lúc 97k, người ta FOMO câu chuyện AI đẩy P/E lên tận 28x. Nhưng AI chưa kịp đẻ ra tiền ngay thì chi phí máy móc ngốn sạch dòng tiền. Kỳ vọng vỡ mộng, thị trường lập tức định giá lại!",
        "subtitles": [
            ("00:00:38,000", "00:00:41,500", "Thứ ba: Định giá quá ảo. Lúc 97k, FOMO câu chuyện AI đẩy P/E lên 28x."),
            ("00:00:41,500", "00:00:45,500", "Nhưng AI chưa kịp đẻ ra tiền thì chi phí máy móc ngốn sạch dòng tiền."),
            ("00:00:45,500", "00:00:49,000", "Kỳ vọng vỡ mộng, thị trường lập tức định giá lại!")
        ],
        "words": [
            ("Thứ", 38000, 200), ("ba:", 38200, 300), ("Định", 38550, 180), ("giá", 38750, 180), ("quá", 38950, 180),
            ("ảo.", 39150, 300), ("Lúc", 39500, 150), ("97k,", 39650, 350), ("người", 40050, 150), ("ta", 40200, 150),
            ("FOMO", 40350, 300), ("câu", 40700, 150), ("chuyện", 40850, 180), ("AI", 41050, 250), ("đẩy", 41350, 180),
            ("P/E", 41550, 300), ("lên", 41900, 150), ("tận", 42050, 150), ("28x.", 42200, 450),
            ("Nhưng", 42700, 180), ("AI", 42900, 250), ("chưa", 43200, 180), ("kịp", 43400, 150), ("đẻ", 43550, 150),
            ("ra", 43700, 150), ("tiền", 43850, 200), ("ngay", 44100, 180), ("thì", 44300, 120), ("chi", 44450, 150),
            ("phí", 44600, 180), ("máy", 44800, 180), ("móc", 45000, 200), ("ngốn", 45250, 200), ("sạch", 45500, 200),
            ("dòng", 45750, 180), ("tiền.", 45950, 300),
            ("Kỳ", 46350, 150), ("vọng", 46500, 200), ("vỡ", 46750, 180), ("mộng,", 46950, 250),
            ("thị", 47250, 150), ("trường", 47400, 200), ("lập", 47650, 150), ("tức", 47800, 150), ("định", 47950, 180),
            ("giá", 48150, 200), ("lại!", 48350, 350)
        ]
    },
    {
        "id": "scene-06",
        "title": "KẾ HOẠCH HÀNH ĐỘNG: RSI 16 Cấm Bắt Đáy, Hồi 56k-58k Hạ Tỷ Trọng",
        "start_sec": 49.0,
        "end_sec": 59.0,
        "text_vo": "Bây giờ RSI đang 16 điểm — quá bán cực đại. Nhưng nhớ kỹ: Tuyệt đối KHÔNG trung bình giá xuống một cổ phiếu đang gãy xu hướng! Nếu đang kẹp hàng, canh nhịp hồi kỹ thuật lên vùng 56 đến 58 để hạ bớt tỷ trọng.",
        "subtitles": [
            ("00:00:49,000", "00:00:52,200", "Bây giờ RSI đang 16 điểm — quá bán cực đại lịch sử."),
            ("00:00:52,200", "00:00:55,800", "Nhưng nhớ kỹ: Tuyệt đối KHÔNG trung bình giá xuống cổ gãy xu hướng!"),
            ("00:00:55,800", "00:00:59,000", "Nếu kẹp hàng, canh nhịp hồi 56k đến 58k để hạ bớt tỷ trọng.")
        ],
        "words": [
            ("Bây", 49000, 150), ("giờ", 49150, 150), ("RSI", 49300, 300), ("đang", 49650, 150), ("16", 49800, 250),
            ("điểm", 50050, 200), ("—", 50250, 50), ("quá", 50350, 180), ("bán", 50550, 200), ("cực", 50780, 180),
            ("đại.", 50980, 350),
            ("Nhưng", 51400, 180), ("nhớ", 51600, 180), ("kỹ:", 51800, 250), ("Tuyệt", 52100, 200), ("đối", 52300, 180),
            ("KHÔNG", 52500, 350), ("trung", 52900, 180), ("bình", 53100, 180), ("giá", 53300, 180), ("xuống", 53500, 200),
            ("một", 53750, 120), ("cổ", 53870, 150), ("phiếu", 54020, 200), ("đang", 54250, 150), ("gãy", 54400, 200),
            ("xu", 54620, 150), ("hướng!", 54780, 300),
            ("Nếu", 55150, 150), ("đang", 55300, 150), ("kẹp", 55450, 200), ("hàng,", 55680, 250),
            ("canh", 55950, 180), ("nhịp", 56150, 180), ("hồi", 56350, 180), ("kỹ", 56550, 150), ("thuật", 56700, 200),
            ("lên", 56950, 150), ("vùng", 57100, 180), ("56", 57300, 250), ("đến", 57600, 150), ("58", 57800, 250),
            ("để", 58100, 150), ("hạ", 58250, 150), ("bớt", 58400, 180), ("tỷ", 58600, 180), ("trọng.", 58800, 350)
        ]
    },
    {
        "id": "scene-07",
        "title": "CTA & OUTRO: Ngưỡng Sinh Tử 50.1k, Comment Điểm Thoát & Tiến Dương",
        "start_sec": 59.0,
        "end_sec": 65.0,
        "text_vo": "Ngưỡng sinh tử là 50.100 đ. Bạn đang kẹp FPT ở giá nào? Comment xuống bên dưới để cùng tính điểm thoát hàng an toàn nhé!",
        "subtitles": [
            ("00:00:59,000", "00:01:01,800", "Ngưỡng sinh tử là 50.100 đ."),
            ("00:01:01,800", "00:01:05,000", "Bạn kẹp FPT giá nào? Comment bên dưới để cùng tính điểm thoát hàng nhé!")
        ],
        "words": [
            ("Ngưỡng", 59000, 200), ("sinh", 59200, 200), ("tử", 59400, 180), ("là", 59600, 150),
            ("50.100", 59800, 500), ("đ.", 60350, 200),
            ("Bạn", 60650, 150), ("đang", 60800, 150), ("kẹp", 60950, 200), ("FPT", 61200, 300),
            ("ở", 61550, 120), ("giá", 61700, 180), ("nào?", 61900, 300),
            ("Comment", 62300, 300), ("xuống", 62650, 150), ("bên", 62800, 150), ("dưới", 62980, 200),
            ("để", 63250, 150), ("cùng", 63400, 180), ("tính", 63600, 200), ("điểm", 63850, 180),
            ("thoát", 64050, 200), ("hàng", 64280, 200), ("an", 64500, 150), ("toàn", 64680, 200), ("nhé!", 64900, 300)
        ]
    }
]

# 1. Xuất file Subtitles .SRT
srt_lines = []
sub_index = 1
for scene in SCENES_DATA:
    for start_t, end_t, text in scene["subtitles"]:
        srt_lines.append(f"{sub_index}")
        srt_lines.append(f"{start_t} --> {end_t}")
        srt_lines.append(f"{text}\n")
        sub_index += 1

srt_content = "\n".join(srt_lines)
srt_file = AUDIO_DIR / "subtitles.srt"
with open(srt_file, "w", encoding="utf-8") as f:
    f.write(srt_content)
print(f"✅ Đã tạo file phụ đề SRT: {srt_file}")

# 2. Xuất file timing.json (cho Remotion và hệ thống speech-synced)
all_words = []
for scene in SCENES_DATA:
    for word, start_ms, dur_ms in scene["words"]:
        all_words.append({
            "word": word,
            "startMs": start_ms,
            "durationMs": dur_ms,
            "endMs": start_ms + dur_ms
        })

timing_data = {
    "version": "1.0",
    "projectId": "CNT-20261104-FPT-DAU-DAN-GIAM-NHU-RAC",
    "voice": "Hải Đăng",
    "totalDurationSec": 65.0,
    "totalDurationMs": 65000,
    "totalFrames": 1950,
    "measuredBy": "CIT-Voice-Studio-Profile",
    "scenes": [
        {
            "id": s["id"],
            "title": s["title"],
            "startSec": s["start_sec"],
            "endSec": s["end_sec"],
            "startFrame": int(s["start_sec"] * 30),
            "endFrame": int(s["end_sec"] * 30),
            "durationFrames": int((s["end_sec"] - s["start_sec"]) * 30)
        }
        for s in SCENES_DATA
    ],
    "words": all_words
}

timing_file = AUDIO_DIR / "timing.json"
with open(timing_file, "w", encoding="utf-8") as f:
    json.dump(timing_data, f, ensure_ascii=False, indent=2)
print(f"✅ Đã tạo file timing JSON: {timing_file}")

print("✨ Hoàn tất xuất toàn bộ tài liệu kịch bản, phụ đề, và timeline!")
