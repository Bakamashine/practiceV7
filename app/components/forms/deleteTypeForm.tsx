import { useState, type FormEvent } from "react";
import ypk, { type YpkResponse } from "~/api/ypk";
import OkModalWindow from "../OkModalWindow";

interface DeleteTypeFormProps {
  ypks: YpkResponse | null | undefined;
  onDelete: () => void;
}

export default function DeleteTypeForm({ ypks, onDelete }: DeleteTypeFormProps) {
  const [selectedId, setSelectedId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedId) return;

    await ypk.destroy(selectedId);
    setSelectedId("");
    setShowModal(true);
    onDelete();
  };

  return (
    <section>
      <OkModalWindow
        show={showModal}
        closeWindow={() => setShowModal(false)}
        headerText="Успешно"
        headerCenterText="Тип успешно удалён"
      />
      <div className="myBlue rounded-3">
        <h1 className="p-3 text-white nameBlock">
          Удалить тип услуг/продуктов
        </h1>
      </div>
      <form className="d-flex gap-2 mb-3" onSubmit={handleSubmit}>
        <div className="w-75">
          {ypks?.ypks && ypks.ypks.length > 0 ? (
            <select
              className="border-0 rounded-4 backColorGre1 p-3 w-100 text-muted"
              style={{ height: "100%" }}
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="" disabled>
                Выберите тип услуги или продукта
              </option>
              {ypks.ypks.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.ypkName}
                </option>
              ))}
            </select>
          ) : (
            <p>Типов нет</p>
          )}
        </div>
        <div className="w-25">
          <button
            type="submit"
            className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100 h-100"
          >
            <span>Удалить</span>
          </button>
        </div>
      </form>
    </section>
  );
}