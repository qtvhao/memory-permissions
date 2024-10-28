Dưới đây là module giả định SESSION_TOKEN để hỗ trợ tạo và xác thực Session Token cho người dùng. Session Token sẽ cung cấp một phương thức xác thực tạm thời, thay vì sử dụng Access Key trực tiếp, giúp giảm thiểu rủi ro bảo mật và cải thiện hiệu suất khi truy cập hệ thống.

1. POST /session-token/create

	•	Chức năng: Tạo một Session Token mới cho người dùng dựa trên cặp Access Key (access_key_id và secret_access_key). Token này có thể có thời gian sống ngắn hơn và được dùng để truy cập vào tài nguyên mà không cần sử dụng Access Key trực tiếp.
	•	Ví dụ: Tạo Session Token cho access_key_id của người dùng.
	•	Payload:

```json
{
  "access_key_id": "AKIAIOSFODNN7EXAMPLE",
  "secret_access_key": "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
  "duration_seconds": 3600  // Thời gian sống của token (tính bằng giây)
}
```


	•	Response (giả sử thành công):

```json
{
  "status": "success",
  "session_token": {
    "token": "FwoGZXIvYXdzEGoaD...EXAMPLETOKEN",  // Session Token mã hóa
    "expires_at": "2024-10-27T11:00:00Z"  // Thời điểm hết hạn token
  }
}
```

	•	Giải thích các trường:
	•	token: Chuỗi token mã hóa dùng để xác thực các yêu cầu tiếp theo.
	•	expires_at: Ngày hết hạn của token để đảm bảo an toàn.

2. POST /session-token/validate

	•	Chức năng: Xác thực một Session Token để đảm bảo token còn hiệu lực và thuộc về người dùng có quyền.
	•	Ví dụ: Kiểm tra xem session_token có còn hiệu lực và có quyền truy cập hay không.
	•	Payload:

```json
{
  "session_token": "FwoGZXIvYXdzEGoaD...EXAMPLETOKEN",
  "resource": "doc456",
  "permission": "view"
}
```

	•	Response (giả sử thành công):

```json
{
  "status": "success",
  "is_valid": true,
  "has_permission": true,
  "message": "Session token is valid and has view permission on resource doc456"
}
```

	•	Response (nếu không hợp lệ hoặc hết hạn):

```json
{
  "status": "failure",
  "is_valid": false,
  "has_permission": false,
  "message": "Session token is expired or invalid"
}
```


3. DELETE /session-token/revoke

	•	Chức năng: Thu hồi một Session Token trước khi hết hạn. Phương thức này thường dùng khi người dùng đăng xuất hoặc khi cần chấm dứt phiên làm việc vì lý do bảo mật.
	•	Ví dụ: Thu hồi Session Token đang hoạt động của người dùng.
	•	Payload:

```json
{
  "session_token": "FwoGZXIvYXdzEGoaD...EXAMPLETOKEN"
}
```


	•	Response (giả sử thành công):

```json
{
  "status": "success",
  "message": "Session token has been successfully revoked"
}
```


Tóm tắt

Module SESSION_TOKEN này giúp cải thiện bảo mật và hiệu suất cho hệ thống quản lý quyền truy cập bằng cách cho phép người dùng sử dụng Session Token thay cho Access Key trong các phiên ngắn hạn.
