Google Zanzibar là một hệ thống quyền truy cập phân tán được thiết kế để giúp các công ty quản lý các quyền truy cập phức tạp cho ứng dụng của họ, đặc biệt là khi có nhiều đối tượng, vai trò, và người dùng. Google Zanzibar không công khai các HTTP methods của nó, nhưng dựa trên các khái niệm và chức năng thường gặp trong các hệ thống quản lý quyền truy cập tương tự, chúng ta có thể phỏng đoán các HTTP methods mà một API như Zanzibar có thể cung cấp.

Dưới đây là một số HTTP methods giả tưởng, với các chức năng phổ biến trong quản lý quyền truy cập:

	1.	POST /permissions/check
	•	Chức năng: Kiểm tra xem người dùng có quyền truy cập vào một tài nguyên cụ thể hay không.
	•	Ví dụ: Kiểm tra nếu “user123” có quyền “xem” tài liệu “doc456”.
	•	Payload:
```json
{
  "user": "user123",
  "permission": "view",
  "resource": "doc456"
}
```


	2.	POST /permissions/assign
	•	Chức năng: Gán một quyền cụ thể cho người dùng đối với tài nguyên.
	•	Ví dụ: Gán quyền “sửa” cho “user123” đối với “doc456”.
	•	Payload:
```json
{
  "user": "user123",
  "permission": "edit",
  "resource": "doc456"
}
```

	3.	DELETE /permissions/revoke
	•	Chức năng: Thu hồi một quyền truy cập từ người dùng cho tài nguyên cụ thể.
	•	Ví dụ: Thu hồi quyền “sửa” của “user123” đối với “doc456”.
	•	Payload:
```json
{
  "user": "user123",
  "permission": "edit",
  "resource": "doc456"
}
```

	4.	GET /permissions/list
	•	Chức năng: Liệt kê tất cả quyền mà người dùng có trên một tài nguyên hoặc ngược lại.
	•	Ví dụ: Xem tất cả quyền mà “user123” có trên “doc456”.
	•	Tham số URL:

/permissions/list?user=user123&resource=doc456


	5.	POST /resources/create
	•	Chức năng: Tạo một tài nguyên mới và xác định ai có quyền truy cập vào nó.
	•	Ví dụ: Tạo “doc456” và cho “user123” quyền xem.
	•	Payload:
```json
{
  "resource_id": "doc456",
  "permissions": [
    {
      "user": "user123",
      "permission": "view"
    }
  ]
}
```

	6.	POST /roles/assign
	•	Chức năng: Gán một vai trò cho người dùng, trong đó vai trò bao gồm một nhóm quyền cụ thể.
	•	Ví dụ: Gán vai trò “editor” cho “user123” trên “doc456”.
	•	Payload:

```json
{
  "user": "user123",
  "role": "editor",
  "resource": "doc456"
}
```

	7.	DELETE /roles/revoke
	•	Chức năng: Thu hồi vai trò từ một người dùng.
	•	Ví dụ: Thu hồi vai trò “editor” từ “user123” trên “doc456”.
	•	Payload:

```json
{
  "user": "user123",
  "role": "editor",
  "resource": "doc456"
}
```


Tóm tắt

Các HTTP methods này chỉ là giả định, nhưng sẽ hữu ích cho hệ thống quản lý quyền phức tạp như Google Zanzibar.
