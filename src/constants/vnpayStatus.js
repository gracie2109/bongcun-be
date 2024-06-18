export const VnpayResponseStatus = [
    {  code:'00' , message:"Giao dịch thành công"},
    {  code:'07' , message:"Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).\n"},
    {  code:'09' , message:"Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.\n"},
    {  code:'10' , message:"Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần\n"},
    {  code:'11' , message:"Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.\n"},
    {  code:'12' , message:"Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.\n"},
    {  code:'13' , message:"Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.\n"},
    {  code:'24' , message:"Giao dịch không thành công do: Khách hàng hủy giao dịch\n"},
    {  code:'51' , message:"Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.\n"},
    {  code:'65' , message:"Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.\n"},
    {  code:'75' , message:"Ngân hàng thanh toán đang bảo trì.\n"},
    {  code:'79' , message:"Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch"},
    {  code:'99' , message:"Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)\n"},
]

export const VnPayQueryDrStatus = [
    { code:"02", message:"Merchant không hợp lệ (kiểm tra lại vnp_TmnCode)"},
    { code:"03", message:"Dữ liệu gửi sang không đúng định dạng"},
    { code:"91", message:"Không tìm thấy giao dịch yêu cầu"},
    { code:"94", message:"Yêu cầu bị trùng lặp trong thời gian giới hạn của API (Giới hạn trong 5 phút)"},
    { code:"97", message:"Chữ ký không hợp lệ"},
    { code:"99", message:"Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)"},
]

export const VnPayRefundStatus = [
    { code:"02", message:"Tổng số tiền hoản trả lớn hơn số tiền gốc"},
    { code:"03", message:"Dữ liệu gửi sang không đúng định dạng"},
    { code:"04", message:"Không cho phép hoàn trả toàn phần sau khi hoàn trả một phần"},
    { code:"13", message:"Chỉ cho phép hoàn trả một phần"},
    { code:"91", message:"Không tìm thấy giao dịch yêu cầu hoàn trả"},
    { code:"93", message:"Số tiền hoàn trả không hợp lệ. Số tiền hoàn trả phải nhỏ hơn hoặc bằng số tiền thanh toán."},
    { code:"94", message:"Yêu cầu bị trùng lặp trong thời gian giới hạn của API (Giới hạn trong 5 phút)"},
    { code:"95", message:"Giao dịch này không thành công bên VNPAY. VNPAY từ chối xử lý yêu cầu."},
    { code:"97", message:"Chữ ký không hợp lệ"},
    { code:"98", message:"Timeout Exception"},
    { code:"99", message:"Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)"},
]