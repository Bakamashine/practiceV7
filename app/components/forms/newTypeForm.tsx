import { useState, type FormEvent } from "react";
import _type, { type TypeValidation } from "~/api/_type";
import ShowError from "../showError";
import OkModalWindow from "../OkModalWindow";

interface NewTypeFormProps {
  onAdd: () => void;
}

export default function NewTypeForm({ onAdd }: NewTypeFormProps) {
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<TypeValidation | null>(null);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await _type.create(text);
    if (result.status == 200) {
      setShow(true);
      setText("");
      setError(null);
      onAdd();
    } else {
      setError(result.data as unknown as TypeValidation);
    }
  };

  return (
    <>
      <OkModalWindow
        show={show}
        closeWindow={() => setShow(false)}
        headerText="Успешно"
        headerCenterText="Тип успешно добавлен"
      />
      <div className="myBlue rounded-3">
        <h1 className="p-3 text-white nameBlock">
          Добавить новый тип услуг/продуктов
        </h1>
      </div>
      <form className="d-flex gap-2 mb-3" onSubmit={submit}>
        <div className="w-75">
          <input
            type="text"
            placeholder="Введите новый тип услуги или продукта"
            className="border-0 rounded-4 backColorGre1 p-3 w-100"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ height: "100%" }}
          />
          <ShowError error={error} errorKey="ypkName" />
        </div>
        <div className="w-25">
          <button
            type="submit"
            className="sign-out d-flex myLightBlue border-0 rounded-3 justify-content-center align-items-center gap-2 p-2 text-white w-100 h-100"
          >
            <span>Добавить</span>
          </button>
        </div>
      </form>
    </>
  );
}