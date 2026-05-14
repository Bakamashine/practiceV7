import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import userManagement, { type UserDtoWithPagination, type RoleDto, type UserManagementValidation } from "~/api/user_management";
import type { UserDto } from "~/api/feedback";
import AdaptivePaginator from "~/components/AdaptivePaginator";
import ShowError from "~/components/showError";
import type { ChangeEvent } from "react";

export default function UserPage() {
  const [users, setUsers] = useState<UserDtoWithPagination | null>(null);
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [searchParams] = useSearchParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDto | null>(null);
  const [createError, setCreateError] = useState<UserManagementValidation | null>(null);
  const [editError, setEditError] = useState<UserManagementValidation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    password: "",
    roleId: "",
  });

  const [editFormData, setEditFormData] = useState({
    fullname: "",
    phoneNumber: "",
    roleId: "",
    isActive: true,
    avatar: null as File | null,
  });

  const [editPreviewUrl, setEditPreviewUrl] = useState<string>("");
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const page = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    loadData(page);
  }, [searchParams]);

  const loadData = async (currentPage: number) => {
    setIsLoading(true);
    const [usersData, rolesData] = await Promise.all([
      userManagement.getAllWithPaginate(currentPage),
      userManagement.getAllRoles(),
    ]);
    setUsers(usersData);
    setRoles(rolesData?.roles || []);
    setIsLoading(false);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await userManagement.create({
      Fullname: formData.fullname,
      PhoneNumber: formData.phoneNumber,
      Password: formData.password,
      RoleId: formData.roleId,
    });

    if (result.status === 200 || result.status === 201) {
      setShowCreateModal(false);
      setFormData({ fullname: "", phoneNumber: "", password: "", roleId: "" });
      loadData(page);
      return;
    }
    setCreateError(result.error as unknown as UserManagementValidation);
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) {
      console.log("No editingUser");
      return;
    }

    const payload = {
      Id: editingUser.id,
      Fullname: editFormData.fullname,
      PhoneNumber: editFormData.phoneNumber,
      RoleId: editFormData.roleId,
      IsActive: editFormData.isActive,
      Avatar: editFormData.avatar || undefined,
    };
    console.log("Edit submit payload:", payload);

    const result = await userManagement.update(payload);
    console.log("Edit submit result:", result);

    if (result.status === 200 || result.status === 204) {
      setShowEditModal(false);
      setEditingUser(null);
      loadData(page);
      return;
    }
    setEditError(result.error as unknown as UserManagementValidation);
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить этого пользователя?")) return;
    await userManagement.deleteUser(id);
    loadData(page);
  };

  const openEditModal = (user: UserDto) => {
    setEditingUser(user);
    setEditFormData({
      fullname: user.fullname,
      phoneNumber: user.phoneNumber,
      roleId: user.role?.id || "",
      isActive: user.isActive,
      avatar: null,
    });
    setEditPreviewUrl(user.avatarUrl || "");
    setShowEditModal(true);
  };

  const handleEditImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditFormData({ ...editFormData, avatar: file });
      setEditPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleEditImageClick = () => {
    editFileInputRef.current?.click();
  };

  const filteredUsers = users?.items;

  return (
    <div className="catalog content">
      <section className="catalog">
        <div className="text-center">
          <h1>Редактировать роль пользователей</h1>
        </div>

        <div className="my-4 d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            Добавить пользователя
          </button>
        </div>

        <div className="my-5 w-100">
          {isLoading ? (
            <div className="text-center">Загрузка...</div>
          ) : (
            filteredUsers?.map((user) => (
              <div
                key={user.id}
                className="d-flex align-items-center justify-content-between my-3"
              >
                <img
                  src={user.avatarUrl || "img/fotoUser.png"}
                  className="avatar"
                  alt={user.fullname}
                />
                <div className="mx-3" style={{ flex: 1 }}>
                  <h5>
                    <b>Фио: </b>
                    {user.fullname}
                  </h5>
                  <hr style={{ width: "100%", margin: 0 }} />
                  <p>
                    <b>Номер телефона: </b>
                    {user.phoneNumber}
                  </p>
                  <hr style={{ width: "100%", margin: 0 }} />
                  <p>
                    <b>Доп информация: </b>
                    {user.userInfo || "Нет информации"}
                  </p>
                  <hr style={{ width: "100%", margin: 0 }} />

                  <div className="d-flex align-items-center">
                    <p className="me-2">Роль: {user.role.name}</p>
                    {/* <div className="dropdown">
                      <button
                        className="btn btn-sm btn-outline-secondary dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {user.role?.name || "Выберите роль"}
                      </button>
                      <ul className="dropdown-menu">
                        {roles.map((role) => (
                          <li key={role.id}>
                            <a className="dropdown-item" href="#">
                              {role.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div> */}
                  </div>
                  <hr style={{ width: "100%", margin: 0 }} />

                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => openEditModal(user)}
                    >
                      Редактировать
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <AdaptivePaginator page={users?.page || 1} pageCount={users?.pageCount || 1} />
      </section>

      {showCreateModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowCreateModal(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Добавить пользователя</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                />
              </div>
              <form onSubmit={handleCreateSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">ФИО</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.fullname}
                      onChange={(e) =>
                        setFormData({ ...formData, fullname: e.target.value })
                      }
                      required
                    />
                    <ShowError errorKey="Fullname" error={createError} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Номер телефона</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      required
                    />
                    <ShowError errorKey="PhoneNumber" error={createError} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Пароль</label>
                    <input
                      type="password"
                      className="form-control"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <ShowError errorKey="Password" error={createError} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Роль</label>
                    <select
                      className="form-control"
                      value={formData.roleId}
                      onChange={(e) =>
                        setFormData({ ...formData, roleId: e.target.value })
                      }
                      required
                    >
                      <option value="">Выберите роль</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <ShowError errorKey="RoleId" error={createError} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowCreateModal(false)}
                  >
                    Отмена
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Создать
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingUser && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowEditModal(false)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Редактировать пользователя</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  <div className="mb-3 text-center">
                    <div
                      className="rounded-circle bg-secondary d-flex justify-content-center align-items-center mx-auto"
                      style={{
                        width: "100px",
                        height: "100px",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                      onClick={handleEditImageClick}
                    >
                      <img
                        src={editPreviewUrl || editingUser?.avatarUrl || "img/fotoUser.png"}
                        alt="Аватар"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <input
                      ref={editFileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleEditImageChange}
                    />
                    <small className="text-muted">Нажмите для смены аватара</small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">ФИО</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editFormData.fullname}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          fullname: e.target.value,
                        })
                      }
                      required
                    />
                    <ShowError errorKey="Fullname" error={editError} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Номер телефона</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={editFormData.phoneNumber}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          phoneNumber: e.target.value,
                        })
                      }
                      required
                    />
                    <ShowError errorKey="PhoneNumber" error={editError} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Роль</label>
                    <select
                      className="form-control"
                      value={editFormData.roleId}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          roleId: e.target.value,
                        })
                      }
                      required
                    >
                      <option value="">Выберите роль</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <ShowError errorKey="RoleId" error={editError} />
                  </div>

                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="isActive"
                      checked={editFormData.isActive}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          isActive: e.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="isActive">
                      Активен
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Отмена
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Сохранить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}