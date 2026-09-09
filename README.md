

## Cấu trúc & hạ tầng
- Kết nối backend với database.
- Cập nhật lại cấu trúc thư mục để tránh lỗi layout ở trang admin và trang chủ.
- Dùng chung header/footer cho trang admin, đặt tại `admin/layout`.
- Lấy dữ liệu từ database để hiển thị danh mục; làm lại logo và header.

## Xác thực & tài khoản người dùng
- Hoàn thiện chức năng đăng ký và đăng nhập.
- Đăng nhập hỗ trợ cả số điện thoại hoặc email trong cùng một ô nhập (backend tìm theo `$or`).
- Fix lỗi đăng ký không phân biệt chữ hoa/chữ thường.
- Fix lỗi server khi không nhập email (email vốn không bắt buộc, nhưng trước đây để trống sẽ lỗi) — nay đã cho phép bỏ trống bình thường.
- Thêm field `status` (active/banned) vào User model — chặn đăng nhập nếu tài khoản bị khóa.
- Tạo lại tài khoản admin bằng email thật:
  - Email: `admin@smarthub.vn`
  - Mật khẩu: `Admin@123`

## Quên mật khẩu qua email  
- Backend dùng Brevo HTTP API để gửi liên kết đặt lại mật khẩu (token hết hạn sau 15 phút).
- Cấu hình các biến môi trường trên môi trường chạy backend: `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME`, `FRONTEND_URL`.
- `BREVO_SENDER_EMAIL` phải là địa chỉ email đã được xác thực trên Brevo.

## Sản phẩm & danh mục
- Thêm danh mục ra ngoài header.
- Thêm trang quản lý sản phẩm.
- Thêm trang sản phẩm và trang chi tiết sản phẩm, có chức năng tìm kiếm; đã hỗ trợ CRUD (cần cải tiến thêm bố cục trang sản phẩm).
- Trang xem tất cả sản phẩm: có chức năng sắp xếp và phân trang.
- Cập nhật kết nối variants (biến thể sản phẩm) — đã hiển thị sản phẩm nhưng chưa có dữ liệu ảnh (giai đoạn đầu).
- **Ảnh theo biến thể:**
  - Backend (`productController.js`): lưu ảnh riêng cho từng biến thể vào bảng `product_images` (gắn theo `variant_id`). Khi tạo/sửa sản phẩm sẽ xóa ảnh biến thể cũ và lưu ảnh mới tương ứng. `formatProduct` trả về `variant.image` cho từng biến thể.
  - Admin form (`frontend/app/admin/products/page.tsx`): mỗi dòng biến thể có thêm ô nhập URL ảnh kèm thumbnail xem trước.
  - AI gợi ý tự động: tìm ảnh sản phẩm chính và ảnh riêng cho từng biến thể (theo tên sản phẩm + màu), chạy song song qua Serper.dev.
  - Trang sản phẩm (`sanpham/[slug]/page.tsx`): khi khách chọn màu/biến thể, ảnh chính tự đổi sang ảnh riêng của biến thể đó (nếu có) thay vì luôn hiển thị ảnh chung.
- AI tự động gợi ý sản phẩm, tự thêm biến thể, tự thêm ảnh và tự đề xuất giá theo thị trường.

## Giỏ hàng & thanh toán
- Làm trang giỏ hàng.
- Làm lại trang giỏ hàng, bổ sung thêm trang thanh toán.
- Trang profile: cập nhật địa chỉ người dùng.

## Quản lý đơn hàng
- Quản lý đơn hàng theo luồng tiến trình logic, có popup xác nhận.

## Quản lý khách hàng
- Quản lý khách hàng.
- **Backend:**
  - API mới:
    - `GET /api/admin/users` — danh sách khách hàng kèm thống kê đơn hàng/chi tiêu.
    - `GET /api/admin/users/:id` — chi tiết khách hàng + lịch sử đơn hàng.
    - `PUT .../status` — cập nhật trạng thái tài khoản.
    - `PUT .../role` — cập nhật vai trò.
    - `DELETE .../:id` — xóa tài khoản.
- **Frontend:**
  - Bảng danh sách: avatar chữ cái đầu, tên/loại tài khoản (local/Google/Zalo), SĐT/email, vai trò (badge), trạng thái, số đơn hàng, tổng chi tiêu, ngày tham gia.
  - Bộ lọc theo tên/email/SĐT, vai trò, trạng thái.
  - Thao tác nhanh trên bảng: xem chi tiết, khóa/mở khóa, xóa.
  - Modal chi tiết: thông tin đầy đủ, nút "Đặt làm Admin" / "Khóa tài khoản", lịch sử đơn hàng.
  - Mọi hành động nguy hiểm (khóa, xóa, cấp quyền admin) đều có popup xác nhận trước khi thực hiện.

## Danh mục, mã giảm giá & tương tác khách hàng
- Quản lý danh mục có brands.
- Chức năng yêu thích — bắt buộc đăng nhập mới được yêu thích.
- Hoàn thiện các nút chức năng có thể click.
- Mã giảm giá và đánh giá: chỉ khách đã mua mới được đánh giá sản phẩm.
- Trang tin tức và quản lý tin tức.
- Vòng quay may mắn.
- Flash sale.
- Chức năng nhận xét, đánh giá sau khi mua sản phẩm.
- Chức năng hỏi đáp của khách hàng trước khi mua sản phẩm.

## Lệnh hữu ích
```
git pull origin main
```
Dùng để tải về các thay đổi code mới nhất trên GitHub.